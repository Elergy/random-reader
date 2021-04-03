import type { Message, CallbackQuery, Update } from 'node-telegram-bot-api';

interface TelegramSession {
    userId: string;
    chatId: number;
    callbackQuery?: CallbackQuery;
    message?: Message;
}

export function getSession(body: Update): TelegramSession | null {
    const userId =
        getUserIdByMessage(body.message) ||
        getUserIdByСallbackQuery(body.callback_query);
    const chatId =
        getChatIdByMessage(body.message) ||
        getChatIdByCallbackQuery(body.callback_query);

    if (userId && chatId) {
        return {
            userId,
            chatId,
            callbackQuery: body.callback_query,
            message: body.message,
        };
    }

    return null;
}

function getUserIdByMessage(message?: Message) {
    return (
        message &&
        message.from &&
        message.from.id &&
        `telegram-${message.from.id}`
    );
}

function getUserIdByСallbackQuery(callbackQuery?: CallbackQuery) {
    if (
        !callbackQuery ||
        !callbackQuery.message ||
        !callbackQuery.message.chat
    ) {
        return null;
    }

    return `telegram-${callbackQuery.message.chat.id}`;
}

function getChatIdByMessage(message?: Message) {
    return message && message.chat.id;
}

function getChatIdByCallbackQuery(callbackQuery?: CallbackQuery) {
    return (
        callbackQuery && callbackQuery.message && callbackQuery.message.chat.id
    );
}
