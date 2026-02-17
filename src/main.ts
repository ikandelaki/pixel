import { Application, Assets, Sprite, Container, RenderLayer } from "pixi.js";
import { initDevtools } from "@pixi/devtools";
import { handleGameState } from "./state";
import { renderMenu } from "./scenes/menu";
import { renderGame } from "./scenes/game";

const renderBunnyGame = async (app: Application) => {
  // CSS style for icons
  const defaultIcon = "url('https://pixijs.com/assets/bunny.png'),auto";
  const hoverIcon = "url('https://pixijs.com/assets/bunny_saturated.png'),auto";

  // Add custom cursor styles
  app.renderer.events.cursorStyles.default = defaultIcon;
  app.renderer.events.cursorStyles.hoverTest = hoverIcon;
  // Append the application canvas to the document body

  const bunnyContainer = new Container();
  app.stage.addChild(bunnyContainer);

  const texture = await Assets.load("/assets/bunny.png");

  const bunnies: Sprite[] = [];
  for (let i = 0; i < 25; i++) {
    // Load the bunny texture
    const bunny = new Sprite(texture);

    bunny.x = (i % 5) * 40;
    bunny.y = Math.floor(i / 5) * 40;
    bunny.tint = "white";
    bunny.cullable = true;
    bunny.eventMode = "static";
    bunny.cursor = "hoverTest";
    bunny.on("pointerdown", () => {
      bunny.tint = "black";
    });
    bunnies.push(bunny);

    bunnyContainer.addChild(bunny);
  }

  bunnyContainer.position.set(
    app.screen.width / 2 - bunnyContainer.width / 2,
    app.screen.height / 2 - bunnyContainer.height / 2,
  );

  bunnyContainer.pivot.set(bunnyContainer.width / 2, bunnyContainer.height / 2);

  // Listen for animate update
  app.ticker.add((time) => {
    // Just for fun, let's rotate mr rabbit a little.
    // * Delta is 1 if running at 100% performance *
    // * Creates frame-independent transformation *
    bunnies.forEach((bunny, key) => {
      bunny.rotation += (0.01 + parseFloat(`0.0${key}`)) * time.deltaTime;
    });
    bunnyContainer.rotation += 0.01 * time.deltaTime;
  });
};

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
  await app.init({ background: "#1099bb", resizeTo: window });

  document.getElementById("pixi-container")!.appendChild(app.canvas);

  // renderBunnyGame(app);
  await renderMenu();
  await renderGame();
  renderOnBackground(app);
})();
