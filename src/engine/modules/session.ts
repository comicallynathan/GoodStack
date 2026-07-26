import { Logger } from "@core/logger";
import { configDotenv } from "dotenv";
import type Express from "express";
import Session from "express-session";
import Crypto from "node:crypto";
import { DAY as Day } from "express-rate-limit";

const logger = ( new Logger( "Session", "session" ) ).Instance;

configDotenv();
const env = process.env;
const expiration = Number( env.SESSION_EXPIRATION );
const secret = env.SESSION_SECRET;

export function Start( app: Express.Application )
{
    app.use(
        Session(
            {
                "secret": secret || Crypto.randomBytes( 16 ).toString( "hex" ),
                "resave": false,
                "saveUninitialized": false,
                cookie: {
                    secure: process.env.NODE_ENV === "production", 
                    httpOnly: true,
                    maxAge: Day * expiration
                }
            }
        )
    );
    logger.info( "Session is enabled." );
}