<script>
  import Pomodoro from './Pomodoro.svelte';
  import { formatTime } from './utils';

  const MINUTES_IN_MS = 60 * 1000;

  const timers = {
    pomodoro: {
      time: 25 * MINUTES_IN_MS,
      text: 'Lavora!',
    },
    short: {
      time: 5 * MINUTES_IN_MS,
      text: 'Relax.',
    },
    long: {
      time: 15 * MINUTES_IN_MS,
      text: 'Dai. Relax.',
    },
    test: {
      time: 3000,
      text: 'Testing',
    },
  };

  // export let initialTime = timers.pomodoro.time;
  const params = new URLSearchParams(window.location.search);
  const showTest = params.get('test');
  const seconds = params.get('seconds');

  let interval;
  let running = false;
  let currentTimer = timers.pomodoro;
  let timeLeft = seconds ? seconds * 1000 : currentTimer.time;

  // custom timers
  // save timers

  let tomatoText = 'Lavora!';

  $: getActive = timer => (timer === currentTimer ? 'active' : '');
  $: document.title = `${formatTime(timeLeft)} - Sveltomato`;

  const playSound = () => {
    const audio = new Audio('audio/weird-scream.wav');
    audio.play();
  };

  const handlePlayPause = () => {
    return running ? pause() : play();
  };

  const play = () => {
    running = true;
    interval = setInterval(() => {
      timeLeft -= 1000;
      if (timeLeft <= 0) {
        timeLeft = 0;
        clearInterval(interval);
        tomatoText = 'Festa!';
        playSound();
        // Make some noise
      }
    }, 1000);
  };

  const pause = () => {
    running = false;
    clearInterval(interval);
  };

  const handleReset = () => {
    clearInterval(interval);
    timeLeft = currentTimer.time;
    pause();
  };

  const handleTimer = type => {
    clearInterval(interval);
    timeLeft = type.time;
    tomatoText = type.text;
    currentTimer = type;
    play();
  };
</script>

<main>
  <div>
    <!-- <audio>
      <source src="foo.mp3" type="audio/mpeg" />
      <track kind="captions" />
    </audio> -->

    <Pomodoro text={tomatoText} {timeLeft} on:click={handlePlayPause} />
  </div>
  <div class="panel">
    <div class="controls">
      <!-- TODO: Make this a radio group -->
      <button
        class={getActive(timers.pomodoro)}
        on:click={() => handleTimer(timers.pomodoro)}>Pomodoro</button
      >
      <button
        class={getActive(timers.short)}
        on:click={() => handleTimer(timers.short)}>Festa corta</button
      >
      <button
        class={getActive(timers.long)}
        on:click={() => handleTimer(timers.long)}>Festa lunga</button
      >
      {#if showTest}
        <button
          class={getActive(timers.test)}
          on:click={() => handleTimer(timers.test)}>Test</button
        >
      {/if}
    </div>
    <button class="text" on:click={handleReset}>Reset</button>
  </div>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  button.text {
    background: none;
    border: none;
    padding: 1em;
    color: limegreen;
    font-weight: bold;
    text-transform: uppercase;
    margin: 1em auto;
  }

  button.text:focus {
    outline: none;
    box-shadow: 0px 0px 0px 2px cornflowerblue;
  }

  @media screen and (max-width: 550px) {
    .controls {
      flex-direction: column;
    }
  }

  .panel {
    display: flex;
    flex-direction: column;
    margin: auto;
    max-width: 600px;
    text-align: center;
  }

  .controls {
    display: flex;
    justify-content: space-around;
  }

  .controls button {
    flex: 1;
    font-weight: bold;
    border: 2px solid limegreen;
    border-radius: 0;
    background-color: limegreen;
    color: white;
    text-transform: uppercase;
    padding: 1em;
  }

  .controls button:focus {
    outline: 2px solid cornflowerblue;
  }

  .controls button.active {
    background-color: white;
    color: limegreen;
  }
</style>
