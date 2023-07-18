var gamestate = "start";

var questions = {
    [0]: {
        text: "What's the difference between \'==\' and \'===\' operators?",
        correctAnswerIndex: 4,
        answers:{
            [1]:"\'==\' compares both value and type, and \'===\' only compares value.",
            [2]:"\'==\' compares type, and \'===\' checks for value.",
            [3]:"\'==\' compares value, and \'===\' checks if it has the opposite value.",
            [4]:"\'==\' compares value, and \'===\' compares both value and type.",
        }
    },
    [1]: {
        text: "The operator \'++\' incriments a number by -1.",
        correctAnswerIndex: 2,
        answers:{
            [1]:"True",
            [2]:"False",
        }
    },
    [2]: {
        text: "",
        correctAnswerIndex: 0,
        answers:{
            [1]:"",
            [2]:"",
            [3]:"",
            [4]:"",
        }
    },
    [3]: {
        text: "",
        correctAnswerIndex: 0,
        answers:{
            [1]:"",
            [2]:"",
            [3]:"",
            [4]:"",
        }
    },
    [4]: {
        text: "",
        correctAnswerIndex: 0,
        answers:{
            [1]:"",
            [2]:"",
            [3]:"",
            [4]:"",
        }
    },
}

var questionIndex = 0;

var scoreHolders = {
    [0]:{
        name:"Azzi",
        score:5,
    }
}

var timer = 0;
var timerLength = 120;

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

updateDisplays = function(gameState){
    holderStart.style.display = "none";
    holderQuiz.style.display = "none";
    holderResults.style.display = "none";
    switch (gameState) {
        case "results":
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
        sendMessage();
      }
  
    }, 1000);
  }

  function updateQuestion(){
    questionText.textContent = questions[questionIndex].text
    var answers = document.querySelectorAll("question-answer")
    for (let index = 0; index < answers.length; index++) {
        const element = answers[index];
        element.textContent = questions[questionIndex].answers[element.dataset.number];
    }
  }

  var answerQuestion = function(){
    var element = event.target;
    if(element.matches("button")){
        if((element.getAttribute("data-number") * 1) === questions[questionIndex].correctAnswerIndex){
            score++;
            element.style.backgroundColor = "green";
        }
        else{
            element.style.backgroundColor = "red";
        }
    }
    questionIndex++;
    updateDisplays("quiz");
  }

  questionAnswerHolder.addEventListener("click", answerQuestion)