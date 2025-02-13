import { Bodies, Body } from "matter-js";
import {
  MARK_HEIGHT,
  MARK_LABEL,
  MARK_START_X,
  MARK_START_Y,
  MARK_WIDTH,
  PIN_GAP,
} from "../constants";
import { TMarkUI } from "../types/game";

export const spawnMarks = (list: TMarkUI[]) => {
  const markList: Body[] = [];

  for (let m = 0; m < list.length; m++) {
    const mark = Bodies.rectangle(
      MARK_START_X + PIN_GAP * m,
      MARK_START_Y,
      MARK_WIDTH,
      MARK_HEIGHT,
      { isStatic: true, label: MARK_LABEL }
    );
    markList.push(mark);
  }

  return markList;
};
