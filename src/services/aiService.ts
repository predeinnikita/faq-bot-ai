import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';

class AIService {
  private context: string = '';
  private contextPath: string;
  private aiServiceUrl: string;

  constructor(contextPath?: string, aiServiceUrl?: string) {
    this.contextPath = contextPath || path.join(__dirname, '../../data/context.txt');

    // URL API vLLM (OpenAI-like)
    this.aiServiceUrl = aiServiceUrl || process.env.AI_SERVICE_URL || 'http://localhost:8000/v1';

    this.loadContext();
  }

  private loadContext(): void {
    try {
      this.context = fs.readFileSync(this.contextPath, 'utf-8');
    } catch (error) {
      console.error('Error loading context:', error);
      this.context = '';
    }
  }

  public getContext(): string {
    return this.context;
  }

  public async generateResponse(userQuestion: string): Promise<string> {
    return 'Сервис ИИ временно недоступен';
  }

  public async ask(question: string): Promise<string> {
    return this.generateResponse(question);
  }
}

export default AIService;
