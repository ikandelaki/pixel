import { Container } from "pixi.js";
import app from "../main";
import { createButton } from "../components/Button";

export const renderMenu = async () => {
  const menuContainer = new Container();
  const button = await createButton("Start");

  menuContainer.addChild(button);
  app.stage.addChild(menuContainer);
};
