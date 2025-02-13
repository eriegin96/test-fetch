import { Bodies, Body } from "matter-js";
import {
  PIN_FRICTION,
  PIN_GAP,
  PIN_LABEL,
  PIN_LINES,
  PIN_RESTITUTION,
  PIN_SIZE,
  START_PINS,
  WORLD_WIDTH,
} from "../constants";

export const spawnPins = () => {
  const pinList: Body[] = [];

  // create lines
  for (let l = 0; l < PIN_LINES; l++) {
    const linePinAmount = START_PINS + l;
    const lineWidth = (linePinAmount - 1) * PIN_GAP;

    // create pins for each line
    for (let p = 0; p < linePinAmount; p++) {
      const pin = Bodies.circle(
        WORLD_WIDTH / 2 - lineWidth / 2 + p * PIN_GAP,
        100 + l * PIN_GAP,
        PIN_SIZE,
        {
          isStatic: true,
          restitution: PIN_RESTITUTION,
          friction: PIN_FRICTION,
          label: PIN_LABEL,
        }
      );
      pinList.push(pin);
    }
  }

  return pinList;
};
