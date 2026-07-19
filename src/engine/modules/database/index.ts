import { configDotenv } from "dotenv";
import { drizzle } from "drizzle-orm/mysql2";
import sql from "mysql2";
import { Logger } from "@core/logger";
/* 
    import * as Relations from "./_data/relations";
    import * as Schema from "./_data/schema";
*/

const logger = ( new Logger( "Database", "database" ) ).Instance;

configDotenv();
const env = process.env;

const pool = sql.createPool(
    {
        database: env.DB_DATABASE,
        host: env.DB_HOST,
        user: env.DB_USER,
        password: env.DB_PASSWORD
    }
);

const Database = drizzle(
    {
        client: pool
    }
);

logger.info( `Connected to MySQL Database: ${env.DB_USER}@${env.DB_HOST}` );

export default Database;

export {
    Database

    /*
        Relations,
        Schema
    */
};