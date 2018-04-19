    var questionNumber=0;
    var stage="#game1";
    var stage2=new Object;
    var questionLock=false;
    var score=0;
    var questionBank = [];

    function startQuiz(questions){
        questionBank = shuffle(questions);
        displayQuestion();
    }

    function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;
      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }

    function displayQuestion(){
        len = questionBank[questionNumber].length;
        var rnd=Math.random() * len;
        rnd=Math.ceil(rnd);
        correctID = 0;
        var questionIds = [];
        for (var i = 1; i < len; i++) {
            questionIds.push(i);
        }
        var shuf = shuffle(questionIds);
        var correctGreen = "";
        var res = '<div class="questionText">'+questionBank[questionNumber][0]+'</div>';
        for (var i = 1; i < len; i++){
        res = res + '<div id="'+ i +'" class="option">'+questionBank[questionNumber][shuf[i-1]]+'</div>';
            if (shuf[i-1] == 1){
                correctGreen="#" + i;
                correctID = i;
            }
        }
        $(stage).append(res);
        var correct = questionBank[questionNumber][1];
        $('.option').click(function(){
            if(questionLock==false){
                questionLock=true;
                //correct answer
                if(this.id==correctID){
                    $(stage).append('<div class="feedback1">CORRECT</div>');
                    score++;
                }
                $(correctGreen).addClass('green');
                //wrong answer
                if(this.id!=correctID){
                    $(stage).append('<div class="feedback2">WRONG - Correct Answer is:'+ correct +'</div>');
                }
                setTimeout(function(){changeQuestion()},1000);
            }
        })
    }//display question

    function changeQuestion(){
        questionNumber++;
        if(stage=="#game1"){
            stage2="#game1";
            stage="#game2";
        } else {
            stage2="#game2";
            stage="#game1";
        }
        if(questionNumber < questionBank.length) {
            displayQuestion();
        }
        else {
            displayFinalSlide();
        }
        $(stage2).animate({"right": "+=800px"},"slow", function() {
            $(stage2).css('right','-800px');$(stage2).empty();
        });
        $(stage).animate({"right": "+=800px"},"slow", function() {
            questionLock=false;
        });
    }//change question

    function displayFinalSlide(){
        $(stage).append('<div class="questionText">You have finished the quiz!<br><br>Total questions: '+questionBank.length+'<br>Correct answers: '+score+'</div>');
    }//display final slide