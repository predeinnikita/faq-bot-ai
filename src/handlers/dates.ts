import { Context } from 'telegraf';
import DatesService from '../services/datesService';

const datesService = new DatesService();

export async function handleKeyDates(ctx: Context): Promise<void> {
  try {
    const message = datesService.getFormattedUpcomingDates();
    await ctx.reply(message);
  } catch (error) {
    console.error('Error in handleKeyDates:', error);
    await ctx.reply('Ошибка при получении ключевых дат. Попробуйте позже.');
  }
}

