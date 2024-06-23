import { render, screen } from "@testing-library/react";
import AutosizeInput from "./autosize-input";
import { Mock } from "vitest";

let autosizeInputMock: Mock;
vi.mock("autosize-input", () => ({
  __esModule: true,
  default: (...args: any[]) => autosizeInputMock(...args),
}));

describe("AutosizeInput", () => {
  beforeEach(() => {
    autosizeInputMock = vi.fn();
  });

  it("should display an input element with the provided value", async () => {
    const testValue = "test value";
    render(<AutosizeInput value={testValue} onChange={() => {}} />);

    const inputElement = await screen.findByDisplayValue(testValue);
    expect(inputElement).toBeDefined();
  });

  it("should configure the input element to be autosized", async () => {
    const testValue = "test value";
    render(<AutosizeInput value={testValue} onChange={() => {}} />);

    const inputElement = await screen.findByDisplayValue(testValue);
    expect(autosizeInputMock).toHaveBeenCalledWith(
      inputElement,
      expect.anything()
    );
  });
});
