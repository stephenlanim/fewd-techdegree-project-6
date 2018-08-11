const $startScreen = $('#overlay'); // start-screen overlay
const $playBtn = $('.btn__reset'); // play button
const $keyboard = $('#qwerty'); // on-screen keybaord
const $phrase = $('#phrase'); // on-screen game phrase
const $tries = $('.tries img'); //hearts

let missed = 0; // for tracking player's missed guesses

// Win message
const winMessage = document.createElement('h3');
winMessage.textContent = "Congratulations! You won!";

// Lose message
const loseMessage = document.createElement('h3');
loseMessage.textContent = "Sorry. You lost.";

// Game phrases to select from
const phrases = [
  'Handshaking error',
  'Internal server error',
  'Gateway timeout',
  'Service unavailable',
  'File not found'
];

// When user clicks start button...
$playBtn.on('click', () => {

  // If play button is a start button...
  if ($playBtn.text() === 'Start Game') {

    // insert random phrase
    phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);

    // Hide start screen overlay
    $startScreen.hide('clip');

    // Note: Game will start as normal
  }

  // If play button is a reset button...
  if ($playBtn.text() === 'Play Again') {

    // remove phrase
    $(`#phrase ul`).children().remove();

    // insert new phrase
      // get another random phrase
      phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);

    // reset keyboard
      // remove "chosen" class
      $keyboard.find('button').removeClass('chosen')
      // remove disabled attribute
      .attr('disabled', false);

    // reset missed guesses
    missed = 0;

    // reset hearts
    $tries.attr('src', 'images/liveHeart.png');

    // Hide start screen overlay
    $startScreen.hide('clip');

  }

});

function getRandomPhraseAsArray(arr){
  // Randomly choose phrase from array
  let phraseQty = arr.length;
  let phrasePosition = Math.floor(Math.random() *  phraseQty);
  let selectedPhrase = arr[phrasePosition];

  // Split phrase array into a new array of characters
  let splitPhrase = selectedPhrase.split('');

  // Return new character array
  return splitPhrase;
};

// Save random-phrase array to variable
let phraseArray = getRandomPhraseAsArray(phrases);
  // Note: using "let" allows new random phrase to be generated each time this variable is set to getRandomPhraseAsArray(phrases).

// Function to add phrase to screen
function addPhraseToDisplay(arr){

  // Loop through each character in phrase array
  for (let i = 0; i < arr.length; i += 1) {
    const character = arr[i];

    // Create a list item
    const li = document.createElement('li');

    // Put array character inside list item
    li.textContent = character;

    // If character is a space...
    if (li.textContent === ' ') {

      // add class "space" to list item
      li.className = 'space';
    }
    else {
      // add class "letter" to list item
      li.className = 'letter';
    }

    // Append list item to `#phrase ul`
    $(`#phrase ul`).append(li);
  };
}

// Check letter player clicked
function checkLetter(key){
  // variable to be returned
  let response = null;
  // Note: Default value is null so that returned value is null unless the player selects a valid letter.

  // Get every letter in phrase
  const $letters = $('.letter');

  // Loop through each letter
  $letters.each( function (index, letter){
    const $letter = $(this).text().toLowerCase();
    // If letter matches clicked button
    if ($letter === key.textContent) {
      // add "show" class to list item
      $(this).addClass('show');

      // store matching letter inside response
      response = $letter;
      return response;
    }
    // Note: Returning null via an else statement produces a bug in which it value returned is always null unless the player chose the very last letter in the phrase. This is because the loop checks the player's chosen letter against all letters in the phrase and only returns to very last value in the loop. Adding a console.log() before each return statement in the if and else statements reveals the nature of this issue.
  });

  // return value of chosen letter
  return response;
}

// Clear overlay screen
function clearScreen() {
  // reset start screen
  $startScreen.removeClass('start win lose');

  // remove win or lose message if present
  $startScreen.find('h3').remove();
}

// Display outcome (win/lose) screen and reset button
function endGame(outcome, outcomeMessage) {
  // show "win" screen
  $startScreen.addClass(`${outcome}`).delay(400).show('clip');

  // display "win" message after title
  $('.title').after(outcomeMessage);

  // change start button to reset button
  $playBtn.text('Play Again');
}

// Check of player has one or lost game
function checkWin() {
  // Get every letter in phrase
  const $allPhraseLetters = $('.letter').length;
  // Get every letter the player found
  const $foundLetters = $('.show').length;

  // If all phrase letters have been found...
  if ($foundLetters === $allPhraseLetters) {
    // Clear screen before displaying end-of-game message
    clearScreen();

    // Display Win screen and Reset button
    endGame('win', winMessage);

  }
  // If player used up all tries/hearts
  else if (missed === $tries.length) {
    // Clear screen before displaying end-of-game message
    clearScreen();

    // Display Lose screen and Reset button
    endGame('lose', loseMessage);

  }
}

// Add an event listener to the keyboard.
$keyboard.on('click', (e) => {
  const key = e.target;
  if (key.tagName === 'BUTTON') {
    // show clicked key as "chosen"
    $(key).addClass('chosen')
      // disable clicked key
      .attr('disabled', true);

    // get user's selected letter
    const letterFound = checkLetter(key);

    // if player's chosen letter is not in the phrase...
    if (letterFound === null) {

      // remove one live heart (by replacing it with a lost heart)
      $tries.eq(missed).attr('src', 'images/lostHeart.png');
      // add to count of player's missed guesses
      missed += 1;
    }

    // Check if player won or lost
    checkWin();
  }
});
