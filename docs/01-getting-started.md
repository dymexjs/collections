# Dymexjs/Collections

Dymexjs/DI is a dependency injection library for Typescript/Javascript to help build well-structured code and easily testable applications.

<!-- TOC depthFrom:1 depthTo:3 -->
- [Dymexjs/Collections](#dymexjscollections)
  - [Getting Started](#getting-started)
  - [Instalation](#instalation)
  - [Collections -  Basic Usage](#collections----basic-usage)
    - [Queue](#queue)
    - [Priority Queue](#priority-queue)
    - [Stack](#stack)
    - [LinkedList](#linkedlist)

<!-- /TOC -->

## Getting Started

This is a simple library with some collections implementations like Queue, Stack or LinkedList for example.

## Instalation

```sh
npm install --save @dymexjs/collections
```

## Collections -  Basic Usage

### Queue

Simple Queue (Fifo) implemetantion

[Documentation](./collections/queue.md)

Example

```typescript
import { Queue } from "@dymexjs/collections";

const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);

const one = queue.dequeue();
console.log(one);
// logs 1

for(const val of queue) {
  console.log(val);
}

// logs 2, 3

```

---

### Priority Queue

Simple Queue (Fifo) implemetantion that takes into account the priority of the elements.

The elements must be enqueued as a tupple `[element, priority]`

[Documentation](./collections/priority-queue.md)

Example

```typescript
import { PriorityQueue } from "@dymexjs/collections";

const queue = new PriorityQueue();
queue.enqueue([1,3]);
queue.enqueue([2,5]);
queue.enqueue([3,1]);

// Taking priority into account results in [[3, 1], [1, 3], [2, 5]]

const three = queue.dequeue();
console.log(three);
// logs 3

for(const val of queue) {
  console.log(val);
}

// logs 1, 2
```

---

### Stack

Simple Stack (Lifo) implemetantion

[Documentation](./collections/stack.md)

Example

```typescript
import { Stack } from "@dymexjs/collections";

const stack = new Stack();
stack.enqueue(1);
stack.enqueue(2);
stack.enqueue(3);

const three = stack.dequeue();
console.log(three);
// logs 3

for(const val of stack) {
  console.log(val);
}

// logs 2, 1
```

---

### LinkedList

Simple LinkedList implementation

[Documentation](./collections/linkedlist.md)

Example

```typescript
import { LinkedList } from "@dymexjs/collections";

const list = new LinkedList();
list.add(1);
list.add(2);
list.add(3);

for(const val of list) {
  console.log(val);
}

// logs 1, 2, 3

```

---
