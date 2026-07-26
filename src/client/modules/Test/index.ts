import Pan from "@mods/Pan";

import( "@components/test.pug" )
    .then(
        ( element ) => Pan.Add(
            document.body,
            element.default(
                {
                    methodology: "Pug + Typescript"
                }
            )
        )
    );
    
import { Message } from "@remotes/forms.telefunc";
Message( "Hello from client!" );

/* BEFORE USING LUA, TURN ON `lua` IN `goodstack.config.ts` */
// import( "./test.lua" );