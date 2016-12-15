//console.log("Testing");
// global variables
var deck;
var playerDecks;
var battleCards;
var winMessage;

var battleBtn = document.getElementById('battle-btn');

/* Functions */

function initialize() {
  buildDeck();
  shuffleDeck();
  dealPlayerCards();
  winMessage = null;
  render();
}

function render() {
  renderPlayersDecks();
  renderDeckCounts();
  if (battleCards) renderBattleCards();
}

function renderDeckCounts() {
  var countDeckElems = document.querySelectorAll('.card.won p');
  countDeckElems[0].innerHTML = playerDecks[0].length + ' &#x25BB;';
  countDeckElems[1].innerHTML = '&#x25C5; ' + playerDecks[1].length;

}

function renderPlayersDecks() {
  var deckElems = document.querySelectorAll('.card.deck');
  renderPlayerDeck(deckElems[0], 0);
  renderPlayerDeck(deckElems[1], 1);
}

function renderBattleCards() {
  var battleElems = document.querySelectorAll('.battle .card');
  var cardClass;
  if (battleCards[0].length) {
    cardClass = 'card ' + battleCards[0][0].suit + battleCards[0][0].name;
    battleElems[0].className = cardClass;
    cardClass = 'card ' + battleCards[1][0].suit + battleCards[1][0].name;
    battleElems[1].className = cardClass;
  } else {
    battleElems[0].className = 'card';
    battleElems[1].className = 'card';
  }
}

function renderPlayerDeck(deck, player) {
  if (playerDecks[player].length) {
    deck.classList.add('back-blue');
  } else {
    deck.classList.remove('back-blue');
    deck.classList.add('outline');
  }
}

/* when the value of the two cards is tied, each player will draw three cards
from their stack facedown. The fourth card will be faced up and the player with
the highest value card will win the duel and collect all of the drawn cards.

If tied, the two players will go over the process again until the tie
is broken. If the players run out of cards in their deck, then they will turn over the
stacked decked cards and continue the "War" part. */

function launchWarMode(){


}


/* Create a card object that will create a value, name, and suit
for each card */

function Card(value, name){
  this.value = value;
  this.name = name;
}

function dealPlayerCards() {
  playerDecks = [[], []];
  while(deck.length) {
    playerDecks[0].push(deck.pop());
    playerDecks[1].push(deck.pop());
  }
}

/* create a deck array which will create an area of 52 cards. */
function buildDeck(){
  var names = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
  var values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  var suits = ['h','d','s','c'];
  deck = [];

  names.forEach(function(name, idx) {
    suits.forEach(function(suit) {
      deck.push({
        name: name,
        suit: suit,
        value: values[idx]
      });
    });
  });
}


/* *****Event Listeners******* */

/* Trigger the click event */
battleBtn.addEventListener('click', handleBattleClick);


/* *****Functions******* */

function handleBattleClick() {
  if (battleBtn.classList.contains('lock')) return;
  battleCards = [[], []];
  saveWins = [0, 0];
  battleCards[0].push(playerDecks[0].pop());
  battleCards[1].push(playerDecks[1].pop());
  player1value = battleCards[0][0].value;
  player2value = battleCards[1][0].value;
  if (player1value > player2value) {
    winBattle(0);
  } else if (player1value < player2value) {
    winBattle(1);
  } else {
    // it's war!
    battleBtn.textContent = "War!"
  }
  winnerCheck();
  console.log(playerDecks[0], playerDecks[1])
  render();
}

function winBattle(player) {
  battleBtn.textContent = 'Player ' + (player + 1) + ' Wins the Battle';
  battleBtn.classList.add('lock');
  setTimeout(function() {
    playerDecks[player].push(battleCards[0][0], battleCards[1][0]);
    battleCards = [[], []];
    battleBtn.textContent = 'Battle';
    battleBtn.classList.remove('lock');
    render();
  }, 2500);
}

function winnerCheck(){
  if (playerDecks[0].length === 52) {
    winMessage = 'Player 1 Wins!';
    console.log("Player 1 wins");
  } else if (playerDecks[1].length === 52){
    winMessage = 'Player 2 Wins!';
    console.log("Player 2 wins");
  }
}

/* Shuffle and split the cards for both players */

function shuffleDeck() {
  var shuffledDeck = [];
  while(deck.length) {
    var rnd = Math.floor(Math.random() * deck.length);
    shuffledDeck.push(deck.splice(rnd, 1)[0]);
  }
  deck = shuffledDeck;
};


initialize();

