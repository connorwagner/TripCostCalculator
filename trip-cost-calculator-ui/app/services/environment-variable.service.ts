export class EnvironmentVariableService {
  static get(varName: string): string {
    const rawValue = process.env[varName];
    if (!rawValue) {
      throw new Error(`Missing required environment variable: ${varName}`);
    }

    return rawValue;
  }
}
