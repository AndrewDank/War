//console.log("Testing");
// variables




//Functions


/* Make a card deck
--------------------------------------------------------
*/

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
console.log(myDeck);

/* ---------------------------------------------------------
Start the game by pressing the button "Deal" */

/* Shuffle and split the cards for both players */





