import { createRocket } from "../components/Rocket/Rocket";
import { createBackground } from "../components/Background/Background";
import app from "../main";
import { createEnemy } from "../components/Enemy/Enemy";
import { enemyConfig } from "../components/Enemy/Enemy.config";
import {
  handleEnemyMove,
  handleRocketMove,
  handleBullets,
} from "../handlers/movement";
import { state } from "../state";

export const renderGame = async () => {
  const background = await createBackground();
  const rocket = await createRocket();

  const enemySpawnPointX = Math.max(
    Math.ceil(Math.random() * background.width) - enemyConfig.width,
    enemyConfig.width,
  );
  const enemy = await createEnemy(enemySpawnPointX);

  state.enemies.push(enemy);

  background.addChild(rocket);
  background.addChild(enemy);
  rocket.position.set(
    background.width / 2 - rocket.width / 2,
    background.height - rocket.height,
  );

  handleRocketMove(rocket, background);
  handleEnemyMove(enemy, background);
  handleBullets(rocket, background);

  app.stage.addChild(background);
};
