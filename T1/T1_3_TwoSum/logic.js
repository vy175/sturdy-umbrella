// ============================================================================
// TASK 1.3: Two Sum
// ============================================================================

/**
 * VALIDATES THE INPUTS
 */
function validateInput(nums,target){
    if (!Array.isArray(nums)) throw new TypeError("Input must be an array.");
    if (typeof target !== 'number') throw new TypeError("Target must be a number.");
    if(nums.length < 2) throw new Error("Array must contain at least two numbers.");
    for (let i = 0; i < nums.length; i++) {
        if (typeof nums[i] !== 'number') throw new TypeError("Array must contain only numbers.");
    }
}

/**
 * MAIN SOLUTION: Uses hash map to find the two numbers that add up to the target.
 * Time Complexity: O(N) | Space Complexity: O(N)
 */
function twoSum(numbers){
    validateInput(nums,target);
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    throw new Error("No solution found");
}

function twoSumOptimized(nums,target){
    validateInput(nums,target);
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    throw new Error("No solution found");
}

module.exports = { twoSum, twoSumOptimized };