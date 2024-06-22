import { TripMember } from "~/models/trip-member.model";
import Icon from "~/components/icon.component";
import Card, { CardElement } from "~/components/card.component";
import Input from "~/components/input.component";
import { useRef, useState } from "react";
import AddExpenseModal from "./add-expense-modal.component";

export type MemberRowProps = {
  member: TripMemberMetadata;
  isEditable: boolean;
  deleteEntry: () => void;
  dataChanged: (newValue: TripMember) => void;
};

export default function MemberRow({
  member,
  isEditable,
  deleteEntry,
  dataChanged,
}: MemberRowProps) {
  const cardRef = useRef<CardElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const editButtonHandler = () => {
    if (!isEditable) {
      return;
    }

    member.isEditing = !member.isEditing;

    dataChanged(member);
  };

  const addExpenseButtonHandler = () => {
    setIsModalOpen(true);
  };

  const addExpense = (expense: number) => {
    member.expenses.push(expense);

    dataChanged(member);
  };

  const deleteButtonHandler = () => {
    if (!isEditable) {
      return;
    }

    deleteEntry();
  };

  const totalAmountSpent = member.expenses.reduce((acc, cur) => acc + cur, 0);

  return (
    <Card className="flex justify-between items-center mb-4" ref={cardRef}>
      <span className="hidden" data-testid="member-row" />
      <div className="flex flex-col justify-between items-center">
        <Icon name="person" className="text-6xl" />
        <Input
          value={member.name}
          onChange={(name) => (member.name = name)}
          isEditable={member.isEditing}
        />
      </div>
      <div className="flex justify-items-center text-3xl mx-4">
        <p>${totalAmountSpent}</p>
      </div>
      {isEditable ? (
        <div className="flex flex-col">
          <div
            onClick={editButtonHandler}
            className="size-fit"
            data-testid="edit-done-button"
          >
            {member.isEditing ? (
              <Icon name="check" className="text-green-500" />
            ) : (
              <Icon name="edit" className="text-yellow-600" />
            )}
          </div>
          {member.isEditing ? (
            <div
              onClick={addExpenseButtonHandler}
              className="size-fit"
              data-testid="add-expense-button"
            >
              <Icon name="add" className="text-green-500" />
            </div>
          ) : (
            <></>
          )}
          <div
            onClick={deleteButtonHandler}
            className="size-fit"
            data-testid="delete-button"
          >
            <Icon name="delete" className="text-rose-800" />
          </div>
        </div>
      ) : (
        <></>
      )}
      <AddExpenseModal
        addExpense={addExpense}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        parentElement={cardRef.current}
      />
    </Card>
  );
}

export interface TripMemberMetadata extends TripMember {
  isEditing: boolean;
}
