import { Container, Sprite, SpriteOptions, Texture } from "pixi.js";

export class CustomSprite extends Container {
  protected sprite: Sprite;

  constructor(
    options?: SpriteOptions | Texture,
    width: number = 50,
    x: number = 0,
    y: number = 0,
  ) {
    super();

    this.sprite = new Sprite(options);

    const originalWidth = this.sprite.texture.orig.width;
    const originalHeight = this.sprite.texture.orig.height;

    const aspectRatio = originalHeight / originalWidth;
    this.sprite.width = width;
    this.sprite.height = aspectRatio * width;

    this.addChild(this.sprite);
    this.position.set(x, y);
  }
}
