
const CARD_TYPES = [
  { name: '6', value: 6 },
  { name: '7', value: 7 },
  { name: '8', value: 8 },
  { name: '9', value: 9 },
  { name: '10', value: 10 },
  { name: 'Валет', code: 'J', value: 2 },
  { name: 'Дама', code: 'Q', value: 3 },
  { name: 'Король', code: 'K', value: 4 },
  { name: 'Туз', code: 'A', value: 11 }
];
const SUITS = [
  { symbol: '♠', color: 'black' },
  { symbol: '♣', color: 'black' },
  { symbol: '♥', color: 'red' },
  { symbol: '♦', color: 'red' }
];
let userName = '';
let currentAttempt = 0;
const maxAttempts = 3;
let userTotalScore = 0;
let computerTotalScore = 0;
const userLabel = document.getElementById('user-label');
const userScoreEl = document.getElementById('user-score');
const computerScoreEl = document.getElementById('computer-score');
const attemptInfoEl = document.getElementById('attempt-info');
const userCardSlot = document.getElementById('user-card-slot');
const computerCardSlot = document.getElementById('computer-card-slot');
const generateBtn = document.getElementById('generate-btn');
const resultMessageEl = document.getElementById('result-message');
const restartBtn = document.getElementById('restart-btn');
function initGame() {
  let inputName = '';
  while (!inputName || inputName.trim() === '') {
    inputName = prompt("Введіть ваше ім'я:");
    if (inputName === null) {
      inputName = 'User';
      break;
    }
  }
  userName = inputName.trim();
  userLabel.textContent = userName;
  resetGameState();
}
function resetGameState() {
  currentAttempt = 0;
  userTotalScore = 0;
  computerTotalScore = 0;
  userScoreEl.textContent = '0';
  computerScoreEl.textContent = '0';
  attemptInfoEl.textContent = `Спроба ${currentAttempt} з ${maxAttempts}`;
  userCardSlot.innerHTML = '<div class="card-placeholder">?</div>';
  computerCardSlot.innerHTML = '<div class="card-placeholder">?</div>'; 
  resultMessageEl.textContent = '';
  resultMessageEl.style.color = '#333';
  generateBtn.disabled = false;
  generateBtn.style.opacity = '1';
  generateBtn.style.cursor = 'pointer';
  restartBtn.classList.add('hidden');
}
function getRandomCard() {
  const cardType = CARD_TYPES[Math.floor(Math.random() * CARD_TYPES.length)];
  const suit = SUITS[Math.floor(Math.random() * SUITS.length)];
  return { ...cardType, ...suit };
}
function renderCard(card) {
  const label = card.code || card.name;
  return `
    <div class="card-ui ${card.color}">
      <div class="card-top">${label} ${card.symbol}</div>
      <div class="card-center">${card.symbol}</div>
      <div class="card-bottom">${label} ${card.symbol}</div>
    </div>
  `;
}
function playRound() {
  if (currentAttempt >= maxAttempts) return;
  currentAttempt++;
  const userCard = getRandomCard();
  const computerCard = getRandomCard();
  userTotalScore += userCard.value;
  computerTotalScore += computerCard.value;
  userCardSlot.innerHTML = renderCard(userCard);
  computerCardSlot.innerHTML = renderCard(computerCard);
  userScoreEl.textContent = userTotalScore;
  computerScoreEl.textContent = computerTotalScore;
  attemptInfoEl.textContent = `Спроба ${currentAttempt} з ${maxAttempts}`;
  if (currentAttempt === maxAttempts) {
    endGame();
  }
}
function endGame() {
  generateBtn.disabled = true;
  generateBtn.style.opacity = '0.5';
  generateBtn.style.cursor = 'not-allowed';
  if (userTotalScore > computerTotalScore) {
    resultMessageEl.textContent = `🎉 Переміг ${userName}!`;
    resultMessageEl.style.color = '#ff00dd';
  } else if (computerTotalScore > userTotalScore) {
    resultMessageEl.textContent = `🤖 Переміг Computer!`;
    resultMessageEl.style.color = '#ff4757';
  } else {
    resultMessageEl.textContent = `🤝 Нічия!`;
    resultMessageEl.style.color = '#ff00b7';
  }
  restartBtn.classList.remove('hidden');
}
generateBtn.addEventListener('click', playRound);
restartBtn.addEventListener('click', resetGameState);
window.addEventListener('DOMContentLoaded', initGame);