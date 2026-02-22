import { Sprite, Assets, Container, Graphics } from "pixi.js";
import app from "../../main";

const BACKGROUND_SCROLL_SPEED = 0.5;

export class Background extends Container {
  private background: Sprite;

  constructor() {
    super();
  }

  static async create(): Promise<Background> {
    const backgroundInstance = new Background();
    const backgroundTexture = await Assets.load({
      alias: "background",
      src: "/assets/background.jpg",
    });

    backgroundInstance.background = new Sprite(backgroundTexture);

    const viewWidth = app.screen.width / 4;
    const ratio =
      backgroundInstance.background.texture.orig.height /
      backgroundInstance.background.texture.orig.width;
    const viewHeight = viewWidth * ratio;

    backgroundInstance.background.setSize(
      backgroundInstance.background.texture.orig.width / 2,
      backgroundInstance.background.texture.orig.height / 2,
    );
    backgroundInstance.addChild(backgroundInstance.background);

    const mask = new Graphics()
      .rect(0, 0, viewWidth, viewHeight)
      .fill(0xffffff);

    backgroundInstance.addChild(mask);
    backgroundInstance.mask = mask;

    backgroundInstance.position.set(
      app.screen.width / 2 - backgroundInstance.width / 2,
      app.screen.height / 2 - backgroundInstance.height / 2,
    );

    backgroundInstance.background.y = -(
      backgroundInstance.background.height - viewHeight
    );

    app.ticker.add((ticker) => {
      const scrollDistance = BACKGROUND_SCROLL_SPEED * ticker.deltaTime;

      if (backgroundInstance.background.y < 0) {
        backgroundInstance.background.y += scrollDistance;
      }
    });

    return backgroundInstance;
  }
}
