/**
 * Returns a formatted date string in the format "yyyy/dd/mm".
 * @param {Date} date - The date object to be formatted.
 * @returns {string} The formatted date string.
 */
export const getFormattedDate = (date) => {
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
};
