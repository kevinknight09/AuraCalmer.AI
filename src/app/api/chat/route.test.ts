import { describe, it, expect, vi } from 'vitest';
import { POST } from './route';

// Mock the streamText function
vi.mock('ai', () => ({
  streamText: vi.fn().mockReturnValue({
    toTextStreamResponse: vi.fn().mockReturnValue(new Response('mocked-stream', { status: 200 }))
  }),
}));

describe('POST /api/chat', () => {
  it('should return 400 for invalid request payload (Zod validation)', async () => {
    // Missing 'messages' field
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({ not_messages: [] }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    expect(await res.text()).toBe('Invalid request format');
  });

  it('should return 400 for empty messages array', async () => {
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: [] }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    expect(await res.text()).toBe('Invalid request format');
  });

  it('should process valid request and return stream response', async () => {
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: [{ role: 'user', content: 'Hello' }] }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(await res.text()).toBe('mocked-stream');
  });
});
