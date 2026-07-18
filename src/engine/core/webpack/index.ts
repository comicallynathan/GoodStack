import webpack from "webpack";
import configs from "./configs";
import { Logger } from "../logger";

const compiler = webpack( configs );

const logger = ( new Logger( "Webpack", "webpack" ) ).Instance;

compiler.watch(
    {},
    ( e, result ) => 
    {
        if ( e ) logger.error(
            `
            ${e.message} at ${e.stack}

            ${e.cause}
            `
        );

        if ( result?.hasErrors() ) logger.error(
            `
                ####################################
                #### WEBPACK COMPILATION ERRORS ####
                ####################################

                There are ${result.toJson().errorsCount} errors.

                ${result.toString()}
            `
        );
    }
);