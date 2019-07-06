import { ITask } from "src/model/task/task";
import { describe, Suite, it } from "mocha";
import { Repository } from "src/model/task/repository";
import * as assert from "assert";

describe("Task repository", () => {

  it("初期化されたときには、2レコード含まれていること", () => {
    const repo = new Repository();
    const tasks = repo.ListTasks();
    assert.equal(tasks.length, 2);
  });

  it("1レコード追加できること", () => {
    const repo = new Repository();

    const newTasks: ITask = {
      id: 0,
      text: "new task",
    };
    repo.AddTask(newTasks);

    const tasks = repo.ListTasks();
    assert.equal(tasks.length, 3);
    assert.notEqual(tasks.find((task: ITask): boolean => {
      return task.text === "new task";
    }), undefined);
  });

  it("タスクを完了にでき、完了にしたタスクはリストから見えなくなっていること", () => {
    const repo = new Repository();
    let tasks = repo.ListTasks();
    const firstTask = tasks[0];
    repo.DoneTask(firstTask.id);

    tasks = repo.ListTasks();
    assert.equal(tasks.length, 1);
    assert.equal(tasks.find((task: ITask): boolean => {
      return task.id === firstTask.id;
    }), undefined);

  });
});
