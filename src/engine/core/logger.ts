import pino from "pino";

export class Logger
{
    public readonly Instance: pino.Logger

    constructor( private readonly Name: string, private readonly File: string )
    {
        const transport = pino.transport(
            {
                targets: [
                    {
                        target: "pino-pretty",
                        options: { destination: 1 }
                    },
                    {
                        target: "pino/file",
                        options: { destination: `./logs/${ this.File }` }
                    }
                ]
            }
        );
        
        this.Instance = pino.pino(
            { name: this.Name },
            transport
        );
    }
}