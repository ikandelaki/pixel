import { Assets } from "pixi.js";
import { CustomSprite } from "../CustomSprite/CustomSprite";
import { bulletConfig } from "./Bullet.config";

export class Bullet extends CustomSprite {
  damage: number = 20;

  constructor(x: number = 0, y: number = 0) {
    super(undefined, bulletConfig.width, x, y);
  }

  static async create(x: number = 0, y: number = 0): Promise<Bullet> {
    const bulletTexture = await Assets.load({
      alias: "bullet",
      src: "/assets/bullet.png",
    });

    const bullet = new Bullet(x, y);
    bullet["sprite"].texture = bulletTexture;

    const originalWidth = bulletTexture.orig.width;
    const originalHeight = bulletTexture.orig.height;
    const aspectRatio = originalHeight / originalWidth;
    bullet["sprite"].width = bulletConfig.width;
    bullet["sprite"].height = aspectRatio * bulletConfig.width;

    bullet.zIndex = 1;
    return bullet;
  }

  setDamage(damage: number) {
    this.damage = damage;
  }
}
