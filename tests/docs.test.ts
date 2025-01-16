import { describe, test, beforeEach } from "node:test";
import * as assert from "node:assert/strict";
import { Stack } from "../src";
import { EmptyStackException } from "../src";

describe("Stack", () => {
  interface Task {
    id: number;
    name: string;
    priority: number;
    completed: boolean;
    timestamp: Date;
  }

  describe("Stack Complex Operations", () => {
    let taskStack: Stack<Task>;
    const initialTask: Task = {
      id: 1,
      name: "Initial Setup",
      priority: 1,
      completed: false,
      timestamp: new Date(),
    };

    beforeEach(() => {
      taskStack = new Stack<Task>([initialTask]);
    });

    test("should initialize with initial task", () => {
      assert.equal(taskStack.size, 1);
      const peek = taskStack.peek();
      assert.equal(peek.id, 1);
    });

    test("should maintain LIFO order", () => {
      const highPriorityTask: Task = {
        id: 2,
        name: "High Priority Task",
        priority: 3,
        completed: false,
        timestamp: new Date(),
      };

      const mediumPriorityTask: Task = {
        id: 3,
        name: "Medium Priority Task",
        priority: 2,
        completed: false,
        timestamp: new Date(),
      };

      taskStack.enqueue(highPriorityTask);
      taskStack.enqueue(mediumPriorityTask);

      assert.equal(taskStack.size, 3);
      assert.equal(taskStack.peek().id, 3);

      const firstDequeue = taskStack.dequeue();
      assert.equal(firstDequeue.id, 3);
      assert.equal(taskStack.size, 2);
    });

    test("should handle safe dequeue operations", () => {
      const [success, task] = taskStack.tryDequeue();
      assert.equal(success, true);
      assert.equal(task.id, 1);

      const [emptySuccess] = taskStack.tryDequeue();
      assert.equal(emptySuccess, false);
    });

    test("should throw on empty stack operations", () => {
      taskStack.dequeue(); // Remove initial task

      assert.throws(() => taskStack.dequeue(), EmptyStackException);

      assert.throws(() => taskStack.peek(), EmptyStackException);
    });

    test("should support iteration", () => {
      const tasks: Array<Task> = [
        {
          id: 2,
          name: "Task 2",
          priority: 2,
          completed: false,
          timestamp: new Date(),
        },
        {
          id: 3,
          name: "Task 3",
          priority: 3,
          completed: false,
          timestamp: new Date(),
        },
      ];

      tasks.forEach((task) => taskStack.enqueue(task));

      const iteratedIds: Array<number> = [];
      for (const task of taskStack) {
        iteratedIds.push(task.id);
      }

      assert.deepEqual(iteratedIds, [3, 2, 1]);
    });

    test("should clear all tasks", () => {
      assert.equal(taskStack.size, 1);
      taskStack.clear();
      assert.equal(taskStack.size, 0);
      assert.throws(() => taskStack.peek(), EmptyStackException);
    });
  });
});
