import type { MetaFunction } from "@remix-run/node";
import { useRef, useState } from "react";
import ActionCard, { goAction } from "./components/action-card.component";
import MemberRow, {
  TripMemberMetadata,
} from "./components/member-row.component";
import TitleCard from "./components/title-card.component";
import { useFetcher } from "@remix-run/react";
import { BalancedCosts } from "~/models/balanced-costs.model";
import { fetcherKey } from "./constants";
import ResultCard from "./components/result-card.component";

export const meta: MetaFunction = () => {
  return [
    { title: "Trip Cost Calculator" },
    {
      name: "description",
      content: "Balancing wallets between friends since 2024",
    },
  ];
};

export const action = goAction;

export default function Index() {
  const rootElementRef = useRef<HTMLDivElement | null>(null);

  const [tripMembers, setTripMembers] = useState<TripMemberMetadata[]>([]);

  const fetcher = useFetcher({ key: fetcherKey });
  const balancedCosts = fetcher.data as BalancedCosts;

  function addNewRow() {
    const existingMembersNotEditing: TripMemberMetadata[] = tripMembers.map(
      (m) => ({ ...m, isEditing: false })
    );

    setTripMembers([
      ...existingMembersNotEditing,
      {
        name: `Member ${tripMembers.length + 1}`,
        spent: 0,
        isEditing: true,
      },
    ]);
  }

  function deleteRow(member: TripMemberMetadata) {
    const idx = tripMembers.indexOf(member);
    setTripMembers([
      ...tripMembers.slice(0, idx),
      ...tripMembers.slice(idx + 1),
    ]);
  }

  function updateRow(member: TripMemberMetadata) {
    const idx = tripMembers.indexOf(member);
    setTripMembers([
      ...tripMembers.slice(0, idx),
      member,
      ...tripMembers.slice(idx + 1),
    ]);
  }

  function reset() {
    setTripMembers([]);
    fetcher.data = null;
  }

  return (
    <div className="flex justify-center">
      <div className="font-mono p-4 max-w-sm" ref={rootElementRef}>
        <TitleCard
          addNewRow={addNewRow}
          reset={reset}
          isEditable={!balancedCosts}
        />

        {tripMembers.map((member) => (
          <MemberRow
            key={member.name}
            member={member}
            isEditable={!balancedCosts}
            dataChanged={() => updateRow(member)}
            deleteEntry={() => deleteRow(member)}
          />
        ))}

        {balancedCosts ? (
          <ResultCard balancedCosts={balancedCosts} />
        ) : (
          <ActionCard tripMembers={tripMembers} />
        )}
      </div>
    </div>
  );
}
