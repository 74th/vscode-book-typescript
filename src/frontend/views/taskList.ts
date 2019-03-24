import { Component, Vue } from 'vue-property-decorator';
import { Task } from "../../model/todo/task"
import { loadTasks, postTaskDone } from '../api/todo';

@Component
export class TaskListView extends Vue {

	tasks: Task[] = [];

	async clickDone(task: Task): Promise<void> {
		await postTaskDone(task);
		await this.loadTasks();
	}

	async loadTasks(): Promise<void> {
		const tasks = await loadTasks();
		this.tasks = tasks;
	}

}
