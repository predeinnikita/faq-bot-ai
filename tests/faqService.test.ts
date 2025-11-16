import path from 'path';
import FAQService from '../src/services/faqService';

const fixture = path.join(__dirname, 'fixtures/popular_questions.json');

describe('FAQService', () => {
  let service: FAQService;

  beforeAll(() => {
    service = new FAQService(fixture);
  });

  test('loads all questions', () => {
    const all = service.getAllQuestions();
    expect(all.length).toBe(2);
  });

  test('getQuestionById returns a matching item', () => {
    const item = service.getQuestionById(1);
    expect(item).toBeDefined();
    expect(item?.question).toContain('регистра');
  });

  test('searchQuestions finds by a substring in answer', () => {
    const results = service.searchQuestions('докум');
    expect(results.length).toBe(1);
    expect(results[0]?.id).toBe(2);
  });

  test('getFormattedQuestions returns formatted string with emojis', () => {
    const formatted = service.getFormattedQuestions();
    expect(formatted).toContain('❓');
    expect(formatted).toContain('💬');
    expect(formatted).toContain('Как пройти регистрацию?');
  });
});
