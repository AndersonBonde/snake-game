const maxScore = document.getElementById('max-score');
const curScore = document.getElementById('cur-score');

function updateScoreDisplay(score) {
  curScore.innerText = score;

  const max = Math.max(score, Number(maxScore.textContent));
  maxScore.textContent = max;
}

module.exports = { updateScoreDisplay };
