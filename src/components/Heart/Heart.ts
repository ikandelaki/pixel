import { Assets } from "pixi.js";
import { CustomSprite } from "../CustomSprite/CustomSprite";

export const HEART_WIDTH = 50;

export default class Heart extends CustomSprite {
  isFull: boolean = true;

  constructor(x?: number) {
    super(undefined, HEART_WIDTH, x, 0);
  }

  static async create() {
    const heartTexture = await Assets.load({
      alias: "heart",
      src: "/assets/heart.png",
    });

    const heart = new Heart();
    heart["sprite"].texture = heartTexture;

    return heart;
  }

  disable() {
    this.isFull = false;
    this.alpha = 0.5;
  }

  enable() {
    this.isFull = true;
    this.alpha = 1;
  }
}
