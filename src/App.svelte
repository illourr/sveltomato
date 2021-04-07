<script>
  const MINUTES_IN_MS = 60 * 60 * 1000;

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
  let interval;
  let running = false;
  let currentTimer = timers.pomodoro;
  let timeLeft = currentTimer.time;
  const showTest = new URLSearchParams(window.location.search).get('test');

  // custom timers
  // save timers

  let tomatoText = 'Lavora!';

  $: getActive = timer => (timer === currentTimer ? 'active' : '');

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

  const format = ms => {
    const min = Math.floor(ms / 1000 / 60 / 60).toString();
    const sec = Math.floor((ms / 1000) % 60).toString();
    return `${min}:${sec.padStart(2, '0')}`;
  };
</script>

<main>
  <div>
    <span class="stem">*</span>
    <button
      class="tomato"
      data-testid="tomato-button"
      on:click={handlePlayPause}
      ><p>{tomatoText}</p>
      <h2>{format(timeLeft)}</h2></button
    >
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
    </div>
    <button class="text" on:click={handleReset}>Reset</button>
    {#if showTest}
      <button on:click={() => handleTimer(timers.test)}>Test</button>
    {/if}
  </div>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  p {
    margin: 0;
  }

  h2 {
    margin: 0;
    padding: 0;
  }

  button.tomato {
    color: white;
    font-size: 400%;
    border: none;
    border-radius: 50%;
    background-color: tomato;
    width: 500px;
    height: 500px;
  }

  button.tomato:active {
    background-color: brown;
  }

  button.tomato:focus {
    outline: none;
    box-shadow: 0px 0px 0px 4px red;
  }

  button.tomato:hover {
    cursor: pointer;
  }

  .stem {
    font-size: 600%;
    font-weight: 700;
    color: limegreen;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
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
    button.tomato {
      font-size: 12vw;
      width: 80vw;
      height: 80vw;
    }

    .stem {
      font-size: 15vw;
    }

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
    outline: 2px solid green;
  }

  .controls button.active {
    background-color: white;
    color: limegreen;
  }
</style>
