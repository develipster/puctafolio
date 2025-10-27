# Given a string s, return the longest palindromic substring in s.



# Example 1:

# Input: s = "babad"
# Output: "bab"
# Explanation: "aba" is also a valid answer.
# Example 2:

# Input: s = "cbbd"
# Output: "bb"


# Constraints:

# 1 <= s.length <= 1000
# s consist of only digits and English letters.

from ast import If


class Solution:
    def longestPalindromeExpand(self, s: str) -> str:
        def expandAroundCenter(left: int, right: int) -> str:
            while left >= 0 and right < len(s) and s[left] == s[right]:
                left -= 1
                right += 1
            return s[left + 1:right]

        longestPal = ""
        for i in range(len(s)):
            # Odd length palindromes
            pal1 = expandAroundCenter(i, i)
            if len(pal1) > len(longestPal):
                longestPal = pal1

            # Even length palindromes
            pal2 = expandAroundCenter(i, i + 1)
            if len(pal2) > len(longestPal):
                longestPal = pal2

        return longestPal

    def longestPalindromeDP(self, s: str) -> str:
        # How can we reuse a previously computed palindrome to compute a larger palindrome?
        # If “aba” is a palindrome, is “xabax” a palindrome? Similarly is “xabay” a palindrome?
        # Complexity based hint:
        # If we use brute-force and check whether for every start and end position a substring is a palindrome we have O(n^2) start - end pairs and O(n) palindromic checks. Can we reduce the time for palindromic checks to O(1) by reusing some previous computation.
        # We can use dynamic programming to store the results of previous palindromic checks.

        n = len(s)
        dp = [[False] * n for _ in range(n)]
        start = 0
        max_length = 1

        # Every single character is a palindrome
        for i in range(n):
            dp[i][i] = True

        for length in range(2, n + 1):
            for i in range(n - length + 1):
                j = i + length - 1
                if s[i] == s[j]:
                    if length == 2:
                        dp[i][j] = True
                    else:
                        dp[i][j] = dp[i + 1][j - 1]
                if dp[i][j] and length > max_length:
                    max_length = length
                    start = i

        return s[start:start + max_length]