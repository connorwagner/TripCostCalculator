import { createRemixStub } from "@remix-run/testing";
import { render, screen } from "@testing-library/react";
import Index from "./_index";

describe("Index", () => {
  beforeEach(() => {
    // Rendering within a remix stub is only necessary if remix features are used
    // but this is a good example of how to do it in a simple context
    const RemixStub = createRemixStub([
      {
        path: "/",
        Component: Index,
      },
    ]);

    render(<RemixStub />);
  });

  it("should render the title", () => {
    const title = screen.findByText("Trip Cost Calculator");
    expect(title).toBeDefined();
  });
});
