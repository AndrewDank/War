//console.log("Testing");
// global variables
var totalCardsInDeck;




/* Functions */


/* Create a card object that will create a value, name, and suit
for each card */

function card(value, name, suit){
  this.value = value;
  this.name = name;
  this.suit = suit;
}

/* create a deck object which will create an area of 52 cards. */

function deck(){
  this.names = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  this.suits = ['Hearts','Diamonds','Spades','Clubs'];
  var cards = [];

    for( var s = 0; s < this.suits.length; s++ ) {
        for( var n = 0; n < this.names.length; n++ ) {
            cards.push( new card( n+1, this.names[n], this.suits[s] ) );
        }
    }

    return cards;
}


var myDeck = new deck();


/* *****Event Listeners******* */

/* Trigger the click event */




/* Shuffle and split the cards for both players */

function shuffle(o) {
  for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
};

myDeck = shuffle(myDeck);




/* Draw a card using a trigger

/* Trigger  War Mode when both opponents card are matched even.

/* Winning / Losing part.

/* Restart the game when the game is finished */


