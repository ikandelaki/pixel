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

/**
 * Resume rendering and start the game
 */
export const handleGameStart = () => {
  state.isStarted = true;
  app.start();
};

/**
 * Stop the game (currently only pauses it in the current state, so it is more like pause)
 *
 * @param tickerFn
 */
export const handleGameStop = (
  tickerFn?: (ticker: Ticker) => Promise<void> | void,
) => {
  state.isStarted = false;
  app.stop();

  if (tickerFn) {
    app.ticker.remove(tickerFn);
  }
};

/**
 * Get true or false value to determine if the game should be stopped
 * - Can be added new conditions in the future
 *
 * @returns
 */
export const shouldStopGame = () => {
  return !state.lives;
};

/**
 * Method to be used to reset the game to its initial state.
 *
 * @param rocket
 * @param background
 */
export const restartGameState = (rocket: Rocket, background: Background) => {
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
