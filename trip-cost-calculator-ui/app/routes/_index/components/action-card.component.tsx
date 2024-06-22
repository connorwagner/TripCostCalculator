import Card from "~/components/card.component";
import Icon from "~/components/icon.component";
import { TripMemberMetadata } from "./member-row.component";
import { ActionFunction, ActionFunctionArgs } from "@remix-run/server-runtime";
import { TripMember } from "~/models/trip-member.model";
import qs from "qs";
import { container } from "tsyringe";
import { ApiService } from "~/services/api.service";
import { json, useFetcher } from "@remix-run/react";
import { fetcherKey } from "../constants";
import { OwedMoney } from "~/models/balanced-costs.model";
import { useRef } from "react";

export const goAction: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  const requestText = await request.text();
  const parsedForm = qs.parse(requestText);
  const tripMembers = parsedForm.members as unknown as TripMember[];

  const apiService = container.resolve(ApiService);
  const result = await apiService.balanceCosts(tripMembers);

  return json(result);
};

export type ActionCardProps = {
  tripMembers: TripMemberMetadata[];
};

export default function ActionCard({ tripMembers }: ActionCardProps) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const fetcher = useFetcher<OwedMoney>({ key: fetcherKey });

  const goEnabled =
    tripMembers.length > 1 && !tripMembers.some((m) => m.isEditing);

  const goClickHandler = () => {
    if (!goEnabled || !formRef.current) {
      return;
    }

    fetcher.submit(formRef.current);
  };

  return (
    <>
      <div
        className={`w-full flex justify-evenly items-center mb-4 ${
          goEnabled ? "text-green-500" : "text-green-700"
        }`}
      >
        <Card
          colorClass={goEnabled ? undefined : "bg-gray-400"}
          className="w-fit flex items-center space-x-4"
          onClick={goClickHandler}
        >
          <Icon name="calculate" />
          <p className="size-fit">Go</p>
        </Card>
      </div>

      <fetcher.Form
        method="post"
        action="/?index"
        className="hidden"
        ref={formRef}
      >
        {tripMembers.map((member, idx) => (
          <span key={member.name}>
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
          </span>
        ))}
      </fetcher.Form>
    </>
  );
}
