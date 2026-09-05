import { DSAProblem } from "@/types/dsa";

export const arrayProblems: DSAProblem[] = [
  {
    id: "arr-1",
    slug: "odd-even-index-separator",
    title: "Odd and Even Index Separator",
    difficulty: "easy",
    patterns: ["Arrays"],
    topics: ["Arrays", "Basic Traversal"],
    description: "Given an array of integers `nums`, create a new array where all elements that were at odd indices in `nums` are grouped first, followed by all elements that were at even indices in `nums`. Maintain the relative order of elements from their original placements.",
    examples: [
      {
        id: 1,
        input: "nums = [10, 20, 30, 40, 50]",
        output: "[20, 40, 10, 30, 50]",
        explanation: "Odd indices: index 1 is 20, index 3 is 40. Even indices: index 0 is 10, index 2 is 30, index 4 is 50. Combining them yields [20, 40, 10, 30, 50]."
      },
      {
        id: 2,
        input: "nums = [5, 9]",
        output: "[9, 5]",
        explanation: "Odd index element is 9 (index 1). Even index element is 5 (index 0). Result: [9, 5]."
      }
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9"
    ],
    hints: [
      "You can traverse the array in a single pass, or in two passes: once for odd indices and once for even indices.",
      "Store the values in two separate temporary lists and then concatenate them."
    ],
    importantConcepts: [
      "Array Indexing",
      "Stable Partition / Grouping"
    ],
    solutions: {
      javascript: {
        language: "javascript",
        code: `function separateIndices(nums) {
  const odds = [];
  const evens = [];
  for (let i = 0; i < nums.length; i++) {
    if (i % 2 !== 0) {
      odds.push(nums[i]);
    } else {
      evens.push(nums[i]);
    }
  }
  return odds.concat(evens);
}`,
        approach: "Use two auxiliary arrays to collect elements at odd and even indices during a single pass, then concatenate them and return.",
        explanation: "Iterate from `0` to `nums.length - 1`. If `i % 2 !== 0`, append to the `odds` list, otherwise append to the `evens` list. Return the concatenation `odds.concat(evens)`.",
        timeComplexity: "O(N) to traverse the array once and perform concatenation.",
        spaceComplexity: "O(N) auxiliary space to store the partitioned elements."
      },
      typescript: {
        language: "typescript",
        code: `function separateIndices(nums: number[]): number[] {
  const odds: number[] = [];
  const evens: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    if (i % 2 !== 0) {
      odds.push(nums[i]);
    } else {
      evens.push(nums[i]);
    }
  }
  return [...odds, ...evens];
}`,
        approach: "Use spread operator in TypeScript to merge two typed array collections collected in a single traversal loop.",
        explanation: "Same as JavaScript with proper types and modern spread syntax.",
        timeComplexity: "O(N)",
        spaceComplexity: "O(N)"
      },
      python: {
        language: "python",
        code: `def separate_indices(nums: list[int]) -> list[int]:
    odds = nums[1::2]
    evens = nums[0::2]
    return odds + evens`,
        approach: "Take advantage of Python's highly optimized list slicing: `nums[1::2]` captures all elements at odd indices, while `nums[0::2]` captures all elements at even indices.",
        explanation: "List slicing is implemented in C at the interpreter level, making it extremely fast. We concatenate both slices using the `+` operator.",
        timeComplexity: "O(N) slice copy and join operations.",
        spaceComplexity: "O(N) for slices and result."
      },
      java: {
        language: "java",
        code: `import java.util.*;

public class Solution {
    public static int[] separateIndices(int[] nums) {
        int[] result = new int[nums.length];
        int idx = 0;
        // Collect odd indices
        for (int i = 1; i < nums.length; i += 2) {
            result[idx++] = nums[i];
        }
        // Collect even indices
        for (int i = 0; i < nums.length; i += 2) {
            result[idx++] = nums[i];
        }
        return result;
    }
}`,
        approach: "To achieve O(1) extra space overhead besides the output array, write directly into a pre-allocated output primitive array of the same size.",
        explanation: "We do two efficient passes over `nums` using step 2 loops to write directly into `result`. This completely avoids boxing overheads from List structures.",
        timeComplexity: "O(N) double stride-2 loop is very cache-friendly.",
        spaceComplexity: "O(1) auxiliary space (O(N) for output)."
      },
      cpp: {
        language: "cpp",
        code: `#include <vector>

class Solution {
public:
    std::vector<int> separateIndices(const std::vector<int>& nums) {
        std::vector<int> result;
        result.reserve(nums.size());
        
        // Push odd indices
        for (size_t i = 1; i < nums.size(); i += 2) {
            result.push_back(nums[i]);
        }
        // Push even indices
        for (size_t i = 0; i < nums.size(); i += 2) {
            result.push_back(nums[i]);
        }
        return result;
    }
};`,
        approach: "Pre-allocate vector capacity with `reserve()` to prevent multiple reallocations, then traverse and push odd elements first, followed by even ones.",
        explanation: "Using standard C++ vector insertion. Reserving vector size ensures we do not trigger amortized log-capacity memory re-allocations during insertions.",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1) auxiliary space (O(N) for output)."
      },
      go: {
        language: "go",
        code: `package main

func separateIndices(nums []int) []int {
	n := len(nums)
	result := make([]int, n)
	idx := 0
	
	for i := 1; i < n; i += 2 {
		result[idx] = nums[i]
		idx++
	}
	for i := 0; i < n; i += 2 {
		result[idx] = nums[i]
		idx++
	}
	return result
}`,
        approach: "Create a pre-sliced Go list of matching size and populate it using direct index assignments to avoid runtime slice growth overheads.",
        explanation: "Uses Go `make` with capacity and double stride iterations to form the resulting slice rapidly.",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1) auxiliary space."
      }
    }
  },
  {
    id: "arr-2",
    slug: "character-frequency-counter",
    title: "Character Frequency Counter",
    difficulty: "easy",
    patterns: ["Arrays"],
    topics: ["Arrays", "Frequency Counting", "Strings"],
    description: "Given a string `s` containing only lowercase English letters, find the character that appears most frequently. If there is a tie, return the character that appears earliest in alphabetical order (e.g. if 'a' and 'b' both appear 3 times, return 'a').",
    examples: [
      {
        id: 1,
        input: "s = \"success\"",
        explanation: "'s' appears 3 times, 'c' appears 2 times, 'u' and 'e' appear 1 time. The most frequent is 's'.",
        output: "\"s\""
      },
      {
        id: 2,
        input: "s = \"bbaacc\"",
        explanation: "'a', 'b', and 'c' all appear 2 times. The lexicographically smallest is 'a'.",
        output: "\"a\""
      }
    ],
    constraints: [
      "1 <= s.length <= 10^5",
      "`s` consists of lowercase English letters."
    ],
    hints: [
      "Since there are only 26 lowercase English letters, you can use an integer array of size 26 as a frequency map.",
      "The letter 'a' maps to index 0, 'b' to 1, ..., and 'z' to 25. Subtracting ASCII code of 'a' from any character gives its corresponding index."
    ],
    importantConcepts: [
      "Frequency Array (Hashing with fixed key space)",
      "ASCII Character Arithmetic"
    ],
    solutions: {
      javascript: {
        language: "javascript",
        code: `function mostFrequentChar(s) {
  const freq = new Int32Array(26);
  for (let i = 0; i < s.length; i++) {
    freq[s.charCodeAt(i) - 97]++;
  }
  
  let maxCount = 0;
  let bestChar = 'a';
  for (let i = 0; i < 26; i++) {
    if (freq[i] > maxCount) {
      maxCount = freq[i];
      bestChar = String.fromCharCode(i + 97);
    }
  }
  return bestChar;
}`,
        approach: "Use a fixed size 26-integer typed array (`Int32Array`) to count frequencies. Iterate over frequencies and pick the character with the maximum count.",
        explanation: "1. Create `freq` array of size 26 initialized with 0.\n2. In a loop, map character to index via `charCodeAt(i) - 97` and increment.\n3. Iterate from `0` to `25` to find the highest frequency. This automatically handles ties lexicographically because we iterate in alphabetical order.",
        timeComplexity: "O(N) to process the string, then O(26) to find the maximum frequency. Overall O(N).",
        spaceComplexity: "O(1) auxiliary space as the frequency array size is constant (26)."
      },
      typescript: {
        language: "typescript",
        code: `function mostFrequentChar(s: string): string {
  const freq = new Int32Array(26);
  for (let i = 0; i < s.length; i++) {
    freq[s.charCodeAt(i) - 97]++;
  }
  
  let maxCount = 0;
  let bestChar = 'a';
  for (let i = 0; i < 26; i++) {
    if (freq[i] > maxCount) {
      maxCount = freq[i];
      bestChar = String.fromCharCode(i + 97);
    }
  }
  return bestChar;
}`,
        approach: "Use constant space integer hash table mapped to lowercase English characters with alphabetical tie-breaking.",
        explanation: "TypeScript variant with safe char code arithmetic.",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)"
      },
      python: {
        language: "python",
        code: `def most_frequent_char(s: str) -> str:
    freq = [0] * 26
    for char in s:
        freq[ord(char) - 97] += 1
        
    max_count = 0
    best_char = 'a'
    for i in range(26):
        if freq[i] > max_count:
            max_count = freq[i]
            best_char = chr(i + 97)
            
    return best_char`,
        approach: "Populate a list of size 26 with frequency integers using standard ASCII offsets. Scan the array sequentially to find the largest index.",
        explanation: "Python `ord()` retrieves the integer ASCII value of a character, while `chr()` maps it back. Standard sequence loop executes in linear time.",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)"
      },
      java: {
        language: "java",
        code: `public class Solution {
    public static char mostFrequentChar(String s) {
        int[] freq = new int[26];
        int len = s.length();
        for (int i = 0; i < len; i++) {
            freq[s.charAt(i) - 'a']++;
        }
        
        int maxCount = 0;
        char bestChar = 'a';
        for (int i = 0; i < 26; i++) {
            if (freq[i] > maxCount) {
                maxCount = freq[i];
                bestChar = (char)(i + 'a');
            }
        }
        return bestChar;
    }
}`,
        approach: "Allocate a fixed-size `int[26]` array. In a single loop over string length, increment matching array index. Iterate through 0 to 25 to locate the max.",
        explanation: "We avoid string-to-array overhead by using `s.charAt(i)` inside the loop, keeping memory allocations to a absolute zero.",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)"
      },
      cpp: {
        language: "cpp",
        code: `#include <string>
#include <vector>

class Solution {
public:
    char mostFrequentChar(const std::string& s) {
        std::vector<int> freq(26, 0);
        for (char c : s) {
            freq[c - 'a']++;
        }
        
        int maxCount = 0;
        char bestChar = 'a';
        for (int i = 0; i < 26; ++i) {
            if (freq[i] > maxCount) {
                maxCount = freq[i];
                bestChar = (char)(i + 'a');
            }
        }
        return bestChar;
    }
};`,
        approach: "Use dynamic array tracking index offsets. Traverse characters, update vector index `c - 'a'`, then traverse vector to grab the maximum index.",
        explanation: "ASCII offsets are used directly for mapping. Lexicographical matches are naturally handled due to index order in the final lookup.",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)"
      },
      go: {
        language: "go",
        code: `package main

func mostFrequentChar(s string) string {
	freq := make([]int, 26)
	for i := 0; i < len(s); i++ {
		freq[s[i]-'a']++
	}
	
	maxCount := 0
	bestChar := byte('a')
	for i := 0; i < 26; i++ {
		if freq[i] > maxCount {
			maxCount = freq[i]
			bestChar = byte(i + 'a')
		}
	}
	return string(bestChar)
}`,
        approach: "Utilize a byte array map of size 26. Since strings in Go are read-only byte slices, direct indices are extremely fast.",
        explanation: "We read bytes of string sequentially. This completely bypasses rune allocations since all letters are strictly lowercase English characters.",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)"
      }
    }
  },
  {
    id: "arr-3",
    slug: "static-range-sum",
    title: "Static Range Sum Query",
    difficulty: "medium",
    patterns: ["Arrays"],
    topics: ["Arrays", "Prefix Sum"],
    description: "Design a data structure that handles multiple range sum queries on an immutable array `nums`. A query is defined by a pair of indices `(left, right)` and should return the sum of elements of `nums` between indices `left` and `right` inclusive.",
    examples: [
      {
        id: 1,
        input: "nums = [1, -2, 3, 5, -1], queries = [[0, 2], [1, 4], [3, 3]]",
        output: "[2, 5, 5]",
        explanation: "Prefix Sum array: [0, 1, -1, 2, 7, 6]. \n- Query [0, 2] -> sum of elements at index 0, 1, 2: 1 + (-2) + 3 = 2.\n- Query [1, 4] -> sum of elements at index 1,2,3,4: (-2) + 3 + 5 + (-1) = 5.\n- Query [3, 3] -> element at index 3: 5."
      }
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^5 <= nums[i] <= 10^5",
      "1 <= queries.length <= 10^5",
      "0 <= left <= right < nums.length"
    ],
    hints: [
      "Calculating the sum from scratch for every query will take O(N) time per query, which results in O(Q * N) overall (Too slow).",
      "Precompute a prefix sum array where `prefix[i]` stores the sum of elements from index 0 to `i-1`. The range sum of `(L, R)` is then `prefix[R+1] - prefix[L]`."
    ],
    importantConcepts: [
      "Prefix Sum Precomputation",
      "O(1) Range Queries"
    ],
    solutions: {
      javascript: {
        language: "javascript",
        code: `class RangeSumQuery {
  constructor(nums) {
    this.prefix = new Int32Array(nums.length + 1);
    for (let i = 0; i < nums.length; i++) {
      this.prefix[i + 1] = this.prefix[i] + nums[i];
    }
  }

  query(left, right) {
    return this.prefix[right + 1] - this.prefix[left];
  }
}

function processQueries(nums, queries) {
  const rsq = new RangeSumQuery(nums);
  return queries.map(q => rsq.query(q[0], q[1]));
}`,
        approach: "Build an auxiliary prefix sum array of size `N + 1`. This allows calculating any subarray sum in constant O(1) time.",
        explanation: "1. Precompute `prefix[i] = nums[0] + ... + nums[i-1]` in the constructor in O(N).\n2. Calculate range sum from `left` to `right` as `prefix[right + 1] - prefix[left]` in O(1).\n3. Map queries directly using the lookup class.",
        timeComplexity: "O(N) for construction, O(1) per query. Total time: O(N + Q) instead of O(N * Q).",
        spaceComplexity: "O(N) space to store the prefix sums."
      },
      typescript: {
        language: "typescript",
        code: `class RangeSumQuery {
  private prefix: Int32Array;

  constructor(nums: number[]) {
    this.prefix = new Int32Array(nums.length + 1);
    for (let i = 0; i < nums.length; i++) {
      this.prefix[i + 1] = this.prefix[i] + nums[i];
    }
  }

  public query(left: number, right: number): number {
    return this.prefix[right + 1] - this.prefix[left];
  }
}

function processQueries(nums: number[], queries: [number, number][]): number[] {
  const rsq = new RangeSumQuery(nums);
  return queries.map(([l, r]) => rsq.query(l, r));
}`,
        approach: "Precompute prefix sum in constructor with private `Int32Array` attributes. Queries are executed in O(1).",
        explanation: "Same as JavaScript with proper class types and typed query tuples.",
        timeComplexity: "O(N) initialization, O(1) per query.",
        spaceComplexity: "O(N)"
      },
      python: {
        language: "python",
        code: `class RangeSumQuery:
    def __init__(self, nums: list[int]):
        self.prefix = [0] * (len(nums) + 1)
        for i in range(len(nums)):
            self.prefix[i + 1] = self.prefix[i] + nums[i]

    def query(self, left: int, right: int) -> int:
        return self.prefix[right + 1] - self.prefix[left]

def process_queries(nums: list[int], queries: list[list[int]]) -> list[int]:
    rsq = RangeSumQuery(nums)
    return [rsq.query(q[0], q[1]) for q in queries]`,
        approach: "Implement range sum query with prefix accumulation list. Use python list comprehension for query resolution.",
        explanation: "Initializes prefix list of size `len(nums) + 1` filled with zero, sums iteratively, and supports fast lookup queries.",
        timeComplexity: "O(N + Q)",
        spaceComplexity: "O(N)"
      },
      java: {
        language: "java",
        code: `public class RangeSumQuery {
    private int[] prefix;

    public RangeSumQuery(int[] nums) {
        prefix = new int[nums.length + 1];
        for (int i = 0; i < nums.length; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
    }

    public int query(int left, int right) {
        return prefix[right + 1] - prefix[left];
    }

    public static int[] processQueries(int[] nums, int[][] queries) {
        RangeSumQuery rsq = new RangeSumQuery(nums);
        int[] results = new int[queries.length];
        for (int i = 0; i < queries.length; i++) {
            results[i] = rsq.query(queries[i][0], queries[i][1]);
        }
        return results;
    }
}`,
        approach: "Build a Prefix Sum class containing private fields. Loop queries and map sums directly into primitive arrays.",
        explanation: "Java implementation avoids ArrayList packaging to prevent object allocation, completing range sum calculations instantly.",
        timeComplexity: "O(N + Q)",
        spaceComplexity: "O(N)"
      },
      cpp: {
        language: "cpp",
        code: `#include <vector>

class RangeSumQuery {
private:
    std::vector<int> prefix;

public:
    RangeSumQuery(const std::vector<int>& nums) {
        prefix.resize(nums.size() + 1, 0);
        for (size_t i = 0; i < nums.size(); ++i) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
    }

    int query(int left, int right) const {
        return prefix[right + 1] - prefix[left];
    }
};

std::vector<int> processQueries(const std::vector<int>& nums, const std::vector<std::vector<int>>& queries) {
    RangeSumQuery rsq(nums);
    std::vector<int> results;
    results.reserve(queries.size());
    for (const auto& q : queries) {
        results.push_back(rsq.query(q[0], q[1]));
    }
    return results;
}`,
        approach: "Initialize the query object in C++. Resize vectors to fit size, pre-compute prefix sums, and push query responses to pre-reserved vector.",
        explanation: "Highly optimized memory layout. By using a references (`const std::vector<int>&`) we prevent deep copy overhead on function invocations.",
        timeComplexity: "O(N + Q)",
        spaceComplexity: "O(N)"
      },
      go: {
        language: "go",
        code: `package main

type RangeSumQuery struct {
	prefix []int
}

func NewRangeSumQuery(nums []int) *RangeSumQuery {
	prefix := make([]int, len(nums)+1)
	for i := 0; i < len(nums); i++ {
		prefix[i+1] = prefix[i] + nums[i]
	}
	return &RangeSumQuery{prefix: prefix}
}

func (rsq *RangeSumQuery) Query(left, right int) int {
	return rsq.prefix[right+1] - rsq.prefix[left]
}

func processQueries(nums []int, queries [][]int) []int {
	rsq := NewRangeSumQuery(nums)
	results := make([]int, len(queries))
	for i, q := range queries {
		results[i] = rsq.Query(q[0], q[1])
	}
	return results
}`,
        approach: "Implement the custom RSQ structure in Go. Use constructors to build the internal prefix slice and compute query outcomes.",
        explanation: "By keeping the fields in a pointer structure (`*RangeSumQuery`), Go can access prefix arrays very quickly from heap.",
        timeComplexity: "O(N + Q)",
        spaceComplexity: "O(N)"
      }
    }
  }
];
