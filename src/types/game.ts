import { Body } from "matter-js";

export type TPin = {
  id: number;
  size: number;
  body: Body;
  isHit: boolean;
};

export type TBall = {
  id: number;
  size: number;
  body: Body;
};

export type TMarkUI = {
  value: number;
  content: string;
  color: string;
};

export type TMark = {
  id: number;
  width: number;
  height: number;
  body: Body;
  isHit: boolean;
} & TMarkUI;

export type TScore = {
  id: number;
  body: Body;
  content: string;
  color: string;
  value: number;
  isScored: boolean;
};
