import * as fs from 'fs';
import * as path from 'path';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

class FAQService {
  private questions: FAQItem[] = [];
  private dataPath: string;

  constructor(dataPath?: string) {
    this.dataPath = dataPath || path.join(__dirname, '../../data/popular_questions.json');
    this.loadQuestions();
  }

  private loadQuestions(): void {
    try {
      const data = fs.readFileSync(this.dataPath, 'utf-8');
      this.questions = JSON.parse(data);
    } catch (error) {
      console.error('Error loading FAQ data:', error);
      this.questions = [];
    }
  }

  public getAllQuestions(): FAQItem[] {
    return this.questions;
  }

  public getQuestionById(id: number): FAQItem | undefined {
    return this.questions.find((q) => q.id === id);
  }

  public searchQuestions(query: string): FAQItem[] {
    const lowerQuery = query.toLowerCase();
    return this.questions.filter(
      (q) =>
        q.question.toLowerCase().includes(lowerQuery) ||
        q.answer.toLowerCase().includes(lowerQuery)
    );
  }

  public getFormattedQuestions(): string {
    if (this.questions.length === 0) {
      return 'Вопросы не найдены.';
    }

    return this.questions
      .map((q) => `❓ ${q.question}\n💬 ${q.answer}`)
      .join('\n\n');
  }
}

export default FAQService;
