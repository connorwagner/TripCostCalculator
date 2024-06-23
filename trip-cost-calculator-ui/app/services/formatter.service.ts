export class FormatterService {
  static formatMoney(
    amount: number,
    options?: Partial<FormatMoneyOptions>
  ): string {
    const { omitCurrencySymbol } = { ...defaultFormatMoneyOptions, ...options };

    const dollarFormat = Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    let formatted = dollarFormat.format(amount);

    if (omitCurrencySymbol) {
      formatted = formatted.replace("$", "");
    }

    return formatted;
  }
}

export type FormatMoneyOptions = {
  omitCurrencySymbol: boolean;
};

const defaultFormatMoneyOptions: FormatMoneyOptions = {
  omitCurrencySymbol: false,
};
