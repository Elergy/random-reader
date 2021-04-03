import type { InlineKeyboardMarkup } from 'node-telegram-bot-api';
import { URLSearchParams } from 'url';
import fetch from 'node-fetch';

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;

export async function sendMarkdownToChat(
    chatId: number,
    markdown: string,
    keyboardMarkup?: InlineKeyboardMarkup
) {
    const query = new URLSearchParams({
        chat_id: String(chatId),
        text: markdown,
        parse_mode: 'markdown',
    });

    if (keyboardMarkup) {
        query.append('reply_markup', JSON.stringify(keyboardMarkup));
    }

    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?${query}`;
    const res = await fetch(url);
    if (!res.ok) {
        console.error(`sendMarkdown: status is ${res.status}`);
        console.error(`sendMarkdown: the request was sent to ${url}`);
        return false;
    }

    return true;
}
