console.log("script loaded");
const rand = []
var game = 0;
var corr = 0;
let total_ans = 0;
let correct_ans = 0;
var max = 0;
let i = 0;

function get_rand(max){
	let found = 1;
	while (found == 1){
		found = 0;
		var numb = Math.floor(Math.random() * max);
		let len = rand.length;
		for (let i = 0;i < len;i++){
			if (numb == rand[i]){
				found = 1;
			}
		}
	}
	rand.push(numb);
	return numb;
}

class question {
	constructor(){
		this.text = "Insert question here";
		this.type =  "binary";//answer or binary;
		this.answers = ["Answer 1","Answer 2","Answer 3"];
		this.correct = 1;//which slot is correct
		this.binary = true;//if its true or false
	}

	shuffle_answers(){
		let corr = this.answers[this.correct - 1];
		this.answers.sort(function(){return 0.5 - Math.random()});
		for (let i = 0; i < 3; i++){
			if (corr == this.answers[i])
				this.correct = i+1;
		}
	}

	get_question_text(){
		return this.text;
	}

	get_type(){
		return this.type;
	}

	get_answers(){
		this.shuffle_answers();
		return this.answers;
	}

	get_correct(){
		return this.correct;
	}

	get_binary(){
		return this.binary;
	}

	set_question(txt,typ,ans,cor,bin){
		this.text = txt;
		this.type =  typ;
		this.answers = ans;
		this.correct = cor;
		this.binary = bin;
	}
}

function start_game(){
	rand.splice(0,rand.length);
	document.getElementById("correct").style.display = "none";
	document.getElementById("total").style.display = "none";
	document.getElementById("play_button").style.display = "none";
	document.getElementById("selection1").style.display = "block";
	document.getElementById("selection2").style.display = "block";
}

function question_loop(){
		for (let k = 0; k < 3; k++){
		 		let a = "answer" + (k + 1);
		 		document.getElementById(a).style.backgroundColor = "white";
		 	}
		if (i < max){
		 	let quest = new question();
		 	let numb = get_rand(total_mult_questions);
		 	console.log(numb);
		 	let content = questions_multiple_choice[numb];
		 	quest.set_question(content.text,content.type,content.answers,content.correct,content.binary);
		 	document.getElementById("number").innerText = "Question " + (i + 1);
		 	document.getElementById("question_text").innerText = quest.get_question_text();
		 	const ans = quest.get_answers();
		 	for (let l = 0; l < 3; l++){
		 		let str = "answer" + (l + 1);
		 		document.getElementById(str).innerHTML = ans[l];
		 	}
		 	corr = quest.get_correct();
		 	game = 1;
		 	i++;
		} else {
			document.getElementById("game_window").style.display = "none";
			document.getElementById("play_button").style.display = "block";
			document.getElementById("total").style.display = "inline";
			document.getElementById("total").innerText = "Total Questions: " + max;
			document.getElementById("total").style.textAlign = "center";
			document.getElementById("correct").style.textAlign = "center";
		}
	}

function mult_game(){
	total_ans = 0;
	correct_ans = 0;
	let total_questions = total_mult_questions;
	document.getElementById("total").innerText = "Total Questions: 0";
	document.getElementById("correct").innerText = "Correct Answers: 0";
	document.getElementById("correct").style.display = "inline";
	document.getElementById("correct").style.textAlign = "left";
	document.getElementById("total").style.textAlign = "left";
	document.getElementById("game_window").style.display = "table";
	document.getElementById("selection1").style.display = "none";
	document.getElementById("selection2").style.display = "none";
	
	i = 0;
	max = (total_questions < 10)?total_questions:10;
	question_loop();
}

function select_answer(ans){
	if (game == 1){
	 	if (ans == corr){
			correct_ans++;
			document.getElementById("correct").innerText = "Correct Answers: " + correct_ans;
			let str = "answer" + ans;
			document.getElementById(str).style.backgroundColor = "green";
			game = 0;
			setTimeout(question_loop,5000);
	 	} else {
	 		let str = "answer" + corr;
			document.getElementById(str).style.backgroundColor = "green";
			str = "answer" + ans;
			document.getElementById(str).style.backgroundColor = "red";
			game = 0;
			setTimeout(question_loop,5000);
	 	}
	}
}