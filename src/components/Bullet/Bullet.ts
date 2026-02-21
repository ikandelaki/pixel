import { Assets } from "pixi.js";
import { createCustomSprite } from "../CustomSprite/CustomSprite";
import { bulletConfig } from "./Bullet.config";

export const createBullet = async (x: number = 0, y: number = 0) => {
  const bulletTexture = await Assets.load({
    alias: "bullet",
    src: "/assets/bullet.png",
  });

  const bullet = await createCustomSprite(
    bulletTexture,
    bulletConfig.width,
    x,
    y,
  );

  bullet.zIndex = 1;
  return bullet;
};
