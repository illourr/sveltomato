import { formatTime } from '../utils';

describe('formatTime', () => {
  it('formats 25 minutes as 25:00', () => {
    expect(formatTime(25 * 60 * 1000)).toBe('25:00');
  });

  it('formats 62 seconds as 1:02', () => {
    expect(formatTime(62000)).toBe('1:02');
  });
});
