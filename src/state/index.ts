import { Container } from "pixi.js";
import app from "../main";

type StateType = {
  isStarted: boolean;
  enemies: Container[];
  bullets: Container[];
};

export const state: StateType = {
  isStarted: false,
  enemies: [],
  bullets: [],
};

export const handleGameStart = () => {
  state.isStarted = true;
  app.start();
};

export const handleGamePause = () => {
  state.isStarted = false;
  app.stop();
};
