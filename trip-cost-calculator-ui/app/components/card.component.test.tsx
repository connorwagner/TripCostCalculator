import { render, screen } from "@testing-library/react";
import Card from "./card.component";

describe("Card", () => {
  it("should render a styled div", async () => {
    render(<Card></Card>);

    const div = await screen.findByTestId("card-container");
    expect(div).toBeDefined();
    expect(div.className).toBeDefined();
  });

  it("should render provided children", async () => {
    render(
      <Card>
        <p>Child</p>
        <p>Child</p>
      </Card>
    );

    const children = await screen.findAllByText("Child");
    expect(children).toHaveLength(2);
  });

  it("should pass through a provided onClick handler", async () => {
    const onClick = vi.fn();

    render(<Card onClick={onClick}></Card>);

    const div = await screen.findByTestId("card-container");
    div.click();

    expect(onClick).toHaveBeenCalled();
  });

  it("should pass through any provided className values", async () => {
    const classes = "fake classes";

    render(<Card className={classes}></Card>);

    const div = await screen.findByTestId("card-container");

    expect(div.className).toContain(classes);
  });

  it("should use a provided color", async () => {
    const color = "bg-white";

    render(<Card className={color}></Card>);

    const div = await screen.findByTestId("card-container");

    expect(div.className).toContain(color);
  });

  it("should default to zinc-200", async () => {
    render(<Card></Card>);

    const div = await screen.findByTestId("card-container");

    expect(div.className).toContain("bg-zinc-200");
  });
});
