let questionForm = document.getElementById("add-question");
questionForm.onsubmit = processForm;

function processForm() {
	let newQuestion = {
		question: questionForm.question.value,
		choiceA: questionForm.choiceA.value,
		choiceB: questionForm.choiceB.value,
		choiceC: questionForm.choiceC.value,
		choiceD: questionForm.choiceD.value,
		correct: questionForm.correct.value,
		submitted: false,
		userSubmission: "",
		point: parseInt(questionForm.point.value)
	};

	// if local storage contains questions, pull and update
	// stored data. Store new object otherwise
	if(localStorage.getItem("questions")) {
		let questions = JSON.parse(localStorage.getItem("questions"));
		questions.push(newQuestion);
		localStorage.setItem("questions", JSON.stringify(questions));
	}
	else {
		let questions = [newQuestion];
		localStorage.setItem("questions", JSON.stringify(questions));
	}
	questionForm.reset();
	return false;
}