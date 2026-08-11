// ============================================================================
// TASK 1.1: Arrange Characters
// ============================================================================

/**
 * Validates that the input is a non-empty, alphabet-only string.
 */
function validateAlphaString(input) {
  if (typeof input !== 'string') throw new TypeError("Input must be a string.");
  if (input.trim() === '') throw new Error("String cannot be empty.");
  if (!/^[a-zA-Z]+$/.test(input)) throw new Error("String must contain only alphabets.");
}

/**
 * MAIN SOLUTION: Using built-in sort (Prioritizing Maintainability)
 * Time Complexity: O(N log N) | Space Complexity: O(N)
 * 
 * Note: I chose this as the primary solution because it is highly readable, 
 * easily maintainable, and handles future requirements (like adding numbers 
 * or foreign characters) gracefully.
 */
function arrangeCharacters(str) {
  validateAlphaString(str);

  return str.split('').sort((a, b) => {
    const lowerA = a.toLowerCase();
    const lowerB = b.toLowerCase();
    if (lowerA === lowerB) return a > b ? -1 : 1; 
    return lowerA < lowerB ? -1 : 1;
  }).join('');
}

// ----------------------------------------------------------------------------
// ALTERNATIVE SOLUTION: Counting Sort (Prioritizing Performance)
// Time Complexity: O(N) | Space Complexity: O(1)
//
// Note: If this function were running in a high-performance environment 
// (e.g., sorting massive strings where CPU cycles matter), I would use this 
// Counting Sort approach. It eliminates the O(N log N) bottleneck but sacrifices 
// some readability and flexibility.
// ----------------------------------------------------------------------------
function arrangeCharactersOptimized(str) {
  validateAlphaString(str);

  const lowerCounts = new Array(26).fill(0);
  const upperCounts = new Array(26).fill(0);

  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    if (charCode >= 97 && charCode <= 122) lowerCounts[charCode - 97]++;
    else if (charCode >= 65 && charCode <= 90) upperCounts[charCode - 65]++;
  }

  let result = '';
  for (let i = 0; i < 26; i++) {
    if (lowerCounts[i] > 0) result += String.fromCharCode(i + 97).repeat(lowerCounts[i]);
    if (upperCounts[i] > 0) result += String.fromCharCode(i + 65).repeat(upperCounts[i]);
  }

  return result;
}

// Exporting the main solution
module.exports = { arrangeCharacters, arrangeCharactersOptimized};