import type { MetaFunction } from "@remix-run/node";
import { useRef } from "react";
import TitleCard from "~/components/index/title-card.component";
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
      <TitleCard addNewRow={addNewRow} />
    </div>
  );
}
