import { bulletConfig } from "../../components/Bullet/Bullet.config";
import { createBullet } from "../../components/Bullet/Bullet";
import { Container, Ticker } from "pixi.js";
import { handleGameStop, shouldStopGame, state } from "../../state";
import app from "../../main";
import { destroyEnemy } from "./enemy";

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

  const setupBullets = async (ticker: Ticker) => {
    if (shouldStopGame()) {
      handleGameStop(setupBullets);
      return;
    }

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
          destroyEnemy(enemy, j, background);
          destroyBullet(bullet, i);
          state.enemiesKilled += 1;
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
