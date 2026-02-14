import { Container } from "pixi.js";
import app from "../main";
import { createButton } from "../components/Button";

export const renderMenu = async () => {
  const menuContainer = new Container();
  const button = await createButton("Start", 50, 50, () => {
    console.log(">> click");
  });

  menuContainer.addChild(button);
  app.stage.addChild(menuContainer);
};
