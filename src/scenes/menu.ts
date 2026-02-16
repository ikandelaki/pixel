import { Container } from "pixi.js";
import app from "../main";
import { createButton } from "../components/Button";
import { handleGameStart, handleGamePause } from "../state";

export const renderMenu = async () => {
  const menuContainer = new Container();
  const startButton = await createButton("Start", 50, 50, handleGameStart);
  const pauseButton = await createButton("Pause", 250, 50, handleGamePause);
  menuContainer.position = {
    x: app.screen.width / 3,
    y: app.screen.height / 3,
  };

  menuContainer.addChild(startButton, pauseButton);
  app.stage.addChild(menuContainer);
};
