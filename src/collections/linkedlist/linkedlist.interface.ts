import type { ICollection } from "../base/collection.interface.ts";
import type { ILinkedListNode } from "./linkedlist.node.interface.ts";

export interface ILinkedList<T> extends ICollection<T> {
  /**
   * Returns the first node in the linked list.
   */
  get first(): ILinkedListNode<T> | undefined;

  /**
   * Returns the last node in the linked list.
   */
  get last(): ILinkedListNode<T> | undefined;

  /**
   * Adds an element to the end of the list.
   * @param data The element to add.
   */
  add(data: T): void;

  /**
   * Adds an element after the specified node.
   * @param node The node after which the element is to be added.
   * @param data The element to add. If {@link ILinkedListNode}, the node is added directly,
   * otherwise a new node is created with the given data.
   * @returns The new node.
   */
  addAfter(node: ILinkedListNode<T>, data: T | ILinkedListNode<T>): ILinkedListNode<T>;

  /**
   * Adds an element before the specified node.
   * @param node The node before which the element is to be added.
   * @param data The element to add. If {@link ILinkedListNode}, the node is added directly,
   * otherwise a new node is created with the given data.
   * @returns The new node.
   */
  addBefore(node: ILinkedListNode<T>, data: T | ILinkedListNode<T>): ILinkedListNode<T>;

  /**
   * Adds an element to the front of the list.
   * @param data The element to add. If {@link ILinkedListNode}, the node is added directly,
   * otherwise a new node is created with the given data.
   * @returns The new node.
   */
  addFirst(data: T | ILinkedListNode<T>): ILinkedListNode<T>;

  /**
   * Adds an element to the end of the list.
   * @param data The element to add. If {@link ILinkedListNode}, the node is added directly,
   * otherwise a new node is created with the given data.
   * @returns The new node.
   */
  addLast(data: T | ILinkedListNode<T>): ILinkedListNode<T>;

  /**
   * Finds the first occurrence of the specified element.
   * @param data The element to search for.
   * @returns The node containing the element if found, undefined otherwise.
   */
  find(data: T): ILinkedListNode<T> | undefined;

  /**
   * Finds the last occurrence of the specified element.
   * @param data The element to search for.
   * @returns The node containing the element if found, undefined otherwise.
   */
  findLast(data: T): ILinkedListNode<T> | undefined;

  /**
   * Removes the first occurrence of the specified element or node from the list.
   * @param data The element or node to remove. If an element is provided, the first node containing
   * the element is removed. If a node is provided, that specific node is removed.
   * @returns True if the element or node was removed, false otherwise.
   */
  remove(data: T | ILinkedListNode<T>): boolean;

  /**
   * Removes the first element from the list.
   * @throws an EmptyListException if the list is empty.
   */
  removeFirst(): void;

  /**
   * Removes the last element from the list.
   * @throws an EmptyListException if the list is empty.
   */
  removeLast(): void;
}
