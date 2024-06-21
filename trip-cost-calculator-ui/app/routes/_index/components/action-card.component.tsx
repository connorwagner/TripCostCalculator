import Card from "~/components/card.component";
import Icon from "~/components/icon.component";
import { TripMemberMetadata } from "./member-row.component";
import { useRef } from "react";
import { ActionFunction, ActionFunctionArgs } from "@remix-run/server-runtime";
import { TripMember } from "~/models/trip-member.model";
import qs from "qs";

export const goAction: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  const requestText = await request.text();
  const tripMembers = qs.parse(requestText);
  return tripMembers;
};

export type ActionCardProps = {
  tripMembers: TripMemberMetadata[];
};

export default function ActionCard({ tripMembers }: ActionCardProps) {
  const formSubmitRef = useRef<HTMLButtonElement | null>(null);

  const goEnabled =
    tripMembers.length > 1 && !tripMembers.some((m) => m.isEditing);

  const goClickHandler = () => {
    if (!goEnabled || !formSubmitRef.current) {
      return;
    }

    formSubmitRef.current.click();
  };

  return (
    <div
      className={`w-full flex justify-evenly items-center ${
        goEnabled ? "text-green-500" : "text-green-700"
      }`}
    >
      <Card
        colorClass={goEnabled ? undefined : "bg-gray-400"}
        className={`${!goEnabled ? "" : ""}w-fit flex items-center space-x-4`}
        onClick={goClickHandler}
      >
        <form method="post" action="/?index" className="invisible">
          {tripMembers.map((member, idx) => (
            <div key={member.name}>
              <input
                readOnly
                type="text"
                name={`members[${idx}][name]`}
                value={member.name}
              />
              <input
                readOnly
                type="number"
                name={`members[${idx}][spent]`}
                value={member.spent}
              />
            </div>
          ))}
          <button ref={formSubmitRef} />
        </form>
        <Icon name="calculate" />
        <p className="size-fit">Go</p>
      </Card>
    </div>
  );
}
