import { State, Ticker } from "pixi.js";
import app from "../main";
import { Bullet } from "../components/Bullet/Bullet";
import { Enemy } from "../components/Enemy/Enemy";
import { Background } from "../components/Background/Background";
import { hearts } from "../handlers/lives";
import { Rocket } from "../components/Rocket/Rocket";

type StateType = {
  isStarted: boolean;
  enemies: Enemy[];
  bullets: Bullet[];
  enemiesKilled: number;
  maxLives: number;
  lives: number;
};

export const initialState: Readonly<StateType> = {
  isStarted: false,
  enemies: [],
  bullets: [],
  enemiesKilled: 0,
  maxLives: 3,
  lives: 3,
};

export let state: StateType = {
  isStarted: false,
  enemies: [],
  bullets: [],
  enemiesKilled: 0,
  maxLives: 3,
  lives: 3,
};

export const handleGameStart = () => {
  state.isStarted = true;
  app.start();
};

export const handleGameStop = (
  tickerFn?: (ticker: Ticker) => Promise<void> | void,
) => {
  state.isStarted = false;
  app.stop();

  if (tickerFn) {
    app.ticker.remove(tickerFn);
  }
};

export const shouldStopGame = () => {
  return !state.lives;
};

export const restartGameState = (rocket: Rocket, background: Background) => {
  // Remove and destroy all enemies and bullets
  state.enemies.forEach((enemy) => {
    background.removeChild(enemy);
    enemy.destroy();
  });

  state.bullets.forEach((bullet) => {
    background.removeChild(bullet);
    bullet.destroy();
  });

  hearts.forEach((heart) => {
    heart.enable();
  });

  rocket.position.set(
    background.width / 2 - rocket.width / 2,
    background.height - rocket.height,
  );

  state = { ...initialState, enemies: [], bullets: [] };
};
