function createScoreTracker() {
  let score = 0;

  function increment() {
    score++;
  }

  function reset() {
    score = 0;
  }

  return {
    get score() { return score },
    increment,
    reset,
  }
}

module.exports = createScoreTracker;
