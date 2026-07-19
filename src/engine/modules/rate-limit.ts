import { Logger } from "@core/logger";
import { configDotenv } from "dotenv";
import type Express from "express";
import { rateLimit as RateLimit, MINUTE as Minute } from "express-rate-limit";

const logger = ( new Logger( "Rate Limit", "rate-limit" ) ).Instance;

configDotenv();
const env = process.env;
const enabled = Number( env.RATELIMIT_ENABLED );
const trust = Number( env.RATELIMIT_TRUST );

export function Start( app: Express.Application )
{
    if ( enabled )
    {
        app.set( "trust proxy", trust );

        const limiter = RateLimit(
            {
                windowMs: 15 * Minute,
                limit: 100
            }
        );

        app.use( limiter );
        
        logger.info( "Rate Limit is enabled." );
    }
}