<script>
  let timeLeft = '25:00';
  // on:click - start timer
  // on:click - pause timer
  // reset button
  // toggle work / break button

  // custom timers
  // save timers
</script>

<main>
  <button>{timeLeft}</button>
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
