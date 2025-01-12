# LinkedList Implementation

- [LinkedList Implementation](#linkedlist-implementation)
  - [Overview](#overview)
  - [LinkedList\<T\>](#linkedlistt)
    - [Type Parameters](#type-parameters)
  - [Properties](#properties)
  - [Methods](#methods)
    - [add](#add)
    - [addAfter](#addafter)
    - [addBefore](#addbefore)
    - [addFirst](#addfirst)
    - [addLast](#addlast)
    - [clear](#clear)
    - [contains](#contains)
    - [find](#find)
    - [findLast](#findlast)
    - [remove](#remove)
    - [removeFirst](#removefirst)
    - [removeLast](#removelast)
  - [Examples](#examples)
    - [Simple](#simple)
    - [Complex](#complex)

## Overview

Implements a doubly linked list where each node points to both next and previous nodes. Supports circular references and complex node manipulation.

- Safe iteration with version checking.

## LinkedList\<T\>

Represents the list of elements that can be added and removed from the list.

### Type Parameters

- `T` - The type of elements in the queue

## Properties

| Name | Type | Description |
|------|------|-------------|
| first | ILinkedListNode\<T> \| undefined | First node in list |
| last | ILinkedListNode\<T> \| undefined | Last node in list |
| size | number | Number of nodes |

## Methods

### add

Adds an element to the end of the list.

```typescript
add(data: T): void
```

- Parameters:
  - `data` - The element to add
- Returns: The new node

### addAfter

Inserts after specified node.

```typescript
addAfter(node: ILinkedListNode<T>, data: T): void
```

- Parameters:
  - `node` - The node to add after
  - `data` - The element to add
- Returns: The new node

### addBefore

Inserts before specified node.

```typescript
addBefore(node: ILinkedListNode<T>, data: T): void
```

- Parameters:
  - `node` - The node to add before
  - `data` - The element to add
- Returns: The new node
  
### addFirst

Adds an element to the front of the list.

```typescript
addFirst(data: T): void
```

- Parameters:
  - `data` - The element to add
- Returns: The new node

### addLast

Adds an element to the end of the list.

```typescript
addLast(data: T): void
```

- Parameters:
  - `data` - The element to add
- Returns: The new node

### clear

Removes all elements from the list.

```typescript
clear(): void
```

### contains

Determines if the list contains the specified element.

```typescript
contains(data: T): boolean
```

- Parameters:
  - `data` - The element to search for
- Returns: `true` if the element is found, `false` otherwise

### find

Locates first occurrence of value.

```typescript
find(data: T): ILinkedListNode<T> | undefined
```

- Parameters:
  - `data` - The element to search for
- Returns: The node if found, `undefined` otherwise

### findLast

Locates last occurrence of value.

```typescript
findLast(data: T): ILinkedListNode<T> | undefined
```

- Parameters:
  - `data` - The element to search for
- Returns: The node if found, `undefined` otherwise

### remove

Removes first occurrence of value.

```typescript
remove(data: T): void
```

- Parameters:
  - `data` - The element to remove
- Returns: `true` if the element was removed, `false` otherwise

### removeFirst

Removes the first element from the list.

```typescript
removeFirst(): void
```

### removeLast

Removes the last element from the list.

```typescript
removeLast(): void
```

## Examples

### Simple

```typescript
const list = new LinkedList<number>();
list.addLast(1);
list.addLast(2);
list.addLast(3);
list.addLast(4);

console.log(list.find(3)?.data); // 3
console.log(list.find(5)?.data); // undefined

list.remove(2);
console.log(list.find(2)?.data); // undefined

list.removeFirst();
console.log(list.find(1)?.data); // 4

list.removeLast();
console.log(list.find(4)?.data); // undefined
```

### Complex

```typescript
interface Task {
    id: number;
    name: string;
    completed: boolean;
}

const taskList = new LinkedList<Task>();

// Add initial tasks
taskList.addFirst({ id: 1, name: "First Task", completed: false });
taskList.addLast({ id: 2, name: "Last Task", completed: false });

// Insert between tasks
const firstNode = taskList.first!;
taskList.addAfter(firstNode, { 
    id: 3, 
    name: "Middle Task", 
    completed: false 
});

// Process tasks in order
for (const task of taskList) {
    if (task.id === 2) {
        task.completed = true;
    }
}

// Remove completed tasks
for (let node = taskList.first; node !== undefined; node = node.next) {
    if (node.data.completed) {
        taskList.remove(node.data);
    }
}
```
