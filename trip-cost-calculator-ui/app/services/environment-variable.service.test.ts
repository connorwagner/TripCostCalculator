import { EnvironmentVariableService } from "./environment-variable.service";

describe("EnvironmentVariableService", () => {
  describe("get", () => {
    it("should return a value from env vars", () => {
      const varName = "TestEnvVar";
      const value = "test var value";
      process.env[varName] = value;

      const result = EnvironmentVariableService.get(varName);
      expect(result).toEqual(value);

      delete process.env[varName];
    });

    it("should throw on missing values", () => {
      const varName = "TestEnvVar";
      delete process.env[varName];

      expect(() => EnvironmentVariableService.get(varName)).throws(
        `Missing required environment variable: ${varName}`
      );
    });
  });
});
