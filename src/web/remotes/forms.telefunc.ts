import { Logger } from "@core/logger";

const logger = ( new Logger( "Network", "network" ) ).Instance;

export const Message = async ( message: string ) => logger.info( message );