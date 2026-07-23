import { parseCorsOrigins } from '../main';

describe('CORS Origin Parser', () => {
  test('parses comma-separated allowed origins', () => {
    const raw = 'http://localhost:3000, http://localhost:3001 , http://localhost:3002';
    const parsed = parseCorsOrigins(raw);

    expect(parsed).toEqual([
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002'
    ]);
  });

  test('falls back to default localhost origins when empty or undefined', () => {
    const parsed = parseCorsOrigins(undefined);
    expect(parsed).toHaveLength(3);
    expect(parsed).toContain('http://localhost:3000');
  });
});
