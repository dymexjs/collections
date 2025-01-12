# Queue Implementation

- [Queue Implementation](#queue-implementation)
  - [Overview](#overview)
  - [Queue\<T\>](#queuet)
    - [Type Parameters](#type-parameters)
  - [Methods](#methods)
    - [dequeue](#dequeue)
    - [enqueue](#enqueue)
    - [enqueueRange](#enqueuerange)
    - [dequeueEnqueue](#dequeueenqueue)
    - [enqueueDequeue](#enqueuedequeue)
    - [peek](#peek)
    - [tryDequeue](#trydequeue)
    - [tryPeek](#trypeek)
  - [Type Aliases](#type-aliases)
    - [IFifo\<T\>](#ififot)
    - [Example Usage](#example-usage)
    - [Complex Example](#complex-example)

## Overview

The Queue implementation provides a First-In-First-Out (FIFO) data structure.

## Queue\<T\>

Represents a queue data structure that implements the FIFO pattern.

### Type Parameters

- `T` - The type of elements in the queue

## Methods

### dequeue

Removes and returns the element at the front of the queue.

```typescript
dequeue(): T
```

- Returns: The element at the front of the queue
- Throws: Error if the queue is empty
  
### enqueue

Adds an element to the end of the queue.

```typescript
enqueue(data: T): void
```

- Parameters:
  - `data` - The element to add

### enqueueRange

Enqueues a sequence of elements to the Queue.

```typescript
enqueueRange(items: Iterable<T>): void;
```

- Parameters:
  - `data` - The elements to add to the queue.

### dequeueEnqueue

Removes the element at the front of the queue and adds a new element to the end of the queue.

```typescript
dequeueEnqueue(data: T): T
```

- Parameters:
  - `data` - The element to add
- Returns: The element at the front of the queue
- Throws: Error if the queue is empty

### enqueueDequeue

Adds an element to the end of the queue and removes the element at the front of the queue.

```typescript
enqueueDequeue(data: T): T
```

- Parameters:
  - `data` - The element to add
- Returns: The element that was removed from the front of the queue or the enqueued element if the list is empty

### peek

Returns the element at the front of the queue without removing it.

```typescript
peek(): T
```

- Returns: The element at the front of the queue
- Throws: Error if the queue is empty

### tryDequeue

Attempts to remove and return the element at the front of the queue.

```typescript
tryDequeue(): [false] | [true, T]
```

- Returns: A tuple where the first element is a boolean indicating success, and the second element is the data if successful. [false] if the queue is empty, otherwise [true, item].

### tryPeek

Attempts to return the element at the front of the queue without removing it.

```typescript
tryPeek(): [false] | [true, T]
```

- Returns: A tuple where the first element is a boolean indicating success, and the second element is the data if successful. [false] if the queue is empty, otherwise [true, item].

## Type Aliases

### IFifo\<T\>

Alias for `IQueue<T>`.

```typescript
type IFifo<T> = IQueue<T>
```

### Example Usage

```typescript
const queue = new Queue<number>();

// Add elements
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);

// Remove elements
const first = queue.dequeue(); // returns 1
const second = queue.dequeue(); // returns 2

// Peek without removing
const third = queue.peek(); // returns 3

// Safe operations
const [success, value] = queue.tryDequeue();
if (success) {
    console.log(value); // 3
}
```

### Complex Example

```typescript
// Create a queue of tasks
interface Task {
    id: number;
    name: string;
}

const taskQueue = new Queue<Task>();

// Add initial tasks
console.log("=== Adding Initial Tasks ===");
taskQueue.enqueue({ id: 1, name: "High Priority Task" });
taskQueue.enqueue({ id: 2, name: "Low Priority Task" });
taskQueue.enqueue({ id: 3, name: "Medium Priority Task" });
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
    taskQueue.dequeue(); // Will throw error - queue is empty
} catch (error) {
    console.log(`Error caught: ${error.message}`);
}

// Demonstrate dequeueEnqueue (swap operation)
console.log("\n=== Swap Operations ===");
taskQueue.enqueue({ id: 4, priority: 1, name: "Task A" });
taskQueue.enqueue({ id: 5, priority: 2, name: "Task B" });

const removedTask = taskQueue.dequeueEnqueue({ 
    id: 6, 
    priority: 3, 
    name: "Task C" 
});
console.log(`Removed: ${removedTask.name}`);
console.log(`New queue size: ${taskQueue.size}`);

// Demonstrate enqueueDequeue (rotate operation)
console.log("\n=== Rotation Operations ===");
const rotatedTask = taskQueue.enqueueDequeue({ 
    id: 7, 
    priority: 1, 
    name: "Task D" 
});
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
Rotated out: Task B

=== Clearing Queue ===
Queue empty? true

=== Safe Operations on Empty Queue ===
Dequeue successful? false
```
