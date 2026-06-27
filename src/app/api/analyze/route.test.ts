import { describe, it, expect, vi } from 'vitest';
import { POST } from './route';

// Mock the AI generation functions
vi.mock('ai', () => ({
  generateObject: vi.fn().mockResolvedValue({
    object: {
      dominantEmotion: 'Anxiety',
      stressTriggers: ['Exams'],
      copingSuggestion: 'Take a break.',
      positivityScore: 3,
    }
  }),
}));

describe('POST /api/analyze', () => {
  it('should return 400 for invalid request payload (Zod validation)', async () => {
    // Missing 'text' field
    const req = new Request('http://localhost/api/analyze', {
      method: 'POST',
      body: JSON.stringify({ mood: 'Stressed' }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    expect(await res.text()).toBe('Invalid request format');
  });

  it('should process valid request and return analysis', async () => {
    const req = new Request('http://localhost/api/analyze', {
      method: 'POST',
      body: JSON.stringify({ text: 'I am so stressed about my physics test.', mood: 'Stressed' }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    
    const data = await res.json();
    expect(data.dominantEmotion).toBe('Anxiety');
    expect(data.stressTriggers).toContain('Exams');
  });
});
