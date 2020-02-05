// Variables for guessing app


let missed = 0;

const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const overlay = document.querySelector('#overlay');
const gameStartButton = document.querySelector('.btn__reset');
const phraseUl = phrase.querySelector('ul');


// Array of phrases for players to guess from
let phrases = ["coding is great", "you can do it", "treehouse is wonderful", "front end rocks", "build a solid base"];

// Functions: 

function backgroundColorWarningPerMiss(){
  let body = document.querySelector('body');
  let misses = {
    1:()=>{
      body.style.backgroundColor = '#FB7878'
    },
    2:()=>{
      body.style.backgroundColor = '#DC6969'
    },
    3:()=>{
      body.style.backgroundColor = '#BC5A5A'
    },
    4:()=>{
      body.style.backgroundColor = '#9D4B4B'
    },
  }
  if(missed < 5){
    misses[missed]();
  }
}

function checkWin () {
  let liLetters = document.querySelectorAll('#phrase li.letter');
  let liShow = document.querySelectorAll('#phrase li.show');
  if(liLetters.length === liShow.length){
    let overlayH2 = overlay.querySelector('.title');
    let overlayA = overlay.querySelector('a');
    overlayH2.textContent = "You Win: Congratulations"
    overlayA.textContent = "play again"
    overlay.style.display = '';

  }else if (missed === 5) {
    let overlayH2 = overlay.querySelector('.title');
    let overlayA = overlay.querySelector('a');
    overlayH2.textContent = "Sorry You Lose!!!"
    overlayA.textContent = "play again"
    overlay.style.display = '';
  }
}

function getRandomPhraseAsArray (arr){
  let arrayLength = arr.length;
  function randomNum (topNum=arrayLength){
    return Math.floor(Math.random() * topNum);
  };
  let chosenSentence = arr[randomNum()];
  let arrayOfCharacters = chosenSentence.split('');
  return arrayOfCharacters;  
}

function addPhraseToDisplay (arrOfCharacters){
  for(let i = 0; i < arrOfCharacters.length; i ++){
    let char = arrOfCharacters[i];
    let li = document.createElement('li');
    li.textContent = char;
    if(char !== " "){
      li.className = 'letter';
    } else {
      li.className = 'space';
    }
    phraseUl.appendChild(li);
  }
}


function checkLetter (buttonPressed) {
  let letters = phraseUl.querySelectorAll('.letter');
  let buttonText = buttonPressed.textContent
  let match = null;
  for(let i = 0; i < letters.length; i++){
    if(letters[i].textContent === buttonText) {
      letters[i].className = "show letter";
      match = letters[i].textContent;
    }
  }
  return match;

}

//  Event Handelers: 

overlay.addEventListener('click', (e)=>{
  let startLink = e.target;
  if(startLink.className === 'btn__reset')
  overlay.style.display = 'none'
  addPhraseToDisplay(getRandomPhraseAsArray(phrases));
});

qwerty.addEventListener('click', (e)=>{
 let button = e.target;
 if(button.tagName === "BUTTON"){
  button.className = "chosen";
  button.setAttribute('disabled','true');
  let letterFound = checkLetter(button);
  if(letterFound === null){
    let scoreBoardOl = document.querySelector('#scoreboard ol');
    let lastChildLi = scoreBoardOl.lastElementChild;
    let list = scoreBoardOl.querySelectorAll('li');
    scoreBoardOl.removeChild(lastChildLi);
    missed += 1;
    backgroundColorWarningPerMiss();
  }
  checkWin();
 }
});

// running the functions: 

