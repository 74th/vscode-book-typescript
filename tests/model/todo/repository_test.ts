import { Task } from "src/model/todo/task";
import { TodoRepository } from "src/model/todo/repository";
import { describe, Suite, it } from "mocha";
import * as assert from "assert"


describe("TODO repository", () => {

	it('初期化されたときには、2レコード含まれていること', () => {
		const repo = new TodoRepository();
		const tasks = repo.ListTasks()
		assert.equal(tasks.length, 2);
	});

	it('1レコード追加できること', () => {
		const repo = new TodoRepository();

		const newTasks: Task = {
			id: 0,
			text: "new task"
		};
		repo.AddTask(newTasks);

		const tasks = repo.ListTasks()
		assert.equal(tasks.length, 3);
		assert.notEqual(tasks.find((task: Task): boolean => {
			return task.text == "new task";
		}), undefined);
	});

	it('タスクを完了にでき、完了にしたタスクはリストから見えなくなっていること', () => {
		const repo = new TodoRepository();
		let tasks = repo.ListTasks();
		const firstTask = tasks[0];
		repo.DoneTask(firstTask.id);

		tasks = repo.ListTasks()
		assert.equal(tasks.length, 1);
		assert.equal(tasks.find((task: Task): boolean => {
			return task.id == firstTask.id;
		}), undefined);

	});
});