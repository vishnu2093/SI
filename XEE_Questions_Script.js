(function() {
  var msg;
  var numCorrect = 0;
  var questionCounter = 0; //Tracks question number
  var VulId = "XEE";
  var uid = localStorage.getItem('uid');
  var questions = [{
	QID: "XEE-001",
    question: "1. Which of the following statements is true regarding XML_PARSE_NOENT ",
    choices: [
			'Prevents a Java XMLInputFactory instance from XXE',
			'This option expands on entities and then substitutes them with replacement text, which is where malicious attackers can insert volatile code.',
			'This option allows DTDs, also known as external entities, to be called and executed.',
			'None of the above'
		],
  }, {
	QID: "XEE-002",
    question: "2. Definition of XXE attack?",
    choices: [
			'XML parser has the external entities DTD allowed for usage and does not properly parse the input given to it.',
			'Malicious scripts are injected into otherwise benign and trusted websites',
			'Use malicious code to manipulate your database into revealing information',
			'occur when an application provides direct access to objects based on user-supplied input.'
		],
  }, {
	QID: "XEE-003",
    question: "3. In XXE, the attacker forces the server to make a request to the target URL.",
    choices: [
			'True',
			'False'
		],
  }, {
	QID: "XEE-004",
    question: "4. Which can be used as defenses against XXE?",
    choices: [
			'Disable XML external entity and DTD processing in all XML parsers',
			'Verify XML file upload functionality validates incoming XML using XSD validation.',
			'Use a lower complex data format such as JSON',
			'All of the above'
		],
  }, {
	QID: "XEE-005",
    question: "5. XML cannot be used to obtain binary files.",
    choices: [
			'True',
			'False'
		],
  },{
    QID: "XEE-006",
      question: "6. Which of these would be a valid recommendation to prevent XXE <br> a) XercesDOMParser *parser = new XercesDOMParser; <br> parser&#45;&gt;setCreateEntityReferenceNodes(false) <br> b) SAXParser* parser = new SAXParser; <br> parser&#45;&gt;setDisableDefaultEntityResolution(false) <br> c) SAX2XMLReader* reader = XMLReaderFactory::createXMLReader(); <br> parser&#45;&gt;setFeature(XMLUni::fgXercesDisableDefaultEntityResolution, true) <br> d) XMLInputFactory.setProperty(XMLInputFactory.Support_DTD, false); <br> XMLInputFactory.setProperty(&quot;javax.xml.stream.isSupportingExternalEntities&quot;, false)",
      choices: [
        'a, b, c & d',
		  	'a, b & c',
			  'b & c',
		  	'd'
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