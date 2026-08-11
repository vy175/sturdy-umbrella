const assert = require('assert');
const { findNumber } = require('./logic');

console.log("⏳ Running comprehensive tests for Task 1.3 (Two-Sum Map Lookup)...");

const validCases = [
  { 
    array: [10, 15, 3, 7], 
    number: 17, 
    expected: true, 
    desc: "Standard test case (10 + 7 = 17)" 
  },
  { 
    array: [4, 5], 
    number: 8, 
    expected: false, 
    desc: "Cannot reuse the same element (4 + 4 = 8)" 
  },
  { 
    array: [-3, 4, 3, 9], 
    number: 0, 
    expected: true, 
    desc: "Handles negative numbers (-3 + 3 = 0)" 
  },
  { 
    array: [1.5, 2.5, 5], 
    number: 4, 
    expected: true, 
    desc: "Handles floating point numbers (1.5 + 2.5 = 4)" 
  },
  { 
    array: [5], 
    number: 10, 
    expected: false, 
    desc: "Single-element array cannot form a pair" 
  },
  { 
    array: [], 
    number: 10, 
    expected: false, 
    desc: "Empty array should return false" 
  }
];

const invalidCases = [
  { 
    array: "not an array", 
    number: 17, 
    desc: "First argument is a string type instead of array" 
  },
  { 
    array: [10, 15], 
    number: "17", 
    desc: "Target number is a string" 
  },
  { 
    array: [10, "15", 3], 
    number: 17, 
    desc: "Array contains a string member" 
  },
  { 
    array: [10, NaN, 3], 
    number: 17, 
    desc: "Array contains a NaN member" 
  },
  { 
    array: [10, 15], 
    number: NaN, 
    desc: "Target number is NaN" 
  },
  { 
    array: [10, 15], 
    number: undefined, 
    desc: "Target number is undefined" 
  }
];

let passed = 0;
let failed = 0;

function runTestSuite(algorithmName, algorithmFunction) {
  console.log(`\n▶ Testing Algorithm: ${algorithmName}`);
  console.log("--------------------------------------------------");

  // Run Valid Cases
  validCases.forEach(({ array, number, expected, desc }) => {
    try {
      const result = algorithmFunction(array, number);
      assert.strictEqual(result, expected);
      console.log(`✅ PASS: ${desc}`);
      passed++;
    } catch (err) {
      console.error(`❌ FAIL: ${desc}`);
      console.error(`   Expected: ${expected} | Actual: ${err.actual !== undefined ? err.actual : err.message}`);
      failed++;
    }
  });

  // Run Invalid Cases
  invalidCases.forEach(({ array, number, desc }) => {
    try {
      assert.throws(() => algorithmFunction(array, number));
      console.log(`✅ PASS: Successfully rejected ${desc}`);
      passed++;
    } catch (err) {
      console.error(`❌ FAIL: Did not throw expected error for ${desc}`);
      failed++;
    }
  });
}

// Execute tests
try {
  runTestSuite("O(N) Hash Set Solution", findNumber);

  console.log("\n==================================================");
  if (failed === 0) {
    console.log(`🎉 ALL TESTS PASSED SUCCESSFULLY! (${passed} assertions passed)`);
  } else {
    console.error(`⚠️  TEST RUN FINISHED: ${failed} Failed`);
  }
} catch (error) {
  console.error("Critical testing framework error:", error);
}
