import { Assets, Container, Graphics } from "pixi.js";
import { CustomSprite } from "../CustomSprite/CustomSprite";
import { enemyConfig } from "./Enemy.config";

export class Enemy extends CustomSprite {
  public hp: number = 100;
  #healthBar: Graphics | null = null;
  #healthBarWidth: number = 0;

  constructor(x: number = 0, y: number | null = null) {
    super(undefined, enemyConfig.width, x, 0);

    const enemySpawnPointY = y !== null ? y : -this.height;
    this.position.y = enemySpawnPointY;
  }

  static async create(x: number = 0, y: number | null = null): Promise<Enemy> {
    const enemyTexture = await Assets.load({
      alias: "enemy-1",
      src: "/assets/alien.png",
    });

    const enemy = new Enemy(x, y);
    enemy["sprite"].texture = enemyTexture;

    const originalWidth = enemyTexture.orig.width;
    const originalHeight = enemyTexture.orig.height;
    const aspectRatio = originalHeight / originalWidth;
    enemy["sprite"].width = enemyConfig.width;
    enemy["sprite"].height = aspectRatio * enemyConfig.width;
    const healthBar = enemy.#createHealthbar(enemy.width);
    enemy.addChild(healthBar);

    return enemy;
  }

  takeDamage(damage: number = 1): void {
    this.hp -= damage;
    this.#updateHealthbar();
  }

  isDead(): boolean {
    return this.hp <= 0;
  }

  #createHealthbar(width: number = 0): Container {
    const healthBarContainer = new Container();
    this.#healthBar = new Graphics()
      .rect(0, 0, (width * this.hp) / 100, 5)
      .fill({ color: 0x51cf66 });

    const healthBarBackground = new Graphics()
      .rect(0, 0, width, 5)
      .fill({ color: 0xff6b6b });

    this.#healthBarWidth = width;
    healthBarContainer.addChild(healthBarBackground, this.#healthBar);
    return healthBarContainer;
  }

  #updateHealthbar(): void {
    if (this.#healthBar) {
      this.#healthBar.clear();
      this.#healthBar
        .rect(0, 0, (this.#healthBarWidth * this.hp) / 100, 5)
        .fill({ color: 0x51cf66 });
    }
  }
}
