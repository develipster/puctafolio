# You may assume that each input would have exactly one solution, and you may not use the same element twice.

# You can return the answer in any order.



# Example 1:

# Input: nums = [2,7,11,15], target = 9
# Output: [0,1]
# Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
# Example 2:

# Input: nums = [3,2,4], target = 6
# Output: [1,2]
# Example 3:

# Input: nums = [3,3], target = 6
# Output: [0,1]


# Constraints:

# 2 <= nums.length <= 104
# -109 <= nums[i] <= 109
# -109 <= target <= 109
# Only one valid answer exists.


# Follow-up: Can you come up with an algorithm that is less than O(n2) time complexity?

import math
from typing import List, Tuple


class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        sortedNums = sorted(nums)
        first, last = self.separateSort(sortedNums)
        if target < last[0]:
            self.twoSum(first, target)
        elif target > last[0] + first[-1]:
            self.twoSum(last, target)
        # Finish implementation


    def separateSort(self, nums: List[int]) -> Tuple[List[int], List[int]]:
        mid = math.floor(len(nums)/2)
        first = nums[:mid]
        last = nums[mid:]
        return first, last