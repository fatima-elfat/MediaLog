/**
 * Utility functions for common operations across the application.
 */

/**
 * Capitalizes the first letter of a string.
 * 
 * @param {string} str - The string to capitalize
 * @returns {string} The capitalized string
 */
export const capitalize = (str) => {
  if (typeof str !== 'string' || str.length === 0) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Formats a number as a percentage with specified decimal places.
 * 
 * @param {number} value - The value to format
 * @param {number} total - The total value for percentage calculation
 * @param {number} decimals - Number of decimal places (default: 0)
 * @returns {string} The formatted percentage string
 */
export const formatPercentage = (value, total, decimals = 0) => {
  if (typeof value !== 'number' || typeof total !== 'number' || total === 0) {
    return '0%';
  }
  const percentage = (value / total) * 100;
  return `${percentage.toFixed(decimals)}%`;
};

/**
 * Debounces a function call to limit the rate of execution.
 * 
 * @param {Function} func - The function to debounce
 * @param {number} wait - The delay in milliseconds
 * @returns {Function} The debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Validates an email address using a simple regex pattern.
 * 
 * @param {string} email - The email address to validate
 * @returns {boolean} True if email is valid, false otherwise
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Safely parses JSON string and returns the parsed object or null.
 * 
 * @param {string} jsonString - The JSON string to parse
 * @returns {Object|null} The parsed object or null if parsing fails
 */
export const safeJsonParse = (jsonString) => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.warn('Failed to parse JSON:', error);
    return null;
  }
}; 