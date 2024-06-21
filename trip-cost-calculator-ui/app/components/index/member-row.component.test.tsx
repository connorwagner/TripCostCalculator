import { fireEvent, render, screen } from "@testing-library/react";
import MemberRow from "./member-row.component";
import { TripMember } from "~/models/trip-member.model";
import { Mock } from "vitest";

describe("MemberRow", () => {
  const tripMember: TripMember = {
    name: "Trip Member",
    spent: 123.45,
  };

  let mockDeleteEntry: Mock;
  let mockDataChanged: Mock;

  beforeEach(() => {
    mockDeleteEntry = vi.fn();
    mockDataChanged = vi.fn();

    render(
      <MemberRow
        member={tripMember}
        isEditing={false}
        deleteEntry={mockDeleteEntry}
        dataChanged={mockDataChanged}
      />
    );
  });

  it("should display the trip member's name", async () => {
    const name = await screen.findByDisplayValue(tripMember.name);
    expect(name).toBeDefined();
  });

  it("should display the trip member's total costs", async () => {
    const costs = await screen.findByDisplayValue(tripMember.spent);
    expect(costs).toBeDefined();
  });

  it("should allow the trip member's name to be edited", async () => {
    const edit = await screen.findByTestId("edit-done-button");
    edit.click();

    const name = await screen.findByDisplayValue(tripMember.name);
    fireEvent.change(name, { target: { value: "test name" } });

    const done = await screen.findByTestId("edit-done-button");
    done.click();

    expect(mockDataChanged).toHaveBeenCalledWith(
      expect.objectContaining({ name: "test name" })
    );
  });

  it("should allow the trip member's costs to be edited", async () => {
    const edit = await screen.findByTestId("edit-done-button");
    edit.click();

    const name = await screen.findByDisplayValue(tripMember.spent);
    fireEvent.change(name, { target: { value: "1234.56" } });

    const done = await screen.findByTestId("edit-done-button");
    done.click();

    expect(mockDataChanged).toHaveBeenCalledWith(
      expect.objectContaining({ spent: 1234.56 })
    );
  });

  it("should allow the trip member's row to be deleted", async () => {
    const deleteButton = await screen.findByTestId("delete-button");
    deleteButton.click();

    expect(mockDeleteEntry).toHaveBeenCalled();
  });
});
