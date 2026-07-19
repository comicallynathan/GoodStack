import { configDotenv } from "dotenv";
import { defineConfig } from "drizzle-kit";

configDotenv();
const env = process.env;

export default defineConfig(
    {
        out: "./src/engine/modules/database/_data",
        schema: "./src/engine/modules/database/schema.ts/_data",
        dialect: "mysql",
        dbCredentials: {
            database: env.DB_DATABASE!,
            host: env.DB_HOST!,
            user: env.DB_USER!,
            password: env.DB_PASSWORD!
        }
    }
);
