import { Container } from "pixi.js";
import app from "../main";
import { Button } from "../components/Button/Button";
import { handleGameStart, handleGameStop } from "../state";

export const renderMenu = async () => {
  const menuContainer = new Container();
  const startButton = await Button.create("Start", handleGameStart);
  const pauseButton = await Button.create(
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
