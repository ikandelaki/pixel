import app from "../main";

export const handleGameStart = () => {
  app.start();
};

export const handleGamePause = () => {
  app.stop();
};
