import { Assets, Container, Graphics, Text } from "pixi.js";

export const createButton = async (
  text: string,
  x: number | string,
  y: number | string,
  onClick: () => void,
): Promise<Container> => {
  const buttonPaddingX = 24;
  const buttonPaddingY = 12;
  const buttonColor = 0x00ff00;
  const buttonHoverColor = 0x32cd32;

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
  const buttonWidth = buttonText.width + buttonPaddingX;
  const buttonHeight = buttonText.height + buttonPaddingY;

  buttonGraphic.roundRect(0, 0, buttonWidth, buttonHeight, 15);
  buttonGraphic.fill(buttonColor);

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
    buttonGraphic.tint = buttonHoverColor;
  });

  buttonContainer.on("pointerout", () => {
    buttonGraphic.tint = buttonColor;
  });

  return buttonContainer;
};
