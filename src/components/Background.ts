import { Sprite, Assets, Container, Graphics } from "pixi.js";
import app from "../main";

const BACKGROUND_SCROLL_SPEED = 0.5;

export const createBackground = async () => {
  const backgroundContainer = new Container();
  const backgroundTexture = await Assets.load({
    alias: "background",
    src: "/assets/background.jpg",
  });
  const background = new Sprite(backgroundTexture);

  const viewWidth = app.screen.width / 4;
  const ratio = background.texture.orig.height / background.texture.orig.width;
  const viewHeight = viewWidth * ratio;

  background.setSize(
    background.texture.orig.width / 2,
    background.texture.orig.height / 2,
  );
  backgroundContainer.addChild(background);

  const mask = new Graphics().rect(0, 0, viewWidth, viewHeight).fill(0xffffff);

  backgroundContainer.addChild(mask);
  backgroundContainer.mask = mask;

  backgroundContainer.position.set(
    app.screen.width / 2 - backgroundContainer.width / 2,
    app.screen.height / 2 - backgroundContainer.height / 2,
  );

  background.y = -(background.height - viewHeight);

  app.ticker.add((ticker) => {
    const scrollDistance = BACKGROUND_SCROLL_SPEED * ticker.deltaTime;

    if (background.y < 0) {
      background.y += scrollDistance;
    }
  });

  return backgroundContainer;
};
