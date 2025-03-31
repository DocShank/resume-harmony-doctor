
/**
 * Generates a unique ID string
 * @returns {string} Unique ID
 */
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};
