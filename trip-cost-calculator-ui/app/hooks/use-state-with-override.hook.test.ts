import { act, renderHook } from "@testing-library/react";
import { useStateWithOverride } from "./use-state-with-override.hook";

describe("useStateWithOverride", () => {
  it("should expose normal state controls", () => {
    const { result, rerender } = renderHook(
      (propValue) => useStateWithOverride(propValue),
      { initialProps: "value 1" }
    );

    let [value, setValue] = result.current;
    expect(value).toEqual("value 1");

    act(() => setValue("value 2"));
    [value, setValue] = result.current;
    expect(value).toEqual("value 2");
  });

  it("should override the current state value if the prop value is updated", () => {
    const { result, rerender } = renderHook(
      (propValue) => useStateWithOverride(propValue),
      { initialProps: "value 1" }
    );

    let [value, setValue] = result.current;
    expect(value).toEqual("value 1");

    rerender("value 3");
    [value, setValue] = result.current;
    expect(value).toEqual("value 3");
  });
});
