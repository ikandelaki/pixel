import { Assets, Container, Graphics, Text } from "pixi.js";

export const createButton = async (
  text: string,
  x: number | string,
  y: number | string,
  onClick: () => void,
): Promise<Container> => {
  const buttonWidth = 120;
  const buttonHeight = 50;
  const buttonColor = 0x00ff00;
  const buttonHoverColor = 0x32cd32;

  await Assets.load({
    src: "/assets/fonts/Orbitron.woff2",
    data: {
      family: "Orbitron",
    },
  });

  const buttonGraphic = new Graphics();
  buttonGraphic.roundRect(0, 0, buttonWidth, buttonHeight, 15);
  buttonGraphic.fill(buttonColor);

  const buttonText = new Text({
    text,
    style: {
      fill: "#ffffff",
      fontSize: 36,
      fontFamily: "Orbitron",
    },
    anchor: 0.5,
  });

  buttonText.x = buttonGraphic.width / 2;
  buttonText.y = buttonGraphic.height / 2;

  const buttonContainer = new Container();
  buttonContainer.x = Number(x);
  buttonContainer.y = Number(y);

  buttonContainer.addChild(buttonGraphic, buttonText);

  // 4. Add Interactivity
  buttonContainer.eventMode = "static"; // Required for interaction
  buttonContainer.cursor = "pointer"; // Shows a pointer cursor on hover

  buttonContainer.on("pointerdown", onClick);

  // Optional: Add hover effects for better user experience
  buttonContainer.on("pointerover", () => {
    buttonGraphic.tint = buttonHoverColor; // slightly darken or change color on hover
  });

  buttonContainer.on("pointerout", () => {
    buttonGraphic.tint = buttonColor; // restore original color
  });

  return buttonContainer;
};
