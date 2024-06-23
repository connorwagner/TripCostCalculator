import { fireEvent, render, screen } from "@testing-library/react";
import Input from "./input.component";

describe("Input", () => {
  it("should render an input", async () => {
    render(<Input value="" onChange={() => {}} isEditable={true} />);

    const input = await screen.findByTestId("input");
    expect(input).toBeDefined();
  });

  it("should disable editing", async () => {
    render(<Input value="" onChange={() => {}} isEditable={false} />);

    const input = await screen.findByTestId("input");
    const disabled = input.attributes.getNamedItem("disabled");
    expect(disabled!.value).toBeDefined();
  });

  it("should bind the input's value", async () => {
    render(<Input value="data-value" onChange={() => {}} isEditable={true} />);

    const input = await screen.findByTestId("input");
    const value = input.attributes.getNamedItem("value");
    expect(value!.value).toEqual("data-value");
  });

  it("should react to changes", async () => {
    const changeHandler = vi.fn();

    render(<Input value="" onChange={changeHandler} isEditable={true} />);

    const input = await screen.findByTestId("input");
    fireEvent.change(input, { target: { value: "test-data" } });

    expect(changeHandler).toHaveBeenCalledWith("test-data");

    const value = input.attributes.getNamedItem("value");
    expect(value!.value).toEqual("test-data");
  });

  it("should format the display value", async () => {
    const formatValue = (value: string) => `|${value}|`;

    render(
      <Input
        value="test value"
        onChange={() => {}}
        isEditable={true}
        valueFormatter={formatValue}
      />
    );

    const input = await screen.findByTestId("input");
    const value = input.attributes.getNamedItem("value");
    expect(value!.value).toEqual("|test value|");
  });

  describe("when T == string", () => {
    it("should render an input with type=text", async () => {
      render(<Input value="" onChange={() => {}} isEditable={true} />);

      const input = await screen.findByTestId("input");
      const type = input.attributes.getNamedItem("type");
      expect(type!.value).toEqual("text");
    });
  });

  describe("when T == number", () => {
    it("should render an input with type=number", async () => {
      render(<Input value={0} onChange={() => {}} isEditable={true} />);

      const input = await screen.findByTestId("input");
      const type = input.attributes.getNamedItem("type");
      expect(type!.value).toEqual("number");
    });
  });
});
