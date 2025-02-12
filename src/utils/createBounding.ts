import { Bodies } from "matter-js";
import {
  BOUNDING_HEIGHT,
  BOUNDING_WIDTH,
  PIN_GAP,
  WORLD_WIDTH,
} from "../constants";

export const createBounding = () => {
  const boundingLeft = Bodies.rectangle(
    WORLD_WIDTH / 2 - 3.7 * PIN_GAP,
    PIN_GAP + BOUNDING_HEIGHT / 2,
    BOUNDING_WIDTH,
    BOUNDING_HEIGHT,
    {
      angle: (-5 * Math.PI) / 6 - 0.06,
      isStatic: true,
    }
  );
  const boundingRight = Bodies.rectangle(
    WORLD_WIDTH / 2 + 2.7 * PIN_GAP,
    PIN_GAP + BOUNDING_HEIGHT / 2,
    BOUNDING_WIDTH,
    BOUNDING_HEIGHT,
    {
      angle: -Math.PI / 6 + 0.06,
      isStatic: true,
    }
  );

  return [boundingLeft, boundingRight];
};
