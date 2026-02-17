import { Assets, Container, Graphics, Text } from "pixi.js";

export const BUTTON_PADDING_X = 24;
export const BUTTON_PADDING_Y = 12;
export const BUTTON_COLOR = 0xfa5252;
export const BUTTON_HOVER_COLOR = 0xc92a2a;

export const createButton = async (
  text: string,
  x: number | string,
  y: number | string,
  onClick: () => void,
): Promise<Container> => {
  await Assets.load({
    src: "/assets/fonts/Orbitron.woff2",
    data: {
      family: "Orbitron",
    },
  });

  const buttonGraphic = new Graphics();

  const buttonText = new Text({
    text,
    style: {
      fill: "#ffffff",
      fontSize: 36,
      fontFamily: "Orbitron",
    },
    anchor: 0.5,
  });

  // Calculate button width and height dynamically
  const buttonWidth = buttonText.width + BUTTON_PADDING_X;
  const buttonHeight = buttonText.height + BUTTON_PADDING_Y;

  buttonGraphic.roundRect(0, 0, buttonWidth, buttonHeight, 15);
  buttonGraphic.fill(BUTTON_COLOR);

  buttonText.x = buttonGraphic.width / 2;
  buttonText.y = buttonGraphic.height / 2;

  const buttonContainer = new Container();
  buttonContainer.x = Number(x);
  buttonContainer.y = Number(y);

  buttonContainer.addChild(buttonGraphic, buttonText);

  buttonContainer.eventMode = "static";
  buttonContainer.cursor = "pointer";

  buttonContainer.on("pointerdown", onClick);

  buttonContainer.on("pointerover", () => {
    buttonGraphic.tint = BUTTON_HOVER_COLOR;
  });

  buttonContainer.on("pointerout", () => {
    buttonGraphic.tint = BUTTON_COLOR;
  });

  return buttonContainer;
};
