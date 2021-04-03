import type {
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
    Handler,
} from 'aws-lambda';

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & {
    body: S;
};
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<
    ValidatedAPIGatewayProxyEvent<S>,
    APIGatewayProxyResult
>;

export const formatJSONResponse = (response?: Record<string, unknown>) => {
    const res: APIGatewayProxyResult = {
        statusCode: 200,
        body: '',
    };
    if (response) {
        res.body = JSON.stringify(response);
    }
    return res;
};
