# Stack Implementation

- [Stack Implementation](#stack-implementation)
  - [Overview](#overview)
  - [Stack\<T\>](#stackt)
    - [Type Parameters](#type-parameters)
  - [Methods](#methods)
    - [dequeue](#dequeue)
    - [enqueue](#enqueue)
    - [enqueueRange](#enqueuerange)
    - [peek](#peek)
    - [tryDequeue](#trydequeue)
    - [tryPeek](#trypeek)
  - [Type Aliases](#type-aliases)
    - [Lifo\<T\>](#lifot)
    - [Example Usage](#example-usage)
    - [Complex Example](#complex-example)

## Overview

The Stack implementation provides a Last-In-First-Out (LIFO) data structure.

## Stack\<T\>

Represents a stack data structure that implements the LIFO pattern.

### Type Parameters

- `T` - The type of elements in the stack

## Methods

### dequeue

Removes and returns the element at the front of the stack.

```typescript
dequeue(): T
```

- Returns: The element at the front of the stack
- Throws: Error if the stack is empty
  
### enqueue

Adds an element to the end of the stack.

```typescript
enqueue(data: T): void
```

- Parameters:
  - `data` - The element to add

### enqueueRange

Enqueues a sequence of elements to the Stack.

```typescript
enqueueRange(items: Iterable<T>): void;
```

- Parameters:
  - `data` - The elements to add to the stack.

### peek

Returns the element at the front of the stack without removing it.

```typescript
peek(): T
```

- Returns: The element at the front of the stack
- Throws: Error if the stack is empty

### tryDequeue

Attempts to remove and return the element at the front of the stack.

```typescript
tryDequeue(): [false] | [true, T]
```

- Returns: A tuple where the first element is a boolean indicating success, and the second element is the data if successful. [false] if the stack is empty, otherwise [true, item].

### tryPeek

Attempts to return the element at the front of the stack without removing it.

```typescript
tryPeek(): [false] | [true, T]
```

- Returns: A tuple where the first element is a boolean indicating success, and the second element is the data if successful. [false] if the stack is empty, otherwise [true, item].

## Type Aliases

### Lifo\<T\>

Alias for `IStack<T>`.

```typescript
type ILifo<T> = IStack<T>
```

### Example Usage

```typescript
const stack = new Stack<number>();

// Add elements
stack.enqueue(1);
stack.enqueue(2);
stack.enqueue(3);

// Remove elements
const first = stack.dequeue(); // returns 3
const second = stack.dequeue(); // returns 2

// Peek without removing
const third = stack.peek(); // returns 1

// Safe operations
const [success, value] = stack.tryDequeue();
if (success) {
    console.log(value); // 1
}
```

### Complex Example

```typescript
import { Stack } from "../src/collections/stack/stack";

// Define task interface
interface Task {
    id: number;
    name: string;
    priority: number;
    completed: boolean;
    timestamp: Date;
}

// Task Management System Example
class TaskManager {
    private taskStack: Stack<Task>;
    
    constructor() {
        // Initialize with some tasks
        this.taskStack = new Stack<Task>([
            { id: 1, name: "Initial Setup", priority: 1, completed: false, timestamp: new Date() }
        ]);
    }

    public demonstrateStackOperations(): void {
        console.log("\n=== Stack Operations Demo ===");

        // Add tasks
        console.log("\nPushing tasks...");
        this.taskStack.enqueue({
            id: 2,
            name: "High Priority Task",
            priority: 3,
            completed: false,
            timestamp: new Date()
        });

        this.taskStack.enqueue({
            id: 3,
            name: "Medium Priority Task",
            priority: 2,
            completed: false,
            timestamp: new Date()
        });

        console.log(`Stack size: ${this.taskStack.size}`);

        // Peek at top task
        console.log("\nPeeking at top task:");
        try {
            const topTask = this.taskStack.peek();
            console.log(`Top task: ${topTask.name}`);
        } catch (error) {
            console.error(`Error peeking: ${error.message}`);
        }

        // Safe dequeue operation
        console.log("\nSafe dequeue operation:");
        const [success, task] = this.taskStack.tryDequeue();
        if (success) {
            console.log(`Safely dequeued: ${task.name}`);
        }

        // Process all tasks
        console.log("\nProcessing all tasks:");
        while (this.taskStack.size > 0) {
            const currentTask = this.taskStack.dequeue();
            console.log(`Processing: ${currentTask.name}`);
            currentTask.completed = true;
        }

        // Demonstrate error handling
        console.log("\nError handling demonstration:");
        try {
            this.taskStack.dequeue(); // Should throw EmptyStackException
        } catch (error) {
            console.log(`Expected error caught: ${error.message}`);
        }

        // Using iterator
        console.log("\nAdding new tasks and iterating:");
        const newTasks: Task[] = [
            { id: 4, name: "Iterator Task 1", priority: 1, completed: false, timestamp: new Date() },
            { id: 5, name: "Iterator Task 2", priority: 2, completed: false, timestamp: new Date() }
        ];

        newTasks.forEach(task => this.taskStack.enqueue(task));
        
        for (const task of this.taskStack) {
            console.log(`Iterating: ${task.name}`);
        }

        // Clear stack
        console.log("\nClearing stack...");
        this.taskStack.clear();
        console.log(`Stack empty: ${this.taskStack.size === 0}`);
    }
}

// Run demonstration
const taskManager = new TaskManager();
taskManager.demonstrateStackOperations();
```

Expected output

```text
=== Stack Operations Demo ===

Pushing tasks...
Stack size: 3

Peeking at top task:
Top task: Medium Priority Task

Safe dequeue operation:
Safely dequeued: Medium Priority Task

Processing all tasks:
Processing: High Priority Task
Processing: Initial Setup

Error handling demonstration:
Expected error caught: Stack is empty

Adding new tasks and iterating:
Iterating: Iterator Task 2
Iterating: Iterator Task 1

Clearing stack...
Stack empty: true
```
