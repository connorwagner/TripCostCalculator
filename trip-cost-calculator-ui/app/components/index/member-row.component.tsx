import { useState } from "react";
import { TripMember } from "~/models/trip-member.model";
import Icon from "../icon.component";
import Card from "../card.component";
import Input from "../input.component";

export type MemberRowProps = {
  member: TripMember;
  isEditing: boolean;
  deleteEntry: () => void;
  dataChanged: (newValue: TripMember) => void;
};

export default function MemberRow({
  member,
  isEditing: isEditingProp,
  deleteEntry,
  dataChanged,
}: MemberRowProps) {
  const [isEditing, setIsEditing] = useState<boolean>(isEditingProp);

  const editButtonHandler = () => {
    if (isEditing) {
      dataChanged(member);
    }

    setIsEditing(!isEditing);
  };

  return (
    <Card className="flex justify-between items-center mb-4">
      <span className="invisible" data-testid="member-row" />
      <div className="flex flex-col justify-between items-center">
        <Icon name="person" className="text-6xl" />
        <Input
          value={member.name}
          onChange={(name) => (member.name = name)}
          isEditable={isEditing}
        />
      </div>
      <div className="flex justify-items-center text-3xl mx-4">
        <p>$</p>
        <Input
          value={member.spent}
          onChange={(spent) => (member.spent = spent)}
          isEditable={isEditing}
        />
      </div>
      <div className="flex flex-col">
        <div
          onClick={editButtonHandler}
          className="size-fit"
          data-testid="edit-done-button"
        >
          {isEditing ? (
            <Icon name="check" className="text-green-500" />
          ) : (
            <Icon name="edit" className="text-yellow-600" />
          )}
        </div>
        <div
          onClick={deleteEntry}
          className="size-fit"
          data-testid="delete-button"
        >
          <Icon name="delete" className="text-rose-800" />
        </div>
      </div>
    </Card>
  );
}
