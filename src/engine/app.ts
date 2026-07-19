import { configDotenv } from "dotenv";
import express from "express";
import files from "node:fs";
import pino from "pino";

files.mkdir(
    "./logs",
    {
        recursive: true
    },
    ( e ) =>
    {
        if ( e ) throw e;
    }
);

const transport = pino.transport(
    {
        targets: [
            {
                target: "pino-pretty",
                options: { destination: 1 }
            },
            {
                target: "pino/file",
                options: { destination: "./logs/app" }
            }
        ]
    }
);

const logger = pino.pino(
    { name: "App" },
    transport
);

configDotenv();
const env = process.env;
const port = env.PORT;

import( "@core/webpack" );

const app = express();

// import( "@mods/database" );
( await import( "@mods/rate-limit" ) ).Start( app );


app.set( "views", "src/web" );
app.set( "view engine", "pug" );

app.use( express.static( "src/web/static" ) );

const Safe = ( await import( "@mods/safe-path" ) ).Intialize( app );

app.get(
    "",
    ( _, response ) => response.render( "index.pug" )
);

app.get(
    "{/*path}",
    ( request, response ) => 
    {
        const userpath = request.path.slice( 1 );
        
        Safe( userpath )
            .then(
                () =>
                {
                    response.render( userpath );
                }
            )
            .catch(
                () => response.status( 403 ).redirect( "/" )
            );
    }
);

app.use(
    ( _, response ) => response.status( 404 ).render( "404" )
);

app.listen(
    port,
    () => logger.info( `App listening on port ${port}. http://localhost:${port}` )
);