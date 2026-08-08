const assert = require('assert');
const { arrangeCharacters } = require('./T1_1');

console.log("⏳ Running tests for Task 1.1...");

try {
  // 1. Test standard lowercase sorting
  assert.strictEqual(arrangeCharacters("webmaster"), "abeemrstw");
  
  // 2. Test aAbB custom sorting
  assert.strictEqual(arrangeCharacters("BbaA"), "aAbB");
  
  // 3. Test that it catches numbers (Should throw an error)
  assert.throws(() => {
    arrangeCharacters("webmaster123");
  }, /String must contain only alphabets/);

  // 4. Test that it catches empty strings (Should throw an error)
  assert.throws(() => {
    arrangeCharacters("   ");
  }, /String cannot be empty/);

  console.log("✅ All tests passed successfully!");

} catch (error) {
  console.error("❌ A test failed!");
  console.error(`Expected: ${error.expected}`);
  console.error(`Actual:   ${error.actual}`);
}