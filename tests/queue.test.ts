import { describe, test } from "node:test";
import * as assert from "node:assert/strict";
import { EmptyQueueException, Queue } from "../src/index.ts";

describe("Queue", () => {
  const arr = Array.from({ length: 10 }, (_, i) => i);

  test("empty queue", () => {
    const queue = new Queue();
    assert.strictEqual(queue.size, 0);
    assert.deepStrictEqual(queue.toArray(), []);
  });
  test("pre-load values from iterable", () => {
    const queue = new Queue(arr);
    assert.deepStrictEqual(queue.toArray(), arr);
    assert.strictEqual(queue.size, arr.length);
  });
  test("pop all elements", () => {
    const queue = new Queue(arr);
    for (const item of arr) {
      assert.strictEqual(queue.dequeue(), item);
    }
  });
  test("pop empty queue", () => {
    const queue = new Queue();
    assert.throws(() => queue.dequeue(), EmptyQueueException);
  });
  test("toArray", () => {
    const queue = new Queue(arr);
    assert.strictEqual(queue.size, arr.length);
    assert.deepStrictEqual(queue.toArray(), arr);
  });
  test("peek all elements", () => {
    const queue = new Queue(arr);
    for (const item of arr) {
      assert.strictEqual(queue.peek(), item);
      queue.dequeue();
    }
  });
  test("try pop all elements", () => {
    const queue = new Queue(arr);
    for (const item of arr) {
      const result = queue.tryDequeue();
      assert.strictEqual(result[0], true);
      assert.strictEqual(result[1], item);
    }
  });
  test("tryPop empty queue", () => {
    const queue = new Queue();
    assert.strictEqual(queue.tryDequeue()[0], false);
  });
  test("tryPeek all elements", () => {
    const queue = new Queue(arr);
    for (const item of arr) {
      const result = queue.tryPeek();
      assert.strictEqual(result[0], true);
      assert.strictEqual(result[1], item);
      queue.dequeue();
    }
  });
  test("tryPeek empty queue", () => {
    const queue = new Queue();
    assert.strictEqual(queue.tryPeek()[0], false);
  });
  test("clear", () => {
    const queue = new Queue(arr);
    queue.clear();
    assert.strictEqual(queue.size, 0);
  });
  test("dispose", () => {
    const queue = new Queue(arr);
    queue[Symbol.dispose]();
    assert.strictEqual(queue.size, 0);
  });
  test("enqueueRange", () => {
    const queue = new Queue();
    queue.enqueueRange(arr);
    assert.strictEqual(queue.size, arr.length);
  });
  test("dequeueEnqueue", () => {
    const queue = new Queue();
    queue.enqueueRange(arr);
    for (const item of arr) {
      assert.strictEqual(queue.dequeueEnqueue(item), item);
    }
  });
  test("dequeueEnqueue empty queue", () => {
    const queue = new Queue();
    assert.throws(() => queue.dequeueEnqueue("hello"), EmptyQueueException);
  });
  test("enqueueDequeue", () => {
    const queue = new Queue();
    queue.enqueueRange(arr);
    for (const item of arr) {
      assert.strictEqual(queue.enqueueDequeue(item), item);
    }
  });
  test("peek empty queue", () => {
    const queue = new Queue();
    assert.throws(() => queue.peek(), EmptyQueueException);
  });
  test("contains", () => {
    const queue = new Queue(arr);
    for (const item of arr) {
      assert.strictEqual(queue.contains(item), true);
    }
  });
});
