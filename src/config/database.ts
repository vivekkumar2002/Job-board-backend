import { DataSource } from "typeorm";
import { Job } from "../models/Job";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306"),
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "job_board",
    synchronize: true,
    logging: true,
    entities: [Job],
    subscribers: [],
    migrations: [],
}); 