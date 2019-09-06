var numsquare = 6;
var colors =  [];
var pickedcolor; 
var squares = document.querySelectorAll(".square");
var colordisplay = document.getElementById("colordisplay");
var message = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetbutton = document.querySelector("#reset");
var modebtn = document.querySelectorAll(".mode");

init();

function init(){
	//mode button events listener
    for(var i=0; i< modebtn.length; i++){
       modebtn[i].addEventListener("click", function(){
    	  modebtn[0].classList.remove("selected");
    	  modebtn[1].classList.remove("selected");
    	  this.classList.add("selected");
          this.textContent === "Easy" ? numsquare = 3 : numsquare = 6;
          reset();
    	});
    }

    for(var i = 0; i < squares.length; i++){
      // add click listener to squares
	   squares[i].addEventListener("click", function(){
	   // grab color of clicked square
		var clickedcolor = this.style.backgroundColor;
		// compare color to pickedcolor
		if(clickedcolor === pickedcolor){
			 message.textContent = "Correct";
			 resetbutton.textContent = "Play Again ?";
			 changecolor(clickedcolor);
			 h1.style.backgroundColor = clickedcolor;
		    } else{  
			 this.style.backgroundColor = "#232323";
			 message.textContent = "Try Again";
            }
       });
    }
    reset();	
}

function reset(){
 colors = generaterandomcolor(numsquare);
  //pick  a randomnew color from array
  pickedcolor = pickcolor();
  //change color display to match pick color
  colordisplay.textContent = pickedcolor;
  resetbutton.textContent = "New colors";
  //change colors of squares
  for(i=0; i< squares.length; i++){
	  if(colors[i]){
		 squares[i].style.display = "block";
		 squares[i].style.backgroundColor = colors[i];	
	    } else{
		 squares[i].style.display = "none";
	    }
  
      h1.style.backgroundColor = "#232323";
      message.textContent = "";
	}
}

resetbutton.addEventListener("click", function(){
 reset();
})


function changecolor(color){
 // loop through all squares
	for(var i=0; i < squares.length; i++){
		// change each color to match given color
		squares[i].style.backgroundColor = color;
	}
}

function pickcolor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generaterandomcolor(num){
	//make an array
	var arr = []
	// repeat num times
	for (var i=0; i< num; i++){
    //get random color and push into arr
    arr.push(randomcolor())
	}
	// return that array
	return arr;
}

function randomcolor(){
	// pick a "red" from 0 to 255
	var r = Math.floor(Math.random() * 256);
	// pick a "green" from 0 to 255
	var g = Math.floor(Math.random() * 256);
	// pick a "blue" from 0 to 255
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}