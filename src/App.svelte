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

  // custom timers
  // save timers

  let tomatoText = 'Lavora!';

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
    <button class="tomato" on:click={handlePlayPause}
      ><p>{tomatoText}</p>
      <h2>{format(timeLeft)}</h2></button
    >
  </div>
  <div class="controls">
    <button on:click={handleReset}>Reset</button>
    <button on:click={() => handleTimer(timers.pomodoro)}>Pomodoro</button>
    <button on:click={() => handleTimer(timers.short)}>Festa corta</button>
    <button on:click={() => handleTimer(timers.long)}>Festa lunga</button>
    <button on:click={() => handleTimer(timers.test)}>Test</button>
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
    box-shadow: 0px 0px 0px 4px green;
  }

  button.tomato:hover {
    cursor: pointer;
  }

  .stem {
    font-size: 600%;
    font-weight: 700;
    color: green;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
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
  }

  .controls {
    display: flex;
    margin: auto;
    max-width: 600px;
    text-align: center;
    justify-content: space-around;
  }

  .controls button {
    flex: 1;
  }
</style>
