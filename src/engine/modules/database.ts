import { configDotenv } from "dotenv";
import * as SQL from "mysql2";
import { Kysely, MysqlDialect } from "kysely";
import type { DB } from "../types/Database";
import { Logger } from "@core/logger";

const logger = ( new Logger( "Database", "database" ) ).Instance;

configDotenv();
const env = process.env;

const dialect = new MysqlDialect(
    {
        pool: SQL.createPool(
            {
                database: env.DB_DATABASE,
                host: env.DB_HOST,
                user: env.DB_USER,
                password: env.DB_PASSWORD
            }
        )
    }
);

const Database = new Kysely<DB>(
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

export default Database;