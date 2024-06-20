import type { MetaFunction } from "@remix-run/node";
import { useRef, useState } from "react";
import AddMemberModal from "~/components/index/add-member-modal.component";
import TitleCard from "~/components/index/title-card.component";
import { Participant } from "~/models/participant.model";
import { pageRootElementId } from "~/constants";

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
  const [addMemberModalIsOpen, setAddMemberModalIsOpen] =
    useState<boolean>(false);

  function addNewRow() {
    setAddMemberModalIsOpen(true);
  }

  const containerClassName = "font-mono p-4";
  return (
    <div className={containerClassName} id={pageRootElementId}>
      <TitleCard addNewRow={addNewRow} />
      <AddMemberModal
        isOpen={addMemberModalIsOpen}
        setIsOpen={setAddMemberModalIsOpen}
        containerClassName={containerClassName}
      />
    </div>
  );
}
