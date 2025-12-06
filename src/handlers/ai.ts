import { Context, Telegraf } from 'telegraf';
import AIService from '../services/aiService';

const aiService = new AIService();

// множество пользователей, от которых ждём вопрос для ИИ
const usersWaitingForAi = new Set<number>();

export function createHandleAiQuestion(bot: Telegraf) {
  return async function handleAiQuestion(ctx: Context): Promise<void> {
    return;
    const userId = ctx.from?.id;
    if (!userId) return;

    // // если уже ждём от этого пользователя — просто напомним и выйдем
    // if (usersWaitingForAi.has(userId)) {
    //   await ctx.reply('⚠️ Я уже жду от вас вопрос. Пожалуйста, отправьте его одним сообщением.');
    //   return;
    // }

    // usersWaitingForAi.add(userId);

    // await ctx.reply('🤖 Задайте ваш вопрос, и я постараюсь на него ответить с помощью ИИ:');

    // const handler = async (msgCtx: Context) => {
    //   // обрабатываем только этого пользователя
    //   if (msgCtx.from?.id !== userId) return;

    //   const userQuestion = msgCtx?.text;
    //   if (!userQuestion) return;

    //   if (!usersWaitingForAi.has(userId)) {
    //     return;
    //   }

    //   // как только получили текст — снимаем «ожидание»

    //   await msgCtx.reply('⏳ Обрабатываю ваш вопрос...');

    //   try {
    //     const answer = await aiService.ask(userQuestion);
    //     await msgCtx.reply(`🤖 Ответ ИИ:\n\n${answer}`);
    //     usersWaitingForAi.delete(userId);
    //   } catch (error) {
    //     console.error('Error in AI handler:', error);
    //     await msgCtx.reply('❌ Произошла ошибка при обработке вашего вопроса. Попробуйте позже.');
    //   }
    // };

    // // общий обработчик текста: внутри фильтруем по usersWaitingForAi
    // bot.on('text', handler as any);
  };
}
