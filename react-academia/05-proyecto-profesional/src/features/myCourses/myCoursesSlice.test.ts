import { describe, expect, it } from "vitest";
import myCoursesReducer, { add, remove } from "./myCoursesSlice";

describe("myCoursesSlice", () => {
  it("añade un curso", () => {
    const state = myCoursesReducer({ ids: [] }, add("3"));

    expect(state.ids).toEqual(["3"]);
  });

  it("no repite un curso que ya está", () => {
    const state = myCoursesReducer({ ids: ["3"] }, add("3"));

    expect(state.ids).toEqual(["3"]);
  });

  it("quita un curso", () => {
    const state = myCoursesReducer({ ids: ["1", "3"] }, remove("1"));

    expect(state.ids).toEqual(["3"]);
  });
});
