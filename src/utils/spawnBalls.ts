import { Bodies, Body } from "matter-js";
import {
  BALL_AMOUNT,
  BALL_FRICTION,
  BALL_LABEL,
  BALL_RESTITUTION,
  BALL_SIZE,
  PIN_GAP,
  WORLD_WIDTH,
} from "../constants";
import { randomMinMax } from "./randomMinMax";

export const spawnBalls = () => {
  const ballList: Body[] = [];

  for (let i = 0; i < BALL_AMOUNT; i++) {
    const xPosition = WORLD_WIDTH / 2 + randomMinMax(-PIN_GAP - 5, PIN_GAP + 5);
    const ball = Bodies.circle(xPosition, 0, BALL_SIZE, {
      restitution: BALL_RESTITUTION,
      friction: BALL_FRICTION,
      label: BALL_LABEL,
    });

    ballList.push(ball);
  }

  return ballList;
};

export const spawnBall = () => {
  const xPosition = WORLD_WIDTH / 2 + randomMinMax(-PIN_GAP - 5, PIN_GAP + 5);
  return Bodies.circle(xPosition, 0, BALL_SIZE, {
    restitution: BALL_RESTITUTION,
    friction: BALL_FRICTION,
    label: BALL_LABEL,
  });
};
