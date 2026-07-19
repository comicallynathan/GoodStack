declare namespace Pug {
    export interface TemplateFunction {
        ( parameters?: Record<string, unknown> ): string;
        render( parameters?: Record<string, unknown> ): string;
    }

    const template: TemplateFunction;
    export default template;
}

declare module "*.pug" {
    export default Pug.default;
}

declare module "*.scss";