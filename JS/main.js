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
  if (winMessage) {
    document.getElementById('board').innerHTML = '<h1 id="win-msg">' + winMessage + '</h1>';
  } else {
    renderPlayersDecks();
    renderDeckCounts();
    if (battleCards) renderBattleCards();
  }
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
    var cardPointer = battleCards[0].length - 1;
    cardClass = 'card ' + battleCards[0][cardPointer].suit + battleCards[0][cardPointer].name;
    battleElems[0].className = cardClass;
    cardClass = 'card ' + battleCards[1][cardPointer].suit + battleCards[1][cardPointer].name;
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
function handlePlaySound() {
  var selectedSound = document.querySelector('input[name="sound"]:checked').value;
  playSound(selectedSound);
}

function playSound(name) {
  player.src = sounds[name];
  player.play();
}

function handleBgChanged() {
  bgCheckbox.checked ? bgPlayer.play() : bgPlayer.pause();
}

/* when the value of the two cards is tied, each player will draw three cards
from their stack facedown. The fourth card will be faced up and the player with
the highest value card will win the duel and collect all of the drawn cards.

If tied, the two players will go over the process again until the tie
is broken. If the players run out of cards in their deck, then they will turn over the
stacked decked cards and continue the "War" part. */

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
// Event Listeners

/* Trigger the click event */
battleBtn.addEventListener('click', handleBattleClick);


/* *****Functions******* */

/* War Code */

function handleBattleClick() {
  if (battleBtn.textContent === 'Go to War!') {
    if (playerDecks[0].length < 2) {
      winMessage = 'Player 2 Wins!';
    } else if (playerDecks[1].length < 2) {
      winMessage = 'Player 1 Wins!';
    } else {
      // go to war
      for (var i = 0; i < 2; i++) {
        battleCards[0].push(playerDecks[0].pop());
        battleCards[1].push(playerDecks[1].pop());
      }
      determineBattleWinner();
    }
  } else {
    if (battleBtn.classList.contains('lock')) return;
    battleCards = [[], []];
    battleCards[0].push(playerDecks[0].pop());
    battleCards[1].push(playerDecks[1].pop());
    determineBattleWinner();
  }
  render();
}

function determineBattleWinner() {
  var cardPointer = battleCards[0].length - 1;
  player1value = battleCards[0][cardPointer].value;
  player2value = battleCards[1][cardPointer].value;
  if (player1value > player2value) {
    winBattle(0);
  } else if (player1value < player2value) {
    winBattle(1);
  } else {
    // it's war!
    battleBtn.textContent = 'Go to War!';
  }
}

function winBattle(player) {
  var battleOrWar = battleCards[0].length > 1 ? 'War' : 'Battle';
  battleBtn.textContent = 'Player ' + (player + 1) + ' Wins the ' + battleOrWar;
  battleBtn.classList.add('lock');
  setTimeout(function() {
    while (battleCards[0].length) {
      playerDecks[player].unshift(battleCards[0].pop(), battleCards[1].pop());
    }
    battleCards = [[], []];
    battleBtn.textContent = 'Battle';
    winnerCheck();
    render();
    battleBtn.classList.remove('lock');
  }, 2000);
}

function winnerCheck(){
  if (playerDecks[0].length === 52) {
    winMessage = 'Player 1 Wins!';
  } else if (playerDecks[1].length === 52){
    winMessage = 'Player 2 Wins!';
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

