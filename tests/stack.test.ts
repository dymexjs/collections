import { describe, test } from "node:test";
import * as assert from "node:assert/strict";
import { EmptyStackException, Stack } from "../src/index.ts";

describe("Stack", () => {
  const arr = Array.from({ length: 10 }, (_, i) => i);

  test("empty stack", () => {
    const stack = new Stack();
    assert.strictEqual(stack.size, 0);
    assert.deepStrictEqual(stack.toArray(), []);
  });
  test("pre-load values from iterable", () => {
    const stack = new Stack(arr);
    assert.deepStrictEqual(stack.toArray(), [...arr].reverse());
    assert.strictEqual(stack.size, arr.length);
  });
  test("dequeue all elements", () => {
    const stack = new Stack(arr);
    for (const item of [...arr].reverse()) {
      assert.strictEqual(stack.dequeue(), item);
    }
  });
  test("dequeue empty stack", () => {
    const stack = new Stack();
    assert.throws(() => stack.dequeue(), EmptyStackException);
  });
  test("toArray", () => {
    const stack = new Stack(arr);
    assert.strictEqual(stack.size, arr.length);
    assert.deepStrictEqual(stack.toArray(), [...arr].reverse());
  });
  test("peek all elements", () => {
    const stack = new Stack(arr);
    for (const item of [...arr].reverse()) {
      assert.strictEqual(stack.peek(), item);
      stack.dequeue();
    }
  });
  test("tryDequeue all elements", () => {
    const stack = new Stack(arr);
    for (const item of [...arr].reverse()) {
      const result = stack.tryDequeue();
      assert.strictEqual(result[0], true);
      assert.strictEqual(result[1], item);
    }
  });
  test("tryDequeue empty stack", () => {
    const stack = new Stack();
    assert.strictEqual(stack.tryDequeue()[0], false);
  });
  test("tryPeek all elements", () => {
    const stack = new Stack(arr);
    for (const item of [...arr].reverse()) {
      const result = stack.tryPeek();
      assert.strictEqual(result[0], true);
      assert.strictEqual(result[1], item);
      stack.dequeue();
    }
  });
  test("tryp Peek empty stack", () => {
    const stack = new Stack();
    assert.strictEqual(stack.tryPeek()[0], false);
  });
  test("enqueueRange", () => {
    const stack = new Stack();
    stack.enqueueRange(arr);
    assert.strictEqual(stack.size, arr.length);
  });
  test("clear", () => {
    const stack = new Stack(arr);
    stack.clear();
    assert.strictEqual(stack.size, 0);
  });
  test("dispose", () => {
    const stack = new Stack(arr);
    stack[Symbol.dispose]();
    assert.strictEqual(stack.size, 0);
  });

  test("contains", () => {
    const stack = new Stack(arr);
    for (const item of arr) {
      assert.strictEqual(stack.contains(item), true);
    }
  });
});
