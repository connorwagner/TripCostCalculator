import { act, fireEvent, render, screen, within } from "@testing-library/react";
import MemberRow, { TripMemberMetadata } from "./member-row.component";
import { Mock } from "vitest";

describe("MemberRow", () => {
  let tripMember: TripMemberMetadata;
  const totalSpent = () =>
    tripMember.expenses.reduce((acc, cur) => acc + cur, 0);

  let mockDeleteEntry: Mock;
  let mockDataChanged: Mock;

  beforeEach(() => {
    tripMember = {
      name: "Trip Member",
      expenses: [123.45, 67.89],
      isEditing: false,
    };

    mockDeleteEntry = vi.fn();
    mockDataChanged = vi.fn();
  });

  it("should display the trip member's name", async () => {
    render(
      <MemberRow
        member={tripMember}
        isEditable={true}
        deleteEntry={mockDeleteEntry}
        dataChanged={mockDataChanged}
      />
    );

    const name = await screen.findByDisplayValue(tripMember.name);
    expect(name).toBeDefined();
  });

  it("should display the trip member's total costs", async () => {
    render(
      <MemberRow
        member={tripMember}
        isEditable={true}
        deleteEntry={mockDeleteEntry}
        dataChanged={mockDataChanged}
      />
    );

    const costs = await screen.findByText(`$${totalSpent()}`);
    expect(costs).toBeDefined();
  });

  it("should display the trip member's individual costs", async () => {
    render(
      <MemberRow
        member={tripMember}
        isEditable={true}
        deleteEntry={mockDeleteEntry}
        dataChanged={mockDataChanged}
      />
    );

    for (const expense of tripMember.expenses) {
      const expenseElement = await screen.findByText(`$${expense}`);
      expect(expenseElement).toBeDefined();
    }
  });

  it("should allow the trip member's name to be edited", async () => {
    render(
      <MemberRow
        member={tripMember}
        isEditable={true}
        deleteEntry={mockDeleteEntry}
        dataChanged={mockDataChanged}
      />
    );

    const edit = await screen.findByTestId("edit-done-button");
    act(() => edit.click());

    const name = await screen.findByDisplayValue(tripMember.name);
    fireEvent.change(name, { target: { value: "test name" } });

    const done = await screen.findByTestId("edit-done-button");
    act(() => done.click());

    expect(mockDataChanged).toHaveBeenCalledWith(
      expect.objectContaining({ name: "test name" })
    );
  });

  it("should allow a trip member to add their costs", async () => {
    tripMember.isEditing = true;

    render(
      <MemberRow
        member={tripMember}
        isEditable={true}
        deleteEntry={mockDeleteEntry}
        dataChanged={mockDataChanged}
      />
    );

    const add = await screen.findByTestId("add-expense-button");
    act(() => add.click());

    const addModal = await screen.findByTestId("add-expense-modal");
    expect(addModal).toBeDefined();
  });

  it("should allow the trip member's row to be deleted", async () => {
    render(
      <MemberRow
        member={tripMember}
        isEditable={true}
        deleteEntry={mockDeleteEntry}
        dataChanged={mockDataChanged}
      />
    );

    const deleteButton = await screen.findByTestId("delete-button");
    act(() => deleteButton.click());

    expect(mockDeleteEntry).toHaveBeenCalled();
  });

  it("should allow the trip member's expenses to be deleted", async () => {
    tripMember.isEditing = true;

    const expenses = [...tripMember.expenses];

    render(
      <MemberRow
        member={tripMember}
        isEditable={true}
        deleteEntry={mockDeleteEntry}
        dataChanged={mockDataChanged}
      />
    );

    const expense = expenses[0];
    const expenseContainer = (await screen.findByText(`$${expense}`)).closest(
      "div"
    )!;
    const deleteElement = await within(expenseContainer).findByText("delete");
    act(() => deleteElement.click());
    expect(mockDataChanged).toHaveBeenCalledWith(
      expect.objectContaining({ expenses: expenses.slice(1) })
    );
  });

  it("should remove edit buttons", async () => {
    render(
      <MemberRow
        member={tripMember}
        isEditable={false}
        deleteEntry={mockDeleteEntry}
        dataChanged={mockDataChanged}
      />
    );

    const editButtonElements = screen.queryAllByTestId("edit-done-button");
    expect(editButtonElements).toHaveLength(0);

    const deleteButtonElements = screen.queryAllByTestId("delete-button");
    expect(deleteButtonElements).toHaveLength(0);
  });
});
