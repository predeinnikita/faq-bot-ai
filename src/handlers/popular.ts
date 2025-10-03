import { Context } from 'telegraf';

export async function handlePopularQuestions(ctx: Context): Promise<void> {
  await ctx.reply('Популярные вопросы: модуль в разработке.');
}

