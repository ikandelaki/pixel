import { Application } from "pixi.js";

const btn = document.getElementById("control-btn");

export const handleGameState = (app: Application) => {
  btn!.addEventListener("click", (event) => {
    event.preventDefault();

    if (document.body.classList.contains("is-started")) {
      handleGameEnd(app);

      return;
    }

    handleGameStart(app);
  });
};

export const handleGameStart = (app: Application) => {
  if (!app) {
    return;
  }

  app.start();
  document.body.classList.add("is-started");
  btn!.innerText = "Stop";
};

export const handleGameEnd = (app: Application) => {
  if (!app) {
    return;
  }

  app.stop();
  document.body.classList.remove("is-started");
  btn!.innerText = "Start";
};
