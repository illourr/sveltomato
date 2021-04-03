<script>
  let interval;
  let running = false;
  let timeLeft = 25 * 60 * 60 * 1000;

  // reset button
  // toggle work / break button

  // custom timers
  // save timers

  const handleClick = () => {
    if (!running) {
      running = true;
      interval = setInterval(() => {
        timeLeft -= 10;
      }, 10);
    } else {
      running = false;
      clearInterval(interval);
    }
  };

  const format = ms => {
    const min = Math.floor(ms / 1000 / 60 / 60).toString();
    const sec = Math.floor((ms / 1000) % 60).toString();
    return `${min}:${sec.padStart(2, '0')}`;
  };
</script>

<main>
  <button on:click={handleClick}>{format(timeLeft)}</button>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  button {
    color: white;
    font-size: 300%;
    border: none;
    border-radius: 50%;
    background-color: tomato;
    width: 500px;
    height: 500px;
  }

  button:active {
    background-color: brown;
  }
</style>
