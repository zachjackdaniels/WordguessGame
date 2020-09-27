var asSongs = [
  "rocklobster",
  "peoplearepeople",
  "onceinalifetime",
  "sweetdreams",
  "missionaryman",
  "safetydance",
  "onlyalad",
  "whipit",
  "99redballoons",
];
var usableChars = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
];
//array of contestant objects which holds each contestant and the games that they have played
var aoContestants = [];

//create a global variable for the chosen song
var songChoice = '';
var songHidden = '';
var inputL = '';

class Person {
  age = 0;

  constructor(fName, lName) {
    this.firstName = fName;
    this.lastName = lName;
  }
}

class Contestant extends Person {
  constructor(fName, lName) {
    super(fName, lName);
    this.numberOfGamesPlayed = 0;
    this.totalNumberOfGuesses = 0;
    this.aoGamesPlayed = [];
  }
  showResults() {
    // saves sum of all finished game guesses with lamda function for each finished game
    let finishedGameGuesses = reduce(
      this.aoGamesPlayed.GamesPlayed.Where(
        (finishedGame) => finishedGame == true
      )
    );

    if (this.numberOfGamesPlayed > 0) {
      return (
        "<b>" +
        getFullName() +
        " has made " +
        finishedGameGuesses +
        "guesses</b>"
      );
    } else {
      return "<b>" + getFullName() + "has not finished a game</b>";
    }
  }
  getFullName() {
    return this.firstName + " " + this.lastName;
  }
}

function showGameResults() {
  var showGameRes = aoContestants[aoContestants.length - 1].showResults();
  document.getElementById("showGameResults").innerHTML = showGameRes;
  document.getElementById("showGameResultsDiv").hidden = false;
}

//class to keep track of numbers for each game played by user
class GamesPlayed {
  constructor() {
    this.guessCount = 0;
    this.finishedGame = false;
  }
}
// ======================
// RESET BUTTON FUNCTION
// function to reset the html
// ======================
function ResetMe() {
  localStorage.clear();
  aoContestants = [];

  document.getElementById("availableChars").innerHTML =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  document.getElementById("availableChars").style.fontWeight = 'bold';
  document.getElementById("usedChars").innerHTML = "";
  document.getElementById("usedChars").style.fontWeight = 'bold';

  //change visibility of elements
  document.getElementById("btnPlayGame").hidden = false;
  document.getElementById("displayTitleName").hidden = true;
  document.getElementById("titleNote").hidden = true;
  document.getElementById("fsAvailable").hidden = true;
  document.getElementById("fsUsed").hidden = true;
  document.getElementById("fsPlay").hidden = true;
  document.getElementById("btnPlayAgainDiff").hidden = true;
  document.getElementById("btnPlayAgainSame").hidden = true;

  songChoice = '';
  songHidden = '';
  inputL = '';

  document.getElementById("inputLetter").value = null;
  document.getElementById("inputLetter").focus();
}
// ======================
// PLAY GAMES FUNCTION
// ======================
function PlayGame(state) {
  //Click on the Play Again with SAME user button: NO prompt or create a new user.
  if (state != null) {
    //clean up last game
    document.getElementById("btnPlayAgainDiff").hidden = true;
    document.getElementById("btnPlayAgainSame").hidden = true;
    songHidden = '';
  }

  // if playing with different user player MUST enter name
  if (state != 'same') {
    let fName = prompt("Enter your first name");
    let lName = prompt("Enter your last name");
    if (fName == "" || lName == "") {
      return Error;
    } else {
      aoContestants.push(new Contestant(fName, lName));
    }
  }

  //generate random number to choose song
  songChoice = asSongs[Math.floor(Math.random() * 9)].toUpperCase();

  //var songHidden = "";

  //for loop to make temp variable filled with "_" for hidden song title
  for (let iCountOne = 0; iCountOne < songChoice.length; iCountOne++) {
    songHidden = songHidden + "_";
  }

  document.getElementById("availableChars").innerHTML = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  document.getElementById("availableChars").style.fontWeight = 'bold';
  document.getElementById("usedChars").innerHTML = "";
  document.getElementById("usedChars").style.fontWeight = 'bold';

  //display hidden title name with underscores
  document.getElementById("displayTitleName").innerHTML = songHidden;
  document.getElementById("displayTitleName").style.fontWeight = 'bold';

  //change visibility of elements
  document.getElementById("btnPlayGame").hidden = true;
  document.getElementById("displayTitleName").hidden = false;
  document.getElementById("titleNote").hidden = false;
  document.getElementById("fsAvailable").hidden = false;
  document.getElementById("fsUsed").hidden = false;
  document.getElementById("fsPlay").hidden = false;
  document.getElementById("inputLetter").focus();

  aoContestants[aoContestants.length - 1].aoGamesPlayed.push(new GamesPlayed());
}

// ======================
// BUTTON GUESS FUNCTION
// ======================
function btnGuess() {
  //convert any input into uppercase
  inputL = document.getElementById("inputLetter").value.toUpperCase();

  // INPUT VALIDATION
  // if statement to see if input is correct format
  if (usableChars.includes(inputL) != true) {
    alert(
      "Beep boop: Invalid Input. Pick a letter of the alphabet or a number"
    );
    return;
  }

  // USED CHARS
  // if statement to see if input is equal to any letters/# already chosen
  let tempInnerHTMLLength = document.getElementById("usedChars").innerHTML.length;
  let iUsedAlphabetCount = 0;
  let usedCharBool = false;
  while (usedCharBool == false && iUsedAlphabetCount < tempInnerHTMLLength + 2) {

    if (inputL == document.getElementById("usedChars").innerHTML.charAt(iUsedAlphabetCount)) {
      alert("You must select a letter/number that has not already been chosen");
      usedCharBool = true;
    }
    if (iUsedAlphabetCount == tempInnerHTMLLength + 1) {
      //insertadjecentHtml puts inputL at the end of the innerhtml
      document.getElementById("usedChars").innerHTML = document.getElementById("usedChars").innerHTML + inputL;
      usedCharBool = true;
    }
    iUsedAlphabetCount++;
  }

  // AVAILABLE CHARS
  // if statment to go through all available characters
  for (let iAvailAlphabetCount = 0; iAvailAlphabetCount < document.getElementById("availableChars").innerHTML.length + 1; iAvailAlphabetCount++) {
    if (inputL == document.getElementById("availableChars").innerHTML.charAt(iAvailAlphabetCount)) {
      document.getElementById("availableChars").innerHTML = document.getElementById("availableChars").innerHTML.replace(inputL, '');
    }
  }

  // After they choose a letter/number, set the focus back to the input area by highlighting the character or data inside of
  // that input.
  document.getElementById("inputLetter").select();

  //then check if the user has won the game yet
  checkWin();
}

// ======================
// REPLACE CHAR FUNCTION
// ======================
function setCharAt(str, index, chr) {
  if (index > str.length - 1) return str;
  return str.substring(0, index) + chr + str.substring(index + 1);
}


// ======================  
// CHECK WIN FUNCTION
// function to keep track if user has beat the game
// ======================
function checkWin(state) {
  var game = aoContestants[aoContestants.length - 1].aoGamesPlayed[aoContestants[aoContestants.length - 1].aoGamesPlayed.length - 1];
  var cont = aoContestants[aoContestants.length - 1];

  if (state == 'true') {
    game.finishedGame = true;
    endGame('true');
  }

  // increment round guess count
  game.guessCount++;
  cont.totalNumberOfGuesses++;

  // go through array to see if there are any more "_" left
  let countUnderscore = 0;
  for (let iCountSongLength = 0; iCountSongLength < songChoice.length; iCountSongLength++) {
    if (inputL == songChoice.charAt(iCountSongLength)) {
      songHidden = setCharAt(songHidden, iCountSongLength, inputL);
      document.getElementById("displayTitleName").innerHTML = songHidden;
    }
    if (document.getElementById("displayTitleName").innerHTML.charAt(iCountSongLength) == "_") {
      countUnderscore++;
    }
  }

  if (countUnderscore == 0) {
    game.finishedGame = true;
    endGame('');
    }
}

// ====================
// FINAL GUESS
// ====================
function endGame(state) {
  var game = aoContestants[aoContestants.length - 1].aoGamesPlayed[aoContestants[aoContestants.length - 1].aoGamesPlayed.length - 1];
  var cont = aoContestants[aoContestants.length - 1];
  //if endGame(state) is true then compare input with song title.
  if (state == 'true') {
    if (document.getElementById("finalGuess").innerHTML == songChoice) {
      // If correct add one to the guess counter
      game.guessCount++;;

      // make the counter increase for total number of games, regardless if they are finished or not
      cont.totalNumberOfGuesses++;

      game.finishedGame = true;
    } else {
      // If not the same (case doesn't matter) add 26 to the guess count
      game.guessCount = game.guessCount + 26;
      checkWin();
    }
  }
  // End results for both finalGuess and checkWin  
  if (game.finishedGame == true) {
    if (game.guessCount > 26) {
      alert("You took too many guesses!");
    } else {
      alert(
        "You solved it with " +
        game.guessCount +
        " guesses!"
      );
    }

    /* total number of guesses needs to be updated */
    cont.numberOfGamesPlayed++;


    //Clear out the input and reset the display for the available and used characters.
    document.getElementById("availableChars").innerHTML = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    document.getElementById("availableChars").style.fontWeight = 'bold';
    document.getElementById("usedChars").innerHTML = "";
    document.getElementById("usedChars").style.fontWeight = 'bold';

    //change visibility of elements
    document.getElementById("btnPlayGame").hidden = true;
    document.getElementById("displayTitleName").hidden = true;
    document.getElementById("titleNote").hidden = true;
    document.getElementById("fsAvailable").hidden = true;
    document.getElementById("fsUsed").hidden = true;
    document.getElementById("fsPlay").hidden = true;
    document.getElementById("btnPlayAgainDiff").hidden = false;
    document.getElementById("btnPlayAgainSame").hidden = false;

    var songChoice = '';
    var songHidden = '';
    var inputL = '';

    document.getElementById("inputLetter").value = null;
    document.getElementById("inputLetter").focus();
  }
}

// ======================
// SHOW GAMES FUNCTION
// ======================
function showGames() {
  localStorage.clear();

  //bubble sort for the total number of guesses (finished game or not) made by each Contestant, descending
  for (iOuterCount = 0; iOuterCount < aoContestants.length - 1; iOuterCount++) {
    for (iInnerCount = iOuterCount + 1; iInnerCount < aoContestants.length; iInnerCount++) {
      if (aoContestants[iOuterCount].totalNumberOfGuesses < aoContestants[iInnerCount].totalNumberOfGuesses) {
        aoHold1 = aoContestants[iOuterCount].totalNumberOfGuesses;

        aoContestants[iOuterCount].totalNumberOfGuesses =
          aoContestants[iInnerCount].totalNumberOfGuesses;

        aoContestants[iInnerCount].totalNumberOfGuesses = aoHold1;
      }
    }
  }

  sOutput = '';

  for (let iOutputCount = 0; iOutputCount < aoContestants.length; iOutputCount++) {
    sOutput = sOutput + aoContestants[iOutputCount].getFullName() + "\: " +
      aoContestants[iOutputCount].totalNumberOfGuesses + " guesses" + "<br>";
  }

  // Pulls aoContestants and puts it in the local storage
  localStorage.setItem('outputKey', sOutput);
  window.open("gameOutput.html");
}