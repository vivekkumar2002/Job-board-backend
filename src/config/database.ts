import { DataSource } from "typeorm";
import { Job } from "../models/Job";
import * as dotenv from 'dotenv';

dotenv.config();

// Log the environment variables (remove in production)
console.log('Database Configuration:', {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
});

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "3306"),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: true,
    entities: [Job],
    subscribers: [],
    migrations: [],
    ssl: {
        rejectUnauthorized: false
    },
    extra: {
        connectionLimit: 5
    }
}); 