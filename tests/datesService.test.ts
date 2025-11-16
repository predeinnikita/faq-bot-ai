import path from 'path';
import DatesService from '../src/services/datesService';

const fixture = path.join(__dirname, 'fixtures/key_dates.json');

describe('DatesService', () => {
  let service: DatesService;

  beforeAll(() => {
    service = new DatesService(fixture);
  });

  test('loads all dates', () => {
    const all = service.getAllDates();
    expect(all.length).toBe(3);
  });

  test('getDateById returns correct item', () => {
    const d = service.getDateById(2);
    expect(d).toBeDefined();
    expect(d?.title).toContain('Конференция');
  });

  test('getUpcomingDates returns only future events', () => {
    const upcoming = service.getUpcomingDates();
    // Fixture has two future events (ids 2 and 3)
    expect(upcoming.length).toBeGreaterThanOrEqual(1);
    const now = new Date();
    for (const d of upcoming) {
      expect(new Date(d.date).getTime()).toBeGreaterThan(now.getTime());
    }
    expect(upcoming.find((x) => x.id === 1)).toBeUndefined();
  });

  test('getFormattedDates contains emojis and descriptions', () => {
    const formatted = service.getFormattedDates();
    expect(formatted).toContain('📅');
    expect(formatted).toContain('📝');
    expect(formatted).toContain('Прошедшее событие');
  });

  test('getFormattedUpcomingDates contains upcoming titles', () => {
    const formattedUpcoming = service.getFormattedUpcomingDates();
    expect(formattedUpcoming).toContain('Конференция разработчиков');
  });
});
