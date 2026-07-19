import "@styles/styles.scss";
import Alpine from "alpinejs";
import Pan from "@mods/Pan";

document.addEventListener(
    "DOMContentLoaded",
    () => Alpine.start()
);

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