import * as bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { langEndpoint, wakatimeEndpoint } from "./endpoints";

dotenv.config();

class App {
    public express;

    constructor() {
        this.express = express();
        this.mountRoutes();
    }

    private mountRoutes(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(cookieParser());
        this.express.use(helmet());
        this.express.use(cors());

        this.express.use("/langs", langEndpoint);
        this.express.use("/wakatime", wakatimeEndpoint);
    }
}

export default new App().express;
