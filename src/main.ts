import { Application, Assets, Sprite, Container } from "pixi.js";
import { initDevtools } from "@pixi/devtools";

(async () => {
  // Create a new application
  const app = new Application();
  initDevtools({ app });

  // Initialize the application
  await app.init({ background: "#1099bb", resizeTo: window });

  // Append the application canvas to the document body
  document.getElementById("pixi-container")!.appendChild(app.canvas);

  const bunnyContainer = new Container();
  app.stage.addChild(bunnyContainer);

  // Load the bunny texture
  const texture = await Assets.load("/assets/bunny.png");

  for (let i = 0; i < 25; i++) {
    const bunny = new Sprite(texture);

    bunny.x = (i % 5) * 40;
    bunny.y = Math.floor(i / 5) * 40;
    bunny.tint = "white";
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
    bunnyContainer.rotation += 0.01 * time.deltaTime;
  });
})();
