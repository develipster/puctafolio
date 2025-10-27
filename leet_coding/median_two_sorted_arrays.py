# Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

# The overall run time complexity should be O(log (m+n)).



# Example 1:

# Input: nums1 = [1,3], nums2 = [2]
# Output: 2.00000
# Explanation: merged array = [1,2,3] and median is 2.
# Example 2:

# Input: nums1 = [1,2], nums2 = [3,4]
# Output: 2.50000
# Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.


# Constraints:

# nums1.length == m
# nums2.length == n
# 0 <= m <= 1000
# 0 <= n <= 1000
# 1 <= m + n <= 2000
# -106 <= nums1[i], nums2[i] <= 106

from typing import List

class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        # Optimal approach - O(log(min(m,n))) time and O(1) space
        if len(nums1) > len(nums2):
            nums1, nums2 = nums2, nums1

        x, y = len(nums1), len(nums2)
        low, high = 0, x

        while low <= high:
            partitionX = (low + high) // 2
            partitionY = (x + y + 1) // 2 - partitionX

            maxX = float('-inf') if partitionX == 0 else nums1[partitionX - 1]
            maxY = float('-inf') if partitionY == 0 else nums2[partitionY - 1]

            minX = float('inf') if partitionX == x else nums1[partitionX]
            minY = float('inf') if partitionY == y else nums2[partitionY]

            if maxX <= minY and maxY <= minX:
                if (x + y) % 2 == 0:
                    return (max(maxX, maxY) + min(minX, minY)) / 2.0
                else:
                    return float(max(maxX, maxY))
            elif maxX > minY:
                high = partitionX - 1
            else:
                low = partitionX + 1

        raise ValueError("Input arrays are not sorted or of valid size.")

    # def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
    #     # Merge and find median - O(m+n) time and O(m+n) space
    #     merged = []
    #     i, j = 0, 0
    #     while i < len(nums1) and j < len(nums2):
    #         if nums1[i] < nums2[j]:
    #             merged.append(nums1[i])
    #             i += 1
    #         else:
    #             merged.append(nums2[j])
    #             j += 1
    #     while i < len(nums1):
    #         merged.append(nums1[i])
    #         i += 1
    #     while j < len(nums2):
    #         merged.append(nums2[j])
    #         j += 1

    #     n = len(merged)
    #     if n % 2 == 1:
    #         return float(merged[n // 2])
    #     else:
    #         return (merged[n // 2 - 1] + merged[n // 2]) / 2.0