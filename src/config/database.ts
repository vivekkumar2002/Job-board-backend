import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root123",
    database: "job_board",
    synchronize: true,
    logging: true,
    entities: ["src/models/*.ts"],
    subscribers: [],
    migrations: [],
}); 