const result = document.querySelector('.result')
const lettersBoxes = document.querySelector('.lettersBoxes')
const guessesLeft = document.querySelector('.guessesLeft')
const input = document.querySelector('input')
const button = document.querySelector('button')
const unmatched = document.querySelector('.unmatched')
const reset = document.querySelector('#reset')
const choice = document.querySelectorAll('#choice div')
const choiceMenu = document.querySelector('#choice')

const categories = [
  ['apple','orange','pineapple','mango'],
  ['cat','elephant','crocodile','goldfish'],
  ['black','aquamarine','violet','coral','pink']
]

function start(){

	let counter = 0
  let left = 5
  let matched = false
  let chosen = 0
  let letters = ''
  let span;
  
  function chooseWords(index){	
  	chosen = categories[index]

  	//generates random words
  	let random = Math.floor(Math.random() * chosen.length)
  	letters = chosen[random]
    choiceMenu.classList.add('close')
    createDiv()
    span = document.querySelectorAll('span')
	}
  
  function createDiv(){

    for(let i=0; i<letters.length; i++){
      const box = document.createElement('div')
      lettersBoxes.appendChild(box)
      box.innerHTML = '<span>'+letters[i]+'</span>'
    }
	}
  
  function displayGuessesLeft(){
  	guessesLeft.innerHTML = left + ' guesses left'
  }
  
  function validation(){
  		if(isNaN(input.value) === false || input.value === ''){
      	input.value = ''
      	alert('please enter alphabet')
      }
      else if( ('/!@#$%^&*()_-+=[]{}|\:;"<\'>?/.,').includes(input.value) ){
      	input.value = ''
      	alert('please enter alphabet')
      }
  }
  
  function displayMatched(){
 
      for(let i=0; i<letters.length; i++){
        if(input.value.toLowerCase() == letters[i]){
          //will not store in unmatched if matched
          matched = true;
           		console.log(span)
          //check if alphabet is repeated
          if(span[i].style.transform != 'scaleY(1)'){
            span[i].style.transform = 'scaleY(1)'
            counter += 1
          }
        }
      }	
   }
   
  function displayUnmatched(){
  		//if unmatched and not included in unmatched container
      if(matched == false && unmatched.innerHTML.includes(input.value) == false){
          unmatched.innerHTML += input.value +' '
          left -= 1
          guessesLeft.innerHTML = left + ' guesses left'
      }
    }
    
  function winLose(){
      if(left == 0){
        result.innerHTML = 'lose'
        result.style.transform = 'scaleY(1)'
        for(let i=0; i<span.length; i++){
          span[i].style.transform = 'scaleY(1)'
        }
        input.disabled = true
        input.style.borderColor = '#dddddd'
        result.style.background = 'gray'
      }
      //win if counter equals word length
      if(counter == letters.length){
        result.innerHTML = 'win'  
        result.style.transform = 'scaleY(1)'
        input.disabled = true
        input.style.borderColor = '#dddddd'
      }
    }
  
  function guess(){
  		validation()
      matched = false;
      //check if matched    
      displayMatched()
      //store unrepeated unmatched letters
      displayUnmatched()
      //lose if unmatched reach 5    
      winLose()
      input.value = ''
  }
  //show guesses left 
  displayGuessesLeft()
  
  for(let i=0; i<3; i++){
  	choice[i].onclick = function(){ 
    chooseWords(i)
    }
  }  
  //enter letter to guess and see if matched
  button.onclick = guess
}

start()

reset.onclick = function(){
	input.disabled = false
	lettersBoxes.innerHTML = ''
  unmatched.innerHTML = ''
  result.innerHTML =''
  input.style.borderColor = 'black'
  result.style.transform = 'scaleY(0)'
  choiceMenu.classList.remove('close')
	start()
}


