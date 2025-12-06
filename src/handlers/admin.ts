import { Context, Telegraf } from 'telegraf';

const ADMIN_CHAT_ID = -5003128320; // id чата/группы с админом

const usersWaiting = new Set<number>();

export function createHandleAskAdmin(bot: Telegraf) {
  return async function handleAskAdmin(ctx: Context): Promise<void> {
    const userId = ctx.from?.id;
    if (!userId) return;

    // ставим флаг ожидания сразу
    usersWaiting.add(userId);

    await ctx.reply('✍️ Задайте ваш вопрос администратору одним сообщением.');

    const handler = async (msgCtx: Context) => {
      const fromId = msgCtx.from?.id;
      if (!fromId || fromId !== userId) return;

      // если юзер уже «отстрелялся» или сброшен — выходим
      if (!usersWaiting.has(fromId)) return;

      const msg = msgCtx.message;
      const userQuestion =
        msg && 'text' in msg
          ? msg.text
          : (msgCtx as any).text ?? undefined;

      if (!userQuestion) {
        await msgCtx.reply('Пожалуйста, отправьте текстовый вопрос одним сообщением.');
        return;
      }

      // собираем «имя» юзера
      const username = msgCtx.from?.username
        ? `@${msgCtx.from.username}`
        : msgCtx.from?.first_name
        ? `${msgCtx.from.first_name}${msgCtx.from.last_name ? ' ' + msgCtx.from.last_name : ''}`
        : `id:${fromId}`;

      const adminMessage =
        `📩 Новый вопрос администратору\n` +
        `👤 Пользователь: ${username} (id: ${fromId})\n` +
        `💬 Вопрос:\n${userQuestion}`;

      await msgCtx.reply('⏳ Отправляю ваш вопрос администратору...');
      usersWaiting.delete(fromId);
      await msgCtx.telegram.sendMessage(ADMIN_CHAT_ID, adminMessage);
      await msgCtx.reply('✅ Ваш вопрос отправлен администратору. Ожидайте ответа.');
    };

    bot.on('text', handler as any);
  };
}
