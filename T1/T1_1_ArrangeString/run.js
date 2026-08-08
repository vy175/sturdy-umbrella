const readline = require('readline');
const { arrangeCharacters, arrangeCharactersOptimized } = require('./logic');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("==================================================");
console.log("Welcome to the Task 1.1 Interactive Tester");
console.log("Type 'exit' to quit the application.");
console.log("==================================================\n");

// Create a function that asks the user for input and loops itself
function askForInput() {
  rl.question('👉 Enter a string to sort: ', (input) => {
    
    // Check if the user wants to quit
    if (input.trim().toLowerCase() === 'exit') {
      console.log("👋 Goodbye!");
      rl.close(); 
      return;
    }

    try {
      // Process the input through both functions
      const resultMain = arrangeCharacters(input);
      const resultOptimized = arrangeCharactersOptimized(input);

      // Print the results
      console.log(`   ✅ [Main]      : "${resultMain}"`);
      console.log(`   ✅ [Optimized] : "${resultOptimized}"\n`);

    } catch (error) {
      // Print validation errors gracefully without crashing the app
      console.error(`   ❌ Error: ${error.message}\n`);
    }

    // Call the function again to create a continuous loop
    askForInput();
  });
}

// Start the loop
askForInput();