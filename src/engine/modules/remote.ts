import { Logger } from "@core/logger";
import { configDotenv } from "dotenv";
import type Express from "express";
import { Telefunc } from "telefunc/node";
import { config as Configs } from "telefunc";
import fg from "fast-glob";

const logger = ( new Logger( "Remote", "remote" ) ).Instance;

configDotenv();
const env = process.env;
const telefuncPath = env.TELEFUNC_PATH;

const telefunc = new Telefunc();

export function Start( app: Express.Application )
{
    app.all(
        telefuncPath || "/_telefunc",
        async ( request, response, next ) =>
        {
            const processed = await telefunc.serve(
                {
                    req: request,
                    res: response,
                    context: {
                        session: request.session
                    }
                }
            );

            if ( !processed ) next();
        }
    );

    Configs.telefuncFiles = fg.sync( "src/web/remotes/**/*.telefunc.*", { absolute: true, cwd: process.cwd() } );
    Configs.disableNamingConvention = true;

    logger.info( "Remote is enabled." );
}

export const Websocket = telefunc.installWebSocket;