import webpack from "webpack";
import configs from "./configs";
import { Logger } from "../logger";
import type Webpack from "webpack";

const compiler = webpack( configs as Webpack.Configuration );

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