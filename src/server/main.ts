import * as api from "./api";
import { Server } from "tls";

const conf: api.Config = {
	APIRoot: "/api/",
	WebRoot: "/",
	ListenHost: "8080",
};

const server = new api.API(conf);
server.Run()
