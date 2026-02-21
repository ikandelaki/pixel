import { Assets } from "pixi.js";
import { rocketConfig } from "./Rocket.config";
import { createCustomSprite } from "../CustomSprite/CustomSprite";

export const createRocket = async (x: number = 0, y: number = 0) => {
  const rocketTexture = await Assets.load({
    alias: "rocket",
    src: "/assets/rocket.png",
  });

  return createCustomSprite(rocketTexture, rocketConfig.width, x, y);
};
