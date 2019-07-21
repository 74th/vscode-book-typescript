import express from "express";
import bodyParser from "body-parser";
import { Repository } from "../model/task/repository";
import { ITask } from "../model/task/task";

/**
 * APIの設定
 */
export interface IConfig {
  ListenHost: string;
  WebRoot: string;
  APIRoot: string;
}

/**
 * API
 */
export class API {
  private app: express.Express;
  private repository: Repository;
  private conf: IConfig;

  constructor(conf: IConfig) {
    this.conf = conf;
    this.repository = new Repository();
    this.app = express();
    this.routing();
  }

  public Run = () => {
    this.app.listen(this.conf.ListenHost);
  }

  /**
   * Expressのルーティングの設定
   */
  private routing() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    // GETの場合タスクのリストを返す
    this.app.get(this.conf.APIRoot + "tasks", this.list);
    // POSTの場合タスクを登録する
    this.app.post(this.conf.APIRoot + "tasks", this.create);
    this.app.post(this.conf.APIRoot + "tasks/:id/done", this.done);
    // タスクのコピー
    this.app.post(this.conf.APIRoot + "tasks/:id/copy", this.copy);

    // フロントエンドのHTMLを提供する
    this.app.use("/", express.static(this.conf.WebRoot));
  }

  /**
   * タスクの一覧
   */
  private list = (req: express.Request, res: express.Response) => {
    const tasks = this.repository.ListTasks();
    res.json(tasks);
  }

  /**
   * タスクの追加
   */
  private create = (req: express.Request, res: express.Response) => {
    const task: ITask = req.body;
    const id = this.repository.AddTask(task);
    res.json({ id });
  }
  /**
   * タスクの追加
   */
  private copy = (req: express.Request, res: express.Response) => {
    const task: ITask = req.body;
    const id = this.repository.AddTask(task);
    res.json({ id });
  }
  private done = (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    this.repository.DoneTask(id);
    res.json({});
  }
}
