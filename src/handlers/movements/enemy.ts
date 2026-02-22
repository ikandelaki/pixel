import { Background } from "./../../components/Background/Background";
import { Ticker } from "pixi.js";
import app from "../../main";
import { enemyConfig } from "../../components/Enemy/Enemy.config";
import { Enemy } from "../../components/Enemy/Enemy";
import { handleGameStop, shouldStopGame, state } from "../../state";
import { decreaseLife } from "../lives";

export const destroyEnemy = (
  enemy: Enemy,
  index: number,
  background: Background,
) => {
  background.removeChild(enemy);
  enemy.destroy();
  state.enemies.splice(index, 1);
};

export const handleEnemies = (background: Background) => {
  let elapsed = 0;

  const createNewEnemy = async () => {
    const enemySpawnPointX = Math.max(
      Math.ceil(Math.random() * background.width) - enemyConfig.width,
      enemyConfig.width,
    );
    const enemy = await Enemy.create(enemySpawnPointX);
    background.addChild(enemy);

    state.enemies.push(enemy);
  };

  const handleEnemyGoingOutOfBounds = (
    enemy: Enemy,
    i: number,
    background: Background,
  ) => {
    destroyEnemy(enemy, i, background);
    state.lives -= 1;
    decreaseLife();
  };

  const setupEnemies = (ticker: Ticker) => {
    if (shouldStopGame()) {
      handleGameStop(setupEnemies);
      return;
    }

    elapsed += ticker.elapsedMS;

    for (let i = state.enemies.length - 1; i >= 0; i--) {
      const enemy = state.enemies[i];
      enemy.position.y += enemyConfig.speed;

      if (enemy && enemy.position.y > background.height) {
        handleEnemyGoingOutOfBounds(enemy, i, background);
      }
    }

    if (elapsed >= enemyConfig.spawnSpeed) {
      createNewEnemy();
      elapsed = 0;
    }
  };

  app.ticker.add(setupEnemies);
};
