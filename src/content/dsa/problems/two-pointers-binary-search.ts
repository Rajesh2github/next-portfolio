import { DSAProblem } from "@/types/dsa";

export const twoPointersBinarySearchProblems: DSAProblem[] = [
  {
    id: "tp-1",
    slug: "find-target-sum-pair",
    title: "Find Target Sum Pair",
    difficulty: "easy",
    patterns: ["Two Pointer"],
    topics: ["Arrays", "Two Pointer"],
    description: "Given a sorted array of integers `nums` and a target value `target`, check if there exists a pair of elements `(nums[i], nums[j])` where `i != j` such that their sum equals `target`. Return their 1-based indices as `[i, j]`. If no such pair exists, return an empty array.",
    examples: [
      {
        id: 1,
        input: "nums = [2, 7, 11, 15], target = 9",
        output: "[1, 2]",
        explanation: "nums[0] + nums[1] = 2 + 7 = 9. 1-based indices are [1, 2]."
      },
      {
        id: 2,
        input: "nums = [1, 2, 3, 4], target = 10",
        output: "[]",
        explanation: "No two numbers in the array add up to 10."
      }
    ],
    constraints: [
      "2 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "nums is sorted in ascending order.",
      "-10^9 <= target <= 10^9"
    ],
    hints: [
      "Since the array is already sorted, we can avoid the nested O(N^2) loops.",
      "Initialize two pointers: one at the start of the array and one at the end. Calculate their sum and adjust the pointers accordingly."
    ],
    importantConcepts: [
      "Two Pointer Technique",
      "Linear Search space reduction on sorted arrays"
    ],
    solutions: {
      javascript: {
        language: "javascript",
        code: `function findTargetSumPair(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    const sum = nums[left] + nums[right];
    if (sum === target) {
      return [left + 1, right + 1];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }
  return [];
}`,
        approach: "Use two pointers, `left` starting at 0 and `right` starting at `N-1`. Compare the sum `nums[left] + nums[right]` with the `target`. If it matches, return 1-based indices. If it's less, increment `left`; if it's more, decrement `right`.",
        explanation: "1. Initialize two pointers on opposite ends of the sorted array.\n2. In a loop, compute `sum = nums[left] + nums[right]`.\n3. Since the array is sorted, incrementing `left` always increases the sum and decrementing `right` always decreases it. This allows solving the problem in O(N) time with O(1) space.",
        timeComplexity: "O(N) since each element is visited at most once by either the left or right pointer.",
        spaceComplexity: "O(1) auxiliary space."
      },
      typescript: {
        language: "typescript",
        code: `function findTargetSumPair(nums: number[], target: number): number[] {
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    const sum = nums[left] + nums[right];
    if (sum === target) {
      return [left + 1, right + 1];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }
  return [];
}`,
        approach: "Two pointer lookup in TypeScript. Loop until the pointers meet, adjusting left or right based on the sum comparison.",
        explanation: "Same as JS with strong parameter and return types.",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)"
      },
      python: {
        language: "python",
        code: `def find_target_sum_pair(nums: list[int], target: int) -> list[int]:
    left = 0
    right = len(nums) - 1
    while left < right:
        current_sum = nums[left] + nums[right]
        if current_sum == target:
            return [left + 1, right + 1]
        elif current_sum < target:
            left += 1
        else:
            right -= 1
    return []`,
        approach: "Initialize pointers. While `left < right`, evaluate their sum. Shift `left` up on smaller sums, or `right` down on larger sums.",
        explanation: "Python implementation of Two-pointer. Uses basic integer indexing for constant O(1) comparisons inside the loop.",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)"
      },
      java: {
        language: "java",
        code: `public class Solution {
    public static int[] findTargetSumPair(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        while (left < right) {
            int sum = nums[left] + nums[right];
            if (sum == target) {
                return new int[]{left + 1, right + 1};
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
        return new int[0];
    }
}`,
        approach: "Write the linear two-pointer search on primitives in Java. Returns array inline or empty array allocation on mismatch.",
        explanation: "Fast execution with direct index boundaries and simple primitives without packaging objects.",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)"
      },
      cpp: {
        language: "cpp",
        code: `#include <vector>

class Solution {
public:
    std::vector<int> findTargetSumPair(const std::vector<int>& nums, int target) {
        int left = 0;
        int right = nums.size() - 1;
        while (left < right) {
            int sum = nums[left] + nums[right];
            if (sum == target) {
                return {left + 1, right + 1};
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
        return {};
    }
};`,
        approach: "Standard C++ linear scanning with vector of references. Return initial vector values directly when a match is found.",
        explanation: "Saves memory allocations by taking a constant reference vector and using stack integers for pointers.",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)"
      },
      go: {
        language: "go",
        code: `package main

func findTargetSumPair(nums []int, target int) []int {
	left := 0
	right := len(nums) - 1
	for left < right {
		sum := nums[left] + nums[right]
		if sum == target {
			return []int{left + 1, right + 1}
		} else if sum < target {
			left++
		} else {
			right--
		}
	}
	return []int{}
}`,
        approach: "Perform a linear scan using bounds in Go. Standard pointers step inward until sum is met or pointers cross.",
        explanation: "Standard slices are used. There are no allocations unless a valid pair is discovered.",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)"
      }
    }
  },
  {
    id: "bs-1",
    slug: "target-value-index-finder",
    title: "Target Value Index Finder",
    difficulty: "easy",
    patterns: ["Binary Search"],
    topics: ["Arrays", "Binary Search"],
    description: "Given a sorted array of unique integers `nums` and a target value `target`, search for `target` in the array. If `target` exists, return its 0-based index. Otherwise, return the index where it would be inserted if it were placed in order.",
    examples: [
      {
        id: 1,
        input: "nums = [1, 3, 5, 6], target = 5",
        output: "2",
        explanation: "5 is found at index 2."
      },
      {
        id: 2,
        input: "nums = [1, 3, 5, 6], target = 2",
        output: "1",
        explanation: "2 is not in the array. If inserted, it would be at index 1 to keep order: [1, 2, 3, 5, 6]."
      }
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4",
      "nums contains distinct values sorted in ascending order.",
      "-10^4 <= target <= 10^4"
    ],
    hints: [
      "Since the array is sorted and unique, you can find the index in logarithmic O(log N) time using Binary Search.",
      "Track the lower and upper bounds of search space. Calculate the middle index, and narrow your search."
    ],
    importantConcepts: [
      "Binary Search",
      "Lower Bound / Insertion Point"
    ],
    solutions: {
      javascript: {
        language: "javascript",
        code: `function searchInsertPosition(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return left;
}`,
        approach: "Use standard binary search. Maintain two pointers: `left` and `right`. Calculate `mid`. If `nums[mid]` is the target, return `mid`. If `nums[mid] < target`, shrink the search space to the right half by setting `left = mid + 1`. Otherwise, search the left half by setting `right = mid - 1`. If not found, `left` represents the insertion index.",
        explanation: "1. Standard Binary Search implementation.\n2. In each iteration, halving the search space guarantees O(log N) runtime.\n3. If the loop terminates without a direct match, `left` will naturally point to the correct insertion index.",
        timeComplexity: "O(log N) because the search space is divided in half in each step.",
        spaceComplexity: "O(1) auxiliary space."
      },
      typescript: {
        language: "typescript",
        code: `function searchInsertPosition(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return left;
}`,
        approach: "Logarithmic binary search in TypeScript. Adjust bounds by calculating midpoints until target is located, or insert position is determined.",
        explanation: "Same as JavaScript with proper parameter and return type specifications.",
        timeComplexity: "O(log N)",
        spaceComplexity: "O(1)"
      },
      python: {
        language: "python",
        code: `def search_insert_position(nums: list[int], target: int) -> int:
    left = 0
    right = len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return left`,
        approach: "Perform standard division binary search. Use integer division `//` to calculate clean middle indices in Python.",
        explanation: "Classic implementation. The index `left` is returned if the target isn't found, representing the insertion index.",
        timeComplexity: "O(log N)",
        spaceComplexity: "O(1)"
      },
      java: {
        language: "java",
        code: `public class Solution {
    public static int searchInsertPosition(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return left;
    }
}`,
        approach: "Calculate midpoint as `left + (right - left) / 2` to prevent potential integer overflow on large arrays, then narrow bounds.",
        explanation: "Midpoint overflow prevention is critical in Java. Returns the insertion pointer `left` upon search termination.",
        timeComplexity: "O(log N)",
        spaceComplexity: "O(1)"
      },
      cpp: {
        language: "cpp",
        code: `#include <vector>

class Solution {
public:
    int searchInsertPosition(const std::vector<int>& nums, int target) {
        int left = 0;
        int right = nums.size() - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return left;
    }
};`,
        approach: "Standard C++ binary search algorithm on a read-only vector. Midpoint subtraction prevents binary overflow.",
        explanation: "Compact implementation using simple pointers. Highly optimized through contiguous array cache lines.",
        timeComplexity: "O(log N)",
        spaceComplexity: "O(1)"
      },
      go: {
        language: "go",
        code: `package main

func searchInsertPosition(nums []int, target int) int {
	left := 0
	right := len(nums) - 1
	for left <= right {
		mid := left + (right-left)/2
		if nums[mid] == target {
			return mid
		} else if nums[mid] < target {
			left = mid + 1
		} else {
			right = mid - 1
		}
	}
	return left
}`,
        approach: "Implement insertion search over a slice in Go. Half the search space each turn, checking midpoint values.",
        explanation: "Standard binary search implementation in Go, safe from integer overflow during midpoint division.",
        timeComplexity: "O(log N)",
        spaceComplexity: "O(1)"
      }
    }
  }
];
