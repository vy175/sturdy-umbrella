const assert = require('assert');
const { runLengthEncode } = require('./logic');

console.log("⏳ Running comprehensive tests for Task 1.2 (Run-length Encoding)...");

// 1. Define Valid Test Cases (Input -> Expected Output)
const validCases = [
  { input: "AABBBCCCCCAADDDD", expected: "2A3B5C2A4D", desc: "Standard test case 1" },
  { input: "PPPQRRRSTTQQS", expected: "3PQ3RS2T2QS", desc: "Standard test case 2 (Single letters untouched)" },
  { input: "XYZ", expected: "XYZ", desc: "Standard test case 3 (All single letters)" },
  { input: "A", expected: "A", desc: "Single character string" },
  { input: "ZZZZZ", expected: "5Z", desc: "Single repeating character" }
];

// 2. Define Invalid Test Cases (Inputs that should throw errors)
const invalidCases = [
  { input: "AABBBcCCCC", desc: "Contains lowercase letters" },
  { input: "AABBB123", desc: "Contains numbers" },
  { input: "AA BBB", desc: "Contains spaces" },
  { input: "", desc: "Empty string" },
  { input: 123, desc: "Number type instead of string" }
];

let passed = 0;
let failed = 0;

function runTestSuite(algorithmName, algorithmFunction) {
  console.log(`\n▶ Testing Algorithm: ${algorithmName}`);
  console.log("--------------------------------------------------");

  // Run Valid Cases
  validCases.forEach(({ input, expected, desc }) => {
    try {
      assert.strictEqual(algorithmFunction(input), expected);
      console.log(`✅ PASS: ${desc}`);
    } catch (err) {
      console.error(`❌ FAIL: ${desc}`);
      console.error(`   Expected: ${expected} | Actual: ${err.actual}`);
      failed++;
    }
  });

  // Run Invalid Cases
  invalidCases.forEach(({ input, desc }) => {
    try {
      assert.throws(() => algorithmFunction(input));
      console.log(`✅ PASS: Successfully rejected ${desc}`);
    } catch (err) {
      console.error(`❌ FAIL: Did not throw expected error for ${desc}`);
      failed++;
    }
  });
}

// Execute tests
try {
  runTestSuite("O(N) For Loop Solution", runLengthEncode);

  console.log("\n==================================================");
  if (failed === 0) {
    console.log(`🎉 ALL TESTS PASSED SUCCESSFULLY!`);
  } else {
    console.error(`⚠️  TEST RUN FINISHED: ${failed} Failed`);
  }
} catch (error) {
  console.error("Critical testing framework error:", error);
}