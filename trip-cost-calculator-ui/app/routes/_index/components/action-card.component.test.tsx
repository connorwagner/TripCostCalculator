import { render, screen } from "@testing-library/react";
import ActionCard, { goAction } from "./action-card.component";
import { createRemixStub } from "@remix-run/testing";
import { TripMemberMetadata } from "./member-row.component";
import { ApiService } from "~/services/api.service";
import { Mock } from "vitest";
import { BalancedCosts } from "~/models/balanced-costs.model";
import { TripMember } from "~/models/trip-member.model";
import qs from "qs";

describe("ActionCard", () => {
  let mockAction: Mock;

  const setUpRemixStub = (tripMembers: TripMemberMetadata[]) =>
    createRemixStub([
      {
        path: "/",
        Component: () => <ActionCard tripMembers={tripMembers} />,
        action: (...args: any[]) => mockAction(...args),
      },
    ]);

  beforeEach(() => {
    mockAction = vi.fn().mockResolvedValue(null);
  });

  it("should render a go button", async () => {
    const RemixStub = setUpRemixStub([]);
    render(<RemixStub />);

    const go = await screen.findByText("Go");
    expect(go).toBeDefined();
  });

  it("should perform the calculation when the go button is clicked", async () => {
    const tripMembers = [
      {
        name: "Member 1",
        spent: 1,
        isEditing: false,
      },
      {
        name: "Member 2",
        spent: 2,
        isEditing: false,
      },
    ];
    const RemixStub = setUpRemixStub(tripMembers);
    render(<RemixStub />);

    const go = await screen.findByText("Go");
    go.click();

    expect(mockAction).toHaveBeenCalled();
  });

  it("should disable the go button", async () => {
    const RemixStub = setUpRemixStub([
      {
        name: "Member 1",
        spent: 1,
        isEditing: true,
      },
    ]);
    render(<RemixStub />);

    const go = await screen.findByText("Go");
    go.click();

    expect(mockAction).not.toHaveBeenCalled();
  });
});

let mockBalanceCosts: Mock;
const mockApiService: any = {
  balanceCosts: (...args: any[]) => mockBalanceCosts(...args),
};

vi.mock("tsyringe", async () => ({
  ...(await vi.importActual("tsyringe")),
  container: {
    resolve: (type: any) => {
      if (type == ApiService) {
        return mockApiService;
      }

      throw new Error(`No DI mock configured for ${type}`);
    },
  },
}));

describe("goAction", () => {
  const balancedCostsResponse: BalancedCosts = {
    owedMoney: [
      {
        recipient: {
          name: "Member 1",
          spent: 12.34,
        },
        giver: {
          name: "Member 2",
          spent: 12.34,
        },
        amount: 1.23,
      },
    ],
  };

  beforeEach(() => {
    mockBalanceCosts = vi.fn().mockResolvedValue(balancedCostsResponse);
  });

  it("should balance costs", async () => {
    const tripMembers = [
      { name: "Member 1", spent: 12.34 },
      { name: "Member 2", spent: 56.78 },
    ];
    const request = buildFakeRequest(tripMembers);

    const result = (await goAction({ request } as any)) as Response;

    expect(await result.json()).toEqual(balancedCostsResponse);
    expect(mockBalanceCosts).toBeCalledWith(
      tripMembers.map((m) => ({ ...m, spent: m.spent.toString() }))
    );
  });

  const buildFakeRequest = (content: TripMember[]) => ({
    text: () =>
      Promise.resolve(
        qs.stringify({
          members: content,
        })
      ),
  });
});
