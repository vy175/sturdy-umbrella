// ============================================================================
// TASK 1.3: Find Sum Pair (Two Sum Variant)
// ============================================================================

/**
 * Validates that the core inputs are of the correct types.
 * Throws clean, user-friendly errors if validation fails.
 */
function validateInput(array, number) {
  if (number === null || typeof number !== "number" || Number.isNaN(number))  throw new Error("Target number can only be a number.");
  if (array === null || !Array.isArray(array)) throw new Error("First argument must be an array.");
}
/**
 * Helper to check if an individual array element is a valid number.
 */
function validateMember(member){
  return typeof member === "number" && !Number.isNaN(member);
}
/**
 * SOLUTION: Using a Hash Set (Prioritizing Performance & Time Complexity)
 * Time Complexity: O(N) | Space Complexity: O(N)
 * 
 * Note: I chose this as the primary solution because using a Hash Set is the most 
 * optimal approach for the "Two Sum" problem. It allows us to find a matching 
 * pair in a single pass of the array, avoiding nested loops.
 */
function findNumber(array, number){
  validateInput(array, number);
  const leftNumbers = new Set();
  for (const i of array ){
    if (!validateMember(i)) throw new Error("Array can only consist of numbers.");
    const left = number - i;
    
    if (leftNumbers.has(left)) {
      return true;
    }
    leftNumbers.add(i);
  } 
  return false; 
}
module.exports = { findNumber };