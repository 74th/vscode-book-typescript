import { Component, Vue } from "vue-property-decorator";
import { ITask } from "../../model/task/task";
import { postTask } from "../api/task";

@Component
export class NewTaskView extends Vue {

  private text: string = "";

  public async clickAddButton(): Promise<void> {
    const task: ITask = { id: 0, text: this.text };
    await postTask(task);
    this.text = "";
    this.$emit("updateTaskList");
  }
}
