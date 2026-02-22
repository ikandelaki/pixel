import { Container, Ticker } from "pixi.js";
import app from "../main";

type StateType = {
  isStarted: boolean;
  enemies: Container[];
  bullets: Container[];
  enemiesKilled: number;
};

export const state: StateType = {
  isStarted: false,
  enemies: [],
  bullets: [],
  enemiesKilled: 0,
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
  return state.enemiesKilled >= 5;
};
