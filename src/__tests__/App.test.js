import { render, screen, fireEvent } from '@testing-library/svelte';
import App from '../App';

const { queryByRole, queryByText, queryByTestId } = screen;

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
