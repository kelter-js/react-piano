import { OctaveIndex, PitchIndex } from "./note";

export type Key = string;
export type Keys = Key[];

export const TOP_ROW: Keys = "q2w3er5t6y7u".split("");
export const BOTTOM_ROW: Keys = "zsxdcvgbhnjm".split("");
export const CHANGE_ROW_AT: OctaveIndex = 5;

export const selectKey = (octave: OctaveIndex, index: PitchIndex): Key => {
  const keysRow = octave < CHANGE_ROW_AT ? TOP_ROW : BOTTOM_ROW;
  return keysRow[index];
};
