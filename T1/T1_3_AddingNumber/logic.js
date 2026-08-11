function validateInput(array, number) {
  if (number === null || typeof number !== "number" || Number.isNaN(number))  throw new Error("Target number can only be a number.");
  if (array === null || !Array.isArray(array)) throw new Error("First argument must be an array.");
}
function validateMember(member){
  return typeof member === "number" && !Number.isNaN(member);
}

function findNumber(array, number){
  validateInput(array, number);
  const leftNumbers = new Set();
  for (const i of array ){
    if (!validateMember(i)) throw new Error("Array can only consist of numbers.");
    const left = number - i;
    
    if (leftNumbers.has(left)) {
      return true;
    }
    leftNumbers.add(i);
  } 
  return false; 
}
module.exports = { findNumber };