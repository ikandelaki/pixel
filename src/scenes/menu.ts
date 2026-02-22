import { Container } from "pixi.js";
import app from "../main";
import { createButton } from "../components/Button/Button";
import { handleGameStart, handleGameStop } from "../state";

export const renderMenu = async () => {
  const menuContainer = new Container();
  const startButton = await createButton("Start", handleGameStart);
  const pauseButton = await createButton(
    "Pause",
    handleGameStop,
    startButton.width + 50,
  );
  menuContainer.addChild(startButton, pauseButton);
  menuContainer.position = {
    x: app.screen.width / 2 - menuContainer.width / 2,
    y: app.screen.height - 100,
  };

  app.stage.addChild(menuContainer);
};
