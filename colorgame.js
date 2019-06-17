var numsquares=3;
var colors=[];
var pickedcolor;
var squares=document.querySelectorAll(".square");
var colordisplay=document.getElementById("colordisplay");
var messagedisplay=document.querySelector("#message");
var h1=document.querySelector("h1");
var resetbutton=document.querySelector("#reset");
var modebuttons=document.querySelectorAll(".mode");


init();


function init(){
	//mode buttons event listeners
	setupmodebuttons();
	setupsquares();
    reset();
}

function setupmodebuttons(){
	for(var i=0;i<modebuttons.length;i++){
		modebuttons[i].addEventListener("click",function(){
			modebuttons[0].classList.remove("selected");
			modebuttons[1].classList.remove("selected");
			modebuttons[2].classList.remove("selected");
			this.classList.add("selected");
			numsquares=(this.textContent === "Easy" ? 3: (this.textContent === "Medium"?6:9));
			reset();
		});
    }
}

function setupsquares(){
	for(var i=0;i<squares.length;i++){
	//add click listeners to squares
	squares[i].addEventListener("click", function(){
		/*alert("clicked a square");*/
		//grab color of clicked square
		var clickedcolor=this.style.background;
		//compare color to pickedcolor
		if(clickedcolor === pickedcolor){
			messagedisplay.textContent="Correct!";
			resetbutton.textContent="Play Again?";
			changecolors(clickedcolor);
			h1.style.background=clickedcolor;

		}else{
			this.style.background="#232323";
			messagedisplay.textContent="Try Again";
		}
	});
  }
}

function reset(){
	/*change messages i.e., change "Play Again?" to "New Colors" 
	and remove correct message upon game winning*/
	resetbutton.textContent="New Colors";/*resetbutton.textContent="New colors";*/
	messagedisplay.textContent="";
	//generate all new colors
	colors=generaterandomcolors(numsquares);
	//pick a new random color from array
	pickedcolor=pickcolor();
	//change colordisplay to match picked color
	colordisplay.textContent=pickedcolor;
	//change colors of squares
	for(var i=0;i<squares.length;i++){
		if(colors[i]){
			squares[i].style.display="block";
		    squares[i].style.background=colors[i];
	}else{
		squares[i].style.display="none";
	}
	}
	h1.style.background="steelblue";
}

resetbutton.addEventListener("click",function(){
	reset();
});

colordisplay.textContent=pickedcolor;


function changecolors(color){
	//loop through all squares
	for(var i=0;i<squares.length;i++){
		//change each color to match given color
		squares[i].style.background=color;
	}
}

function pickcolor(){
	var random=Math.floor(Math.random()*colors.length);
	return colors[random];
}

function generaterandomcolors(num){
	//make an array
	var arr=[]
	//add num random colors to array
	for(var i=0;i<num;i++){
		//get random color and push into arr
		arr.push(randomcolor());
	}
	//return that array
	return arr;
}

function randomcolor(){
	//pick a "red" from 0-255
	var r=Math.floor(Math.random()*256);
	//pick a "green" from 0-255
	var g=Math.floor(Math.random()*256);
	//pick a "blue" from 0-255
	var b=Math.floor(Math.random()*256);
	//"rgb(r,g,b)"
	return "rgb("+r+", "+g+", "+b+")";
}