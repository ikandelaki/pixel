import { Ticker } from "pixi.js";
import app from "../main";
import { Bullet } from "../components/Bullet/Bullet";
import { Enemy } from "../components/Enemy/Enemy";

type StateType = {
  isStarted: boolean;
  enemies: Enemy[];
  bullets: Bullet[];
  enemiesKilled: number;
  lives: number;
};

export const state: StateType = {
  isStarted: false,
  enemies: [],
  bullets: [],
  enemiesKilled: 0,
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
  return state.enemiesKilled >= 5 || !state.lives;
};
