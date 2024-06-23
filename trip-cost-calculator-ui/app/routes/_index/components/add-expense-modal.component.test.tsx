import { act, fireEvent, render, screen } from "@testing-library/react";
import AddExpenseModal from "./add-expense-modal.component";
import { Mock } from "vitest";

describe("AddMemberModal", () => {
  let mockAddExpense: Mock;

  let isOpen: boolean;

  let parentElement: HTMLElement;

  const uiDefinition = () => (
    <div data-testid="parent">
      <AddExpenseModal
        addExpense={mockAddExpense}
        isOpen={isOpen}
        setIsOpen={(_isOpen) => (isOpen = _isOpen)}
        appElement={parentElement}
        parentElement={parentElement}
      />
    </div>
  );

  beforeEach(async () => {
    mockAddExpense = vi.fn();

    isOpen = true;

    render(uiDefinition());

    parentElement = await screen.findByTestId("parent");
  });

  it("should not open a modal until isOpen is set to true", () => {
    isOpen = false;
    render(uiDefinition());

    let modalTitle = screen.queryAllByTestId("add-expense-modal");
    expect(modalTitle).toHaveLength(0);

    isOpen = true;
    render(uiDefinition());

    modalTitle = screen.queryAllByTestId("add-expense-modal");
    expect(modalTitle).toHaveLength(1);
  });

  it("should notify when an expense is added", async () => {
    render(uiDefinition());

    const inputElement = await screen.findByDisplayValue("0.00");
    fireEvent.change(inputElement, { target: { value: "12.34" } });

    const addButton = await screen.findByText("Add");
    act(() => addButton.click());

    expect(mockAddExpense).toHaveBeenCalledWith(12.34);
  });
});
