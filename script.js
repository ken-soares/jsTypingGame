const url="https://random-word-api.herokuapp.com/word";
const usrin = document.querySelector(".user");
const scoreText = document.querySelector(".score");
const timeText = document.querySelector(".time");
let score = 0;
let time = 60;
let end = false;

let word = document.querySelector('.word');

timeText.innerHTML = time + " seconds remaining";
scoreText.innerHTML = "score: " + score;
apiCall();

function mainLoop(){
	usrin.placeholder = "type the word above";
	if(time == 0){
		end = true;
	}
	if(usrin.value === word.innerHTML){
		apiCall();
		usrin.value = "";
		score++;
		scoreText.innerHTML = "score: " + score;
	}else{
		if(usrin.value.length >= word.innerHTML.length){
			word.style.color = "#FF6E6E";
		}else{
			word.style.color = "#69FF94";
		}
	}
	if(!end)
		setTimeout(mainLoop,30);
}

function timing(){
	if(time>0){
		time -= 1;
		timeText.innerHTML = time + " seconds remaining";
	}else{
		usrin.value = "";
		usrin.placeholder = "end of test";
		usrin.disabled = true;		
		scoreText.innerHTML = "your final score was " + score;
		saveScore();
	}
}

function saveScore(){
	pb = localStorage.getItem("pb");
	if(pb < score){
		scoreText.innerHTML = "New personnal best: " + score + "!";
		localStorage.setItem("pb", score);
	}
}

function best(){
	pb = localStorage.getItem("pb");
	if(pb == null){
		alert("You should start typing first!");
	}else{
		alert("Your personnal best is " + pb + ".");
	}
}
function reset(){
	score = 0;
	time = 60;
	end = false;
}

function apiCall(){
	fetch(url).then((response)=>{
		return response.json();
	}).then(data=>{
		word.innerHTML = data[0];
	});
}
