import { useState } from "react";
import { TripMember } from "~/models/trip-member.model";
import Icon from "../icon.component";
import Card from "../card.component";

export type MemberRowProps = {
  member: TripMember;
  deleteEntry: () => void;
  isEditing: boolean;
};

export default function MemberRow({
  member,
  isEditing: isEditingProp,
  deleteEntry,
}: MemberRowProps) {
  const [isEditing, setIsEditing] = useState<boolean>(isEditingProp);

  return (
    <Card className="flex justify-between items-center my-4">
      <div className="flex flex-col justify-between items-center">
        <Icon name="person" className="text-6xl" />
        <p>{member.name}</p>
      </div>
      <p className="text-3xl">${member.spent}</p>
      <div className="flex flex-col">
        <div onClick={() => setIsEditing(!isEditing)} className="size-fit">
          <Icon name="edit" className="text-yellow-600" />
        </div>
        <div onClick={deleteEntry} className="size-fit">
          <Icon name="delete" className="text-rose-800" />
        </div>
      </div>
    </Card>
  );
}
