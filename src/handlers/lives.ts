import { Background } from "../components/Background/Background";
import Heart from "../components/Heart";
import { HEART_WIDTH } from "../components/Heart/Heart";
import { state } from "../state";

export const hearts: Heart[] = [];

export const initializeLives = async (background: Background) => {
  const lostLives = state.maxLives - state.lives;
  for (let i = 0; i < lostLives; i++) {
    const heart = await Heart.create();
    heart.disable();
    heart.position.x += i * HEART_WIDTH;
    hearts.push(heart);
  }

  for (let i = 0; i < state.lives; i++) {
    const heart = await Heart.create();
    heart.position.x += i * HEART_WIDTH;

    hearts.push(heart);
  }

  background.addChild(...hearts);
};

export const decreaseLife = () => {
  const lostLives = state.maxLives - state.lives;

  for (let i = 0; i < lostLives; i++) {
    hearts[i].disable();
  }
};
