import * as fs from 'fs';
import * as path from 'path';

interface KeyDate {
  id: number;
  title: string;
  date: string;
  description: string;
}

class DatesService {
  private dates: KeyDate[] = [];
  private dataPath: string;

  constructor(dataPath?: string) {
    this.dataPath = dataPath || path.join(__dirname, '../../data/key_dates.json');
    this.loadDates();
  }

  private loadDates(): void {
    try {
      const data = fs.readFileSync(this.dataPath, 'utf-8');
      this.dates = JSON.parse(data);
    } catch (error) {
      console.error('Error loading dates data:', error);
      this.dates = [];
    }
  }

  public getAllDates(): KeyDate[] {
    return this.dates;
  }

  public getUpcomingDates(): KeyDate[] {
    const now = new Date();
    return this.dates
      .filter((d) => new Date(d.date) >= now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  public getDateById(id: number): KeyDate | undefined {
    return this.dates.find((d) => d.id === id);
  }

  public getFormattedDates(): string {
    if (this.dates.length === 0) {
      return 'Ключевые даты не найдены.';
    }

    return this.dates
      .map((d) => {
        const dateObj = new Date(d.date);
        const formattedDate = dateObj.toLocaleDateString('ru-RU', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
        return `📅 ${d.title}\n📆 ${formattedDate}\n📝 ${d.description}`;
      })
      .join('\n\n');
  }

  public getFormattedUpcomingDates(): string {
    const upcoming = this.getUpcomingDates();
    if (upcoming.length === 0) {
      return 'Предстоящих событий не найдено.';
    }

    return upcoming
      .map((d) => {
        const dateObj = new Date(d.date);
        const formattedDate = dateObj.toLocaleDateString('ru-RU', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
        return `📅 ${d.title}\n📆 ${formattedDate}\n📝 ${d.description}`;
      })
      .join('\n\n');
  }
}

export default DatesService;
