## Q1:

What is the run time of the following function:

```python
def f1(number):
    rc = 1
    for i in range(0, 5):
        rc += 1
    return rc
```
## A1:

```python
def f1(number):
    rc = 1
    for i in range(0, 5):
        rc += 1
    return rc
```

- The function has a **for loop** that runs exactly 5 times, independent of the input `number`.
- Therefore, the **runtime is constant O(1)** because it doesn’t depend on the input size.

## Q2:

What is the run time of the following function:

```python
def f1(n):
    rc = 1
    i = 0
    while i < n:
        rc += 1
        i += 2
    return rc
```

## A2:

```python
def f1(n):
    rc = 1
    i = 0
    while i < n:
        rc += 1
        i += 2
    return rc
```

- The `while` loop runs with the condition `i < n`, but `i` increments by `2` each time.
- This means the loop runs approximately `n / 2` times.
- **Runtime: O(n)** because dividing by a constant factor still leaves us with linear complexity.


## Q3:

Suppose that the function g1(n) has a run time of O(n) and g2(n) has a run time of O(n^2)  What is the run time of f1(n)?

```python
def f1(n):
    g1(n)
    g2(n)
```

## A3:

```python
def f1(n):
    g1(n)
    g2(n)
```

- If `g1(n)` is **O(n)** and `g2(n)` is **O(n²)**, the overall runtime is dominated by the slower function, which is **O(n²)**.
- **Answer: O(n²)**.

## Q4:

Write the following function recursively:

```python
def is_palindrome(word)
```
word is a character string.  This function returns true if word is a palindrome.  A palindrome is a string that reads the same forwards and backwards.  Thus:   noon, mom, dad are all palindromes.   table, texture, glass are not palindromes.

the above function can be a wrapper to a function that actually does the work

Try to write the function to O(n) run time where n is the length of s.


## A4:

Here’s a recursive solution to check if a word is a palindrome with **O(n)** complexity:

```python
def is_palindrome_recursive(word, left, right):
    if left >= right:
        return True
    if word[left] != word[right]:
        return False
    return is_palindrome_recursive(word, left + 1, right - 1)

def is_palindrome(word):
    return is_palindrome_recursive(word, 0, len(word) - 1)
```

- **Explanation**: The function checks if the first and last characters match, then moves inward. If any mismatch is found, it returns `False`. If the whole string matches, it returns `True`.


## Q5:

When using a singly linked list to implement a stack, is it better for insertions to occur at the front or back of the list (or does it matter)?  Why?

## A5:

- **Insertions should occur at the front of the list**.
  - Inserting at the front is **O(1)** because it only involves changing a pointer.
  - Inserting at the back requires traversing the list, making it **O(n)**.

## Q6:

The following show a table of keys and the hash index of these keys within a table of size 10

| key | hashIdx |
|---|---|
| alpha | 8|
| beta | 9|
| gamma | 8|
| apple | 4 |
| orange | 4 | 
| cherry | 5 |


#### part a

Draw an empty array of size 10 that represents a linear probing table.

#### part b
Insert the keys in the following order and show the final array:

* beta
* alpha
* gamma
* apple
* cherry
* orange


#### part c

remove apple from table in part b, what does final array look like

#### part d

remove beta from table in part c, what does final array look like

#### part e

If you used tombstones in the previous parts, redo this question (parts A to D) without tombstones.  If you did it without tombstones, redo this question (parts A to D)  with tombstones 

## A6:

#### **Part a**: Drawing an empty array (size 10):
```
[  _  ,  _  ,  _  ,  _  ,  _  ,  _  ,  _  ,  _  ,  _  ,  _  ]
```

#### **Part b**: Inserting the keys:

- Insert **beta (index 9)**: 
  ```
  [  _  ,  _  ,  _  ,  _  ,  _  ,  _  ,  _  ,  _  ,  _  , beta ]
  ```
- Insert **alpha (index 8)**:
  ```
  [  _  ,  _  ,  _  ,  _  ,  _  ,  _  ,  _  ,  _  , alpha , beta ]
  ```
- Insert **gamma (index 8)** → collision → try next slot (index 9 is taken) → insert in slot 0:
  ```
  [ gamma ,  _  ,  _  ,  _  ,  _  ,  _  ,  _  ,  _  , alpha , beta ]
  ```
- Insert **apple (index 4)**:
  ```
  [ gamma ,  _  ,  _  ,  _  , apple ,  _  ,  _  ,  _  , alpha , beta ]
  ```
- Insert **cherry (index 5)**:
  ```
  [ gamma ,  _  ,  _  ,  _  , apple , cherry ,  _  ,  _  , alpha , beta ]
  ```
- Insert **orange (index 4)** → collision → try next slot (index 5 is taken) → try next slot → insert in slot 6:
  ```
  [ gamma ,  _  ,  _  ,  _  , apple , cherry , orange ,  _  , alpha , beta ]
  ```

#### **Part c**: Remove **apple**:
- Removing from index 4:
  ```
  [ gamma ,  _  ,  _  ,  _  ,  _  , cherry , orange ,  _  , alpha , beta ]
  ```

#### **Part d**: Remove **beta**:
- Removing from index 9:
  ```
  [ gamma ,  _  ,  _  ,  _  ,  _  , cherry , orange ,  _  , alpha ,  _  ]
  ```

#### **Part e**: Using Tombstones (Part b to d) → will mark removed entries instead of emptying them:
- **Removing apple**:
  ```
  [ gamma ,  _  ,  _  ,  _  ,  Tombstone , cherry , orange ,  _  , alpha , beta ]
  ```
- **Removing beta**:
  ```
  [ gamma ,  _  ,  _  ,  _  ,  Tombstone , cherry , orange ,  _  , alpha , Tombstone ]
  ```

## Q7:

Describe what you will need to implement a queue using an array such that you have O(1) runtimes for enqueue() and dequeue() operations.  Do this WITHOUT using code (ie what do you need, why do you need it, but don't just code dump)

## A7:

  - **Circular Array**: Use a **circular buffer** (or circular array) with two pointers, `front` and `rear`.
  - **enqueue**: Add the element at `rear`, then increment `rear` (wrap around if needed).
  - **dequeue**: Remove the element from `front`, then increment `front` (wrap around if needed).
  - **Why O(1)**? Both operations only involve adjusting the pointers, not shifting elements.

## Q8:

A self adjusting linked list is a linked list where a successful search causes the list to adjust so that the found item is moved to the front (and thus allowing successive search for same item to be more readily found).
 
Given the following class declarations for a doubly linked self adjusting linked list:
 
```python
class SelfAdjustingList:
	class Node:
		def __init__(self, dat, nx, pr):
			self.data = dat
			self.next = nx
			self.prev = pr

	def __init__(self, id_list):
                self.front = ...
                self.back = ...
```

Write the following function:
```python 
def search(self, v)
```

* This function searches for v within the list and returns true if v is found.  If not found, function returns false
* The list will be adjusted so that the found node is moved so that it becomes the first data node in the list
* Function must have run time of O(n)
* Implement two versions of this, one using sentinels and one without.

## A8:

#### **Without Sentinels**:
```python
def search(self, v):
    current = self.front
    while current:
        if current.data == v:
            if current != self.front:
                # Remove current node from its place
                if current.prev:
                    current.prev.next = current.next
                if current.next:
                    current.next.prev = current.prev
                # Move current to the front
                current.next = self.front
                self.front.prev = current
                current.prev = None
                self.front = current
            return True
        current = current.next
    return False
```

#### **With Sentinels**:

- The sentinels will always exist, so the list will never be empty. The `front` sentinel will always be there at the start, and the `back` sentinel at the end. The sentinels don’t store real data, they just act as placeholders.
- When we search for a value, we adjust the list by moving the found node to just after the `front` sentinel, keeping the rest of the list order intact.

#### **Implementation**:

```python
class SelfAdjustingList:
    class Node:
        def __init__(self, data=None, nx=None, pr=None):
            self.data = data
            self.next = nx
            self.prev = pr
    
    def __init__(self):
        # Initialize the sentinels
        self.front = SelfAdjustingList.Node()  # front sentinel (dummy node)
        self.back = SelfAdjustingList.Node()   # back sentinel (dummy node)
        # Link sentinels to each other
        self.front.next = self.back
        self.back.prev = self.front
    
    def search(self, v):
        current = self.front.next  # Start after the front sentinel
        
        # Traverse the list to find the node with value `v`
        while current != self.back:  # Stop when we reach the back sentinel
            if current.data == v:
                # Move the found node to just after the front sentinel
                
                # 1. Detach the current node from its current position
                current.prev.next = current.next
                current.next.prev = current.prev
                
                # 2. Move current node to the front, after the front sentinel
                current.next = self.front.next
                current.prev = self.front
                self.front.next.prev = current  # Update the previous node's previous pointer
                self.front.next = current  # Update the front sentinel's next pointer
                
                return True  # Node found and moved
            current = current.next
        
        return False  # Node not found
```

#### **How It Works**:
1. **Sentinels**: The `front` sentinel doesn't hold any data, and the `back` sentinel marks the end of the list.
2. **Traversal**: We start from `self.front.next` (the first real node after the front sentinel) and go until we reach `self.back`.
3. **Adjusting the List**: 
   - When a node with the desired value is found, we:
     - **Detach** the node from its current position by adjusting the `next` and `prev` pointers of its neighbors.
     - **Move** it to just after the front sentinel by adjusting the `next` and `prev` pointers of the front sentinel and the first node in the list.

#### **Run Time**:
- The function searches the list once (linear traversal), so the time complexity is **O(n)**, where `n` is the number of nodes in the list.

### **Summary**:
This version using sentinels helps avoid special cases like checking for empty lists or the head node separately. The sentinels ensure that the list always has at least two nodes (the front and back sentinels), simplifying the logic.

## Q9: Recursive Analysis:

Perform an analysis on do_something() function with respect to the length of the string str
```python
def do_recursion(str, curr):
    if curr == len(str):
        return 0
    elif str[curr] == "a":
        return 1 + do_recursion(str, curr + 1)
    else:
        return do_recursion(str, curr + 1)

def do_something(str):
    return do_recursion(str, 0)
```

## A9:

```python
def do_recursion(str, curr):
    if curr == len(str):
        return 0
    elif str[curr] == "a":
        return 1 + do_recursion(str, curr + 1)
    else:
        return do_recursion(str, curr + 1)

def do_something(str):
    return do_recursion(str, 0)
```

- **Time Complexity**: The recursion processes each character exactly once. Thus, the time complexity is **O(n)** where `n` is the length of the string.
- **Space Complexity**: Since recursion uses the call stack, the space complexity is **O(n)** as well, as there are `n` recursive calls on the stack.
