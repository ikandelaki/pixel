import { Assets } from "pixi.js";
import { createCustomSprite } from "../CustomSprite/CustomSprite";
import { enemyConfig } from "./Enemy.config";

export const createEnemy = async (x: number = 0, y: number | null = null) => {
  const enemyTexture = await Assets.load({
    alias: "enemy-1",
    src: "/assets/alien.png",
  });
  const enemy = await createCustomSprite(enemyTexture, enemyConfig.width, x, y);

  const enemySpawnPointY = y !== null ? y : -enemy.height;

  enemy.position.y = enemySpawnPointY;
  return enemy;
};
