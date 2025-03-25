import { Collection } from "../base/collection.ts";
import { EmptyListException } from "../../utils/exceptions/EmptyListException.ts";
import { CollectionChangedException } from "../../utils/exceptions/CollectionChangedException.ts";
import type { ILinkedList } from "./linkedlist.interface.ts";
import type { ILinkedListNode } from "./linkedlist.node.interface.ts";
import { LinkedListNode } from "./linkedlist.node.ts";

export class LinkedList<T> extends Collection<T> implements ILinkedList<T> {
  constructor(data?: Iterable<T>) {
    super();
    this._useVersion = true;
    if (typeof data !== "undefined" && typeof data[Symbol.iterator] === "function") {
      for (const item of data) {
        this.addLast(item);
      }
    }
  }

  get first() {
    return this._head as ILinkedListNode<T>;
  }

  get last() {
    return (this._head as ILinkedListNode<T>)?.prev;
  }

  [Symbol.iterator](): Iterator<T> {
    let current = this._head;
    const version = this._version;
    return {
      next: (): IteratorResult<T> => {
        if (version !== this._version) {
          throw new CollectionChangedException();
        }
        if (current === undefined) {
          return { done: true, value: undefined };
        }
        const value = current.data;
        current = current.next !== this._head ? current.next : undefined;
        return { done: false, value };
      },
    };
  }

  add(data: T) {
    this.addLast(data);
  }

  addAfter(node: ILinkedListNode<T>, data: T | ILinkedListNode<T>): ILinkedListNode<T> {
    const newNode = data instanceof LinkedListNode ? data : new LinkedListNode(data);
    this.insertNodeBefore(node.next as ILinkedListNode<T>, newNode);
    return newNode;
  }

  addBefore(node: ILinkedListNode<T>, data: T | ILinkedListNode<T>): ILinkedListNode<T> {
    const newNode = data instanceof LinkedListNode ? data : new LinkedListNode(data);
    this.insertNodeBefore(node as ILinkedListNode<T>, newNode);
    if (this._head === node) {
      this._head = newNode;
    }
    return newNode;
  }

  addFirst(data: T | ILinkedListNode<T>): ILinkedListNode<T> {
    const newNode = data instanceof LinkedListNode ? data : new LinkedListNode(data);
    if (this._head === undefined) {
      this.insertNodeToEmptyList(newNode);
    } else {
      this.insertNodeBefore(this._head as ILinkedListNode<T>, newNode);
      this._head = newNode;
    }
    return newNode;
  }

  addLast(data: T | ILinkedListNode<T>): ILinkedListNode<T> {
    const newNode = data instanceof LinkedListNode ? data : new LinkedListNode(data);
    if (this._head === undefined) {
      this.insertNodeToEmptyList(newNode);
    } else {
      this.insertNodeBefore(this._head as ILinkedListNode<T>, newNode);
    }
    return newNode;
  }

  /**
   * Removes all elements from the list.
   */
  clear() {
    super.clear();
    this._version++;
  }

  /**
   * Returns true if the list contains the specified element.
   * @param data The element to search for.
   * @returns True if the list contains the element, false otherwise.
   */
  contains(data: T): boolean {
    return this.find(data) !== undefined;
  }

  find(data: T): ILinkedListNode<T> | undefined {
    let current = this._head as ILinkedListNode<T>;
    if (current !== undefined) {
      do {
        if (current.data === data) {
          return current;
        }
        current = current.next as ILinkedListNode<T>;
      } while (current !== this._head);
    }
  }

  findLast(data: T): ILinkedListNode<T> | undefined {
    if (this._head === undefined) {
      return undefined;
    }
    const last = (this._head as ILinkedListNode<T>).prev as ILinkedListNode<T>;
    let current = last;
    do {
      if (current.data === data) {
        return current;
      }

      current = current.prev as ILinkedListNode<T>;
    } while (current !== last);
  }

  remove(data: T | ILinkedListNode<T>): boolean {
    if (!(data instanceof LinkedListNode)) {
      const node = this.find(data as T);
      if (node !== undefined) {
        this.removeNode(node);
        return true;
      }
    } else {
      this.removeNode(data);
      return true;
    }
    return false;
  }

  removeFirst(): void {
    if (this._head === undefined) {
      throw new EmptyListException();
    }
    this.removeNode(this._head as ILinkedListNode<T>);
  }

  removeLast(): void {
    if (this._head === undefined) {
      throw new EmptyListException();
    }
    this.removeNode((this._head as ILinkedListNode<T>).prev as ILinkedListNode<T>);
  }

  /**
   * Inserts a node before the specified node in the list.
   * @param node The node before which the new node is inserted.
   * @param newNode The new node to insert.
   * @internal
   */
  private insertNodeBefore(node: ILinkedListNode<T>, newNode: ILinkedListNode<T>): void {
    newNode.next = node;
    newNode.prev = node.prev;
    (node.prev as ILinkedListNode<T>).next = newNode;
    node.prev = newNode;
    this._size++;
    this._version++;
  }

  /**
   * Inserts a node to an empty list.
   * @param newNode The node to add.
   * @internal
   */
  private insertNodeToEmptyList(newNode: ILinkedListNode<T>): void {
    newNode.next = newNode;
    newNode.prev = newNode;
    this._head = newNode;
    this._size++;
    this._version++;
  }

  /**
   * Removes the specified node from the list.
   * Adjusts pointers of the neighboring nodes to exclude the given node.
   * If the node is the head, updates the head to the next node.
   * If the node is the only element in the list, sets the head to undefined.
   * Decrements the size of the list and increments the version.
   * @param node The node to be removed from the list.
   * @internal
   */

  private removeNode(node: ILinkedListNode<T>): void {
    if (node.next === node) {
      this._head = undefined;
    } else {
      (node.next as ILinkedListNode<T>).prev = node.prev;
      (node.prev as ILinkedListNode<T>).next = node.next;
      if (this._head === node) {
        this._head = node.next;
      }
    }
    node[Symbol.dispose]();
    this._size--;
    this._version++;
  }
}
