import { ITask } from "./task";

/**
 * タスクを格納するリポジトリ
 */
export class Repository {
  private tasks: ITask[];

  constructor() {
    // 初期タスク
    this.tasks = [
      {
        id: 1,
        text: "task1",
        done: false,
      },
      {
        id: 2,
        text: "task2",
        done: false,
      },
    ];
  }

  /**
   * タスクを追加する
   * @param task 追加するタスク
   */
  public AddTask(task: ITask): number {
    if (task.done === undefined) {
      task.done = false;
    }
    task.id = this.tasks[this.tasks.length - 1].id + 1;
    this.tasks.push(task);
    return task.id;
  }

  /**
   * タスクの一覧を取得する
   */
  public ListTasks(): ITask[] {
    return this.tasks.filter((task) => !task.done);
  }

  public DoneTask(id: number) {

    this.tasks.forEach((task) => {
      if (task.id === id) {
        task.done = true;
      }
    });
  }
}
