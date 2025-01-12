# PriorityQueue Implementation

- [PriorityQueue Implementation](#priorityqueue-implementation)
  - [Overview](#overview)
  - [PriorityQueue\<\[TElement, TPriority\]\>](#priorityqueuetelement-tpriority)
    - [Type Parameters](#type-parameters)
  - [Methods](#methods)
    - [dequeue](#dequeue)
    - [enqueue](#enqueue)
    - [enqueueRange](#enqueuerange)
    - [dequeueEnqueue](#dequeueenqueue)
    - [enqueueDequeue](#enqueuedequeue)
    - [peek](#peek)
    - [remove](#remove)
    - [tryDequeue](#trydequeue)
    - [tryPeek](#trypeek)
    - [Example Usage](#example-usage)
    - [Complex Example](#complex-example)

## Overview

The PriorityQueue implementation provides a queue data structure taking priority into account.

## PriorityQueue\<[TElement, TPriority]\>

Represents a PriorityQueue data structure.

### Type Parameters

- `TElement` - The type of elements in the queue
- `TPriority` - The type of priority in the queue

## Methods

### dequeue

Removes and returns the element at the front of the queue.

```typescript
dequeue(): TElement
```

- Returns: The element at the front of the queue
- Throws: Error if the queue is empty
  
### enqueue

Adds an element to the queue taking priority into account.

```typescript
enqueue(data: TElement, priority: TPriority): void
```

- Parameters:
  - `data` - The element to add
  - `priority` - The priority of the element

### enqueueRange

Enqueues a sequence of element/priority pairs.

```typescript
enqueueRange(data: Iterable<[TElement, TPriority]>): void
```

- Parameters:
  - `data` - The pairs of elements and priorities to add to the queue

### dequeueEnqueue

Removes the element at the front of the queue and adds a new element to the queue taking priority into account.

```typescript
dequeueEnqueue(data: TElement, priority: TPriority): TElement
```

- Parameters:
  - `data` - The element to add
  - `priority` - The priority of the element
- Returns: The element at the front of the queue
- Throws: Error if the queue is empty

### enqueueDequeue

Adds an element to the queue taking priority into account and removes the element at the front of the queue.

```typescript
enqueueDequeue(data: TElement, priority: TPriority): TElement
```

- Parameters:
  - `data` - The element to add
  - `priority` - The priority of the element
- Returns: The element that was removed from the front of the queue or the enqueued element if the list is empty

### peek

Returns the element at the front of the queue without removing it.

```typescript
peek(): TElement
```

- Returns: The element at the front of the queue
- Throws: Error if the queue is empty

### remove

Removes the first occurrence of the specified element from the queue.

```typescript
remove(data: TElement): TElement | undefined
```

- Parameters:
  - `data` - The element to remove
- Returns: In case of success returns a tupple `[item, priority]`, and `undefined` otherwise.

### tryDequeue

Attempts to remove and return the element at the front of the queue.

```typescript
tryDequeue(): [false] | [true, TElement]
```

- Returns: A tuple where the first element is a boolean indicating success, and the second element is the data if successful. [false] if the queue is empty, otherwise [true, item].

### tryPeek

Attempts to return the element at the front of the queue without removing it.

```typescript
tryPeek(): [false] | [true, TElement]
```

- Returns: A tuple where the first element is a boolean indicating success, and the second element is the data if successful. [false] if the queue is empty, otherwise [true, item].

### Example Usage

```typescript
const queue = new PriorityQueue<[string, number]>();

// Add elements
queue.enqueue(["a", 1]);
queue.enqueue(["b", 2]);
queue.enqueue(["c", 3]);

// Remove elements
const first = queue.dequeue(); // returns ["a", 1]
const second = queue.dequeue(); // returns ["b", 2]

// Peek without removing
const third = queue.peek(); // returns ["c", 3]

// Safe operations
const [success, value] = queue.tryDequeue();
if (success) {
    console.log(value); // ["c", 3]
}
```

### Complex Example

```typescript
// Create a queue of tasks
interface Task {
    id: number;
    name: string;
}

const taskQueue = new PriorityQueue<[Task, number]>();

// Add initial tasks
console.log("=== Adding Initial Tasks ===");
taskQueue.enqueue({ id: 1, name: "High Priority Task" }, 1);
taskQueue.enqueue({ id: 2, name: "Low Priority Task" }, 2);
taskQueue.enqueue({ id: 3, name: "Medium Priority Task" }, 3);
console.log(`Queue size: ${taskQueue.size}`); // Output: 3

// Peek at first task without removing
console.log("\n=== Peeking First Task ===");
const firstTask = taskQueue.peek();
console.log(`Next task: ${firstTask.name}`); // High Priority Task

// Try peeking safely
console.log("\n=== Safe Peek Operation ===");
const [peekSuccess, peekedTask] = taskQueue.tryPeek();
if (peekSuccess) {
    console.log(`Safely peeked task: ${peekedTask.name}`);
}

// Process tasks with dequeue
console.log("\n=== Processing Tasks (Dequeue) ===");
while (taskQueue.size > 0) {
    const task = taskQueue.dequeue();
    console.log(`Processing: ${task.name}`);
}

// Demonstrate error handling
console.log("\n=== Error Handling ===");
try {
    taskQueue.dequeue();
} catch (error) {
    console.log(`Error caught: ${error.message}`);
}

// Demonstrate dequeueEnqueue (swap operation)
console.log("\n=== Swap Operations ===");
taskQueue.enqueue({ id: 4, name: "Task A" }, 1);
taskQueue.enqueue({ id: 5, name: "Task B" }, 2);

const removedTask = taskQueue.dequeueEnqueue({ id: 6, name: "Task C" }, 3);
console.log(`Removed: ${removedTask.name}`);
console.log(`New queue size: ${taskQueue.size}`);

// Demonstrate enqueueDequeue (rotate operation)
console.log("\n=== Rotation Operations ===");
const rotatedTask = taskQueue.enqueueDequeue({ id: 7, name: "Task D" }, 1);
console.log(`Rotated out: ${rotatedTask.name}`);

// Clear the queue
console.log("\n=== Clearing Queue ===");
taskQueue.clear();
console.log(`Queue empty? ${taskQueue.size === 0}`);

// Demonstrate safe dequeue on empty queue
console.log("\n=== Safe Operations on Empty Queue ===");
const [dequeueSuccess, dequeuedTask] = taskQueue.tryDequeue();
console.log(`Dequeue successful? ${dequeueSuccess}`);
```

Expected output

```text
=== Adding Initial Tasks ===
Queue size: 3

=== Peeking First Task ===
Next task: High Priority Task

=== Safe Peek Operation ===
Safely peeked task: High Priority Task

=== Processing Tasks (Dequeue) ===
Processing: High Priority Task
Processing: Low Priority Task
Processing: Medium Priority Task

=== Error Handling ===
Error caught: Queue is empty

=== Swap Operations ===
Removed: Task A
New queue size: 2

=== Rotation Operations ===
Rotated out: Task D

=== Clearing Queue ===
Queue empty? true

=== Safe Operations on Empty Queue ===
Dequeue successful? false
```
