// TODO : check values of score and maxScore in terminal
// run some test cases to vadilate correct calculation and data type of 
// sum, maxSum


// initialize variables
let questionID, question, choiceA, choiceB, choiceC, choiceD, questions,
	numQuestions, qInfo, current = 0;
let userChoice, score = 0, points = [], quesPoints, maxScore = 0, isSubmitted = false,
	submittedAnswer, count = 0, gameEnded = false;

// store questions in an array named questions

// store user score for each question in an array named points


// store a default set of 5 questions in an array named defaultQuestions
let defaultQuestions = [
{
	question: "Where are the three smallest bones in the human body?",
	choiceA: "middle ear",
	choiceB: "nose",
	choiceC: "toes",
	choiceD: "eyes",
	correct: "A",
	submitted: false,
	userSubmission: "",
	point: 1
},
{
	question: "What is the most abundant element in the Universe?",
	choiceA: "Helium",
	choiceB: "Oxygen",
	choiceC: "Lithium",
	choiceD: "Hydrogen",
	correct: "D",
	submitted: false,
	userSubmission: "",
	point: 1
},
{
	question: "Approximately how long does it take for light to travel from the Sun's surface to the Earth?",
	choiceA: "8 days",
	choiceB: "8 seconds",
	choiceC: "8 minutes",
	choiceD: "8 hours",
	correct: "C",
	submitted: false,
	userSubmission: "",
	point: 1
},
{
	question: "What is 10/2?",
	choiceA: "5",
	choiceB: "2",
	choiceC: "8",
	choiceD: "9",
	correct: "A",
	submitted: false,
	userSubmission: "",
	point: 1
},
{
	question: "Which planet has the most moons?",
	choiceA: "Saturn",
	choiceB: "Mars",
	choiceC: "Jupiter",
	choiceD: "Uranus",
	correct: "C",
	submitted: false,
	userSubmission: "",
	point: 1
}];


// question navigation elements
let elNavPlate = document.getElementById("quesNavPlate");
let navList = document.createElement("LI");

// reference html elements
let elQuiz = document.getElementById("container");
let elQuizStatus = document.getElementById("quizStatus");
let elQuesPoint = document.getElementById("integratePointsToIndex");

let elQuestion = document.getElementById("question");
let elChoiceA = document.getElementById("choiceA");
let elChoiceB = document.getElementById("choiceB");
let elChoiceC = document.getElementById("choiceC");
let elChoiceD = document.getElementById("choiceD");
let elChoices = document.getElementsByName('choices');
let prevButton = document.getElementById("previous");
let nextButton = document.getElementById("next");
let prevText = document.getElementById("buttonPrevious");
let nextText = document.getElementById("buttonNext");
let submitButton = document.getElementById("submit");
let submitText = document.getElementById("submitText");

// end test element
elEndTest = document.getElementById("endTest");

// to remove end test button
removeEndButton = document.getElementById("head");
// alert element
let alertMessage = document.getElementById("alertMessage");
let alertElement;



elEndTest.addEventListener("click", function() {
	endGame();
})


// start quiz
populateQuestions();
renderQuestionNavPlate();
renderQuestion();
submitButton.onclick = gradeQuestion;
prevButton.onclick = gotoPreQuestion;
nextButton.onclick = gotoNextQuestion;


function renderQuestionNavPlate() {
	for(let i = 0; i < numQuestions; i++) {
		let navElement = document.createElement("DIV");
		navElement.innerHTML = String(i+1);
		navElement.className = "navElement";
		navList.appendChild(navElement);
		

		// add event listener
		navList.childNodes[i].addEventListener("click", function() {
			if(current === i) {
				return;
			}
			if(gameEnded) {
				return;
			}
			navList.childNodes[current].style.boxShadow = "";
			current = i;
			console.log("navPlate element no " + current);
			renderQuestion();
		});
		//let endTest = document.createElement("BUTTON");

	}
	elNavPlate.appendChild(navList);
}

function populateQuestions() {
	// populate with default questions
	questions = defaultQuestions;

	// if local storage contains questions, add to question set
	if(localStorage.getItem("questions")) {
		let storedQuestions = JSON.parse(localStorage.getItem("questions"));
		for(let i = 0; i < storedQuestions.length; i++) {
			questions.push(storedQuestions[i]);
		}
	}
	numQuestions = questions.length;
	for(let i = 0; i < numQuestions; i++) {
		points[i] = -1;
		let currPoint = Number(questions[i].point);
		maxScore = maxScore + currPoint;
	}
}

function populateQuestionInfo() {
	// populate current question info from question list
	question = questions[current].question;
	qInfo = questions[current];
	choiceA = qInfo.choiceA;
	choiceB = qInfo.choiceB;
	choiceC = qInfo.choiceC;
	choiceD = qInfo.choiceD;
	correct = qInfo.correct;
	isSubmitted = qInfo.submitted;
	submittedAnswer = qInfo.userSubmission;
	quesPoints = Number(qInfo.point);
	// console.log(maxScore + typeof(quesPoints) + qInfo.point + typeof(qInfo.point));
}

function renderQuestion() {
	// display question on webpage
	// clear content of alert message if it exists for prev ques
	// alertMessage.className ="";
	alertMessage.innerHTML = "";
	navList.childNodes[current].style.boxShadow = "0 2px 2px 0 var(--blue), 0 2px 8px 0 var(--blue)";
	console.log("rendering question no " + current);
	questionID = current + 1;
	elQuizStatus.innerHTML = "Question " + (questionID) + " of " + (numQuestions);
	populateQuestionInfo();
	elQuestion.innerHTML = question;
	elChoiceA.innerHTML = choiceA;
	elChoiceA.className = "choiceClass";
	elChoiceB.innerHTML = choiceB;
	elChoiceB.className = "choiceClass";
	elChoiceC.innerHTML = choiceC;
	elChoiceC.className = "choiceClass";
	elChoiceD.innerHTML = choiceD;
	elChoiceD.className = "choiceClass";
	elQuesPoint.innerHTML = "points: " + (quesPoints);
	if(isSubmitted) {
		submitText.innerHTML = "Submitted!";
		submitButton.disabled = true;
		submitButton.style.background = "grey";

	} else {
		submitText.innerHTML = "Submit";
		submitButton.disabled = false;
		submitButton.style.background = "var(--blue)";
	}
	//isSubmitted.style.padding = "10px 10px";
	setChecked();
	setNavigationButtons();
	// if(prevButton.disabled === false) {
	// 	prevText.innerHTML= "Previous";
	// } else {
	// 	prevText.innerHTML= "        ";
	// }
	// if(nextButton.disabled === false) {
	// 	nextText.innerHTML = "Next";
	// } else {
	// 	nextText.innerHTML = "    ";
	// }
}

function setChecked() {
	let length = elChoices.length;
	if(isSubmitted) {
		for(let i = 0; i < length; i++) {
			if(elChoices[i].value === submittedAnswer) {
				elChoices[i].checked = true;
				console.log(questionID + " " + elChoices[i].value + " " + typeof(elChoices[i].value));
			}
		}
	}
	else {
		for(let i = 0; i < length; i++) {
			if(elChoices[i].checked) {
				elChoices[i].checked = false;
			}
		}
	}
}

function setNavigationButtons() {
	if(current === 0) {
		if(prevButton.disabled === false) {
			prevButton.disabled = true;
		}
		prevButton.style.background = "var(--lgrey2)";
		prevText.innerHTML= "        ";
		nextText.innerHTML = "Next";

		// if jumping direct from last ques to 1st ques
		if(nextButton.disabled === true) {
			nextButton.disabled = false;
			nextButton.style.background = "transparent";
		}
		return;
	} 
	else if (current === questions.length-1){
		if(nextButton.disabled === false) {
			nextButton.disabled = true;
		}
		nextButton.style.background = "var(--lgrey2)";
		nextText.innerHTML = "    ";
		prevText.innerHTML= "Previous";

		// if jumping direct from first ques to last ques
		if(prevButton.disabled === true) {
			prevButton.disabled = false;
			prevButton.style.background = "transparent";
		}
		return;
	} 
	else { 
		if(prevButton.disabled === true) {
			prevButton.disabled = false;
			prevButton.style.background = "transparent";
		}
		prevText.innerHTML= "Previous";
		if(nextButton.disabled === true) {
			nextButton.disabled = false;
			nextButton.style.background = "transparent";
		}
		nextText.innerHTML= "Next";
	}
	return;
}

// on submission
function gradeQuestion() {
	// clear alert message if exists
	alertMessage.innerHTML = "";
	if(getUserChoice()) {
		count++;
		questions[current].submitted = true;
		if(userChoice == questions[current].correct) {
			score = score + Number(questions[current].point);
			points[current] = questions[current].point;
		}
		else {
			points[current] = 0;
		}
		// mark in navList
		navList.childNodes[current].style.background = "grey";
		navList.childNodes[current].style.color = "var(--white)";
		// // changing style of navList
		// navList.childNodes[current].style.boxShadow = "";


		// end game automatically if all questions are attempted
		// if(count === numQuestions) {
		// 	endGame();
		// }
		// else {
			renderQuestion();
		// }
		
		// when submitted current question
		// move to next ques
		// else {
		// 	// next question
		// 	navList.childNodes[current].style.boxShadow = "";
		// 	if(current < numQuestions-1) {
		// 		current++;
		// 	}
		// 	renderQuestion();
		// }
	}
	return;
}

function getUserChoice() {
	for(let i = 0, length = elChoices.length; i < length; i++) {
		if(elChoices[i].checked) {
			userChoice = elChoices[i].value;
			questions[current].userSubmission = elChoices[i].value;
			// clear radio input for next question
			elChoices[i].checked = false;
			return true;
		}
	}
	// user did'nt select an answer
	// alert("please select an answer to submit!")
	alertElement = document.createElement("DIV");
	alertElement.innerHTML = "please select an answer!"
	alertElement.className = "alertOnSubmit";
	alertMessage.appendChild(alertElement);
	return false;
}


function endGame() {
	gameEnded = true;
	// changing style of navList
	navList.childNodes[current].style.boxShadow = "";


	elQuiz.innerHTML = "<h2>Your Score: " + score + " out of " + maxScore + "</h2>";
	for(let i = 0; i < points.length; i++) {
		let summary = document.createElement("p");

		if(points[i] === -1) {
				summary.innerHTML = "Question #" + (i+1) + " : NOT ATTEMPTED!" + "	( " + (0) + " / " + (questions[i].point) + " )";
				//summary.style.color = "var(grey)";
				summary.className = "alert-primary";
				navList.childNodes[i].style.background = "grey";
				navList.childNodes[i].style.color = "var(--white)";
		}
		else if(points[i] === 0) {
				summary.innerHTML = "Question #" + (i+1) + " : ANSWERED INCORRECTLY" + "	( " + (points[i]) + " / " + (questions[i].point) + " )";
				// summary.style.color = "var(--red)";
				summary.className = "alert-danger";
				navList.childNodes[i].style.background = "var(--red)";
				navList.childNodes[i].style.color = "var(--white)";
				navList.childNodes[i].style.border = "2px solid var(--red)";
		}
		else {
			summary.innerHTML = "Question #" + (i+1) + " : ANSWERED CORRECTLY" + "	( " + (points[i]) + " / " + (questions[i].point) + " )";
			//summary.style.color = "var(--green)";
			summary.className = "alert-success";
			navList.childNodes[i].style.background = "var(--green)";
			navList.childNodes[i].style.color = "var(--white)";
			navList.childNodes[i].style.border = "2px solid var(--green)";
		}
		elQuiz.appendChild(summary);
	}
	removeEndButton.removeChild(elEndTest);
	removeEndButton.style.margin = "0px";
	document.getElementById("options").style.display = "block";
}

function gotoPreQuestion() {
	// changing style of navList
	navList.childNodes[current].style.boxShadow = "";
	current--;
	renderQuestion();
}

function gotoNextQuestion() {
	// changing style of navList
	navList.childNodes[current].style.boxShadow = "";
	current++;
	renderQuestion();
}

// store user-submitted questions in local storage, in an item named Questions