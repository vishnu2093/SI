(function() {
  var msg;
  var numCorrect = 0;
  var questionCounter = 0; //Tracks question number
  var VulId = "CSRF";
  var uid = localStorage.getItem('uid');
  var questions = [{
	QID: "CSRF-001",
    question: "1. Which of the following is false regarding CSRF attack",
    choices: [
			'CSRF exploits the trust that a website has for the user',
			'CSRF exploits the trust that a user has for the website',
			'CSRF attacks can be executed using HTML image tags or JavaScript image object',
			'CSRF is also known as One-Click attack, Sea Surf and Hostile Linking'
		],
  }, {
	QID: "CSRF-002",
    question: "2. Which of the following statement is/are true regarding CSRF <br> a) CSRF exploits can force user to perform state changing requests <br> b) CSRF exploits allows attackers to see responses to the forged site <br> c) CSRF exploits allows theft of data <br> d) In CSRF, the authenticated victim&#39;s session cookie is also sent to the vulnerable web application",
    choices: [
			'a, b & c',
			'a, b & d',
			'b & c',
			'a & d'
		],
  }, {
	QID: "CSRF-003",
    question: "3. Which of the below prevention measure does not work in protecting against CSRF attacks",
    choices: [
			'Using a secret cookie',
			'Accepting only POST requests',
			'Multi-step Transactions',
			'All of the above'
		],
  }, {
	QID: "CSRF-004",
    question: "4. Which of these can be used to prevent CSRF attacks",
    choices: [
			'Same-site flag in cookies',
			'URL Rewriting',
			'Using a secret cookie',
			'None of the above'
		],
  }, {
	QID: "CSRF-005",
    question: "5. What is the difference between XSS and CSRF? <br> a)XSS attacks require that sites accept malicious code, while with CSRF attacks malicious code is located on third-party sites <br> b)If a site is vulnerable to XSS attacks, then it is vulnerable to CSRF attacks. <br> c) If a site is completely protected from XSS attacks, it is most likely still vulnerable to CSRF attacks. <br> d) XSS exploits trust a user has for the website and CSRF exploits trust which the website has for the user",
    choices: [
			'a, b, c & d',
			'a, b & c',
			'b & c',
			'b, c & d'
		],
  },{
    QID: "CSRF-006",
      question: "6. The below code snippet is an example of <br> Host: www.csrflabelgg.com <br> User&#45;Agent: Mozilla/5.0 (X11; Ubuntu; Linux i686; rv:23.0) ... <br> Referer: http://www.csrflabelgg.com/profile/elgguser1/edit <br> Cookie: Elgg=p0dci8baqrl4i2ipv2mio3po05 <br> __elgg_token=fc98784a9fbd02b68682bbb0e75b428b&__elgg_ts=1403464813 <br> &name=elgguser1&description=%3Cp%3Iamelgguser1%3C%2Fp%3E <br> &accesslevel%5Bdescription%5D=2&briefdescription= Iamelgguser1 <br> &accesslevel%5Bbriefdescription%5D=2&location=US",
      choices: [
        "CSRF attack using GET request",
        "CSRF attack using POST request",
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