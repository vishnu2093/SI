(function() {
  var msg;
  var numCorrect = 0;
  var questionCounter = 0; //Tracks question number
  var VulId = "BAUTH";
  var uid = localStorage.getItem('uid');
  var questions = [{
	QID: "BAUTH-001",
    question: "1. Managing session persistence through URI is safer than by using cookies.",
    choices: [
			'True',
			'False'
		],
  }, {
	QID: "BAUTH-002",
    question: "2. Tool which can be used to capture authentication cookies",
    choices: [
			'Censys',
			'Shodan',
			'Burp Suite',
			'Snort'
		],
  }, {
	QID: "BAUTH-003",
    question: "3. Protection mechanisms against session management attacks",
    choices: [
			'Generating a new random session ID for every login',
			'Session Id should not be in the URL',
			'Session ID should be invalidated after logout/idle and timeouts',
			'All of the Above'
		],
  }, {
	QID: "BAUTH-004",
    question: "4. An application is vulnerable to Broken Authentication flaw if: <br> a) it has URL rewriting disabled <br> b) has multi-factor authentication <br> c) stores its credentials in an encrypted and hashed form <br> d) does not have strong password check controls",
    choices: [
			'a & d',
			'd',
			'b, c & d',
			'a'
		],
  }, {
	QID: "BAUTH-005",
    question: "5. &#39;Forgot your Password&#39; is most common example of Broken Authentication. Order these steps in the correct sequence to avoid being <br> a) Lock the user out of the current account so that the previous password no longer works <br> b) Verify answers to the questions <br> c) Get verification data from user before password recovery workflow (Secret Questions) <br> d) Send the password reset link to the user <br> e) Ask the user to submit the code and verify code <br> f) Send a verification code to the user through out&#45;of&#45;band channel",
    choices: [
			'abcdef',
			'cbafed',
			'acbfed',
      'fedcba',
      'acbdfe'
		],
  },{
    QID: "BAUTH-006",
      question: "6. Identify the correct statements <br> a) A session is nothing but a client&#45;side storage of user&#39;s information <br> b) A session is nothing but a server&#45;side storage of user&#39;s information <br> c) A cookie is nothing but a server&#45;side storage of user&#39;s information <br> d) A cookie is nothing but a client&#45;side storage of user&#39;s information",
      choices: [
        'a & d',
			  'a & c',
			  'b & c',
		  	'b & d'
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