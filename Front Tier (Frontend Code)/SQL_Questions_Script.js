(function() {
  var msg;
  var numCorrect = 0;
  var questionCounter = 0; //Tracks question number
  var VulId = "SQL";
  var uid = localStorage.getItem('uid');
  var questions = [{
	QID: "SQL-001",
    question: "1. Which of the following exploits are possible through SQL Injection attack? <br> a) Bypass Authentication <br> b) add, delete, read or modify contents in the database <br> c) bypass Web Application Firewall <br> d) read source code from files on the database",
    choices: [
			'a, b & c',
			'b & d',
			'a, b, c & d',
			'a, b & d'
		],
  }, {
	QID: "SQL-002",
    question: "2. https://xya.com/index.php?id=1+AND+IF(version()+LIKE+&#39;8%&#39;,sleep(5),false) &#45; the following query corresponds to which type of SQL Injection",
    choices: [
			'Error based SQL Injection',
			'Boolean based SQL Injection',
			'Out-of-Band SQL Injection',
			'Time based SQL Injection'
		],
  }, {
	QID: "SQL-003",
    question: "3. With respect to Error based SQL Injection, which of the following error codes does a hacker need to look out for to get values such as the database name",
    choices: [
			'Error 245',
			'Error 205',
			'Error 18456',
			'Error 2812'
		],
  }, {
	QID: "SQL-004",
    question: "4. Which of the following test/tests can be used to test SQL Injection attack? <br> a) xp_regwrite <br> b) xp_write <br> c) xp_reg <br> d) xp_cmdshell",
    choices: [
			'a & d',
			'a & c',
			'c',
			'c & d'
		],
  }, {
	QID: "SQL-005",
    question: "5. Which of the following defenses would fail for the corresponding case &#45; &#39;SELECT fields FROM table WHERE id = 23 OR 1=1&#39;",
    choices: [
			'Parameterized statements',
			'Escaping cases',
			'Validating input pattern',
			'None of the above'
		],
  },{
    QID: "SQL-006",
      question: "6. Which of the following would most likely result in a successful SQL attack",
      choices: [
        "SELECT fieldlist FROM table WHERE field = &#39;anything&#39; AND &#39;x&#39;=&#39;x&#39;;",
        "SELECT fieldlist FROM table WHERE field = &#39;anything&#39; OR &#39;x&#39;=&#39;x&#39;;",
    ],
    }];
  
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  
  // Display initial question
  displayNext();
  
  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  

  
    // Click handler for the 'submit' button
  $('#submit').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      	// collect the form data while iterating over the inputs
		
		var data = { "uid": uid, "cid": VulId , "qid": questions[questionCounter].QID, "usel": selections[questionCounter] };
		console.log(data);
		
			
		// construct an HTTP request
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "https://shielded-reef-36024.herokuapp.com/api/v1/chkans", true);
    //xhr.open(form.method, form.action, true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		// send the collected data as JSON
    xhr.send(JSON.stringify(data));
    //var resultText = xhr.responseText;
    //console.log(resultText);
    xhr.onreadystatechange=(e)=>{
      if (xhr.readyState == 4) {
      var parsedJson = JSON.parse(xhr.responseText);
		  //console.log(parsedJson);
		  msg = parsedJson.msg;
      console.log(msg);
      isCorrectAnswer()
      }
    }

    }
  });
  

  
  
  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div class="jumbotron">', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }



  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
	}
  //console.log(selections);
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('.jumbotron').remove();
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#submit').hide();
        $('#start').show();
      }
    });
  }
  
  // Computes correct Answer
  function isCorrectAnswer() {
    var message;
    
    
      if (msg == 1) {
        // console.log(message.innerText);
        message = $('<p class="success">',{id: 'result'});
        message.append('Correct Answer');
        numCorrect++;
        //console.log(numCorrect);
      }
      else{
        message = $('<p class="danger">',{id: 'result'});
        message.append('Incorrect Answer');
      }
    
    
  }


  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p class="bg-info">',{id: 'question'});
    score.append('You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' right!!!');
    return score;
  }


})();