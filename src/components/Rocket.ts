import { Assets, Container, Sprite } from "pixi.js";

export const ROCKET_WIDTH = 80;

export const createRocket = async (x: number = 0, y: number = 0) => {
  const rocketContainer = new Container();
  const rocketTexture = await Assets.load({
    alias: "rocket",
    src: "/assets/rocket.png",
  });

  const rocket = new Sprite(rocketTexture);

  const originalWidth = rocket.texture.orig.width;
  const originalHeight = rocket.texture.orig.height;

  const aspectRatio = originalHeight / originalWidth;
  rocket.width = ROCKET_WIDTH;
  rocket.height = aspectRatio * ROCKET_WIDTH;

  rocketContainer.addChild(rocket);
  rocketContainer.position.set(x, y);

  return rocketContainer;
};
