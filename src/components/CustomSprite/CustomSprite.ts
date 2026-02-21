import { Container, Sprite, SpriteOptions, Texture } from "pixi.js";

export const createCustomSprite = async (
  options?: SpriteOptions | Texture,
  width: number = 50,
  x: number = 0,
  y: number = 0,
) => {
  const spriteContainer = new Container();

  const sprite = new Sprite(options);

  const originalWidth = sprite.texture.orig.width;
  const originalHeight = sprite.texture.orig.height;

  const aspectRatio = originalHeight / originalWidth;
  sprite.width = width;
  sprite.height = aspectRatio * width;

  spriteContainer.addChild(sprite);
  spriteContainer.position.set(x, y);

  return spriteContainer;
};
