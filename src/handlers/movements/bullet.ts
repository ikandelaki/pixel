import { bulletConfig } from "../../components/Bullet/Bullet.config";
import { Bullet } from "../../components/Bullet/Bullet";
import { Ticker } from "pixi.js";
import { handleGameStop, shouldStopGame, state } from "../../state";
import app from "../../main";
import { destroyEnemy } from "./enemy";
import { Enemy } from "../../components/Enemy/Enemy";
import { Rocket } from "../../components/Rocket/Rocket";
import { Background } from "../../components/Background/Background";
import { rocketConfig } from "../../components/Rocket/Rocket.config";

export const handleBullets = (rocket: Rocket, background: Background) => {
  let elapsed = 0;

  // Separate the bullet creation to keep the ticker clean
  const createNewBullet = async (
    rocket: Rocket,
    background: Background,
    bullets: Bullet[],
  ) => {
    const x = rocket.x + rocket.width / 2 - bulletConfig.width / 2 + 2;

    const bullet = await Bullet.create(x);
    bullet.y = rocket.y - bullet.height / 2;

    background.addChild(bullet);
    bullets.push(bullet);
  };

  const isColliding = (bullet: Bullet, enemy: Enemy): boolean => {
    return (
      bullet.y <= enemy.y &&
      bullet.x >= enemy.x &&
      bullet.x <= enemy.x + enemy.width
    );
  };

  const destroyBullet = (bullet: Bullet, index: number) => {
    background.removeChild(bullet);
    bullet.destroy();
    state.bullets.splice(index, 1);
  };

  const damageEnemy = (enemy: Enemy, j: number, bullet: Bullet) => {
    enemy.takeDamage(bullet.damage);

    if (enemy.isDead()) {
      destroyEnemy(enemy, j, background);
      state.enemiesKilled += 1;
      rocketConfig.speed += 0.1;
    }
  };

  const setupBullets = async (ticker: Ticker) => {
    if (!state.isStarted) {
      return;
    }

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
          damageEnemy(enemy, j, bullet);
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
