/**
 * Formats the given amount as a currency string in USD format.
 *
 * @param {number} amount - The amount to be formatted.
 * @returns {string} The formatted currency string.
 */
export default (amount) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formatter.format(amount);
};
