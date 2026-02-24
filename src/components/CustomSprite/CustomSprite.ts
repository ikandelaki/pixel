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
    this.sprite.eventMode = "static";

    const originalWidth = this.sprite.texture.orig.width;
    const originalHeight = this.sprite.texture.orig.height;

    const aspectRatio = originalHeight / originalWidth;
    this.sprite.width = width;
    this.sprite.height = aspectRatio * width;

    this.addChild(this.sprite);
    this.position.set(x, y);
  }

  set cursor(value: string) {
    this.sprite.cursor = value;
  }

  get cursor(): string {
    return this.sprite.cursor;
  }

  addEventListener(
    event: string,
    fn: (e: unknown) => void,
    context?: unknown,
  ): void {
    this.sprite.addEventListener(event, fn, context);
  }
}
