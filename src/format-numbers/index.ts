export type FormatFnType = (
  value: number,
  formatOptions?: IFormatCurrencyOptions
) => string;

export interface IFormatNumberOptions {
  locale?: string;
  fraction?: number;
  emptyFormat?: string;
  isShorten?: boolean;
  shortenFraction?: number;
  zeroIsEmpty?: boolean;
}

function formatNumber(
  number: number,
  locale: string,
  options?: Intl.NumberFormatOptions
) {
  return new Intl.NumberFormat(locale, options).format(number);
}

export interface IFormatCurrencyOptions extends IFormatNumberOptions {
  currency?: string;
}

export const formatCurrency: FormatFnType = (value, formatOptions = {}) => {
  const {
    locale = 'en-EN',
    currency = 'USD',
    fraction = 2,
    emptyFormat = "",
    zeroIsEmpty
  } = formatOptions;

  if (Number.isFinite(value)) {
    if (zeroIsEmpty && value === 0) {
      return emptyFormat;
    }

    const options = Object.assign(
      {},
      {
        currency,
        style: "currency",
        minimumFractionDigits: fraction,
        maximumFractionDigits: fraction
      }
    );

    return formatNumber(value, locale, options);
  }

  return emptyFormat;
};

export const formatPercent: FormatFnType = (value, formatOptions = {}) => {
  const {
    locale = 'en-EN',
    fraction = 0,
    emptyFormat = "",
    zeroIsEmpty
  } = formatOptions;

  if (Number.isFinite(value)) {
    if (zeroIsEmpty && value === 0) {
      return emptyFormat;
    }

    const options = Object.assign(
      {},
      {
        style: "percent",
        minimumFractionDigits: fraction,
        maximumFractionDigits: fraction
      }
    );

    return formatNumber(value, locale, options);
  }

  return emptyFormat;
};

export const formatDecimal: FormatFnType = (value, formatOptions = {}) => {
  const {
    locale = 'en-EN',
    fraction = 0,
    emptyFormat = "",
    isShorten,
    shortenFraction,
    zeroIsEmpty
  } = formatOptions;

  if (Number.isFinite(value)) {
    if (zeroIsEmpty && value === 0) {
      return emptyFormat;
    }

    const options: Intl.NumberFormatOptions = {};

    if (Number.isFinite(fraction)) {
      options.minimumFractionDigits = fraction;
      options.maximumFractionDigits = fraction;
    }

    if (isShorten) {
      const shortenOptions: Intl.NumberFormatOptions = {};

      if (Number.isFinite(shortenFraction)) {
        shortenOptions.minimumFractionDigits = shortenFraction;
        shortenOptions.maximumFractionDigits = shortenFraction;
      }

      if (value >= 1000000) {
        return `${formatNumber(
          value / 1000000,
          locale,
          Object.assign(
            {},
            {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            },
            shortenOptions
          )
        )}m`;
      }

      if (value >= 10000) {
        return `${formatNumber(
          value / 1000,
          locale,
          Object.assign(
            {},
            {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            },
            shortenOptions
          )
        )}k`;
      }
    }

    return formatNumber(value, locale, options);
  }

  return emptyFormat;
};