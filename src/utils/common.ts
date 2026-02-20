import { Container } from "pixi.js";

// Can be used in the futute to calculate if child is out of bounds of the parent
// Currently only checks for top and bottom, need to check left and right as well
export const isInBounds = (child: Container, parent: Container) => {
  console.log(">> child.position", child.position);
  console.log(">> parent.position", parent.position);
  return child.y >= 0 && child.y + child.height <= parent.height;
};
