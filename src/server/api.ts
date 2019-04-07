import express from "express";
import bodyParser from 'body-parser';
import { TodoRepository } from "../model/todo/repository";
import { Task } from "../model/todo/task";

export interface Config {
	ListenHost: string;
	WebRoot: string;
	APIRoot: string;
}

export class API {
	private app: express.Express;
	private repository: TodoRepository;
	private conf: Config;

	constructor(conf: Config) {
		this.conf = conf;
		this.repository = new TodoRepository();
		this.app = express();
		this.routing();
	}

	private routing() {
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: true }));

		this.app.get(this.conf.APIRoot + "tasks", this.list);
		this.app.post(this.conf.APIRoot + "tasks", this.create);
		this.app.post(this.conf.APIRoot + "tasks/:id/done", this.done);

		this.app.use('/', express.static(this.conf.WebRoot));
	}

	private list = (req: express.Request, res: express.Response) => {
		const tasks = this.repository.ListTasks();
		res.json(tasks);
	}

	private create = (req: express.Request, res: express.Response) => {
		const task: Task = req.body;
		const id = this.repository.AddTask(task)
		res.json({ "id": id });
	}

	private done = (req: express.Request, res: express.Response) => {
		const id = req.params.id;
		this.repository.DoneTask(id);
		res.json({});
	}

	public Run = () => {
		this.app.listen(this.conf.ListenHost);
	}
}
