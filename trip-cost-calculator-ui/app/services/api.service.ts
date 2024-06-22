import { BalancedCosts } from "~/models/balanced-costs.model";
import { TripMember } from "~/models/trip-member.model";
import { injectable } from "tsyringe";

@injectable()
export class ApiService {
  async balanceCosts(tripMembers: TripMember[]): Promise<BalancedCosts> {
    const result = await this.sendRequest<TripMember[], BalancedCosts>(
      "/calculation/v1/balance-costs",
      HttpMethod.POST,
      tripMembers
    );

    return result;
  }

  private async sendRequest<D, R>(
    urlPart: string,
    method: HttpMethod,
    data?: D
  ): Promise<R> {
    // TODO: env config for base url
    const result = await fetch(`http://localhost:5206${urlPart}`, {
      method,
      body: JSON.stringify({ data }),
      headers: { "Content-Type": "application/json" },
    });

    if (result.status !== HttpStatus.OK) {
      throw new ApiError(result);
    }

    const body = (await result.json()) as ApiResponse<R>;

    // TODO: inspect status and errors from result
    // (how does that interact with the status check above?)
    return body.data;
  }
}

export class ApiError extends Error {
  constructor(public readonly response: Response) {
    super(response.statusText);
  }
}

interface ApiResponse<T> {
  status: number;
  errors: ApiResponseError[] | null;
  data: T;
}

interface ApiResponseError {
  type: string | null;
  message: string | null;
  source: string | null;
  stackTrace: string | null;
  innerException: ApiResponseError | null;
}

enum HttpStatus {
  OK = 200,
}

enum HttpMethod {
  POST = "POST",
}
