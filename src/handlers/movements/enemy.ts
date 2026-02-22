import { Container } from "pixi.js";
import app from "../../main";
import { enemyConfig } from "../../components/Enemy/Enemy.config";

import { state } from "../../state";

export const handleEnemyMove = (enemy: Container, background: Container) => {
  const moveEnemy = () => {
    if (!enemy || !state.enemies.includes(enemy)) {
      app.ticker.remove(moveEnemy);
      return;
    }

    enemy.position.y += enemyConfig.speed;

    if (enemy && enemy.position.y > background.height) {
      enemy.destroy({
        children: true,
      });
      app.ticker.remove(moveEnemy);
    }
  };

  app.ticker.add(moveEnemy);
};
