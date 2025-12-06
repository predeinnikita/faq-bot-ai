import { Telegraf, Markup } from 'telegraf';
import { handlePopularQuestions } from './handlers/popular';
import { handleKeyDates } from './handlers/dates';
import { createHandleAiQuestion } from './handlers/ai';
import { createHandleAskAdmin } from './handlers/admin';

export function createBot(token: string): Telegraf {
  const bot = new Telegraf(token);

  bot.start(async (ctx) => {
  const keyboard = Markup.keyboard([
    ['Самые популярные вопросы', 'Задать вопрос администратору'],
    ['Узнать ключевые даты', 'Задать вопрос ИИ'],
  ]).resize();

    await ctx.reply('Добро пожаловать! Выберите действие из меню ниже:', keyboard);
  });

  // Placeholders for future handlers: route by button text to specific modules
  bot.hears('Самые популярные вопросы', handlePopularQuestions);

  bot.hears('Задать вопрос администратору', createHandleAskAdmin(bot));

  bot.hears('Узнать ключевые даты', handleKeyDates);

  bot.hears('Задать вопрос ИИ', createHandleAiQuestion(bot));

  return bot;
}

