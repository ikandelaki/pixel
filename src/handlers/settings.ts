import { Background } from "./../components/Background/Background";
import { Assets, Container, Sprite, Ticker } from "pixi.js";
import { CustomSprite } from "../components/CustomSprite/CustomSprite";
import { handleGameStop, restartGameState } from "../state";
import app from "../main";
import { Rocket } from "../components/Rocket/Rocket";
import { Button } from "../components/Button/Button";

let settingsOpen = false;
let settingsContainer: Container | null = null;

const createRestartButton = async (rocket: Rocket, background: Background) => {
  const handleButtonClick = () => {
    restartGameState(rocket, background);
    closeSettings(background);
  };

  const button = await Button.create("Restart", handleButtonClick, 0, 0, 18);
  return button;
};

const openSettings = async (rocket: Rocket, background: Background) => {
  if (settingsContainer) return;

  settingsContainer = new Container();
  settingsContainer.zIndex = 98;
  background.addChild(settingsContainer);

  const texture = await Assets.load("/assets/settings_background.png");

  const settingsBg = new Sprite(texture);
  settingsBg.width = background.width;
  settingsBg.height = background.height;
  settingsContainer.addChild(settingsBg);

  const restartButton = await createRestartButton(rocket, background);
  settingsContainer.addChild(restartButton);
  restartButton.position.set(
    (settingsContainer.x + settingsContainer.width) / 2 -
      restartButton.width / 2,
    settingsContainer.y + settingsContainer.height - 150,
  );

  // start hidden (top-right)
  settingsContainer.x = background.width;
  settingsContainer.y = -settingsBg.height;

  const targetX = 0;
  const targetY = 0;

  app.ticker.add(slideIn);

  function slideIn(ticker: Ticker) {
    const speedX =
      (50 * ticker.deltaTime * settingsContainer!.width) /
      settingsContainer!.height;
    const speedY = 50 * ticker.deltaTime;

    settingsContainer!.x -= speedX;
    settingsContainer!.y += speedY;

    if (settingsContainer!.x <= targetX && settingsContainer!.y >= targetY) {
      settingsContainer!.x = targetX;
      settingsContainer!.y = targetY;
      app.ticker.remove(slideIn);
    }
  }
};

const closeSettings = (background: Background) => {
  if (!settingsContainer) return;

  const targetX = background.width;
  const targetY = -settingsContainer.height;

  app.ticker.add(slideOut);

  function slideOut(ticker: Ticker) {
    const speedX =
      (60 * ticker.deltaTime * settingsContainer!.width) /
      settingsContainer!.height;
    const speedY = 60 * ticker.deltaTime;

    settingsContainer!.x += speedX;
    settingsContainer!.y -= speedY;

    if (settingsContainer!.x >= targetX && settingsContainer!.y <= targetY) {
      settingsContainer!.x = targetX;
      settingsContainer!.y = targetY;

      background.removeChild(settingsContainer!);
      settingsContainer!.destroy({ children: true });

      settingsContainer = null;
      settingsOpen = false;

      app.ticker.remove(slideOut);
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
    if (settingsOpen) {
      settingsOpen = false;
      closeSettings(background);
    }

    settingsOpen = true;

    handleGameStop();
    // restartGameState(rocket, background);

    // Force a render update to display changes immediately
    app.renderer.render(app.stage);

    await openSettings(rocket, background);
  });

  background.addChild(settingsButton);
};
