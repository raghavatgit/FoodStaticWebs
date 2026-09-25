// Localized Currency Formatter
// Formats pricing dynamically using native browser Intl.NumberFormat.

export class CurrencyFormatter {
    private formatter: Intl.NumberFormat;
    private currencyCode: string;

    constructor(locale = 'en-IN', currencyCode = 'INR') {
        this.currencyCode = currencyCode;
        this.formatter = new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currencyCode,
            maximumFractionDigits: 2
        });
    }

    public format(amount: number): string {
        return this.formatter.format(amount);
    }

    public updateLocale(locale: string, currencyCode: string): void {
        this.currencyCode = currencyCode;
        this.formatter = new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currencyCode,
            maximumFractionDigits: 2
        });
    }
}
