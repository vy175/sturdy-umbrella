// ============================================================================
// TASK 1.2: Run-Length Encoding
// ============================================================================

/**
 * Validates that the input is a non-empty, alphabet-only string.
 */
function validateAlphaString(input) {
  if (typeof input !== 'string') throw new TypeError("Input must be a string.");
  if (input.trim() === '') throw new Error("String cannot be empty.");
  if (!/^[A-Z]+$/.test(input)) throw new Error("String must contain only Uppercase alphabets.");
}

function runLengthEncode(str) {
  validateAlphaString(str);
  let result = '';
  let count = 1;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === str[i + 1]) {
      count++;
    } else {
      if (count === 1) {
        result += str[i];
      } else {
        result += count + str[i];
      }
      // Reset the count back to 1 for the next brand-new letter
      count = 1;
    }
  }
  return result;
}


module.exports = { runLengthEncode };