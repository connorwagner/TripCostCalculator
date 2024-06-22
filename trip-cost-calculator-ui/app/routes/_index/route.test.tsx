import { createRemixStub } from "@remix-run/testing";
import { render, screen } from "@testing-library/react";
import Index from "./route";

describe("Index", () => {
  const RemixStub = createRemixStub([
    {
      path: "/",
      Component: Index,
    },
  ]);

  beforeEach(() => {
    render(<RemixStub />);
  });

  it("should render the title", async () => {
    const title = await screen.findByText("Trip Cost Calculator");
    expect(title).toBeDefined();
  });

  it("should render rows for trip members", async () => {
    const addButton = await screen.findByText("Add another person");

    const numRows = 3;
    for (let i = 0; i < numRows; i++) {
      addButton.click();
      render(<RemixStub />);
    }

    const rows = screen.queryAllByTestId("member-row");
    expect(rows).toHaveLength(numRows);
  });

  it("should render the action card", async () => {
    const go = await screen.findByText("Go");
    expect(go).toBeDefined();
  });
});
