import { Rocket } from "../components/Rocket/Rocket";
import { Background } from "../components/Background/Background";
import app from "../main";
import { handleEnemies } from "../handlers/movements/enemy";
import { handleRocketMove } from "../handlers/movements/rocket";
import { handleBullets } from "../handlers/movements/bullet";
import { initializeLives } from "../handlers/lives";

export const renderGame = async () => {
  const background = await Background.create();
  const rocket = await Rocket.create();

  background.addChild(rocket);
  rocket.position.set(
    background.width / 2 - rocket.width / 2,
    background.height - rocket.height,
  );

  initializeLives(background);
  handleRocketMove(rocket, background);
  handleEnemies(background);
  handleBullets(rocket, background);

  app.stage.addChild(background);
};
