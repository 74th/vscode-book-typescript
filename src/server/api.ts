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
  private api: express.Express;
  private repository: Repository;
  private conf: IConfig;

  constructor(conf: IConfig) {
    this.conf = conf;
    this.repository = new Repository();
    this.api = express();
    this.routing();
  }

  public Run = () => {
    this.api.listen(this.conf.ListenHost);
  }

  /**
   * Expressのルーティングの設定
   */
  private routing() {
    this.api.use(bodyParser.json());
    this.api.use(bodyParser.urlencoded({ extended: true }));

    // GETの場合タスクのリストを返す
    this.api.get(this.conf.APIRoot + "tasks", this.list);
    // POSTの場合タスクを登録する
    this.api.post(this.conf.APIRoot + "tasks", this.create);
    this.api.post(this.conf.APIRoot + "tasks/:id/done", this.done);
    // DELETEの場合タスクを削除する
    this.api.delete(this.conf.APIRoot + "tasks", this.create);

    // フロントエンドのHTMLを提供する
    this.api.use("/", express.static(this.conf.WebRoot));
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
 * タスクの削除
 */
  private delete = (req: express.Request, res: express.Response) => {
    const task: ITask = req.body;
    const id = this.repository.AddTask(task);
    res.json({ id });
  }


  private done = (req: express.Request, res: express.Response) => {
    const id = parseInt(req.params.id, 10);
    this.repository.DoneTask(id);
    res.json({});
  }
}
