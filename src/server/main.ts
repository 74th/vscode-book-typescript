import * as api from "./api";

const conf: api.IConfig = {
  WebRoot: "./public/html",
  ListenHost: "8080",
};

const server = new api.API(conf);
server.Run();
