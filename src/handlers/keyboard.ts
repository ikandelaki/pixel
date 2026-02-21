export const KEY_UP = "UP";
export const KEY_DOWN = "DOWN";
export const KEY_LEFT = "LEFT";
export const KEY_RIGHT = "RIGHT";

export const keyState = new Set();

export const setupKeyboardListeners = () => {
  document.addEventListener("keydown", (key) => {
    if (key.code === "KeyW" || key.code === "ArrowUp") {
      keyState.add(KEY_UP);
    }

    if (key.code === "KeyA" || key.code === "ArrowLeft") {
      keyState.add(KEY_LEFT);
    }

    if (key.code === "KeyS" || key.code === "ArrowDown") {
      keyState.add(KEY_DOWN);
    }

    if (key.code === "KeyD" || key.code === "ArrowRight") {
      keyState.add(KEY_RIGHT);
    }
  });

  document.addEventListener("keyup", (key) => {
    if (key.code === "KeyW" || key.code === "ArrowUp") {
      keyState.delete(KEY_UP);
    }

    if (key.code === "KeyA" || key.code === "ArrowLeft") {
      keyState.delete(KEY_LEFT);
    }

    if (key.code === "KeyS" || key.code === "ArrowDown") {
      keyState.delete(KEY_DOWN);
    }

    if (key.code === "KeyD" || key.code === "ArrowRight") {
      keyState.delete(KEY_RIGHT);
    }
  });
};
