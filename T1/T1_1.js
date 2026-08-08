// ============================================================================
// TASK 1.1: Arrange Characters
// ============================================================================

function validateAlphaString(input) {
  if (typeof input !== 'string') throw new TypeError("Input must be a string.");
  if (input.trim() === '') throw new Error("String cannot be empty.");
  if (!/^[a-zA-Z]+$/.test(input)) throw new Error("String must contain only alphabets.");
}

function arrangeCharacters(str) {
  validateAlphaString(str);

  return str.split('').sort((a, b) => {
    const lowerA = a.toLowerCase();
    const lowerB = b.toLowerCase();
    if (lowerA === lowerB) return a > b ? -1 : 1; 
    return lowerA < lowerB ? -1 : 1;
  }).join('');
}

module.exports = { arrangeCharacters };