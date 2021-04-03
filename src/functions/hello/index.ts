import schema from "./schema";

export default {
    handler: `${__dirname.split(process.cwd())[1].substring(1)}/handler.main`,
    memorySize: 128,
    events: [
        {
            http: {
                method: "post",
                path: "hello",
                request: {
                    schema: {
                        "application/json": schema,
                    },
                },
            },
        },
    ],
};
