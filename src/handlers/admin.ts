import { Context } from 'telegraf';

export async function handleAskAdmin(ctx: Context): Promise<void> {
  await ctx.reply('Задать вопрос администратору: модуль в разработке.');
}

