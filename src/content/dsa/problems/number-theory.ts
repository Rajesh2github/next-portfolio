import { DSAProblem } from "@/types/dsa";

export const numberTheoryProblems: DSAProblem[] = [
  {
    id: "nt-1",
    slug: "find-common-divisors",
    title: "Find Common Divisors",
    difficulty: "easy",
    patterns: ["Number Theory"],
    topics: ["Mathematics", "Divisors"],
    description: "Given two positive integers `a` and `b`, find all positive integers that divide both `a` and `b` without a remainder. Return these common divisors in sorted ascending order.",
    examples: [
      {
        id: 1,
        input: "a = 12, b = 18",
        output: "[1, 2, 3, 6]",
        explanation: "The factors of 12 are 1, 2, 3, 4, 6, 12. The factors of 18 are 1, 2, 3, 6, 9, 18. The common factors are 1, 2, 3, 6."
      },
      {
        id: 2,
        input: "a = 7, b = 11",
        output: "[1]",
        explanation: "Since both 7 and 11 are prime numbers, their only common divisor is 1."
      }
    ],
    constraints: [
      "1 <= a, b <= 10^9"
    ],
    hints: [
      "A common divisor of a and b must also be a divisor of their Greatest Common Divisor (GCD).",
      "You can find the GCD of a and b first, then find all divisors of that GCD up to its square root."
    ],
    importantConcepts: [
      "Greatest Common Divisor (GCD)",
      "Trial Division up to sqrt(N)"
    ],
    solutions: {
      javascript: {
        language: "javascript",
        code: `function findCommonDivisors(a, b) {
  const gcd = (x, y) => !y ? x : gcd(y, x % y);
  const g = gcd(a, b);
  const divisors = [];
  for (let i = 1; i * i <= g; i++) {
    if (g % i === 0) {
      divisors.push(i);
      if (i * i !== g) {
        divisors.push(g / i);
      }
    }
  }
  return divisors.sort((x, y) => x - y);
}`,
        approach: "Find the GCD of the two numbers. Any common divisor of `a` and `b` must also divide their GCD. We can then find all divisors of the GCD by iterating from 1 up to `sqrt(GCD)`. If `i` is a divisor, then `GCD / i` is also a divisor.",
        explanation: "1. Calculate the Greatest Common Divisor of `a` and `b` using the Euclidean algorithm.\n2. Iterate `i` from 1 to `sqrt(g)`. If `g % i === 0`, push `i` and `g/i` (if distinct) to our list.\n3. Sort the final list to return them in ascending order.",
        timeComplexity: "O(log(min(a, b)) + sqrt(GCD) * log(divisors_count)) due to the Euclidean algorithm, divisor finding, and sorting.",
        spaceComplexity: "O(D) where D is the number of divisors of the GCD to store the results."
      },
      typescript: {
        language: "typescript",
        code: `function findCommonDivisors(a: number, b: number): number[] {
  const gcd = (x: number, y: number): number => !y ? x : gcd(y, x % y);
  const g = gcd(a, b);
  const divisors: number[] = [];
  for (let i = 1; i * i <= g; i++) {
    if (g % i === 0) {
      divisors.push(i);
      if (i * i !== g) {
        divisors.push(g / i);
      }
    }
  }
  return divisors.sort((x, y) => x - y);
}`,
        approach: "Compute the GCD of `a` and `b` using recursion. Then perform trial division up to `sqrt(GCD)` to collect all factors and sort the resulting array.",
        explanation: "Same as JavaScript with strict types for parameters and return values.",
        timeComplexity: "O(log(min(a, b)) + sqrt(GCD) * log(D))",
        spaceComplexity: "O(D)"
      },
      python: {
        language: "python",
        code: `import math

def find_common_divisors(a: int, b: int) -> list[int]:
    g = math.gcd(a, b)
    divisors = []
    i = 1
    while i * i <= g:
        if g % i == 0:
            divisors.append(i)
            if i * i != g:
                divisors.append(g // i)
        i += 1
    return sorted(divisors)`,
        approach: "Use python's built-in `math.gcd` to compute the Greatest Common Divisor, then scan up to `sqrt(GCD)` to accumulate divisors and sort them.",
        explanation: "The Python solution uses `math.gcd` for optimization and returns a sorted list of divisors.",
        timeComplexity: "O(log(min(a, b)) + sqrt(GCD) * log(D))",
        spaceComplexity: "O(D)"
      },
      java: {
        language: "java",
        code: `import java.util.*;

public class Solution {
    private static int gcd(int x, int y) {
        return y == 0 ? x : gcd(y, x % y);
    }

    public static List<Integer> findCommonDivisors(int a, int b) {
        int g = gcd(a, b);
        List<Integer> divisors = new ArrayList<>();
        for (int i = 1; (long)i * i <= g; i++) {
            if (g % i == 0) {
                divisors.add(i);
                if (i * i != g) {
                    divisors.add(g / i);
                }
            }
        }
        Collections.sort(divisors);
        return divisors;
    }
}`,
        approach: "Calculate the GCD of `a` and `b` using an iterative or recursive helper. Collect factors up to `sqrt(GCD)` using an ArrayList and sort using `Collections.sort`.",
        explanation: "Uses an ArrayList of Integers to accumulate factors. Handles overflow by casting the loop guard `(long)i * i`.",
        timeComplexity: "O(log(min(a, b)) + sqrt(GCD) * log(D))",
        spaceComplexity: "O(D)"
      },
      cpp: {
        language: "cpp",
        code: `#include <vector>
#include <numeric>
#include <algorithm>
#include <cmath>

class Solution {
public:
    std::vector<int> findCommonDivisors(int a, int b) {
        int g = std::gcd(a, b);
        std::vector<int> divisors;
        for (int i = 1; (long long)i * i <= g; ++i) {
            if (g % i == 0) {
                divisors.push_back(i);
                if (i * i != g) {
                    divisors.push_back(g / i);
                }
            }
        }
        std::sort(divisors.begin(), divisors.end());
        return divisors;
    }
};`,
        approach: "Utilize standard C++ `<numeric>`'s `std::gcd` function. Find all divisors of the GCD and sort using `std::sort`.",
        explanation: "Efficient trial division using C++ `std::vector` and `std::gcd` available in `<numeric>` from C++17 onwards.",
        timeComplexity: "O(log(min(a, b)) + sqrt(GCD) * log(D))",
        spaceComplexity: "O(D)"
      },
      go: {
        language: "go",
        code: `package main

import "sort"

func gcd(x, y int) int {
	for y != 0 {
		x, y = y, x%y
	}
	return x
}

func findCommonDivisors(a, b int) []int {
	g := gcd(a, b)
	var divisors []int
	for i := 1; i*i <= g; i++ {
		if g%i == 0 {
			divisors = append(divisors, i)
			if i*i != g {
				divisors = append(divisors, g/i)
			}
		}
	}
	sort.Ints(divisors)
	return divisors
}`,
        approach: "Implement basic iterative GCD, gather factors using slice append, and sort using Go's `sort.Ints`.",
        explanation: "We implement GCD iteratively in Go to prevent recursion stack overhead, find the divisors of the GCD up to its square root, and sort the slice.",
        timeComplexity: "O(log(min(a, b)) + sqrt(GCD) * log(D))",
        spaceComplexity: "O(D)"
      }
    }
  },
  {
    id: "nt-2",
    slug: "gcd-of-array",
    title: "GCD of Array",
    difficulty: "easy",
    patterns: ["Number Theory"],
    topics: ["Mathematics", "GCD"],
    description: "Given an array of positive integers `nums`, find the Greatest Common Divisor (GCD) of all numbers in the array. The GCD is the largest positive integer that divides all elements in the array without a remainder.",
    examples: [
      {
        id: 1,
        input: "nums = [12, 24, 36, 48]",
        output: "12",
        explanation: "12 is the largest integer that divides 12, 24, 36, and 48."
      },
      {
        id: 2,
        input: "nums = [7, 14, 21]",
        output: "7",
        explanation: "7 is the largest common divisor of 7, 14, and 21."
      }
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "1 <= nums[i] <= 10^9"
    ],
    hints: [
      "The GCD of multiple numbers can be calculated sequentially: GCD(a, b, c) = GCD(GCD(a, b), c).",
      "Iterate through the array and maintain a running GCD of the elements visited so far."
    ],
    importantConcepts: [
      "Euclidean Algorithm",
      "Associative Property of GCD"
    ],
    solutions: {
      javascript: {
        language: "javascript",
        code: `function findArrayGCD(nums) {
  const gcd = (x, y) => !y ? x : gcd(y, x % y);
  let result = nums[0];
  for (let i = 1; i < nums.length; i++) {
    result = gcd(result, nums[i]);
    if (result === 1) return 1; // Early exit
  }
  return result;
}`,
        approach: "Iterate over the array, computing the GCD of the current cumulative GCD and the next element. An early exit condition `result === 1` is applied as GCD cannot be smaller than 1.",
        explanation: "We start with `result = nums[0]`. In each step, `result = gcd(result, nums[i])`. If `result` becomes 1, we can return immediately because any further GCD computation with 1 will remain 1.",
        timeComplexity: "O(N * log(min_value)) where N is array length and min_value is the minimum element in the array.",
        spaceComplexity: "O(1) auxiliary space."
      },
      typescript: {
        language: "typescript",
        code: `function findArrayGCD(nums: number[]): number {
  const gcd = (x: number, y: number): number => !y ? x : gcd(y, x % y);
  let result = nums[0];
  for (let i = 1; i < nums.length; i++) {
    result = gcd(result, nums[i]);
    if (result === 1) return 1;
  }
  return result;
}`,
        approach: "Use associative property of GCD sequentially over the TypeScript array with early exit at 1.",
        explanation: "Same as JavaScript with static typing.",
        timeComplexity: "O(N * log(M))",
        spaceComplexity: "O(1)"
      },
      python: {
        language: "python",
        code: `import math

def find_array_gcd(nums: list[int]) -> int:
    result = nums[0]
    for num in nums[1:]:
        result = math.gcd(result, num)
        if result == 1:
            return 1
    return result`,
        approach: "Iterate through the array starting from index 1, computing running GCD using Python's highly optimized `math.gcd` function with an early exit optimization.",
        explanation: "Uses Python's standard library `math.gcd` in a loop, terminating early if the GCD hits 1.",
        timeComplexity: "O(N * log(M))",
        spaceComplexity: "O(1)"
      },
      java: {
        language: "java",
        code: `public class Solution {
    private static int gcd(int x, int y) {
        return y == 0 ? x : gcd(y, x % y);
    }

    public static int findArrayGCD(int[] nums) {
        int result = nums[0];
        for (int i = 1; i < nums.length; i++) {
            result = gcd(result, nums[i]);
            if (result == 1) {
                return 1;
            }
        }
        return result;
    }
}`,
        approach: "Initialize the running GCD as the first element of the array, loop through the rest, updating the running GCD. Return early if it becomes 1.",
        explanation: "A standard recursive Euclidean GCD method is called on primitive integers inside a loop for maximum performance.",
        timeComplexity: "O(N * log(M))",
        spaceComplexity: "O(1)"
      },
      cpp: {
        language: "cpp",
        code: `#include <vector>
#include <numeric>

class Solution {
public:
    int findArrayGCD(const std::vector<int>& nums) {
        int result = nums[0];
        for (size_t i = 1; i < nums.size(); ++i) {
            result = std::gcd(result, nums[i]);
            if (result == 1) {
                return 1;
            }
        }
        return result;
    }
};`,
        approach: "Use `std::gcd` inside a loop over the input reference vector of integers. Break early if running GCD reaches 1.",
        explanation: "Optimal C++ implementation relying on the fast standard library `std::gcd` function and avoiding unnecessary copies by passing the vector by reference.",
        timeComplexity: "O(N * log(M))",
        spaceComplexity: "O(1)"
      },
      go: {
        language: "go",
        code: `package main

func gcd(x, y int) int {
	for y != 0 {
		x, y = y, x%y
	}
	return x
}

func findArrayGCD(nums []int) int {
	result := nums[0]
	for i := 1; i < len(nums); i++ {
		result = gcd(result, nums[i])
		if result == 1 {
			return 1
		}
	}
	return result
}`,
        approach: "Sequential reduction in Go using an iterative GCD function and an early break when the cumulative divisor equals 1.",
        explanation: "Iterative GCD is combined with a slice traversal to avoid recursive function call overhead in Go.",
        timeComplexity: "O(N * log(M))",
        spaceComplexity: "O(1)"
      }
    }
  },
  {
    id: "nt-3",
    slug: "smallest-common-multiple",
    title: "Smallest Common Multiple",
    difficulty: "medium",
    patterns: ["Number Theory"],
    topics: ["Mathematics", "LCM"],
    description: "Given two positive integers `a` and `b`, find the Least Common Multiple (LCM) of all integers in the closed range `[min(a,b), max(a,b)]`. The LCM is the smallest positive integer that is divisible by all numbers in the range.",
    examples: [
      {
        id: 1,
        input: "a = 1, b = 5",
        output: "60",
        explanation: "The range is [1, 2, 3, 4, 5]. The smallest number divisible by all of these is 60."
      },
      {
        id: 2,
        input: "a = 5, b = 7",
        output: "210",
        explanation: "The range is [5, 6, 7]. LCM(5, 6) = 30. LCM(30, 7) = 210."
      }
    ],
    constraints: [
      "1 <= a, b <= 20"
    ],
    hints: [
      "The formula for LCM of two numbers x and y is: LCM(x, y) = (x * y) / GCD(x, y).",
      "To find the LCM of a range, compute the LCM sequentially from the start of the range to the end."
    ],
    importantConcepts: [
      "Least Common Multiple (LCM)",
      "LCM-GCD Relationship",
      "Iterative Range Reduction"
    ],
    solutions: {
      javascript: {
        language: "javascript",
        code: `function smallestCommonMultiple(a, b) {
  const gcd = (x, y) => !y ? x : gcd(y, x % y);
  const lcm = (x, y) => (x * y) / gcd(x, y);
  
  const min = Math.min(a, b);
  const max = Math.max(a, b);
  let result = min;
  
  for (let i = min + 1; i <= max; i++) {
    result = lcm(result, i);
  }
  return result;
}`,
        approach: "Calculate LCM sequentially over the range. To prevent potential overflow, calculate `lcm(x, y) = x * (y / gcd(x, y))`.",
        explanation: "1. Sort `a` and `b` to find the range boundaries.\n2. Initialize `result` with the minimum value.\n3. Loop through the range, updating `result` as `lcm(result, current)`. We divide before multiplying to prevent integer overflow.",
        timeComplexity: "O(R * log(max_val)) where R is the range length (max - min + 1) and max_val is the current running LCM.",
        spaceComplexity: "O(1) auxiliary space."
      },
      typescript: {
        language: "typescript",
        code: `function smallestCommonMultiple(a: number, b: number): number {
  const gcd = (x: number, y: number): number => !y ? x : gcd(y, x % y);
  const lcm = (x: number, y: number): number => x * (y / gcd(x, y));
  
  const min = Math.min(a, b);
  const max = Math.max(a, b);
  let result = min;
  
  for (let i = min + 1; i <= max; i++) {
    result = lcm(result, i);
  }
  return result;
}`,
        approach: "Compute the cumulative LCM from `min(a, b)` to `max(a, b)`. Use division-first arithmetic in LCM to prevent number overflow.",
        explanation: "TypeScript implementation with safe numeric casting and exact recursive type signatures.",
        timeComplexity: "O(R * log(M))",
        spaceComplexity: "O(1)"
      },
      python: {
        language: "python",
        code: `import math

def smallest_common_multiple(a: int, b: int) -> int:
    low, high = min(a, b), max(a, b)
    result = low
    for i in range(low + 1, high + 1):
        result = (result * i) // math.gcd(result, i)
    return result`,
        approach: "Loop through the sorted range, calculating LCM using Python's arbitrary-precision integers and built-in GCD function.",
        explanation: "Python integers have arbitrary precision, preventing overflow. We use integer division `//` to keep the results typed as integers.",
        timeComplexity: "O(R * log(M))",
        spaceComplexity: "O(1)"
      },
      java: {
        language: "java",
        code: `public class Solution {
    private static long gcd(long x, long y) {
        return y == 0 ? x : gcd(y, x % y);
    }

    private static long lcm(long x, long y) {
        return x * (y / gcd(x, y));
    }

    public static long smallestCommonMultiple(int a, int b) {
        int min = Math.min(a, b);
        int max = Math.max(a, b);
        long result = min;
        for (int i = min + 1; i <= max; i++) {
            result = lcm(result, i);
        }
        return result;
    }
}`,
        approach: "Implement the cumulative range LCM using `long` to avoid integer overflow, which can happen quickly as LCM grows.",
        explanation: "Uses Java's 64-bit signed `long` primitives for all calculations to protect against overflow.",
        timeComplexity: "O(R * log(M))",
        spaceComplexity: "O(1)"
      },
      cpp: {
        language: "cpp",
        code: `#include <algorithm>
#include <numeric>

class Solution {
public:
    long long smallestCommonMultiple(int a, int b) {
        long long min_val = std::min(a, b);
        long long max_val = std::max(a, b);
        long long result = min_val;
        for (long long i = min_val + 1; i <= max_val; ++i) {
            result = result * (i / std::gcd(result, i));
        }
        return result;
    }
};`,
        approach: "Compute the sequential range LCM using C++'s standard `std::gcd` and `long long` for overflow safety.",
        explanation: "Uses `long long` for 64-bit integer calculations and applies division before multiplication to avoid unnecessary intermediate overflows.",
        timeComplexity: "O(R * log(M))",
        spaceComplexity: "O(1)"
      },
      go: {
        language: "go",
        code: `package main

func gcd(x, y int64) int64 {
	for y != 0 {
		x, y = y, x%y
	}
	return x
}

func smallestCommonMultiple(a, b int) int64 {
	minVal := int64(a)
	maxVal := int64(b)
	if minVal > maxVal {
		minVal, maxVal = maxVal, minVal
	}
	
	result := minVal
	for i := minVal + 1; i <= maxVal; i++ {
		result = result * (i / gcd(result, i))
	}
	return result
}`,
        approach: "Calculate LCM iteratively in Go using 64-bit integers (`int64`) and iterative GCD calculation.",
        explanation: "Cast range boundaries to `int64` to prevent overflow and implement the LCM iteratively.",
        timeComplexity: "O(R * log(M))",
        spaceComplexity: "O(1)"
      }
    }
  },
  {
    id: "nt-4",
    slug: "prime-number-generator",
    title: "Prime Number Generator",
    difficulty: "medium",
    patterns: ["Number Theory"],
    topics: ["Mathematics", "Primes"],
    description: "Given a positive integer `limit`, find all prime numbers strictly less than `limit`. Return these prime numbers in ascending order. A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself.",
    examples: [
      {
        id: 1,
        input: "limit = 10",
        output: "[2, 3, 5, 7]",
        explanation: "The prime numbers less than 10 are 2, 3, 5, and 7."
      },
      {
        id: 2,
        input: "limit = 2",
        output: "[]",
        explanation: "There are no prime numbers strictly less than 2."
      }
    ],
    constraints: [
      "0 <= limit <= 10^6"
    ],
    hints: [
      "For small limits, a simple primality check for each number is fine. For larger limits up to 10^6, use the Sieve of Eratosthenes.",
      "The Sieve of Eratosthenes marks multiples of primes as composite numbers, starting from 2."
    ],
    importantConcepts: [
      "Sieve of Eratosthenes",
      "Boolean Arrays / Bitwise Optimization"
    ],
    solutions: {
      javascript: {
        language: "javascript",
        code: `function generatePrimes(limit) {
  if (limit <= 2) return [];
  const isPrime = new Uint8Array(limit).fill(1);
  isPrime[0] = isPrime[1] = 0;
  
  for (let i = 2; i * i < limit; i++) {
    if (isPrime[i] === 1) {
      for (let j = i * i; j < limit; j += i) {
        isPrime[j] = 0;
      }
    }
  }
  
  const primes = [];
  for (let i = 2; i < limit; i++) {
    if (isPrime[i] === 1) {
      primes.push(i);
    }
  }
  return primes;
}`,
        approach: "Implement the Sieve of Eratosthenes using a typed `Uint8Array` for low memory usage and high-speed execution.",
        explanation: "1. Create a byte array `isPrime` of size `limit` initialized to 1.\n2. Set index 0 and 1 to 0.\n3. Loop from 2 to `sqrt(limit)`. If `isPrime[i]` is true, mark all its multiples starting from `i*i` as 0.\n4. Collect all indices still marked as 1.",
        timeComplexity: "O(N * log(log N)) where N is the limit.",
        spaceComplexity: "O(N) to store the Sieve array."
      },
      typescript: {
        language: "typescript",
        code: `function generatePrimes(limit: number): number[] {
  if (limit <= 2) return [];
  const isPrime = new Uint8Array(limit);
  isPrime.fill(1);
  isPrime[0] = isPrime[1] = 0;
  
  for (let i = 2; i * i < limit; i++) {
    if (isPrime[i] === 1) {
      for (let j = i * i; j < limit; j += i) {
        isPrime[j] = 0;
      }
    }
  }
  
  const primes: number[] = [];
  for (let i = 2; i < limit; i++) {
    if (isPrime[i] === 1) {
      primes.push(i);
    }
  }
  return primes;
}`,
        approach: "Apply Sieve of Eratosthenes in TypeScript using `Uint8Array` for optimal memory safety.",
        explanation: "Matches the JavaScript logic with explicit typings and initial guard statements.",
        timeComplexity: "O(N * log(log N))",
        spaceComplexity: "O(N)"
      },
      python: {
        language: "python",
        code: `def generate_primes(limit: int) -> list[int]:
    if limit <= 2:
        return []
    is_prime = [True] * limit
    is_prime[0] = is_prime[1] = False
    
    for i in range(2, int(limit**0.5) + 1):
        if is_prime[i]:
            for j in range(i * i, limit, i):
                is_prime[j] = False
                
    return [i for i, prime in enumerate(is_prime) if prime]`,
        approach: "Implement a standard Sieve of Eratosthenes with a boolean list and collect the primes using a list comprehension.",
        explanation: "Sieve boolean array is scanned and index list comprehension builds the return values rapidly.",
        timeComplexity: "O(N * log(log N))",
        spaceComplexity: "O(N)"
      },
      java: {
        language: "java",
        code: `import java.util.*;

public class Solution {
    public static List<Integer> generatePrimes(int limit) {
        if (limit <= 2) return new ArrayList<>();
        boolean[] isPrime = new boolean[limit];
        Arrays.fill(isPrime, true);
        isPrime[0] = isPrime[1] = false;
        
        for (int i = 2; i * i < limit; i++) {
            if (isPrime[i]) {
                for (int j = i * i; j < limit; j += i) {
                    isPrime[j] = false;
                }
            }
        }
        
        List<Integer> primes = new ArrayList<>();
        for (int i = 2; i < limit; i++) {
            if (isPrime[i]) {
                primes.add(i);
            }
        }
        return primes;
    }
}`,
        approach: "Use a primitive `boolean[]` array for Sieve mapping, then collect the results in an integer ArrayList.",
        explanation: "Memory is allocated continuously with boolean primitives. The sieve runs in O(N log log N) and result allocation is dynamically resized.",
        timeComplexity: "O(N * log(log N))",
        spaceComplexity: "O(N)"
      },
      cpp: {
        language: "cpp",
        code: `#include <vector>

class Solution {
public:
    std::vector<int> generatePrimes(int limit) {
        if (limit <= 2) return {};
        std::vector<bool> isPrime(limit, true);
        isPrime[0] = isPrime[1] = false;
        
        for (int i = 2; i * i < limit; ++i) {
            if (isPrime[i]) {
                for (int j = i * i; j < limit; j += i) {
                    isPrime[j] = false;
                }
            }
        }
        
        std::vector<int> primes;
        for (int i = 2; i < limit; ++i) {
            if (isPrime[i]) {
                primes.push_back(i);
            }
        }
        return primes;
    }
};`,
        approach: "Use C++'s highly optimized `std::vector<bool>` specialization, which packs booleans into single bits to save cache space.",
        explanation: "Sieve of Eratosthenes utilizing standard libraries. `std::vector<bool>` acts as a bitset internally, drastically reducing memory footprint.",
        timeComplexity: "O(N * log(log N))",
        spaceComplexity: "O(N) (compacted to N bits)"
      },
      go: {
        language: "go",
        code: `package main

func generatePrimes(limit int) []int {
	if limit <= 2 {
		return []int{}
	}
	isPrime := make([]bool, limit)
	for i := 2; i < limit; i++ {
		isPrime[i] = true
	}
	
	for i := 2; i*i < limit; i++ {
		if isPrime[i] {
			for j := i * i; j < limit; j += i {
				isPrime[j] = false
			}
		}
	}
	
	var primes []int
	for i := 2; i < limit; i++ {
		if isPrime[i] {
			primes = append(primes, i)
		}
	}
	return primes
}`,
        approach: "Implement the sieve logic in Go using a pre-allocated boolean slice and a dynamically growing slice of indices.",
        explanation: "A custom slice allocation is done. Go loops are optimized to iterate over the boolean flags without memory allocations.",
        timeComplexity: "O(N * log(log N))",
        spaceComplexity: "O(N)"
      }
    }
  },
  {
    id: "nt-5",
    slug: "prime-factorization-finder",
    title: "Prime Factorization Finder",
    difficulty: "medium",
    patterns: ["Number Theory"],
    topics: ["Mathematics", "Primes"],
    description: "Given a positive integer `n`, find its prime factorization. Return a list of its prime factors in ascending order (with duplicates if a prime divides `n` multiple times).",
    examples: [
      {
        id: 1,
        input: "n = 24",
        output: "[2, 2, 2, 3]",
        explanation: "24 = 2 * 2 * 2 * 3. The prime factors are 2 and 3, and 2 is repeated three times."
      },
      {
        id: 2,
        input: "n = 101",
        output: "[101]",
        explanation: "101 is already a prime number, so its only prime factor is itself."
      }
    ],
    constraints: [
      "2 <= n <= 10^9"
    ],
    hints: [
      "Start by dividing by the smallest prime, which is 2, as long as n is even.",
      "Then loop through odd numbers starting from 3 up to sqrt(n). If n is divisible, divide it and store the factor."
    ],
    importantConcepts: [
      "Fundamental Theorem of Arithmetic",
      "Trial Division up to sqrt(N)"
    ],
    solutions: {
      javascript: {
        language: "javascript",
        code: `function primeFactorize(n) {
  const factors = [];
  // Divide by 2
  while (n % 2 === 0) {
    factors.push(2);
    n = n / 2;
  }
  // Divide by odd numbers up to sqrt(n)
  for (let i = 3; i * i <= n; i += 2) {
    while (n % i === 0) {
      factors.push(i);
      n = n / i;
    }
  }
  // If n is still prime and greater than 1
  if (n > 1) {
    factors.push(n);
  }
  return factors;
}`,
        approach: "Utilize trial division. Repeatedly divide by 2 to strip out the even factors, then loop through odd divisors starting from 3 up to `sqrt(n)`. If there's any value of `n` left above 1, it must be prime.",
        explanation: "1. Handle factor 2 explicitly inside a `while` loop.\n2. Loop `i` by steps of 2 starting at 3. Divisibility is checked in a nested loop.\n3. Finally, append `n` if `n > 1` remains.",
        timeComplexity: "O(sqrt(N)) worst case when N is prime, but typically much faster.",
        spaceComplexity: "O(log N) to hold the output factors."
      },
      typescript: {
        language: "typescript",
        code: `function primeFactorize(n: number): number[] {
  const factors: number[] = [];
  while (n % 2 === 0) {
    factors.push(2);
    n /= 2;
  }
  for (let i = 3; i * i <= n; i += 2) {
    while (n % i === 0) {
      factors.push(i);
      n /= i;
    }
  }
  if (n > 1) {
    factors.push(n);
  }
  return factors;
}`,
        approach: "Implement safe trial division up to `sqrt(N)` with typed lists of numbers.",
        explanation: "Similar to JS, dividing `n` sequentially and updating the variable safely.",
        timeComplexity: "O(sqrt(N))",
        spaceComplexity: "O(log N)"
      },
      python: {
        language: "python",
        code: `def prime_factorize(n: int) -> list[int]:
    factors = []
    while n % 2 == 0:
        factors.append(2)
        n //= 2
    i = 3
    while i * i <= n:
        while n % i == 0:
            factors.append(i)
            n //= i
        i += 2
    if n > 1:
        factors.append(n)
    return factors`,
        approach: "Use python integer division `//` to keep variables as floats. Process divisor 2, then step by 2 up to `sqrt(n)`.",
        explanation: "Trial division with early termination when loop threshold is reached. Handles large values comfortably.",
        timeComplexity: "O(sqrt(N))",
        spaceComplexity: "O(log N)"
      },
      java: {
        language: "java",
        code: `import java.util.*;

public class Solution {
    public static List<Integer> primeFactorize(int n) {
        List<Integer> factors = new ArrayList<>();
        while (n % 2 == 0) {
            factors.add(2);
            n /= 2;
        }
        for (int i = 3; (long)i * i <= n; i += 2) {
            while (n % i == 0) {
                factors.add(i);
                n /= i;
            }
        }
        if (n > 1) {
            factors.add(n);
        }
        return factors;
    }
}`,
        approach: "Write the logic inside Java. Cast the termination check to `(long)i * i` to prevent integer overflow.",
        explanation: "ArrayList matches numbers. Memory usage is minimal as factors are stored as standard primitive boxes.",
        timeComplexity: "O(sqrt(N))",
        spaceComplexity: "O(log N)"
      },
      cpp: {
        language: "cpp",
        code: `#include <vector>

class Solution {
public:
    std::vector<int> primeFactorize(int n) {
        std::vector<int> factors;
        while (n % 2 == 0) {
            factors.push_back(2);
            n /= 2;
        }
        for (int i = 3; (long long)i * i <= n; i += 2) {
            while (n % i == 0) {
                factors.push_back(i);
                n /= i;
            }
        }
        if (n > 1) {
            factors.push_back(n);
        }
        return factors;
    }
};`,
        approach: "Implement trial division in C++ using vector pushes. Casting is used to handle extreme values close to 10^9 without overflowing the loop check.",
        explanation: "Trial division is implemented with extremely fast memory layout through std::vector.",
        timeComplexity: "O(sqrt(N))",
        spaceComplexity: "O(log N)"
      },
      go: {
        language: "go",
        code: `package main

func primeFactorize(n int) []int {
	var factors []int
	for n%2 == 0 {
		factors = append(factors, 2)
		n /= 2
	}
	for i := 3; i*i <= n; i += 2 {
		for n%i == 0 {
			factors = append(factors, i)
			n /= i
		}
	}
	if n > 1 {
		factors = append(factors, n)
	}
	return factors
}`,
        approach: "Implement prime factorization iteratively using custom slice insertions in Go.",
        explanation: "The algorithm uses loops over even factors first, then steps odd numbers up to the square root of `n` to isolate divisors.",
        timeComplexity: "O(sqrt(N))",
        spaceComplexity: "O(log N)"
      }
    }
  }
];
