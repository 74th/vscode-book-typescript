import { Component, Vue } from 'vue-property-decorator';
import { Task } from "../../model/todo/task"
import { postTask } from "../api/todo";

@Component
export class NewTaskView extends Vue {

	text: string = "";

	async clickAddButton(): Promise<void> {
		const task: Task = { id: 0, text: this.text }
		await postTask(task);
		this.text = ""
		this.$emit("updateTaskList");
	}

}
