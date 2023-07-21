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
            count:4
        }
    },
    [1]: {
        text: "The operator \'++\' incriments a number by -1.",
        correctAnswerIndex: 1,
        answers:{
            [0]:"True",
            [1]:"False",
            count:2
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
            count:4
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
            count:4
        }
    },
    [4]: {
        text: "In Javascript, functions can be stored in variables.",
        correctAnswerIndex: 0,
        answers:{
            [0]:"True",
            [1]:"False",
            count:2
        }
    },
    length: 4
}


var line = $('<span>');
line.addClass('line');

var questionIndex = 0;

var scoreHolders = {
    [0]:{
        name:"Azzi",
        score:5,
    },
    holders:1,
}

var timer = 0;
var score = 0;
var timerLength = 30;
var answerIndex = -1;

var master = $('#master');

var timerEl = null;

var GetCurrentQuestion = function(){
    return questions[questionIndex];
}

var ClearMaster = function(){
    if(master.children() !== null && master.children !== undefined){
        var i = master.children().length;
        master.children().remove();
        console.log("Clearing "+i+" children from #master.")
    }else{
        console.log("#master has no children to remove.")
    }
}

function setTime() {
    // Sets interval in variable
    var timerInterval = setInterval(function() {
      timer--;
      if(timerEl !== null || timerEl !== undefined){
        timerEl.text(timer+' second(s) left')
      }
  
      if(timer === 0) {
        clearInterval(timerInterval);
        gamestate = "results";
        UpdateDisplays();
      }
  
    }, 1000);
  }

var GetScoreHolders = function(){
    var result = localStorage.getItem("results");
    if(result === null){
        result = JSON.stringify(scoreHolders);
        localStorage.setItem("results", result);
    }
    return JSON.parse(result);
  }

  var ResetScoreHolders = function(){
    
    localStorage.removeItem("results");
    scoreHolders = {
        [0]:{
            name:"Azzi",
            score:5,
        },
        holders:1
    };
    SaveScoreHolders();
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

var CreateQuizLayout = function(){
    ClearMaster();
    timer = timerLength;
    setTime();
    master.append(CreateQuizHighScoreHolder());
    master.append(CreateQuizQuestionHolder());
    master.append(CreateQuizTimer());
}

var ToggleVisibility = function(element){
    if(element.css('display') === 'none'){
        element.css('display','flex');
    }
    else{
        element.css('display','none');
    }
}

var CreateQuizHighScoreHolder = function(){
    var result = $('<section>[name="highScores"]');
    var txt = $('<span>[name="toggleHighScoreList"]');
    txt.addClass('highlightTextOnHover textPurple');
    txt.text('View high scores');
    var ol = $('<ol>[name="quizHighScoreList"]');
    ol.css('display', 'none');
    var scores = GetScoreHolders();
    for (let index = 0; index < scores.length; index++) {
        const element = scores[index];
        var li = $('<li>[name="scoreHolder]');
        li.addClass('text scoreHolder');
        console.log("penis");
        li.text(element.name +"\'s score: "+element.score);
        ol.append(li);
    }
    
    txt.on('click', function(){
        ToggleVisibility(ol);
    });
    result.append(txt);
    result.append(ol);
    return result;

}

var ToggleButton = function(element){
    if(element.attr('enabled') === 'true'){
        element.removeClass('highlightBGOnHover bgPurple textWhite');
        element.addClass('bgGray');
        element.attr('enabled','false');
    }
    else{
        element.addClass('highlightBGOnHover bgPurple textWhite');
        element.removeClass('bgGray bgCorrect bgWrong');
        element.attr('enabled','true');
    }
}

var NextQuestion = function(event){
    event.preventDefault();
    var element = $(event.target);
    if(element.attr('enabled') === 'true'){
        if(questionIndex < questions.length){
            questionIndex++;
        }
        else{
            gamestate = "results";
        }
        UpdateDisplays();
    }
}

var CreateQuizQuestionHolder = function(){
    var holder = $('<section>[name="quizHolder"]');
    holder.css('display', 'flex');
    holder.css('padding-top','10%');
    holder.css('flex-direction','column');
    holder.css('justify-content', 'center');

    var question = GetCurrentQuestion();

    var questionText = $('<p>[name="quizQuestionText]');
    questionText.addClass('bold large')
    questionText.text(question.text);
    
    var submitButton = $('<button>[name="SubmitButton"]');
    submitButton.addClass('btn highlightBGOnHover bgPurple textWhite m5');
    submitButton.text('Submit');
    submitButton.attr('enabled','true');
    submitButton.on('click', NextQuestion);

    var answerHolder = $('<div>[name=quizAnswerHolder]');
    answerHolder.css('display', 'flex');
    answerHolder.css('flex-direction','column');
    answerHolder.css('flex-wrap','wrap')
    for (let index = 0; index < question.answers.count; index++) {
        const element = question.answers[index];
        var answer = $('<button>[name="quizQuestionAnswer]');
        answer.attr('index',index);
        answer.text(element);
        answer.attr('enabled','true');
        answer.addClass('answer btn highlightBGOnHover bgPurple textWhite m5 p5');
        answerHolder.append(answer);
    }
    answerHolder.on('click','.answer', function(event){
        event.preventDefault();
        if(submitButton.attr('enabled') === 'false' && $(event.target).attr('enabled') === 'true'){
            
            var buttonPushed = $(event.target);
            answerIndex = (buttonPushed.attr('index')*1);
            console.log("button "+buttonPushed.attr('index'));
            for (let index = 0; index < answerHolder.children().length; index++) {
                const element = $(answerHolder.children()[index]);
                ToggleButton(element);
                if((element.attr('index')*1) === GetCurrentQuestion().correctAnswerIndex && element !== buttonPushed){
                    element.removeClass('bgGray');
                    element.addClass('bgCorrect');
                };
            }
            buttonPushed.removeClass('bgGray');
            if((buttonPushed.attr('index')*1) === GetCurrentQuestion().correctAnswerIndex){
                buttonPushed.addClass('bgCorrect');
                score++;
            }
            else{
                buttonPushed.addClass('bgWrong');
            }
            ToggleButton(submitButton);
        }
    })

    ToggleButton(submitButton);
    holder.append(questionText);
    holder.append(line.clone());
    holder.append(answerHolder);
    holder.append(line.clone());
    holder.append(submitButton);

    return holder;
}

var CreateQuizTimer = function(){
    var holder = $('<section>[name="quizTimerHolder"]');
    timerEl = $('<span>[name="timer"');
    timerEl.text(timer+' second(s) left');
    holder.append(timerEl);
    return holder;
}

var StartQuiz = function(event){
    event.preventDefault();
    gamestate = "quiz";
    UpdateDisplays();
}

var CreateStart = function(){
    var holder = $('<section>');
    holder.css('width','100%');
    holder.css('padding-top','10%');
    holder.css('padding-bottom','10%');
    holder.css('display','flex');
    holder.css('flex-wrap','wrap');
    holder.css('justify-content','center');
    holder.css('align-items','center');
    
    var title = $('<h1>');
    title.text('Are YOU Smarter Than A Boot-Camp Student?');
    title.addClass('m10 bold large');

    var startbtn = $('<button>');
    startbtn.attr('enabled','true');
    startbtn.text('BEGIN!');
    startbtn.addClass('btn highlightBGOnHover bgPurple textWhite m5 p5');
    startbtn.on('click', StartQuiz);

    holder.append(title);
    holder.append(startbtn);

    master.append(holder);
}

var CreateResultsLayout = function(){
    var holder = $('<section>');
    holder.css('width','100%');
    holder.css('padding-top','10%');
    holder.css('padding-bottom','10%');
    holder.css('display','flex');
    holder.css('flex-direction','column');
    holder.css('flex-wrap','wrap');
    holder.css('justify-content','center');
    holder.css('align-items','center');

    var h1 = $('<h1>');
    h1.addClass('bold large m5 text');
    h1.text('All done!');

    var p1 = $('<p>');
    p1.addClass('m5 text');
    p1.text('Your score is '+score + " / "+questions.length);

    var inputHolder = $('<div>');
    inputHolder.css('display','flex');
    inputHolder.addClass('m5');

    var p2 = $('<p>');
    p2.addClass('text');
    p2.text('Enter your name: ');
    var input = $('<input>');
    input.css('margin-left','5px');
    input.attr('type','text');

    inputHolder.append(p2);
    inputHolder.append(input);

    var submitBtn = $('<button>');
    submitBtn.addClass('btn highlightBGOnHover bgPurple textWhite m5 p5');
    submitBtn.text('Submit');
    submitBtn.on('click',function(event){
        event.preventDefault();
        if(input.val() === ""){
            confirm("Please input your name before proceeding!");
            return;
        }
        else{
            AddScoreHolder(input.val(), score);
            SaveScoreHolders();
            gamestate = "highScores";
            UpdateDisplays();
        }
    });

    holder.append(h1);
    holder.append(p1);
    holder.append(inputHolder);
    holder.append(line.clone());
    holder.append(submitBtn);

    master.append(holder);
}

var CreateHighScoresLayout = function(){
    var holder = $('<section>');
    holder.css('width','100%');
    holder.css('padding-top','10%');
    holder.css('padding-bottom','10%');
    holder.css('display','flex');
    holder.css('flex-direction','column');
    holder.css('flex-wrap','wrap');
    holder.css('justify-content','center');
    holder.css('align-items','center');

    var h1 = $('<h1>');
    h1.addClass('large bold text');
    h1.text('High Scores');

    var ol = $('<ol>[name="quizHighScoreList"]');
    ol.css('display', 'block');
    ol.css('width', '50%');
    scoreHolders = GetScoreHolders();
    for (let index = 0; index < scoreHolders.holders; index++) {
        const element = scoreHolders[index];
        var li = $('<li>[name="scoreHolder]');
        li.addClass('text scoreHolder');
        li.text(element.name +"\'s score: "+element.score);
        ol.append(li);
    }

    var buttonHolder = $('<div>');
    buttonHolder.css('display','flex');

    var goBack = $('<button>');
    goBack.addClass('btn highlightBGOnHover bgPurple textWhite m5 p5');
    goBack.text('Go Back');
    goBack.on('click',function(event){
        event.preventDefault();
        gamestate = "start";
        UpdateDisplays();
    });
    
    var clear = $('<button>');
    clear.addClass('btn highlightBGOnHover bgPurple textWhite m5 p5');
    clear.text('Clear High Scores');
    clear.on('click',function(event){
        event.preventDefault();
        ResetScoreHolders();
        UpdateDisplays();
    });
    buttonHolder.append(goBack);
    buttonHolder.append(clear);

    holder.append(h1);
    holder.append(ol);
    holder.append(line.clone());
    holder.append(buttonHolder);

    master.append(holder);
}

var UpdateDisplays = function(){
    console.log("changing to "+gamestate);
    ClearMaster();
    switch (gamestate) {
        case "highScores":
            CreateHighScoresLayout();
            break;
        case "results":
            CreateResultsLayout();
            break;
        case "quiz":
            CreateQuizLayout();
            break;
        case "start":
        default:
            CreateStart();
            break;
    }
}

UpdateDisplays();