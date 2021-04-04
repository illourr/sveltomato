<script>
  const MINUTES_IN_MS = 60 * 60 * 1000;

  let interval;
  let running = false;
  export let initialTime = 25 * MINUTES_IN_MS;
  let timeLeft = initialTime;

  // AUDIO

  // reset button
  // toggle work / break button

  // custom timers
  // save timers

  const handlePlayPause = () => {
    if (!running) {
      interval = setInterval(() => {
        timeLeft -= 10;
      }, 10);
    } else {
      clearInterval(interval);
    }
    running = !running;
  };

  const handleReset = () => {
    clearInterval(interval);
    timeLeft = initialTime;
    running = false;
  };

  const handleShortBreak = () => {
    clearInterval(interval);
    timeLeft = 5 * MINUTES_IN_MS;
    running = false;
  };

  const handleLongBreak = () => {
    clearInterval(interval);
    timeLeft = 15 * MINUTES_IN_MS;
    running = false;
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
    <button class="tomato" on:click={handlePlayPause}>{format(timeLeft)}</button
    >
  </div>
  <div class="controls">
    <button on:click={handleReset}>Reset</button>
    <button on:click={handleShortBreak}>Short break</button>
    <button on:click={handleLongBreak}>Long break</button>
  </div>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
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
    box-shadow: 0px 0px 0px 2px green;
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
