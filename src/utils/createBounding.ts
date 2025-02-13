import { Bodies } from "matter-js";
import {
  BOUNDING_HEIGHT,
  BOUNDING_WIDTH,
  PIN_GAP,
  PIN_SIZE,
  WORLD_WIDTH,
} from "../constants";

export const createBounding = () => {
  const boundingLeft = Bodies.rectangle(
    WORLD_WIDTH / 2 - 3 * PIN_GAP - 2.5 * PIN_SIZE,
    PIN_GAP + BOUNDING_HEIGHT / 2,
    BOUNDING_WIDTH,
    BOUNDING_HEIGHT,
    {
      angle: (-5 * Math.PI) / 6 - 0.06,
      isStatic: true,
    }
  );
  const boundingRight = Bodies.rectangle(
    WORLD_WIDTH / 2 + 3 * PIN_GAP + 2.5 * PIN_SIZE,
    PIN_GAP + BOUNDING_HEIGHT / 2,
    BOUNDING_WIDTH,
    BOUNDING_HEIGHT,
    {
      angle: -Math.PI / 6 + 0.06,
      isStatic: true,
    }
  );
  const boundingTopLeft = Bodies.rectangle(
    WORLD_WIDTH / 2 - PIN_GAP - 2 * PIN_SIZE,
    0,
    BOUNDING_WIDTH,
    180,
    {
      isStatic: true,
    }
  );
  const boundingTopRight = Bodies.rectangle(
    WORLD_WIDTH / 2 + PIN_GAP + 2 * PIN_SIZE,
    0,
    BOUNDING_WIDTH,
    180,
    {
      isStatic: true,
    }
  );

  return [boundingLeft, boundingRight, boundingTopLeft, boundingTopRight];
};
