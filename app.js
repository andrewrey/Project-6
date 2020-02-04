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

function getRandomPhraseAsArray (arr){
  let arrayLength = arr.length;
  function randomNum (topNum=arrayLength){
    return Math.floor(Math.random() * topNum);
  };
  let chosenSentence = phrases[randomNum()];
  let arrayOfCharacters = chosenSentence.split('');
  return arrayOfCharacters;  
};

function addPhraseToDisplay (arrOfCharacters){
  for(let i = 0; i < arrOfCharacters.length; i ++){
    let char = arrOfCharacters[i];
    let li = document.createElement('li');
    li.textContent = char;
    if(char !== " "){
      li.className = 'letter';
    }
    phraseUl.appendChild(li);
  }


};

//  Event Handelers: 

overlay.addEventListener('click', (e)=>{
  let startLink = e.target;
  if(startLink.className === 'btn__reset')
  overlay.style.display = 'none'
  addPhraseToDisplay(getRandomPhraseAsArray(phrases));
});



// running the functions: 

