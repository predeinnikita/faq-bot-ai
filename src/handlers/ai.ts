import { Context } from 'telegraf';

export async function handleAiQuestion(ctx: Context): Promise<void> {
  await ctx.reply('Вопрос ИИ: модуль в разработке.');
}

