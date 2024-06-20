import type { MetaFunction } from "@remix-run/node";
import { useRef } from "react";
import Card from "~/components/card.component";
import Icon from "~/components/icon.component";
import { Participant } from "~/models/participant.model";

export const meta: MetaFunction = () => {
  return [
    { title: "Trip Cost Calculator" },
    {
      name: "description",
      content: "Balancing wallets between friends since 2024",
    },
  ];
};

export default function Index() {
  const groupMembers = useRef<Participant[]>([]);

  function addNewRow() {
    // TODO: modal to add a new member
    alert("add");
  }

  return (
    <div className="font-mono p-4">
      <Card className="flex justify-center">
        <div className="flex flex-col items-center space-y-4">
          <h1 className="text-3xl text-center">Trip Cost Calculator</h1>
          <Card
            className="w-full flex justify-evenly items-center text-green-500"
            onClick={addNewRow}
          >
            <Icon name="add" />
            <p className="size-fit">Add another person</p>
          </Card>
        </div>
      </Card>
    </div>
  );
}
