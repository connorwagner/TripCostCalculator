import { render, screen } from "@testing-library/react";
import Icon from "./icon.component";

describe("Icon", () => {
  it("should render a Material Icon", async () => {
    render(<Icon name="help" />);

    const icon = await screen.findByTestId("icon");
    expect(icon.className).toContain("material-symbols-outlined");
  });

  it("should pass through a provided className", async () => {
    const className = "fake classes";

    render(<Icon name="help" className={className} />);

    const icon = await screen.findByTestId("icon");
    expect(icon.className).toContain(className);
  });
});
