/**
 * Formats a number to a string according to the locale and formatting options.
 * @param {number} value
 * @param {object} options
 * @returns string
 */
export function formatNumber(value, params = {}) {
  const { locale = "en-US", fraction = 0, isShorten = false } = params;

  if (!Number.isFinite(value)) {
    throw new Error(`Param ${value} in not a number`);
  }

  const options = {
    maximumFractionDigits: fraction,
    minimumFractionDigits: fraction,
  };

  if (isShorten) {
    options.notation = "compact";
    options.compactDisplay = "short";
  }

  return new Intl.NumberFormat(locale, options).format(value);
}
