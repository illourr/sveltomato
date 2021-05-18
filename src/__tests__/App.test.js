import { render, screen, fireEvent } from '@testing-library/svelte';
import App from '../App';

const { queryByRole, queryByText, queryByTestId } = screen;

// AudioMock
// Mock out browser Audio API because it doesn't exist in JSDom
class AudioMock {
  constructor(filename) {
    this.filename = filename;
  }
  play() {
    console.log(`Playing sound: ${this.filename}`);
  }
}
window.Audio = AudioMock;

describe('App', () => {
  it('pomodoro button shows 25 minutes', async () => {
    render(App);

    // Shows 'Lavora' text by default
    const tomatoButton = queryByTestId('tomato-button');
    expect(tomatoButton.textContent).toMatch(/lavora/i);
    expect(tomatoButton.textContent).not.toMatch(/relax/i);

    expect(queryByRole('button', { name: /reset/i })).toBeTruthy();

    expect(queryByText(/25:00/)).toBeTruthy();

    await fireEvent.click(queryByText(/pomodoro/i));
    expect(tomatoButton.textContent).toMatch(/25:00/);
  });
  it('pomodoro timer shows 20:00 when 5 minutes have passed', async () => {
    jest.useFakeTimers();

    render(App);

    const tomatoBtn = queryByTestId('tomato-button');
    const fiveMinutesInMs = 5 * 60 * 1000;

    expect(tomatoBtn.textContent).toMatch(/25:00/);

    await fireEvent.click(tomatoBtn);
    await jest.advanceTimersByTime(fiveMinutesInMs);
    expect(tomatoBtn.textContent).toMatch(/20:00/);

    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('pomodoro timer shows 0 seconds left when 25 minutes have passed', async () => {
    console.log = jest.fn();
    jest.useFakeTimers();

    render(App);

    const tomatoBtn = queryByTestId('tomato-button');
    const twentyFiveMinutesInMs = 25 * 60 * 1000;

    expect(tomatoBtn.textContent).toMatch(/25:00/);

    await fireEvent.click(queryByTestId('tomato-button'));
    await jest.advanceTimersByTime(twentyFiveMinutesInMs);
    expect(queryByTestId('tomato-button').textContent).toMatch(/festa! 0:00/i);

    // A sound should be played once the timer has finished.
    // We use the AudioMock at the beginning of this test file to log when a sound 
    // is played because there is no way to actually play the sound during a test. 
    expect(console.log.mock.calls[0][0]).toMatch(/playing sound/i);

    // Switching back to real timers, https://testing-library.com/docs/using-fake-timers/
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('short break button shows 5 minutes', async () => {
    render(App);

    const tomatoButton = queryByTestId('tomato-button');

    await fireEvent.click(queryByText(/corta/i));
    expect(tomatoButton.textContent).toMatch(/relax/i);
    expect(tomatoButton.textContent).toMatch(/5:00/);
  });

  it('long break button shows 15 minutes', async () => {
    render(App);

    const tomatoButton = queryByTestId('tomato-button');

    await fireEvent.click(queryByText(/lunga/i));
    expect(tomatoButton.textContent).toMatch(/dai. relax/i);
    expect(tomatoButton.textContent).toMatch(/15:00/);
  });
});
