const $startScreen = $('#overlay'); // start-screen overlay
const $startBtn = $('.btn__reset'); // start button
const $keyboard = $('#qwerty'); // on-screen keybaord
const $phrase = $('#phrase'); // on-screen game phrase
const $tries = $('.tries img'); //hearts

let missed = 0; // for tracking player's missed guesses


const phrases = [
  'Handshaking error',
  'Internal server error',
  'Gateway timeout',
  'Service unavailable',
  'File not found'
];

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

// variable to be returned
// let response = null;

// Check letter player clicked
function checkLetter(key){
  // variable to be returned
  let response = null;

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
  });


  // const $letters = document.querySelectorAll('.letter');
  // $letters.forEach( function (letter){
  //   // const $letter = $(this).text().toLowerCase();
  //   // If letter matches clicked button
  //   if (letter.textContent.toLowerCase() === key.textContent) {
  //     // add "show" class to list item
  //     $(letter).addClass('show');
  //
  //     response = letter.textContent.toLowerCase();
  //     // console.log(response);
  //     return response;
  //   // } else {
  //   //   // const response =  null;
  //   //   // console.log(response);
  //   //   response = null;
  //   //   return response;
  //   // }
  // });

  // const response =
  //   function () {
  //     if ($letters.text().toLowerCase().contains(key.textContent)) {
  //       const response = $letters.text().toLowerCase();
  //       console.log(response);
  //       return response;
  //     } else {
  //       const response = null;
  //       console.log(response);
  //       return response;
  //     }
  //   };

  // for (i = 0; i < $letters.length; i += 1) {
  //   const $letter = $letters[i];
  //
  //   // If letter matches clicked button
  //   if ($letter.textContent.toLowerCase() === key.textContent) {
  //     // add "show" class to list item
  //     $($letter).addClass('show');
  //
  //     response = $letter.textContent.toLowerCase();;
  //     console.log(response);
  //   } else if ($letter.textContent.toLowerCase() !== key.textContent) {
  //     response = null;
  //     console.log(response);
  //   }
  // }

  // return value of chosen letter
  return response;
}

function checkWin() {
  
}

//     Create a checkWin function.
// Each time the player guesses a letter, this function will check whether the game has been won or lost. At the very end of the keyboard event listener, you’ll run this function to check if the number of letters with class “show” is equal to the number of letters with class “letters”. If they’re equal, show the overlay screen with the “win” class and appropriate text. Otherwise, if the number of misses is equal to or greater than 5, show the overlay screen with the “lose” class and appropriate text.


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
    console.log(letterFound);


    if (letterFound === null) {

      $tries.eq(missed).attr('src', 'images/lostHeart.png');
      missed += 1;
    }

    // Check if player won or lost
    checkWin();

  }
});
