import { BalancedCosts } from "~/models/balanced-costs.model";
import { TripMember } from "~/models/trip-member.model";
import { injectable } from "tsyringe";
import { EnvironmentVariableService } from "./environment-variable.service";

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

  private readonly baseUrl = EnvironmentVariableService.get("ApiBaseUrl");

  private async sendRequest<D, R>(
    urlPart: string,
    method: HttpMethod,
    data?: D
  ): Promise<R> {
    const result = await fetch(`${this.baseUrl}${urlPart}`, {
      method,
      body: JSON.stringify({ data }),
      headers: { "Content-Type": "application/json" },
    });

    if (result.status >= 300) {
      throw new ApiError({
        status: result.status,
        errors: [
          {
            message: result.statusText,
            type: null,
            source: null,
            stackTrace: null,
            innerException: null,
          },
        ],
        data: undefined,
      });
    }

    const body = (await result.json()) as ApiResponse<R>;

    if (body.status >= 300 || body.errors) {
      throw new ApiError(body as ApiResponse<undefined>);
    }

    return body.data;
  }
}

export class ApiError extends Error {
  constructor(public readonly response: ApiResponse<undefined>) {
    const accumulatedErrorMessages = response.errors?.reduce(
      (acc, cur) => `${acc} | ${cur}`,
      ""
    );

    super(`Status ${response.status}: ${accumulatedErrorMessages}`);
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

enum HttpMethod {
  POST = "POST",
}
