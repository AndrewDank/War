//console.log("Testing");
// global variables
var deck;
var playerDecks;
var wonDecks;
var battleCards;



/* Functions */

function initialize() {
  buildDeck();
  shuffleDeck();
  dealPlayerCards();
  wonDecks = [[], []];
  battleCards = [null, null;
  render();
}

function render() {
  renderPlayersWonCount();
  renderPlayersDecks();
  renderBattleCards();
}

function renderPlayersWonCount() {

}

function renderPlayersDecks() {

}

function renderBattleCards() {

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
  console.log(playerDecks)
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
document.getElementById('deal-btn').addEventListener('click', handleDealClick);


/* *****Functions******* */

function handleDealClick() {
  console.log('deal button clicked')
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

// myDeck = shuffle(myDeck);




/* Draw a card using a trigger

/* Trigger  War Mode when both opponents card are matched even.

/* Winning / Losing part.

/* Restart the game when the game is finished */


initialize();

