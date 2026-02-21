import { Application, Assets, Sprite } from "pixi.js";
import { initDevtools } from "@pixi/devtools";
import { renderMenu } from "./scenes/menu";
import { renderGame } from "./scenes/game";
import { setupKeyboardListeners } from "./handlers/keyboard";

const renderOnBackground = async (app: Application) => {
  const bgManifest = {
    bundles: [
      {
        name: "background",
        assets: [
          {
            alias: "flowerTop",
            src: "https://pixijs.com/assets/flowerTop.png",
          },
        ],
      },
      {
        name: "game-screen",
        assets: [
          { alias: "eggHead", src: "https://pixijs.com/assets/eggHead.png" },
        ],
      },
    ],
  };

  await Assets.init({ manifest: bgManifest });
  Assets.backgroundLoadBundle(["game-screen", "background"]);

  const { flowerTop } = (await Assets.loadBundle("background")) || {};

  const background = new Sprite(flowerTop);

  app.stage.addChild(background);
};

// Create a new application
export const app = new Application();

initDevtools({ app });

export default app;

(async () => {
  // Initialize the application
  await app.init({ background: "#212529", resizeTo: window });

  document.getElementById("pixi-container")!.appendChild(app.canvas);

  setupKeyboardListeners();
  await renderMenu();
  await renderGame();
  renderOnBackground(app);
})();
