<script>
  export let text;
  export let timeLeft;

  import { formatTime } from './utils';
</script>

<span class="stem">*</span>
<button class="tomato" data-testid="tomato-button" on:click>
  <p>{text}</p>
  <h2>{formatTime(timeLeft)}</h2>
</button>

<style>
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
</style>
