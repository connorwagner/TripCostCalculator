import { FormatterService } from "./formatter.service";

describe("FormatterService", () => {
  describe("formatMoney", () => {
    it("should format numbers to currency format", () => {
      const input = 1234.56;
      const expectedOutput = "$1,234.56";

      const result = FormatterService.formatMoney(input);
      expect(result).toEqual(expectedOutput);
    });

    it("should remove the leading $ if requested", () => {
      const input = 1234.56;
      const expectedOutput = "1,234.56";

      const result = FormatterService.formatMoney(input, {
        omitCurrencySymbol: true,
      });
      expect(result).toEqual(expectedOutput);
    });
  });
});
