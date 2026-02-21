import { Assets } from "pixi.js";
import { createCustomSprite } from "../CustomSprite/CustomSprite";

export const createEnemy = async (x: number = 0, y: number = 0) => {
  const enemyTexture = await Assets.load({
    alias: "enemy-1",
    src: "/assets/alien.png",
  });

  return createCustomSprite(enemyTexture, 50, x, y);
};
