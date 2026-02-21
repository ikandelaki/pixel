import { rocketConfig } from "../components/Rocket/Rocket.config";
import { Container } from "pixi.js";
import {
  KEY_UP,
  KEY_DOWN,
  KEY_LEFT,
  KEY_RIGHT,
  keyState,
} from "../handlers/keyboard";
import app from "../main";
import { enemyConfig } from "../components/Enemy/Enemy.config";

export const handleRocketMove = (rocket: Container, background: Container) => {
  app.ticker.add(() => {
    if (keyState.has(KEY_UP)) {
      const nextYUp = rocket.y - rocketConfig.speed;
      if (nextYUp >= 0) {
        rocket.position.y -= rocketConfig.speed;
      }
    }

    if (keyState.has(KEY_DOWN)) {
      const nextYDown = rocket.y + rocketConfig.speed;
      if (nextYDown + rocket.height <= background.height) {
        rocket.position.y += rocketConfig.speed;
      }
    }

    if (keyState.has(KEY_LEFT)) {
      const nextXLeft = rocket.position.x + rocketConfig.speed;

      if (nextXLeft >= 0) {
        rocket.position.x -= rocketConfig.speed;
      }
    }

    if (keyState.has(KEY_RIGHT)) {
      const nextXRight = rocket.position.x + rocketConfig.speed;

      if (nextXRight + rocket.width <= background.width) {
        rocket.position.x += rocketConfig.speed;
      }
    }
  });
};

export const handleEnemyMove = (enemy: Container, background: Container) => {
  const moveEnemy = () => {
    enemy.position.y += enemyConfig.speed;

    if (enemy.position.y > background.height) {
      enemy.destroy({
        children: true,
      });
      app.ticker.remove(moveEnemy);
      console.log(">> ticker stopped");
    }
  };

  app.ticker.add(moveEnemy);
};
