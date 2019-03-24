import { Task } from "../../model/todo/task";
import { API_PREFIX } from "./settings";


export async function loadTasks(): Promise<Task[]> {
	const url = API_PREFIX + "tasks";
	const res = await fetch(url, { method: "GET" })
	return await res.json();
}

export async function postTask(task: Task): Promise<Task[]> {
	const url = API_PREFIX + "tasks";
	const res = await fetch(url, {
		method: "POST",
		body: JSON.stringify(task),
		headers: {
			"Content-Type": "application/json",
		},
	})
	return await res.json();
}

export async function postTaskDone(task: Task): Promise<void> {
	const url = API_PREFIX + `tasks/${task.id}/done`;
	await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
	})
}