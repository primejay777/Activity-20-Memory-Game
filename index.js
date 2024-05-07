const emojis = ['😀', '😊', '😎', '🥳', '🤩', '😍', '🥰', '😂'];
const cards = emojis.concat(emojis);
let flippedCards = [];
let matchedCards = [];

function createCard(emoji) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <div class="front"></div>
    <div class="back">${emoji}</div>
  `;
  card.addEventListener('click', flipCard);
  return card;
}

function shuffleCards() {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
}

function flipCard() {
  if (flippedCards.length < 2 && !this.classList.contains('flipped') && !this.classList.contains('matched')) {
    this.classList.add('flipped');
    flippedCards.push(this);
    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  const emoji1 = card1.querySelector('.back').textContent;
  const emoji2 = card2.querySelector('.back').textContent;
  if (emoji1 === emoji2) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedCards.push(card1, card2);
    if (matchedCards.length === cards.length) {
      setTimeout(showGameResult, 500);
    }
  } else {
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
  }
  flippedCards = [];
}

function showGameResult() {
  alert('Congratulations! You matched all the cards!');
  resetGame();
}

function resetGame() {
  const gameContainer = document.querySelector('.game-container');
  gameContainer.innerHTML = '';
  matchedCards = [];
  flippedCards = [];
  initGame();
}

function initGame() {
  shuffleCards();
  const cardsContainer = document.querySelector('.cards-container');
  for (let i = 0; i < cards.length; i++) {
    const card = createCard(cards[i]);
    cardsContainer.appendChild(card);
  }
}

initGame();