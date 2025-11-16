import { Context } from 'telegraf';

export async function handleAskAdmin(ctx: Context): Promise<void> {
  await ctx.reply('📧 Функция "Задать вопрос администратору" скоро появится!\n\nВ будущем здесь вы сможете отправить сообщение напрямую администратору.');
}

