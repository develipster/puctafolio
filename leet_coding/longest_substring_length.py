# Given a string s, find the length of the longest substring without duplicate characters.

# Example 1:

# Input: s = "abcabcbb"
# Output: 3
# Explanation: The answer is "abc", with the length of 3. Note that "bca" and "cab" are also correct answers.
# Example 2:

# Input: s = "bbbbb"
# Output: 1
# Explanation: The answer is "b", with the length of 1.
# Example 3:

# Input: s = "pwwkew"
# Output: 3
# Explanation: The answer is "wke", with the length of 3.
# Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.


# Constraints:

# 0 <= s.length <= 5 * 104
# s consists of English letters, digits, symbols and spaces.

class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        # n = len(s)
        # maxLen = 0
        # for i in range(n):
        #     seen = set()
        #     currentLen = 0
        #     for j in range(i,n):
        #         if s[j] in seen:
        #             break
        #         seen.add(s[j])
        #         currentLen += 1
        #     maxLen = max(maxLen, currentLen)
        # return maxLen

        charIndexMap = {}
        left = 0
        maxLength = 0

        for right in range(len(s)):
            if s[right] in charIndexMap and charIndexMap[s[right]] >= left:
                left = charIndexMap[s[right]] + 1
            charIndexMap[s[right]] = right
            maxLength = max(maxLength, right - left + 1)

        return maxLength