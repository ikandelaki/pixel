import { rocketConfig } from "../components/Rocket/Rocket.config";
import { Container, Ticker } from "pixi.js";
import {
  KEY_UP,
  KEY_DOWN,
  KEY_LEFT,
  KEY_RIGHT,
  keyState,
} from "../handlers/keyboard";
import app from "../main";
import { enemyConfig } from "../components/Enemy/Enemy.config";
import { bulletConfig } from "../components/Bullet/Bullet.config";
import { createBullet } from "../components/Bullet/Bullet";
import { state } from "../state";

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

export const handleBullets = (rocket: Container, background: Container) => {
  let elapsed = 0;

  // Separate the bullet creation to keep the ticker clean
  const createNewBullet = async (
    rocket: Container,
    background: Container,
    bullets: Container[],
  ) => {
    const x = rocket.x + rocket.width / 2 - bulletConfig.width / 2 + 2;

    const bullet = await createBullet(x);
    bullet.y = rocket.y - bullet.height / 2;

    background.addChild(bullet);
    bullets.push(bullet);
  };

  const isColliding = (bullet: Container, enemy: Container): boolean => {
    return (
      bullet.y <= enemy.y &&
      bullet.x >= enemy.x &&
      bullet.x <= enemy.x + enemy.width
    );
  };

  const destroyBullet = (bullet: Container, index: number) => {
    background.removeChild(bullet);
    bullet.destroy();
    state.bullets.splice(index, 1);
  };

  const destroyEnemy = (enemy: Container, index: number) => {
    background.removeChild(enemy);
    enemy.destroy();
    state.enemies.splice(index, 1);
  };

  const setupBullets = async (ticker: Ticker) => {
    elapsed += ticker.deltaMS;

    for (let i = state.bullets.length - 1; i >= 0; i--) {
      const bullet = state.bullets[i];
      bullet.y -= bulletConfig.speed;

      if (bullet.y + bullet.height < 0) {
        destroyBullet(bullet, i);
        break;
      }

      for (let j = state.enemies.length - 1; j >= 0; j--) {
        const enemy = state.enemies[j];

        if (isColliding(bullet, enemy)) {
          destroyEnemy(enemy, j);
          destroyBullet(bullet, i);
          break;
        }
      }
    }

    if (elapsed >= bulletConfig.spawnSpeed) {
      createNewBullet(rocket, background, state.bullets);
      elapsed = 0;
    }
  };

  app.ticker.add(setupBullets);
};
