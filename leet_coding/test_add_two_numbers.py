from add_two_numbers import ListNode, Solution

def list_to_listnode(vals):
    dummy = ListNode(0)
    cur = dummy
    for v in vals:
        cur.next = ListNode(v)
        cur = cur.next
    return dummy.next

def listnode_to_list(node):
    out = []
    while node:
        out.append(node.val)
        node = node.next
    return out

# Test cases
sol = Solution()

# Example 1: 342 + 465 = 807
l1 = list_to_listnode([2,4,3])
l2 = list_to_listnode([5,6,4])
result = sol.addTwoNumbers(l1, l2)
assert listnode_to_list(result) == [7,0,8], "Example 1 failed"

# Example 2: 0 + 0 = 0
l1 = list_to_listnode([0])
l2 = list_to_listnode([0])
result = sol.addTwoNumbers(l1, l2)
assert listnode_to_list(result) == [0], "Example 2 failed"

# Example 3: 9999999 + 9999 = 10009998
l1 = list_to_listnode([9,9,9,9,9,9,9])
l2 = list_to_listnode([9,9,9,9])
result = sol.addTwoNumbers(l1, l2)
assert listnode_to_list(result) == [8,9,9,9,0,0,0,1], "Example 3 failed"

# Edge case: Different lengths with carry
l1 = list_to_listnode([1])
l2 = list_to_listnode([9,9])
result = sol.addTwoNumbers(l1, l2)
assert listnode_to_list(result) == [0,0,1], "Edge case failed"

print("✅ All tests passed!")