import path from 'path';
import AIService from '../src/services/aiService';

const fixture = path.join(__dirname, 'fixtures/context.txt');

describe('AIService', () => {
  let service: AIService;

  beforeAll(() => {
    service = new AIService(fixture);
  });

  test('loads context from file', () => {
    const ctx = service.getContext();
    expect(ctx).toContain('контекст для тестирования');
  });

  test('generateResponse/ask returns fallback message', async () => {
    const r1 = await service.generateResponse('Привет');
    const r2 = await service.ask('Как дела?');
    expect(r1).toBe('Сервис ИИ временно недоступен');
    expect(r2).toBe('Сервис ИИ временно недоступен');
  });
});
