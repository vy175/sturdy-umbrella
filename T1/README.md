# 🚀 Algorithmic Suite (Tasks 1.1 - 1.3)

Welcome to the collection of JavaScript programming assignments for Tasks 1.1, 1.2, and 1.3. This codebase contains optimized, production-grade solutions to standard algorithmic problems, complete with interactive command-line testers, automated validation assertions, and clear documentation of architectural trade-offs.

---

## 📂 Repository Structure

The suite is structured cleanly into tasks. Each task lives in its own folder and contains three distinct components:
1. **`logic.js`** — Core algorithm containing business rules, input sanitization, and performance optimizations.
2. **`run.js`** — Interactive Command Line Interface (CLI) allowing manual testing.
3. **`test.js`** — Assertion test cases to verify standard execution and validation handling.

```bash
├── Task_1.1/
│   ├── logic.js    # Character Sorting (Standard vs. Counting Sort)
│   ├── run.js      # CLI String Sorter
│   └── test.js     # Automated Test Suite
│
├── Task_1.2/
│   ├── logic.js    # Run-Length Encoding (RLE) String Compressor
│   ├── run.js      # CLI String Compressor
│   └── test.js     # Automated Test Suite
│
└── Task_1.3/
    ├── logic.js    # Target Sum Matcher (Hash Set vs. Brute Force)
    ├── run.js      # CLI Async/Await Number Matcher
    └── test.js     # Automated Test Suite

# 🛠️ Getting Started

This project is built using **vanilla Node.js**. It has **zero dependencies**, meaning you do not need to run `npm install` to get started.

## Prerequisites

- Node.js installed
- Node.js `v16.0.0` or higher is recommended

---

# 📋 Comprehensive Task Specifications

## 🔠 Task 1.1: Arrange Characters

Organizes alphabetic input characters alphabetically. It ensures that uppercase and lowercase variants of the same character are grouped together, prioritizing lowercase first (e.g., `a` before `A`).

### Main Algorithm: Array Comparator

- **Complexity:** Time: `O(N log N)` | Space: `O(N)`
- **Best for:** Maintainability and flexibility. Readily handles expansion to digits or special characters.

### Optimized Algorithm: Counting Sort

- **Complexity:** Time: `O(N)` | Space: `O(1)`
- **Best for:** Processing massive strings in performance-critical execution loops.

---

## 🗜️ Task 1.2: Run-Length Encoder

A classic lossless compression algorithm representing adjacent repeating characters as a single character and its run frequency count.

### Example

```text
AAABBC → A3B2C1

### Algorithm: Single-Pass Linear Scan

- **Complexity:** Time: `O(N)` | Space: `O(N)`
- **Best for:** Processing streams of repeating data structures with minimum performance overhead.

---

## 🎯 Task 1.3: Find Sum Pair (Two-Sum Variant)

Evaluates if any two distinct indices in a given array of numbers can be summed together to equal a provided target value.

### Main Algorithm: Hash Set Lookup

- **Complexity:** Time: `O(N)` | Space: `O(N)`
- **Best for:** Maximum speed. It calculates target complements in a single pass of the array rather than using slow nested loops.

---

# 🎮 How to Run

## 1. Interactive Command-Line Testers (`run.js`)

These testers launch interactive command-line loops. Type your parameters to see outputs immediately, and type `exit` to close the connection.

### Run Task 1.1 — Character Sorter

```bash
node Task_1.1/run.js
### Run Task 1.2 — Run-Length Compressor

```bash
node Task_1.2/run.js

### Run Task 1.3 — Find Sum Pair (Two-Sum Variant)

```bash
node Task_1.3/run.js


## 2. Automated Test Suites (`test.js`)
Runs strict assertion suites containing:

- Positive cases
- Decimals
- Negative parameters
- Empty instances
- Invalid types
- NaN
- undefined
- Invalid arrays
- Clear exception handling

### Run Task 1.1 Tests
```bash
node Task_1.1/test.js

### Run Task 1.2 Tests
```bash
node Task_1.2/test.js

### Run Task 1.3 Tests
```bash
node Task_1.3/test.js

