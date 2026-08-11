const readline = require('readline');
const { findNumber } = require('./logic');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("==================================================");
console.log("Welcome to the Task 1.3 Interactive Tester");
console.log("Type 'exit' to quit the application.");
console.log("==================================================\n");

function parseInput(input){
  return input.split(';').map(Number);
}
function askQuestion(query) {
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      resolve(answer.trim());
    });
  });
}
async function askForInput() {
  while (true) {
    try {
      // 1. Get the list of numbers
      const numberInput = await askQuestion('👉 Enter a string of numbers separated by semicolons: ');
      
      if (numberInput.toLowerCase() === 'exit') {
        break;
      }
      
      const numbers = parseInput(numberInput);

      // 2. Get the target number
      const targetInput = await askQuestion('👉 Enter a target number: ');
      
      if (targetInput.toLowerCase() === 'exit') {
        break;
      }

      const target = Number(targetInput);
      
      const result = findNumber(numbers, target);
      console.log(`   ✅ [Output] : "${result}"\n`);

    } catch (error) {
      console.error(`   ❌ Error: ${error.message}\n`);
    }
  }
  console.log("👋 Goodbye!");
  rl.close();
}

askForInput();
