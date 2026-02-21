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

export const handleRocketBulletMove = (
  rocket: Container,
  background: Container,
) => {
  const bullets: Container[] = [];
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

  const createBulletAndShoot = async (ticker: Ticker) => {
    elapsed += ticker.deltaMS;

    for (let i = bullets.length - 1; i >= 0; i--) {
      const bullet = bullets[i];
      bullet.y -= bulletConfig.speed;

      //   if (bullet.y > background.y) {
      //     background.removeChild(bullet);
      //     bullet.destroy();
      //     bullets.splice(i, 1);
      //   }
    }

    console.log(">> ticker", ticker);
    if (elapsed >= bulletConfig.spawnSpeed) {
      console.log(">> creating a bullet, elasped:", elapsed);
      createNewBullet(rocket, background, bullets);
      elapsed = 0;
    }
  };

  app.ticker.add(createBulletAndShoot);
};
