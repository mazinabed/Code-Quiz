
var pos = 0, test, test_status, question, choice, choices, chA, chB, chC,chD, correct = 0;
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const counter = document.getElementById("counter");
var todoInput = document.querySelector("#todo-text");
var todoForm = document.querySelector("#todo-form");
var todoList = document.querySelector("#todo-list");
var todoCountSpan = document.querySelector("#todo-count");

var todos = [];

let TIMER;
let count = 0;
const questionTime = 20; 
start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderCounter();
	TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
	
}


function _(x){
	return document.getElementById(x);
}
function renderQuestion(){
	test = _("test");
	if(pos >= questions.length){
		test.innerHTML = "<h2>Your score is "+correct+" of "+questions.length+" .</h2>";
		_("test_status").innerHTML = "All Done!";
		pos = 0;
		correct = 0;
		
		return false;
		
	}
	_("test_status").innerHTML = "Question "+(pos+1)+" of "+questions.length;
	question = questions[pos][0];
	chA = questions[pos][1];
	chB = questions[pos][2];
	chC = questions[pos][3];
	chD = questions[pos][4];
	test.innerHTML = "<h3>"+question+"</h3>";
	test.innerHTML += "<input type='radio' name='choices' value='A'> "+chA+"<br>";
	test.innerHTML += "<input type='radio' name='choices' value='B'> "+chB+"<br>";
	test.innerHTML += "<input type='radio' name='choices' value='C'> "+chC+"<br>";
	test.innerHTML += "<input type='radio' name='choices' value='D'> "+chD+"<br>";
	test.innerHTML += "<button onclick='checkAnswer()'>Submit Answer</button>";
}

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        
		count++;
		
    }else{
		count = 0;
		
    }
}



function checkAnswer(){
	choices = document.getElementsByName("choices");
	for(var i=0; i<choices.length; i++){
		if(choices[i].checked){
			choice = choices[i].value;

		}
	}
	if(choice == questions[pos][5]){
		correct++;
		alert('Corrct')
	}else{
		alert('Wrong');
	
	}
	
	
	pos++;
	renderQuestion();
}

init();

function renderTodos() {
  // Clear todoList element and update todoCountSpan
  todoList.innerHTML = "";
  todoCountSpan.textContent = todos.length;

  // Render a new li for each todo
  for (var i = 0; i < todos.length; i++) {
    var todo = todos[i];

    var li = document.createElement("li");
    li.textContent = todo;
    li.setAttribute("data-index", i);

    var button = document.createElement("button");
    button.textContent = "Complete";

    li.appendChild(button);
    todoList.appendChild(li);
  }
}

function init() {
  // Get stored todos from localStorage
  // Parsing the JSON string to an object
  var storedTodos = JSON.parse(localStorage.getItem("todos"));

  // If todos were retrieved from localStorage, update the todos array to it
  if (storedTodos !== null) {
    todos = storedTodos;
  }

  // Render todos to the DOM
  renderTodos();
}

function storeTodos() {
  // Stringify and set "todos" key in localStorage to todos array
  localStorage.setItem("todos", JSON.stringify(todos));
}

// When form is submitted...
todoForm.addEventListener("submit", function(event) {
  event.preventDefault();

  var todoText = todoInput.value.trim();

  // Return from function early if submitted todoText is blank
  if (todoText === "") {
    return;
  }

  // Add new todoText to todos array, clear the input
  todos.push(todoText);
  todoInput.value = "";

  // Store updated todos in localStorage, re-render the list
  storeTodos();
  renderTodos();
});

// When a element inside of the todoList is clicked...
todoList.addEventListener("click", function(event) {
  var element = event.target;

  // If that element is a button...
  if (element.matches("button") === true) {
    // Get its data-index value and remove the todo element from the list
    var index = element.parentElement.getAttribute("data-index");
    todos.splice(index, 1);

    // Store updated todos in localStorage, re-render the list
    storeTodos();
    renderTodos();
  }
});




window.addEventListener("load", renderQuestion, false);



