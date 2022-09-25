const currentNumber = document.querySelector('.currentNumber') //the number that we will enter on the screen
const previousNumber = document.querySelector('.previousNumber p') //the number on which the actions will be performed
const mathSign = document.querySelector('.mathSign') //math sign
const numbersButtons = document.querySelectorAll('.number') //numbers
const operatorsButtons = document.querySelectorAll('.operator') //operators 
const equalsButton = document.querySelector('.equals') //symbols
const clearButton = document.querySelector('.clear') //clear button
const calculatorHistory = document.querySelector('.history') //history
const historyBtn = document.querySelector('.history-btn') //delete history button

let result = '' 

//number display function + conditional statements 
function displayNumbers() {
	if (this.textContent === '.' && currentNumber.innerHTML.includes('.')) return
	if (this.textContent === '.' && currentNumber.innerHTML === '') return (currentNumber.innerHTML = '0.')

	currentNumber.innerHTML += this.textContent
}

//the function deals with the fact that when we click on an operator, he will not show up, except - then we make a negative number
function operate() {
	if (currentNumber.innerHTML === '' && this.textContent === '-') {
		currentNumber.innerHTML = '-'
		return
	} else if (currentNumber.innerHTML === '') {
		return
	}
// if the sign is different from zero, it will equal the number we click
	if (mathSign.innerHTML !== '') {
		showResult()
	}
	previousNumber.innerHTML = currentNumber.innerHTML
	mathSign.innerHTML = this.textContent
	currentNumber.innerHTML = ''
}

// function that shows the results
function showResult() {
   
// condition that 24(one operand) = cannot be given, because we need two numbers to work
	if (previousNumber.innerHTML === '' || currentNumber.innerHTML === '') return
    
// rewriting long variable names to shorter ones, i.e. a = currentNumber a b = previousNumber
	let a = Number(currentNumber.innerHTML)
	let b = Number(previousNumber.innerHTML)
	let operator = mathSign.innerHTML
//check operator and perform operation 
	switch (operator) {
		case '+':
			result = a + b
			break
		case '-':
			result = b - a
			break
		case '×':
			result = a * b
			break
		case '÷':
			result = b / a
			break
		case 'xʸ':
			result = b ** a
			break
	}

	addToHistory() //calling the add to history function
	historyBtn.classList.add('active')
	currentNumber.innerHTML = result
	previousNumber.innerHTML = ''
	mathSign.innerHTML = ''
}

// function add to history
function addToHistory() {
	const newHistoryItem = document.createElement('li')
	newHistoryItem.innerHTML = `${previousNumber.innerHTML} ${mathSign.innerHTML} ${currentNumber.innerHTML} = ${result}`
	newHistoryItem.classList.add('history-item')
	calculatorHistory.appendChild(newHistoryItem)
}

// function clears history
function clearHistory() {
	calculatorHistory.textContent = ''
	if (calculatorHistory.textContent === '') {
		historyBtn.classList.remove('active')
	}
}

// function clears the field in which we perform operations
function clearScreen() {
	result = ''
	currentNumber.innerHTML = ''
	previousNumber.innerHTML = ''
	mathSign.innerHTML = ''
}

// listening for buttons
operatorsButtons.forEach(button => button.addEventListener('click', operate)) 
equalsButton.addEventListener('click', showResult) 
clearButton.addEventListener('click', clearScreen) 
numbersButtons.forEach(button => {
	button.addEventListener('click', displayNumbers) 
})
historyBtn.addEventListener('click', clearHistory) 