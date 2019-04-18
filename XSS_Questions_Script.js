(function() {
  var msg;
  var numCorrect = 0;
  var questionCounter = 0; //Tracks question number
  var VulId = "XSS";
  var uid = localStorage.getItem('uid');
  var questions = [{
	QID: "XSS-001",
    question: "1. Which of the following statements is/are true with respect to Stored XSS <br> a) malicious script is activated only after clicking the injected link on the compromised website <br> b) it is referred as persistent XSS <br> c) malicious script is activated just on accessing the compromised website <br> d) it is referred as non-persistent XSS",
    choices: [
			'c & d',
			'a & b',
			'b & c',
			'a & d'
		],
  }, {
	QID: "XSS-002",
    question: "2. _________ prevents stealing cookie data through XSS attack",
    choices: [
			'Turning off &#39;HTTP Trace&#39; on web server',
			'Disabling &#39;document.cookie&#39;'
		],
  }, {
	QID: "XSS-003",
    question: "3. Which of the following can protect against XSS",
    choices: [
			'Anti-Virus Software',
			'Web Application Firewall',
			'Both of the above',
			'None of the above'
		],
  }, {
	QID: "XSS-004",
    question: "4. DOM is a ________ XSS attack, which ________ http request for injecting scripts",
    choices: [
			'Client based, requires',
			'Client based, does not require',
			'Server based, requires',
			'Server based, does not require'
		],
  }, {
	QID: "XSS-005",
    question: "5. In XSS, where does the malicious script execute?",
    choices: [
			'On the web server',
			'In the web app model',
			'On the attacker&#39;s system',
			'In the user&#39;s browser'
		],
  },{
    QID: "XSS-006",
      question: "6. Following code allows the user to select language preference for a form <br> &lt;select&gt; &lt;script&gt; <br> document.write(&quot;&lt;OPTION value=1&gt;&quot;+document.location.href.substring(document.location.href.indexOf(&quot;default=&quot;)+8)+&quot;&lt;/OPTION&gt;); <br> document.write(&quot;&lt;OPTION value=2&gt;English&lt;/OPTION&gt;&quot;); <br> &lt;script&gt; &lt;select&gt; <br> ___________ XSS attack against this page can be accomplished by sending the following URL to a victim: <br> http://www.some.site/page.html?default=&lt;script&gt;alert(document.cookie)&lt;/script&gt;",
      choices: [
        "Reflected XSS",
        "Stored XSS",
        "DOM-Based XSS"
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