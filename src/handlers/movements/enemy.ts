import { Container, Ticker } from "pixi.js";
import app from "../../main";
import { enemyConfig } from "../../components/Enemy/Enemy.config";

import { state } from "../../state";
import { createEnemy } from "../../components/Enemy/Enemy";

export const destroyEnemy = (
  enemy: Container,
  index: number,
  background: Container,
) => {
  background.removeChild(enemy);
  enemy.destroy();
  state.enemies.splice(index, 1);
};

export const handleEnemies = (background: Container) => {
  let elapsed = 0;

  const createNewEnemy = async () => {
    const enemySpawnPointX = Math.max(
      Math.ceil(Math.random() * background.width) - enemyConfig.width,
      enemyConfig.width,
    );
    const enemy = await createEnemy(enemySpawnPointX);
    background.addChild(enemy);

    state.enemies.push(enemy);
  };

  const setupEnemies = (ticker: Ticker) => {
    elapsed += ticker.elapsedMS;

    for (let i = state.enemies.length - 1; i >= 0; i--) {
      const enemy = state.enemies[i];
      enemy.position.y += enemyConfig.speed;

      if (enemy && enemy.position.y > background.height) {
        destroyEnemy(enemy, i, background);
      }
    }

    if (elapsed >= enemyConfig.spawnSpeed) {
      createNewEnemy();
      elapsed = 0;
    }
  };

  app.ticker.add(setupEnemies);
};
