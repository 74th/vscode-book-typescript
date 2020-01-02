import { ITask } from "../../model/task/task";

export async function loadTasks(): Promise<ITask[]> {
  const url = "/api/tasks";
  const res = await fetch(url, { method: "GET" });
  return await res.json();
}

export async function postTask(task: ITask): Promise<ITask[]> {
  const url = "/api/tasks";
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(task),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
}

export async function postTaskDone(task: ITask): Promise<void> {
  const url = `/api/tasks/${task.id}/done`;
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
