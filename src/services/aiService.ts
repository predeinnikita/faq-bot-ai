import * as fs from "fs";
import * as path from "path";
import axios from "axios";

class AIService {
  private context: string = "";
  private contextPath: string;
  private aiServiceUrl: string;

  constructor(contextPath?: string, aiServiceUrl?: string) {
    this.contextPath =
      contextPath || path.join(__dirname, "../../data/context.txt");

    // URL API vLLM (OpenAI-like)
    this.aiServiceUrl =
      aiServiceUrl || process.env.AI_SERVICE_URL || "http://localhost:8000/v1";

    this.loadContext();
  }

  private loadContext(): void {
    try {
      this.context = fs.readFileSync(this.contextPath, "utf-8");
    } catch (error) {
      console.error("Error loading context:", error);
      this.context = "";
    }
  }

  public getContext(): string {
    return this.context;
  }

  public async generateResponse(userQuestion: string): Promise<string> {
    return "Сервис ИИ временно недоступен";
  }

  public async ask(question: string): Promise<string> {
    return await this.askAI(question);
  }

  async askAI(message: string) {
    const prompt = `
      Question: ${message}

      Answer please shorrly. Max 2-3 sentences.
      Use the language from the question.
      Your answer is '[ANSWER]: yur_answer_here'
    `;

    const payload = {
      model: "qwen3:4b",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      think: false,
      reasoning: false,
      stream: false,
      options: {
        temperature: 0.2,
        top_p: 0.8,
        repeat_penalty: 1.2,
      },
    };

    // ---------- Send request ----------
    let data;

    try {
      const response = await fetch("http://localhost:11434/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${await response.text()}`);
      }

      data = await response.json();
    } catch (e) {
      console.error("Ollama API request error:", e);
      return "Error while communicating with the Ollama API!";
    }

        console.log('data', data)


    // ---------- Extract content ----------
    let content = null;

    if (data?.message?.content) {
      content = data.message.content;
    } else if (data?.completion) {
      content = data.completion;
    } else if (data?.choices?.length > 0) {
      const choice = data.choices[0];
      if (choice?.message?.content) {
        content = choice.message.content;
      }
    }

    try {
      const r =  content.split('[ANSWER]:');
      return r[r.length - 1];
    } catch (e) {
      console.error("Validation error:", e);
      return "The model response does not match the expected format!";
    }
  }
}

export default AIService;
