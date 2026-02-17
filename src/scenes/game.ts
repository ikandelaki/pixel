import { Container } from "pixi.js";
import { createRocket } from "../components/Rocket";
import app from "../main";

export const renderGame = async () => {
  const scene = new Container();

  const rocket = await createRocket(150, 150);

  scene.addChild(rocket);
  app.stage.addChild(scene);
};
