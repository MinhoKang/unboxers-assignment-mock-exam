import { describe, expect, it } from "vitest";

import { OMR_STYLES } from "../constants/omrStyles";
import {
  getChoicesColumns,
  getColumnCount,
  getExamCardBubbleTrackStyle,
  getObjectiveBubbleTrackStyle,
  getObjectiveSectionWidth,
  getReaderBarKeys,
  isValidChar,
} from "./omrs";

describe("OMR helpers", () => {
  it("calculates column counts and section width", () => {
    expect(getColumnCount(1)).toBe(1);
    expect(getColumnCount(10)).toBe(1);
    expect(getColumnCount(11)).toBe(2);
    expect(getObjectiveSectionWidth(3)).toBe(OMR_STYLES.OBJECTIVE_COLUMN_WIDTH * 3);
  });

  it("splits question numbers into 10-question columns", () => {
    expect(getChoicesColumns(3, 25)).toEqual([
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      [21, 22, 23, 24, 25],
    ]);
  });

  it("builds reader bar keys from the choice count", () => {
    expect(getReaderBarKeys(5)).toEqual([0, 1, 2, 3, 4]);
  });

  it("accepts only supported subjective answer characters", () => {
    expect(isValidChar("7")).toBe(true);
    expect(isValidChar(".")).toBe(true);
    expect(isValidChar("/")).toBe(true);
    expect(isValidChar("-")).toBe(true);
    expect(isValidChar("a")).toBe(false);
    expect(isValidChar("12")).toBe(false);
  });

  it("builds the bubble track style consistently", () => {
    const expected = {
      gridTemplateColumns: `repeat(5, ${OMR_STYLES.BUBBLE_WIDTH}px)`,
      columnGap: `${OMR_STYLES.OBJECTIVE_BUBBLE_GAP}px`,
    };

    expect(getObjectiveBubbleTrackStyle(5)).toEqual(expected);
    expect(getExamCardBubbleTrackStyle(5)).toEqual(expected);
  });
});
