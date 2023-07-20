var gamestate = "start";

var questions = {
    [0]: {
        text: "What's the difference between \'==\' and \'===\' operators?",
        correctAnswerIndex: 3,
        answers:{
            [0]:"\'==\' compares both value and type, and \'===\' only compares value.",
            [1]:"\'==\' compares type, and \'===\' checks for value.",
            [2]:"\'==\' compares value, and \'===\' checks if it has the opposite value.",
            [3]:"\'==\' compares value, and \'===\' compares both value and type.",
        }
    },
    [1]: {
        text: "The operator \'++\' incriments a number by -1.",
        correctAnswerIndex: 1,
        answers:{
            [0]:"True",
            [1]:"False",
        }
    },
    [2]: {
        text: "Where should you put the Javascript link in your HTML file?",
        correctAnswerIndex: 1,
        answers:{
            [0]:"In the head element",
            [1]:"After the body",
            [2]:"Whenever it needs to be used",
            [3]:"In the footer element",
        }
    },
    [3]: {
        text: "The structure used to programmatically navigate your web page is called...",
        correctAnswerIndex: 2,
        answers:{
            [0]:"The DUMB",
            [1]:"The SUB",
            [2]:"The DOM",
            [3]:"The SWS",
        }
    },
    [4]: {
        text: "In Javascript, functions can be stored in variables.",
        correctAnswerIndex: 0,
        answers:{
            [0]:"True",
            [1]:"False",
        }
    },
    length: 4
}

var questionIndex = 0;

var scoreHolders = {
    [0]:{
        name:"Azzi",
        score:5,
    },
    holders:1,
}

var timer = 0;
var timerLength = 30;

var holderStart = document.querySelector("#start");
var holderQuiz = document.querySelector("#quiz");
var holderResults = document.querySelector("#enterYourName");
var holderResults = document.querySelector("#results");
var questionHolder = document.querySelector("#quiz div div");
var questionAnswerHolder = document.querySelector("#quiz div ul");

var startButton = document.querySelector("#start_button");
var timerEl = document.querySelector("#timer");
var questionNumber = document.querySelector("#question-number");
var questionText = document.querySelector("#question-text");

var scoreBoard = document.querySelector("#scoreboard");
var scoreName = document.querySelector("#submitName");
var submitScore = document.querySelector("#submitScore");
var displayScore = document.querySelector("#displayScore");

var nextquestion = document.querySelector("#next-question");
var questionAnswered = false;
var answeredCorrectly = false;
var submitted = false;

updateDisplays = function(gameState){
    console.log("current state: "+gameState);
    holderStart.style.display = "none";
    holderQuiz.style.display = "none";
    holderResults.style.display = "none";
    switch (gameState) {
        case "results":
            updateResults();
            holderResults.style.display = "flex";
            break;
        case "quiz":
            updateQuestion();
            holderQuiz.style.display = "flex";
            break;
        case "start":
        default:
            holderStart.style.display = "flex";
            break;
    }
}

updateDisplays(gamestate);

startGame = function(){
    score = 0;
    questionIndex = 0;
    setTime();
    answeredCorrectly = false;
    questionAnswered = false;
    gamestate = "quiz";
    updateDisplays(gamestate);
};

startButton.addEventListener("click", startGame);

function setTime() {
    // Sets interval in variable
    
    timer = timerLength;
    timerEl.textContent = timer+" second(s) left";
    var timerInterval = setInterval(function() {
      timer--;
      timerEl.textContent = timer+" second(s) left";
      if(timer === 0) {
        clearInterval(timerInterval);
        updateDisplays("results");
      }
  
    }, 1000);
  }

  function updateQuestion(){
    var question = questions[questionIndex];
    questionText.textContent = question.text
    questionNumber.textContent = "Question "+(questionIndex+1);
    disableButton(nextquestion, "true");
    var answers = document.querySelectorAll(".question-answer")
    iterateAnswers(function(element, index){
        if(question.answers[index]!= null){
            
            disableButton(element, "false");
            element.style.display = "flex";
            element.textContent = question.answers[index];
        }
        else{
            disableButton(nextquestion, "true");
            element.style.display = "none";
        }
    })
  }

  var iterateAnswers = function(func){
    var answers = document.querySelectorAll(".question-answer")
    for (let index = 0; index < answers.length; index++) {
        const element = answers[index];
        func(element, index);
    }
}

var disableButton = function(element, state){
    element.setAttribute("disable", state);
    if(state === "true"){
        element.style.backgroundColor = "lightGray";
    }
    else{
        element.style.backgroundColor = "cadetBlue";
    }

}

  var answerQuestion = function(){
    var element = event.target;
    answeredCorrectly = false;
    if(element.matches("button")){
        if((element.getAttribute("data-number") * 1) === questions[questionIndex].correctAnswerIndex){
            answeredCorrectly = true;
            element.style.backgroundColor = "green";
        }
        else{
            element.style.backgroundColor = "red";
        }
    }
    if(answeredCorrectly){
        score++;
    }
    questionAnswered = true;
    iterateAnswers(function(element, index){
        disableButton(element, "true");
        if((element.getAttribute("data-number") * 1) === questions[questionIndex].correctAnswerIndex){
            element.style.backgroundColor = "green";
        }
        else if(element === event.target && (element.getAttribute("data-number") * 1) != questions[questionIndex].correctAnswerIndex){
            element.style.backgroundColor = "red";
        }
        else
        {
            element.style.backgroundColor = "lightGray";
        }
    });
    nextquestion.setAttribute("disable", "false");
  }

  questionAnswerHolder.addEventListener("click", answerQuestion);
  nextquestion.addEventListener("click", function(){
    if(event.target.getAttribute("disable") === "false"){
        var nextState = "quiz";
        if(questionIndex >= questions.length){
            timer = -1;
            nextState = "results";
        }
        else{
            questionIndex++;
        }
        updateDisplays(nextState);
    }
  });

  submitScore.addEventListener("click", function(){
    var n = scoreName.value;
    AddScoreHolder(n, score);
    submitted = true;
    updateResults();
  });

  var updateResults = function(){
    displayScore.textContent = score + " / " + (questions.length+1)
    scoreHolders = GetScoreHolders();
    if(submitted === true){
        submitScore.style.display = "none";
    }
    for (let index = 0; index < scoreBoard.childNodes.length; index++) {
        const element = scoreBoard.childNodes[index];
        console.log(element);
        element.innerHTML = "";
    }
    for (let index = 0; index < scoreHolders.holders+1; index++) {
        const element = scoreHolders[index];
        if(element != null){
            console.log(element);
            var newElement = document.createElement("span");
            newElement.appendChild(document.createTextNode("\n"+element.name+"\'s Score: "+element.score + " / " + (questions.length+1)));
            scoreBoard.appendChild(newElement);
        }
    }
  }

  var GetScoreHolders = function(){
    var result = localStorage.getItem("results");
    if(result === null){
        result = JSON.stringify(scoreHolders);
        localStorage.setItem("results", result);
    }
    return JSON.parse(result);
  }

  var AddScoreHolder = function(_name, _score){
    scoreHolders[scoreHolders.holders] = {
        name:_name,
        score:_score
    }
    scoreHolders.holders++;
    SaveScoreHolders();
  }

  var SaveScoreHolders = function(){
    var strang = JSON.stringify(scoreHolders);
    localStorage.setItem("results", strang);
  }