import { Assets, Container, Graphics, Text } from "pixi.js";

export const BUTTON_PADDING_X = 24;
export const BUTTON_PADDING_Y = 12;
export const BUTTON_COLOR = 0x343a40;
export const BUTTON_HOVER_COLOR = 0x212529;
export const BUTTON_FONTSIZE = 36;

export class Button extends Container {
  private buttonGraphic: Graphics;
  public buttonText: Text;

  constructor(
    text: string,
    onClick: () => void,
    x: number = 0,
    y: number = 0,
    fontSize: number = 0,
  ) {
    super();

    this.buttonGraphic = new Graphics();

    this.buttonText = new Text({
      text,
      style: {
        fill: "#ffffff",
        fontSize: fontSize || 36,
        fontFamily: "Orbitron",
      },
      anchor: 0.5,
    });

    // Calculate button width and height dynamically
    const buttonWidth = this.buttonText.width + BUTTON_PADDING_X;
    const buttonHeight = this.buttonText.height + BUTTON_PADDING_Y;

    this.buttonGraphic.roundRect(0, 0, buttonWidth, buttonHeight, 15);
    this.buttonGraphic.fill(BUTTON_COLOR);

    this.buttonText.x = this.buttonGraphic.width / 2;
    this.buttonText.y = this.buttonGraphic.height / 2;

    this.x = Number(x);
    this.y = Number(y);

    this.addChild(this.buttonGraphic, this.buttonText);

    this.eventMode = "static";
    this.cursor = "pointer";

    this.on("pointerdown", onClick);

    this.on("pointerover", () => {
      this.buttonGraphic.tint = BUTTON_HOVER_COLOR;
    });

    this.on("pointerout", () => {
      this.buttonGraphic.tint = 0xffffff;
    });
  }

  static async create(
    text: string,
    onClick: () => void,
    x: number = 0,
    y: number = 0,
    fontSize: number = 0,
  ): Promise<Button> {
    await Assets.load({
      src: "/assets/fonts/Orbitron.woff2",
      data: {
        family: "Orbitron",
      },
    });

    return new Button(text, onClick, x, y, fontSize);
  }
}
