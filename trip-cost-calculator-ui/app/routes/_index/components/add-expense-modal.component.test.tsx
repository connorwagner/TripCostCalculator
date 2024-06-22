import { render, screen } from "@testing-library/react";
import AddExpenseModal from "./add-expense-modal.component";

describe("AddMemberModal", () => {
  let isOpen: boolean;

  let parentElement: HTMLElement;

  const uiDefinition = () => (
    <div data-testid="parent">
      <AddExpenseModal
        isOpen={isOpen}
        setIsOpen={(_isOpen) => (isOpen = _isOpen)}
        appElement={parentElement}
        parentElement={parentElement}
      />
    </div>
  );

  beforeEach(async () => {
    isOpen = true;

    render(uiDefinition());

    parentElement = await screen.findByTestId("parent");
  });

  it("should not open a modal until isOpen is set to true", async () => {
    isOpen = false;
    render(uiDefinition());

    let modalTitle = screen.queryAllByText("Add a person");
    expect(modalTitle).toHaveLength(0);

    isOpen = true;
    render(uiDefinition());

    modalTitle = screen.queryAllByText("Add a person");
    expect(modalTitle).toHaveLength(1);
  });
});
