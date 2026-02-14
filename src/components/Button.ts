import { Assets, Container, Sprite, Text } from "pixi.js";

export const createButton = async (text: string): Promise<Container> => {
  await Assets.load({
    src: "/assets/fonts/Orbitron.woff2",
    data: {
      family: "Orbitron",
    },
  });
  const buttonTexture = await Assets.load({
    alias: "button",
    src: "/assets/button.svg",
  });

  const buttonContainer = new Container();

  const button = new Sprite(buttonTexture);
  button.setSize(150, 100);
  const buttonText = new Text({
    text,
    style: {
      fill: "#ffffff",
      fontSize: 36,
      fontFamily: "Orbitron",
    },
    // anchor: 0.5,
  });

  buttonContainer.addChild(button, buttonText);

  return buttonContainer;
};
