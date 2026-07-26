export default {
    Client: {
        Attributes: {
            PostCSS: false
        },
        Loaders: {
            /* Enables Lua for browsers in document && scripting*/
            lua: true,
            /* Enables Pug for components */
            pug: true,
            /* Enables importing SCSS */
            scss: true,
            /* Enables Telefunc for "remote-like" access */
            telefunc: true,
            /* Enables Typescript */
            ts: true
        },
        Plugins: {}
    }
};