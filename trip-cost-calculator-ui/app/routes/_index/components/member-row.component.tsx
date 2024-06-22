import { TripMember } from "~/models/trip-member.model";
import Icon from "~/components/icon.component";
import Card from "~/components/card.component";
import Input from "~/components/input.component";

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
  const editButtonHandler = () => {
    if (!isEditable) {
      return;
    }

    member.isEditing = !member.isEditing;

    dataChanged(member);
  };

  const deleteButtonHandler = () => {
    if (!isEditable) {
      return;
    }

    deleteEntry();
  };

  return (
    <Card className="flex justify-between items-center mb-4">
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
        <p>$</p>
        <Input
          value={member.spent}
          onChange={(spent) => (member.spent = spent)}
          isEditable={member.isEditing}
        />
      </div>
      <div className={`flex flex-col ${isEditable ? "" : "hidden"}`}>
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
        <div
          onClick={deleteButtonHandler}
          className="size-fit"
          data-testid="delete-button"
        >
          <Icon name="delete" className="text-rose-800" />
        </div>
      </div>
    </Card>
  );
}

export interface TripMemberMetadata extends TripMember {
  isEditing: boolean;
}