import { Assets, Container, Sprite } from "pixi.js";
import { createRocket } from "../components/Rocket";
import app from "../main";

const createBackground = async () => {
  const backgroundTexture = await Assets.load({
    alias: "background",
    src: "/assets/background.jpg",
  });
  const background = new Sprite(backgroundTexture);

  const ratio = background.texture.orig.height / background.texture.orig.width;
  const backgroundWidth = app.screen.width / 4;
  const backgroundHeight = backgroundWidth * ratio;

  background.setSize(backgroundWidth, backgroundHeight);
  background.x = app.screen.width / 2 - background.width / 2;
  background.y = app.screen.height / 2 - background.height / 2;
  return background;
};

export const renderGame = async () => {
  const scene = new Container();

  const background = await createBackground();
  const rocket = await createRocket(150, 150);
  scene.addChild(background);
  scene.addChild(rocket);
  app.stage.addChild(scene);
};
