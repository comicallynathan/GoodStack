import { configDotenv } from "dotenv";
import * as SQL from "mysql2";
import pino from "pino";
import { Kysely, MysqlDialect, sql } from "kysely";
// import type { DB } from "@t/Database";

const transport = pino.transport(
    {
        targets: [
            {
                target: "pino-pretty",
                options: { destination: 1 }
            },
            {
                target: "pino/file",
                options: { destination: "./logs/database" }
            }
        ]
    }
);

const logger = pino.pino(
    { name: "Database" },
    transport
);

configDotenv();
const env = process.env;

const dialect = new MysqlDialect(
    {
        pool: SQL.createPool(
            {
                database: env.DB_DATABASE,
                host: env.DB_HOST,
                user: env.DB_USER,
                password: env.DB_PASSWORD,
                charset: "utf8mb4_0900_ai_ci"
            }
        )
    }
);

const Database = new Kysely/*<DB>*/(
    {
        dialect,
        log( event ): void
        {
            if ( event.level === "error" ) logger.error( event.error );
            else
            if ( event.level === "query" ) logger.info( event.query );
        }
    }
);

logger.info( `Connected to MySQL Database: ${env.DB_USER}@${env.DB_HOST}` );

(
    sql
    `
    SET NAMES "utf8mb4" COLLATE "utf8mb4_0900_ai_ci";
    SET character_set_client = utf8mb4;
    SET character_set_connection = utf8mb4;
    SET character_set_results = utf8mb4;
    SET collation_connection = utf8mb4_0900_ai_ci;
    `
);

export default Database;