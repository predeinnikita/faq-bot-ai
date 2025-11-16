import { Context } from 'telegraf';
import FAQService from '../services/faqService';

const faqService = new FAQService();

export async function handlePopularQuestions(ctx: Context): Promise<void> {
  const formattedQuestions = faqService.getFormattedQuestions();
  await ctx.reply(`📚 Самые популярные вопросы:\n\n${formattedQuestions}`);
}

