import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import type { Update } from 'node-telegram-bot-api';
import { sendMarkdownToChat } from '@providers/telegram/telegram-messaging';
import { getSession } from '@providers/telegram/telegram-session';

const hello: ValidatedEventAPIGatewayProxyEvent<Update> = async (event) => {
    const session = getSession(event.body);

    const message = event.body.message ? event.body.message.text : 'unknown';

    await sendMarkdownToChat(session.chatId, `response to ${message}`);
    return formatJSONResponse();
};

export const main = middyfy(hello);
