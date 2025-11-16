import { Context, Composer, Scenes, Telegraf } from 'telegraf';
import AIService from '../services/aiService';

const aiService = new AIService();

export function createHandleAiQuestion(bot: Telegraf) {
  return async function handleAiQuestion(ctx: Context): Promise<void> {
    await ctx.reply('🤖 Задайте ваш вопрос, и я постараюсь на него ответить с помощью ИИ:');

    const userId = ctx.from?.id;
    if (!userId) return;

    const handler = async (msgCtx: Context) => {
      if (msgCtx.from?.id !== userId) return;

      const userQuestion = msgCtx?.text;
      if (!userQuestion) return;

      await msgCtx.reply('⏳ Обрабатываю ваш вопрос...');

      try {
        const answer = await aiService.ask(userQuestion);
        await msgCtx.reply(`🤖 Ответ ИИ:\n\n${answer}`);
      } catch (error) {
        console.error('Error in AI handler:', error);
        await msgCtx.reply('❌ Произошла ошибка при обработке вашего вопроса. Попробуйте позже.');
      }

      // снимаем обработчик
      // bot.o('text', handler as any);
    };

    // навешиваем временный одноразовый обработчик
    bot.on('text', handler as any);
  };
}
