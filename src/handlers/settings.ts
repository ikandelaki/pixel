import { Background } from "./../components/Background/Background";
import { Assets, Container, Sprite, Ticker } from "pixi.js";
import { CustomSprite } from "../components/CustomSprite/CustomSprite";
import { handleGameStop, restartGameState } from "../state";
import app from "../main";
import { Rocket } from "../components/Rocket/Rocket";

let settingsOpen = false;

// --- ANIMATION ---
const openSettings = async (background: Background) => {
  // --- SETTINGS CONTAINER ---
  const settingsContainer = new Container();
  background.addChild(settingsContainer);

  // LOAD FIRST
  const texture = await Assets.load("/assets/settings_background.png");

  // THEN create sprite
  const settingsBg = new Sprite(texture);
  settingsBg.width = background.width;
  settingsBg.height = background.height;
  settingsContainer.addChild(settingsBg);
  settingsContainer.zIndex = 98;

  // start hidden (top-right, outside screen)
  settingsContainer.x = background.width;
  settingsContainer.y = -settingsBg.height;

  const targetX = 0;
  const targetY = 0;

  app.ticker.add(slideIn);

  function slideIn(ticker: Ticker) {
    // SpeedX is different because its width and height differ
    const speedX =
      (50 * ticker.deltaTime * settingsContainer.width) /
      settingsContainer.height;
    const speedY = 50 * ticker.deltaTime;

    if (settingsContainer.x > targetX) {
      settingsContainer.x -= speedX;
    }
    if (settingsContainer.y < targetY) {
      settingsContainer.y += speedY;
    }

    // stop animation when arrived
    if (settingsContainer.x <= targetX && settingsContainer.y >= targetY) {
      settingsContainer.x = targetX;
      settingsContainer.y = targetY;
      app.ticker.remove(slideIn);
    }
  }
};

export const renderSettingsButton = async (
  rocket: Rocket,
  background: Background,
) => {
  const settingsTexture = await Assets.load({
    alias: "settings",
    src: "/assets/gear.png",
  });

  const settingsButton = new CustomSprite(
    settingsTexture,
    50,
    background.width - 50,
    0,
  );

  settingsButton.zIndex = 99;
  settingsButton.cursor = "pointer";

  settingsButton.addEventListener("pointerdown", async () => {
    if (settingsOpen) return;
    settingsOpen = true;

    handleGameStop();
    restartGameState(rocket, background);

    // Force a render update to display changes immediately
    app.renderer.render(app.stage);

    await openSettings(background);
  });

  background.addChild(settingsButton);
};
