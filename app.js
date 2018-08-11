const $startScreen = $('#overlay'); // start-screen overlay
const $startBtn = $('.btn__reset'); // start button
const $keyboard = $('#qwerty'); // on-screen keybaord
const $phrase = $('#phrase'); // on-screen game phrase
let missed = 0; // for tracking player's missed guesses

const phrases = [
  'Handshaking error',
  'Internal server error',
  'Gateway timeout',
  'Service unavailable',
  'File not found'
];

// Create a missed variable, initialized to 0, that you’ll use later to keep track of the number of guesses the player has missed (remember, if the player guesses wrong 5 times, they lose the game)



// When user clicks start button...
$startBtn.on('click', () => {
  // Hide start screen overlay
  $startScreen.hide();
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
  // console.log(splitPhrase);
};

// Save random-phrase array to variable
const phraseArray = getRandomPhraseAsArray(phrases);

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


// Call display function and pass in random-phrase array
addPhraseToDisplay(phraseArray);


// Add an event listener to the keyboard.
$keyboard.on('click', (e) => {
  const key = e.target;
  if (key.tagName === 'BUTTON') {
    console.log(key.textContent);
  }
});
// Use event delegation to listen only to button events from the keyboard. When a player chooses a letter, add the “chosen” class to that button so the same letter can’t be chosen twice. Note that button elements have an attribute you can set called “disabled” that when set to true will not respond to user clicks. See the MDN documentation for more details.
// Pass the button to the checkLetter function, and store the letter returned inside of a variable called letterFound. At this point, you can open the index.html file, click any of the letters on the keyboard, and start to see the letters appear in the phrase.



// Create a checkLetter function.
// The checkLetter function will be used inside of the event listener you’ll write in the next step.
// This function should have one parameter: the button the player has clicked when guessing a letter.
// The checkLetter function should get all of the
// elements with a class of “letter” (remember that we added the letter class to all of the letters and none of the spaces when we made the game display). The function should loop over the letters and check if they match the letter in the button the player has chosen.
// If there’s a match, the function should add the “show” class to the list item containing that letter, store the matching letter inside of a variable, and return that letter.
// If a match wasn’t found, the function should return null.

function checkLetter(key){
  const $letter = $('#phrase .letter');

}
