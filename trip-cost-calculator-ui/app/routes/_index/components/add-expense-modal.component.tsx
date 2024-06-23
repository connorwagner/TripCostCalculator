import { useState } from "react";
import ReactModal from "react-modal";
import Card from "~/components/card.component";
import Icon from "~/components/icon.component";
import Input from "~/components/input.component";

export type AddExpenseModalProps = {
  addExpense: (amount: number) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  parentElement: HTMLElement | null;
  appElement?: HTMLElement | null;
};

export default function AddExpenseModal({
  addExpense: addExpenseProp,
  isOpen,
  setIsOpen,
  parentElement,
  appElement,
}: AddExpenseModalProps) {
  const [expenseAmount, setExpenseAmount] = useState<number>(0);

  if (appElement === undefined && parentElement) {
    appElement = parentElement;
  }

  if (!appElement || !parentElement) return <></>;

  const addExpense = (closeModal: boolean) => {
    addExpenseProp(expenseAmount);

    setExpenseAmount(0);

    if (closeModal) {
      setIsOpen(false);
    }
  };

  return (
    <ReactModal
      appElement={appElement}
      parentSelector={() => parentElement}
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
      overlayClassName="absolute inset-0 bg-gray-700 bg-opacity-80"
    >
      <span className="hidden" data-testid="add-expense-modal" />
      <Card className="space-y-4">
        <h1 className="text-3xl text-center">Add an expense</h1>
        <Input
          value={expenseAmount}
          onChange={setExpenseAmount}
          isEditable={true}
          className="text-2xl"
        />
        <div className="flex flex-row justify-evenly">
          <Card
            colorClass="bg-white"
            className="flex flex-col items-center"
            onClick={() => addExpense(false)}
          >
            <Icon name="add" className="text-green-500" />
            <p className="text-green-500">Add Another</p>
          </Card>
          <Card
            colorClass="bg-white"
            className="flex flex-col items-center"
            onClick={() => addExpense(true)}
          >
            <Icon name="add" className="text-green-500" />
            <p className="text-green-500">Add</p>
          </Card>
        </div>
      </Card>
    </ReactModal>
  );
}
