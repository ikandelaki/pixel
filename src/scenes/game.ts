import { createRocket } from "../components/Rocket/Rocket";
import { createBackground } from "../components/Background/Background";
import app from "../main";
import { handleEnemies } from "../handlers/movements/enemy";
import { handleRocketMove } from "../handlers/movements/rocket";
import { handleBullets } from "../handlers/movements/bullet";

export const renderGame = async () => {
  const background = await createBackground();
  const rocket = await createRocket();

  background.addChild(rocket);
  rocket.position.set(
    background.width / 2 - rocket.width / 2,
    background.height - rocket.height,
  );

  handleRocketMove(rocket, background);
  handleEnemies(background);
  handleBullets(rocket, background);

  app.stage.addChild(background);
};
