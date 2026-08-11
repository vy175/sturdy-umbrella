const assert = require('assert');
const { arrangeCharacters, arrangeCharactersOptimized } = require('./logic');

console.log("⏳ Running comprehensive tests for Task 1.1...");

// 1. Define Valid Test Cases (Input -> Expected Output)
const validCases = [
  { input: "webmaster", expected: "abeemrstw", desc: "Standard lowercase" },
  { input: "BbaA", expected: "aAbB", desc: "Mixed case custom sorting (aAbB)" },
  { input: "SAMPLE", expected: "AELMPS", desc: "All uppercase" },
  { input: "Z", expected: "Z", desc: "Single character" },
  { input: "aAbBcC", expected: "aAbBcC", desc: "Already sorted mixed case" },
  { input: "zyxwvutsrqponmlkjihgfedcba", expected: "abcdefghijklmnopqrstuvwxyz", desc: "Full reversed alphabet" }
];

// 2. Define Invalid Test Cases (Inputs that should throw errors)
const invalidCases = [
  { input: "webmaster123", desc: "Contains numbers" },
  { input: "Sample!", desc: "Contains special characters" },
  { input: "", desc: "Empty string" },
  { input: "   ", desc: "Only whitespace" },
  { input: 123, desc: "Number type instead of string" },
  { input: null, desc: "Null value" }
];

let passed = 0;
let failed = 0;

// Reusable testing logic for any algorithm passed into it
function runTestSuite(algorithmName, algorithmFunction) {
  console.log(`\n▶ Testing Algorithm: ${algorithmName}`);
  console.log("--------------------------------------------------");

  // Run Valid Cases
  validCases.forEach(({ input, expected, desc }) => {
    try {
      assert.strictEqual(algorithmFunction(input), expected);
      console.log(`✅ PASS: ${desc} ("${input}" -> "${expected}")`);
      passed++;
    } catch (err) {
      console.error(`❌ FAIL: ${desc}`);
      console.error(`   Expected: ${expected} | Actual: ${err.actual}`);
      failed++;
    }
  });

  // Run Invalid Cases
  invalidCases.forEach(({ input, desc }) => {
    try {
      // We expect the function to throw an error for these inputs
      assert.throws(() => algorithmFunction(input));
      console.log(`✅ PASS: Successfully rejected ${desc}`);
      passed++;
    } catch (err) {
      console.error(`❌ FAIL: Did not throw expected error for ${desc}`);
      failed++;
    }
  });
}

// Execute tests for both algorithms
try {
  runTestSuite("Main Solution (Built-in Sort)", arrangeCharacters);
  runTestSuite("Optimized Solution (Counting Sort)", arrangeCharactersOptimized);

  // Final Test Report
  console.log("\n==================================================");
  if (failed === 0) {
    console.log(`🎉 ALL ${passed} TESTS PASSED SUCCESSFULLY!`);
  } else {
    console.error(`⚠️  TEST RUN FINISHED: ${passed} Passed | ${failed} Failed`);
  }
} catch (error) {
  console.error("Critical testing framework error:", error);
}