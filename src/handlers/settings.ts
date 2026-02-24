import { Background } from "./../components/Background/Background";
import { Assets } from "pixi.js";
import { CustomSprite } from "../components/CustomSprite/CustomSprite";
import { handleGameStop, restartGameState } from "../state";
import app from "../main";

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

  settingsButton.addEventListener("pointerdown", () => {
    handleGameStop();
    restartGameState(rocket, background);

    // Force a render update to display changes immediately
    app.renderer.render(app.stage);
  });

  background.addChild(settingsButton);
};
