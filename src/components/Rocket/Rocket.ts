import { Assets } from "pixi.js";
import { rocketConfig } from "./Rocket.config";
import { CustomSprite } from "../CustomSprite/CustomSprite";

export class Rocket extends CustomSprite {
  constructor(x: number = 0, y: number = 0) {
    super(undefined, rocketConfig.width, x, y);
  }

  static async create(x: number = 0, y: number = 0): Promise<Rocket> {
    const rocketTexture = await Assets.load({
      alias: "rocket",
      src: "/assets/rocket.png",
    });

    const rocket = new Rocket(x, y);
    rocket["sprite"].texture = rocketTexture;

    const originalWidth = rocketTexture.orig.width;
    const originalHeight = rocketTexture.orig.height;
    const aspectRatio = originalHeight / originalWidth;
    rocket["sprite"].width = rocketConfig.width;
    rocket["sprite"].height = aspectRatio * rocketConfig.width;

    rocket.zIndex = 2;
    return rocket;
  }
}
