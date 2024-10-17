### **Lesson 1: Introduction to Python (In-Depth Learning)**【9†source】

#### **1. Python: Compiled vs Interpreted**
- Python is an **interpreted** language but also can be compiled. When you run Python code, it is first **compiled into bytecode**, and then this bytecode is interpreted by the Python interpreter.
- In comparison:
  - **C++** is compiled into machine code specific to your system architecture.
  - **Python** translates code into **bytecode**, which is platform-independent but requires the interpreter to run on your machine.
  
#### **2. Python Data Types and Variables**
- In Python, variables are not **statically typed** like in C/C++. A variable is a reference to an object, and the object’s type is determined at runtime. You do not need to declare the type.
  
    ```python
    # Example:
    x = 5  # int
    y = 5.0  # float
    z = "Hello, World!"  # string
    ```

#### **3. Operators and Their Specific Use**
- **Arithmetic Operators**:
    - `+`, `-`, `*`, `/`: Regular arithmetic operators.
    - `//`: **Integer Division** (floors the result).
    - `%`: **Modulus** (remainder of division).
    - `**`: **Exponent**.

- **Important Mathematical Behaviors:**
    - Python’s integer division and modulus behavior is different from C/C++. Python follows mathematical rules:
  
    ```python
    # Python
    print(-9 % 5)  # Result: 1
    # In C, this would return -4.
    ```

#### **4. Control Structures:**
- **Indentation**: Unlike C/C++, Python uses indentation (whitespace) to define blocks of code (loops, if-else blocks).
  
    ```python
    # Example of correct indentation:
    x = 10
    if x > 5:
        print("x is greater than 5")
    ```

- **Boolean Operators**: 
  - Instead of `&&`, `||`, `!` used in C++, Python uses `and`, `or`, and `not`.

- **Lazy Evaluation**: Python evaluates Boolean expressions lazily, meaning it stops evaluating once it can determine the result.
  
    ```python
    # Example:
    def truthy():
        print("True!")
        return True
    
    def falsey():
        print("False!")
        return False
    
    truthy() or falsey()  # Prints: True!
    falsey() and truthy()  # Prints: False!
    ```

---

### **Lesson 2: Recursion, Searching, and Sorting (Detailed Study)**【8†source】

#### **1. Recursion Deep Dive:**
- **Recursive Function Structure:**
  - Two main parts in recursion:
    - **Base case**: The simplest version of the problem, which can be solved directly.
    - **Recursive case**: The part of the function where the function calls itself with a smaller piece of the problem.

  ```python
  # Factorial Function Example:
  def factorial(n):
      if n <= 1:  # Base Case
          return 1
      else:
          return n * factorial(n - 1)  # Recursive case
  ```

- **How Recursion Works in Python (The Stack)**:
  - Each recursive call pushes a new stack frame with its own local variables onto the **call stack**.
  - Once the base case is hit, the function returns and the stack starts unwinding.

#### **2. Time Complexity of Recursive Functions:**
- To analyze recursive functions, count the number of operations for each call.
  
  - **Factorial Time Complexity:**
    - The recursive factorial function makes `n` calls, so its time complexity is **O(n)**.
  
  - **Space Complexity**:
    - Since each recursive call creates a new stack frame, the **space complexity** is also **O(n)**.

#### **3. Searching Algorithms:**
- **Linear Search**: 
  - Checks each element one by one.
  - **Time Complexity**: O(n) for unsorted lists.

    ```python
    def linear_search(arr, key):
        for i in range(len(arr)):
            if arr[i] == key:
                return i
        return -1
    ```

- **Binary Search**:
  - Requires a **sorted** array. It works by dividing the search space in half with each comparison.
  - **Time Complexity**: O(log n).

    ```python
    def binary_search(arr, key):
        low, high = 0, len(arr) - 1
        while low <= high:
            mid = (low + high) // 2
            if arr[mid] == key:
                return mid
            elif arr[mid] < key:
                low = mid + 1
            else:
                high = mid - 1
        return -1
    ```

#### **4. Sorting Algorithms:**
- **Bubble Sort**:
  - Repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.
  - **Time Complexity**: O(n^2).
  
  ```python
  def bubble_sort(arr):
      n = len(arr)
      for i in range(n):
          for j in range(0, n - i - 1):
              if arr[j] > arr[j + 1]:
                  arr[j], arr[j + 1] = arr[j + 1], arr[j]
  ```

- **Other Sorting Techniques**:
  - **Selection Sort**, **Insertion Sort** also have O(n^2) time complexity, but with slight variations in their inner workings.

---

### **Lesson 3: Data Structures (In-Depth)**【7†source】

#### **1. Linked Lists:**
- **What is a Node?**
  - Each node in a linked list contains two parts: **data** and a pointer (reference) to the next node.
  
- **Singly Linked List**:
  - Nodes point to the next node, but not the previous one.

- **Doubly Linked List**:
  - Each node contains pointers to both the **next** and the **previous** node.
  
  ```python
  class Node:
      def __init__(self, data=None):
          self.data = data
          self.next = None
          self.prev = None
  
  class LinkedList:
      def __init__(self):
          self.head = None
  ```

#### **2. Linked List Operations**:
- **push_front** (Adding an element to the front):
  - Create a new node and adjust the pointers accordingly.
  
  ```python
  def push_front(self, data):
      new_node = Node(data)
      new_node.next = self.head
      if self.head:
          self.head.prev = new_node
      self.head = new_node
  ```

- **pop_front** (Removing the first element):
  - Remove the head node and adjust pointers.

#### **3. Stacks (LIFO Structure)**:
- **Stack** only allows access to the last element inserted (Last-In-First-Out). Common operations include:
  - **push**: Insert an item at the top.
  - **pop**: Remove the top item.

  ```python
  class Stack:
      def __init__(self):
          self.stack = []
      
      def push(self, item):
          self.stack.append(item)
      
      def pop(self):
          if not self.is_empty():
              return self.stack.pop()
          return None
  
      def is_empty(self):
          return len(self.stack) == 0
  ```

#### **4. Queues (FIFO Structure)**:
- **Queue** allows adding elements at the back and removing from the front (First-In-First-Out).
  - **enqueue**: Insert at the end.
  - **dequeue**: Remove from the front.

  ```python
  class Queue:
      def __init__(self):
          self.queue = []
  
      def enqueue(self, item):
          self.queue.append(item)
  
      def dequeue(self):
          if not self.is_empty():
              return self.queue.pop(0)
          return None
  
      def is_empty(self):
          return len(self.queue) == 0
  ```

---

### **Study Plan for Scoring 100:**

1. **Master the Basics of Python**:
   - Write programs involving variables, loops, conditionals, and functions.
   
2. **Deep Dive into Recursion**:
   - Practice writing recursive functions for factorial, Fibonacci series, etc.
   - Analyze each function's time and space complexity.

3. **Get Comfortable with Data Structures**:
   - Implement and manipulate linked lists (both singly and doubly).
   - Practice using stacks and queues.

4. **Understand Searching and Sorting**:
   - Write and run algorithms like linear search, binary search, bubble sort, and selection sort.
   - Practice analyzing the complexity of each algorithm.

Focus on understanding **why** these algorithms work, not just how. You need to be able to write them, but also explain their purpose and efficiency. 
