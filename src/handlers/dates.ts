import { Context } from 'telegraf';

export async function handleKeyDates(ctx: Context): Promise<void> {
  await ctx.reply('Ключевые даты: модуль в разработке.');
}

