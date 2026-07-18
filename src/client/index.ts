import "@styles/styles.scss";

import( "@components/test.pug" )
    .then(
        ( element ) =>
            document.body.appendChild( document.createElement( "div" ) ).innerHTML =
            element.default(
                {
                    methodology: "Pug + Typescript"
                }
            )
    );