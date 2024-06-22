import { ApiService } from "./api.service";
import { EnvironmentVariableService } from "./environment-variable.service";
import { TripMember } from "~/models/trip-member.model";

describe("ApiService", () => {
  const baseUrl = "http://fake.url";

  let service: ApiService;

  beforeEach(() => {
    vi.spyOn(EnvironmentVariableService, "get").mockReturnValue(baseUrl);

    service = new ApiService();
  });

  it("should construct", () => {
    expect(service).toBeDefined();
  });

  describe("balanceCosts", () => {
    const mockedResponse: any = {
      status: 200,
      errors: null,
      data: [
        {
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
              amount: 12.34,
            },
          ],
        },
      ],
    };

    const mockedErrorResponse: any = {
      status: 400,
      errors: [
        {
          message: "test error",
        },
      ],
      data: undefined,
    };

    const tripMembers: TripMember[] = [
      { name: "Member 1", spent: 12.34 },
      { name: "Member 2", spent: 56.78 },
    ];

    it("should get a result from the API", async () => {
      fetchMock.doMockIf(
        `${baseUrl}/calculation/v1/balance-costs`,
        JSON.stringify(mockedResponse)
      );

      const result = await service.balanceCosts(tripMembers);

      expect(result).toEqual(mockedResponse.data);
    });

    it("should throw on nonsuccess status codes", async () => {
      fetchMock.doMockIf(
        `${baseUrl}/calculation/v1/balance-costs`,
        mockedErrorResponse
      );

      await expect(() => service.balanceCosts(tripMembers)).rejects.toThrow();
    });
  });
});
