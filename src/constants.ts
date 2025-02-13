import { TMarkUI } from "./types/game";

export const WORLD_HEIGHT = 600;
export const WORLD_WIDTH = 800;

// Pins
export const START_PINS = 3;
export const PIN_LINES = 8;
export const PIN_SIZE = 8;
export const PIN_RESTITUTION = 0.6;
export const PIN_FRICTION = 0.06;
export const PIN_GAP = 52;
export const PIN_LABEL = "pin";

// Balls
export const BALL_AMOUNT = 50;
export const BALL_SIZE = 12;
export const BALL_RESTITUTION = 0.7;
export const BALL_FRICTION = 0.04;
export const BALL_LABEL = "ball";

// Marks
export const MARK_GAP_TO_PIN = 30;
export const MARK_START_X = WORLD_WIDTH / 2 - (PIN_LINES * PIN_GAP) / 2;
export const MARK_START_Y =
  PIN_LINES * PIN_GAP + PIN_LINES * PIN_SIZE + MARK_GAP_TO_PIN;
export const MARK_GAP = 10;
export const MARK_WIDTH = PIN_GAP - MARK_GAP / 2;
export const MARK_HEIGHT = 30;
export const MARK_LABEL = "mark";

export const MARK_VALUES: Record<string, TMarkUI> = {
  "29": { value: 29, content: "29x", color: "#e60000" },
  "4": { value: 4, content: "4x", color: "#ff471a" },
  "1.5": { value: 1.5, content: "1.5x", color: "#ff751a" },
  "0.3": { value: 0.3, content: "0.3x", color: "#ffa64d" },
  "0.2": { value: 0.2, content: "0.2x", color: "#ffff33" },
};
export const MARK_LIST = [
  MARK_VALUES["29"],
  MARK_VALUES["4"],
  MARK_VALUES["1.5"],
  MARK_VALUES["0.3"],
  MARK_VALUES["0.2"],
  MARK_VALUES["0.3"],
  MARK_VALUES["1.5"],
  MARK_VALUES["4"],
  MARK_VALUES["29"],
];

// Boundings
export const BOUNDING_WIDTH = 10;
export const BOUNDING_HEIGHT = 500;

// CSS
export const MULTIPLIER = 1.5;
