import path from "path";

import Configs from "_configs";

const loaders = {
    "lua": {
        test: /\.lua$/,
        use: [ "fengari-loader" ]
    },
    "pug": {
        test: /\.pug$/,
        use: [ "pug-loader" ]
    },
    "scss": {
        test: /\.scss$/i,                       // Match .scss files
        use: [
            "style-loader",                     // Injects styles into DOM
            {
                loader: "css-loader",
                options: { importLoaders: 2 }
            },                                  // Turns CSS into JS modules
            "postcss-loader",                   // Allows Tailwind
            "sass-loader"                       // Compiles SCSS to CSS
        ]
    },
    "ts": {
        test: /\.tsx?$/,
        use: {
            loader: "esbuild-loader",
            options: {
                loader: "tsx",
                "target": "ESNext",
                tsconfig: path.resolve( "src/client/tsconfig.json" )
            }
        },
        exclude: /node_modules/
    }
};

const plugins = {};

export default {
    entry: Configs.Client.Loaders.ts || !Configs.Client.Loaders.lua ? "./src/client/index.ts" : "./src/client/index.lua",
    module: {
        rules: (
            () =>
            {
                const rules = [];
                
                const list = Configs.Client.Loaders as { [loader: string]: boolean };
                
                for ( const [ k, v ] of Object.entries( loaders ) )
                    if ( list[k] ) rules.push( v );
            
                return rules;
            }
        )()
    },
    plugins: (
        () =>
        {
            const rules = [];
            
            const list = Configs.Client.Plugins as { [plugin: string]: boolean };
            
            for ( const [ k, v ] of Object.entries( plugins ) )
                if ( list[k] ) rules.push( v );
        
            return rules;
        }
    )(),
    resolve: {
        alias: {
            "@components": path.resolve( "src/web/components/client" ),
            "@mods": path.resolve( "src/client/modules" ),
            "@static": path.resolve( "src/web/static" ),
            "@styles": path.resolve( "src/web/styles" ),
            "@t": path.resolve( "src/client/types" )
        },
        extensions: [ ".tsx", ".ts", ".js" ]
    },
    output: {
        filename: "bundle.js",
        path: path.resolve( "src/web/static/scripts" )
    }
};
