/**
 * updateObject is a simple utility method for a reducer when updating state
 * @param {object} oldObject
 * @param {object} updatedProperties
 * @returns {object} the new state
 */
export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};
