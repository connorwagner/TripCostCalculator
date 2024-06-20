import type { MetaFunction } from "@remix-run/node";
import { useRef, useState } from "react";
import AddMemberModal from "~/components/index/add-member-modal.component";
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
  const rootElementRef = useRef<HTMLDivElement | null>(null);
  const [addMemberModalIsOpen, setAddMemberModalIsOpen] =
    useState<boolean>(false);

  const groupMembers = useRef<Participant[]>([]);

  function addNewRow() {
    setAddMemberModalIsOpen(true);
  }

  const containerClassName = "font-mono p-4";
  return (
    <div className={containerClassName} ref={rootElementRef}>
      <TitleCard addNewRow={addNewRow} />
      <AddMemberModal
        isOpen={addMemberModalIsOpen}
        setIsOpen={setAddMemberModalIsOpen}
        appElement={rootElementRef.current}
        parentElement={rootElementRef.current}
      />
    </div>
  );
}
