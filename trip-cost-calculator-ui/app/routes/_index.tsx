import type { MetaFunction } from "@remix-run/node";
import { useRef, useState } from "react";
import ActionCard from "~/components/index/action-card.component";
import MemberRow, {
  TripMemberMetadata,
} from "~/components/index/member-row.component";
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

  const [groupMembers, setGroupMembers] = useState<TripMemberMetadata[]>([]);

  function addNewRow() {
    const existingMembersNotEditing: TripMemberMetadata[] = groupMembers.map(
      (m) => ({ ...m, isEditing: false })
    );

    setGroupMembers([
      ...existingMembersNotEditing,
      {
        name: `Member ${groupMembers.length + 1}`,
        spent: 0,
        isEditing: true,
      },
    ]);
  }

  function deleteRow(member: TripMemberMetadata) {
    const idx = groupMembers.indexOf(member);
    setGroupMembers([
      ...groupMembers.slice(0, idx),
      ...groupMembers.slice(idx + 1),
    ]);
  }

  function updateRow(member: TripMemberMetadata) {
    const idx = groupMembers.indexOf(member);
    setGroupMembers([
      ...groupMembers.slice(0, idx),
      member,
      ...groupMembers.slice(idx + 1),
    ]);
  }

  function goClicked() {
    alert("go");
  }

  const isGoButtonEnabled =
    groupMembers.length > 1 && !groupMembers.some((m) => m.isEditing);

  return (
    <div className="font-mono p-4" ref={rootElementRef}>
      <TitleCard addNewRow={addNewRow} />
      {groupMembers.map((member) => (
        <MemberRow
          key={member.name}
          member={member}
          dataChanged={() => updateRow(member)}
          deleteEntry={() => deleteRow(member)}
        />
      ))}
      <ActionCard goEnabled={isGoButtonEnabled} goClicked={goClicked} />
    </div>
  );
}
