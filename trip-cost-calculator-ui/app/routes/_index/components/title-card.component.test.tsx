import { render, screen } from "@testing-library/react";
import TitleCard from "./title-card.component";

describe("TitleCard", () => {
  it("should render the title", async () => {
    render(
      <TitleCard addNewRow={() => {}} reset={() => {}} isEditable={true} />
    );

    const title = await screen.findByText("Trip Cost Calculator");
    expect(title).toBeDefined();
  });

  it("should fire the addNewRow handler when the add button is pressed", async () => {
    const addNewRow = vi.fn();

    render(
      <TitleCard addNewRow={addNewRow} isEditable={true} reset={() => {}} />
    );

    const add = await screen.findByText("Add another person");
    add.click();

    expect(addNewRow).toHaveBeenCalled();
  });

  it("should fire the reset handler when the reset button is pressed", async () => {
    const resetHandler = vi.fn();

    render(
      <TitleCard reset={resetHandler} isEditable={false} addNewRow={() => {}} />
    );

    const reset = await screen.findByText("Reset");
    reset.click();

    expect(resetHandler).toHaveBeenCalled();
  });
});
