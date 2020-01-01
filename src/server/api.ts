import express from "express";
import bodyParser from "body-parser";
import { Repository } from "../model/task/repository";
import { ITask } from "../model/task/task";

/**
 * APIの設定
 */
export interface IConfig {
  // リスンするホストとポート
  ListenHost: string;
  // フロントエンドのファイルのディレクトリ
  WebRoot: string;
}

/**
 * API
 */
export class API {
  private app: express.Express;
  private repository: Repository;
  private conf: IConfig;

  constructor(conf: IConfig) {
    // タスクリポジトリを持つ
    this.repository = new Repository();
    // Expressのインスタンスを作成する
    this.app = express();
    // 設定
    this.conf = conf;
    // ルーティングの設定
    this.routing();
  }

  /**
   * サーバーの起動
   */
  public Run = () => {
    this.app.listen(this.conf.ListenHost);
  };

  /**
   * Expressのルーティングの設定
   */
  private routing() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    // GETの場合タスクのリストを返す
    this.app.get("/api/tasks", this.list);
    // POSTの場合タスクを登録する
    this.app.post("/api/tasks", this.create);
    // タスクの完了
    this.app.post("/api/tasks/:id/done", this.done);

    // フロントエンドのHTMLを提供する
    this.app.use("/", express.static(this.conf.WebRoot));
  }

  /**
   * タスクの一覧
   */
  private list = (req: express.Request, res: express.Response) => {
    const tasks = this.repository.ListTasks();
    res.json(tasks);
  };

  /**
   * タスクの追加
   */
  private create = (req: express.Request, res: express.Response) => {
    const task: ITask = req.body;
    const id = this.repository.AddTask(task);
    res.json({ id });
  };

  /**
   * タスクの完了
   */
  private done = (req: express.Request, res: express.Response) => {
    const id = parseInt(req.params.id, 10);
    this.repository.DoneTask(id);
    res.json({});
  };
}
