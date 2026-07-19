import path from "path";

export default {
    entry: "./src/client/index.ts",
    module: {
        rules: [
            {
                test: /\.pug$/,
                use: [ "pug-loader" ]
            },
            {
                test: /\.scss$/i, // Match .scss files
                use: [
                    "style-loader", // Injects styles into DOM
                    {
                        loader: "css-loader",
                        options: { importLoaders: 2 }
                    },   // Turns CSS into JS modules
                    "postcss-loader", // Allows Tailwind
                    "sass-loader"   // Compiles SCSS to CSS
                ]
            },
            {
                test: /\.tsx?$/,
                use: {
                    loader: "ts-loader",
                    options: {
                        configFile: path.resolve( "src/client/tsconfig.json" )
                    }
                },
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        alias: {
            "@components": path.resolve( "src/web/components/client" ),
            "@styles": path.resolve( "src/web/styles" )
        },
        extensions: [ ".tsx", ".ts", ".js" ]
    },
    output: {
        filename: "bundle.js",
        path: path.resolve( "src/web/static/scripts" )
    }
};
