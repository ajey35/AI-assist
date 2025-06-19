import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_CONFIG } from '../constants/config';

class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    if (!GEMINI_CONFIG.apiKey) {
      throw new Error('Gemini API key is required');
    }
    
    this.genAI = new GoogleGenerativeAI(GEMINI_CONFIG.apiKey);
    this.model = this.genAI.getGenerativeModel({ 
      model: GEMINI_CONFIG.model,
      generationConfig: {
        maxOutputTokens: GEMINI_CONFIG.maxTokens,
        temperature: GEMINI_CONFIG.temperature,
      }
    });
  }

  async generateResponse(message: string): Promise<string> {
    try {
      const result = await this.model.generateContent(message);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw new Error('Failed to generate response from AI');
    }
  }

  async *generateStreamingResponse(message: string): AsyncGenerator<string, void, unknown> {
    try {
      const result = await this.model.generateContentStream(message);
      
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        if (chunkText) {
          yield chunkText;
        }
      }
    } catch (error) {
      console.error('Gemini Streaming Error:', error);
      throw new Error('Failed to stream response from AI');
    }
  }

  async generateWithContext(messages: Array<{role: string, content: string}>): Promise<string> {
    try {
      const contextPrompt = messages
        .map(msg => `${msg.role}: ${msg.content}`)
        .join('\n');
      
      return await this.generateResponse(contextPrompt);
    } catch (error) {
      console.error('Gemini Context Error:', error);
      throw new Error('Failed to generate contextual response');
    }
  }
}

export const geminiService = new GeminiService();