import { describe, test } from "node:test";
import * as assert from "node:assert/strict";
import { CollectionChangedException, LinkedList } from "../../src";

describe("LinkedList other tests", () => {
  test("create linkedlist from array", () => {
    const list = new LinkedList<number>([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    assert.strictEqual(list.size, 10);
    assert.deepStrictEqual(Array.from(list), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
  test("should throw when collection changes while iterating", () => {
    const list = new LinkedList<number>([0, 1, 2]);
    const listIterator = list[Symbol.iterator]();
    listIterator.next();
    list.addLast(3);
    assert.throws(() => listIterator.next(), CollectionChangedException);
  });
  test("clear", () => {
    const list = new LinkedList<number>([0, 1, 2]);
    list.clear();
    assert.strictEqual(list.size, 0);
  });
  test("dispose", () => {
    const list = new LinkedList<number>([0, 1, 2]);
    list[Symbol.dispose]();
    assert.strictEqual(list.size, 0);
  });
  test("contains", () => {
    const list = new LinkedList<number>([0, 1, 2]);
    assert.strictEqual(list.contains(0), true);
    assert.strictEqual(list.contains(3), false);
  });
  test("add", () => {
    const list = new LinkedList<number>([0, 1, 2]);
    list.add(3);
    assert.strictEqual(list.size, 4);
    assert.deepStrictEqual(Array.from(list), [0, 1, 2, 3]);
  });
});
