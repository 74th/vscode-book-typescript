import { Component, Vue } from "vue-property-decorator";
import { ITask } from "../../model/task/task";
import { loadTasks, postTaskDone } from "../api/task";

@Component
export class TaskListView extends Vue {

  private tasks: ITask[] = [];

  public async loadTasks(): Promise<void> {
    const tasks = await loadTasks();
    this.tasks = tasks;
  }

  public async clickDone(task: ITask): Promise<void> {
    await postTaskDone(task);
    await this.loadTasks();
  }
}
