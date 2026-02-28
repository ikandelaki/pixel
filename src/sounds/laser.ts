import { sound } from "@pixi/sound";

export function playLaserSound() {
  sound.play("laser");
}

export function playExplosionSound() {
  sound.play("explosion");
}

export function startSpaceAmbience() {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  const oscillator1 = audioCtx.createOscillator();
  const oscillator2 = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator1.type = "sine";
  oscillator2.type = "triangle";

  oscillator1.frequency.value = 40;
  oscillator2.frequency.value = 55;

  gainNode.gain.value = 0.05;

  oscillator1.connect(gainNode);
  oscillator2.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator1.start();
  oscillator2.start();

  return {
    stop: () => {
      oscillator1.stop();
      oscillator2.stop();
    },
  };
}
