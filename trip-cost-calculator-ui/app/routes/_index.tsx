import type { MetaFunction } from "@remix-run/node";
import { useRef, useState } from "react";
import MemberRow from "~/components/index/member-row.component";
import TitleCard from "~/components/index/title-card.component";
import { TripMember } from "~/models/trip-member.model";

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

  const [groupMembers, setGroupMembers] = useState<TripMember[]>([]);

  function addNewRow() {
    setGroupMembers([
      ...groupMembers,
      {
        name: `Member ${groupMembers.length}`,
        spent: 0,
      },
    ]);
  }

  function deleteRow(member: TripMember) {
    const idx = groupMembers.indexOf(member);
    setGroupMembers([
      ...groupMembers.slice(0, idx),
      ...groupMembers.slice(idx + 1),
    ]);
  }

  function updateRow(member: TripMember) {
    const idx = groupMembers.indexOf(member);
    setGroupMembers([
      ...groupMembers.slice(0, idx),
      member,
      ...groupMembers.slice(idx + 1),
    ]);
  }

  return (
    <div className="font-mono p-4" ref={rootElementRef}>
      <TitleCard addNewRow={addNewRow} />
      {groupMembers.map((member) => (
        <MemberRow
          key={member.name}
          member={member}
          isEditing={false}
          deleteEntry={() => deleteRow(member)}
          dataChanged={() => updateRow(member)}
        />
      ))}
    </div>
  );
}
