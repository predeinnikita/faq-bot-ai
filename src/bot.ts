import { Telegraf, Markup } from 'telegraf';
import { handlePopularQuestions } from './handlers/popular';
import { handleAskAdmin } from './handlers/admin';
import { handleKeyDates } from './handlers/dates';
import { handleAiQuestion } from './handlers/ai';

export function createBot(token: string): Telegraf {
  const bot = new Telegraf(token);

  bot.start(async (ctx) => {
    const keyboard = Markup.keyboard([
      ['Самые популярные вопросы'],
      ['Задать вопрос администратору'],
      ['Узнать ключевые даты'],
      ['Задать вопрос ИИ']
    ]).resize();

    await ctx.reply('Добро пожаловать! Выберите действие из меню ниже:', keyboard);
  });

  // Placeholders for future handlers: route by button text to specific modules
  bot.hears('Самые популярные вопросы', handlePopularQuestions);

  bot.hears('Задать вопрос администратору', handleAskAdmin);

  bot.hears('Узнать ключевые даты', handleKeyDates);

  bot.hears('Задать вопрос ИИ', handleAiQuestion);

  return bot;
}

