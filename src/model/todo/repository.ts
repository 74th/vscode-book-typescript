import { Task } from "./task";

export class TodoRepository {
	private tasks: Task[];

	constructor() {
		this.tasks = [
			{
				id: 1,
				text: "task1",
				done: false
			},
			{
				id: 2,
				text: "task2",
				done: false
			}
		];
	}

	/**
	 * タスクを追加する
	 * @param task 追加するタスク
	 */
	public AddTask(task: Task):number {
		if (task.done === undefined) {
			task.done = false
		}
		task.id = this.tasks[this.tasks.length - 1].id + 1;
		this.tasks.push(task);
		return task.id;
	}

	public ListTasks(): Task[] {
		return this.tasks.filter(task => !task.done);
	}

	public DoneTask(id: number) {

		this.tasks.forEach(task => {
			if (task.id == id) {
				task.done = true;
			}
		});
	}
}