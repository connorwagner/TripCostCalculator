import { render, screen } from "@testing-library/react";
import ActionCard from "./action-card.component";

describe("ActionCard", () => {
  it("should render a go button", async () => {
    render(<ActionCard goEnabled={true} goClicked={() => {}} />);

    const go = await screen.findByText("Go");
    expect(go).toBeDefined();
  });

  it("should notify when the go button is clicked", async () => {
    const mockGoHandler = vi.fn();

    render(<ActionCard goEnabled={true} goClicked={mockGoHandler} />);

    const go = await screen.findByText("Go");
    go.click();

    expect(mockGoHandler).toHaveBeenCalled();
  });

  it("should disable the go button", async () => {
    const mockGoHandler = vi.fn();

    render(<ActionCard goEnabled={false} goClicked={mockGoHandler} />);

    const go = await screen.findByText("Go");
    go.click();

    expect(mockGoHandler).not.toHaveBeenCalled();
  });
});
