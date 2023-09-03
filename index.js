
var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var gameRunnin=false;
var randomChosenColor;
var wrongAudio = new Audio('sounds/wrong.mp3');



function playSound(name){

    var nameAudio = new Audio("sounds/"+name+".mp3");
    nameAudio.play();

}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");

    setTimeout(function (){
        $("#"+currentColor).removeClass("pressed");
    },100);
    

}

function checkAnswer(){
    //checking if random genrated colors and user clicked colors are equal or not.
    if(JSON.stringify(gamePattern)===JSON.stringify(userClickedPattern))
    nextSequence();
    else
    gameOver();
  
}

function nextSequence()
{
    level++;
    $("h1").text("level "+level); 

    var randomNumber=Math.floor(Math.random()*4);         //choosing random color
    randomChosenColor=buttonColors[randomNumber];

    setTimeout(function () {
        $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    gamePattern.push(randomChosenColor);
    userClickedPattern=[];
    }, 400);

}

function gameOver(){
   
    level=0;                    // reseting levels and pattern
    gamePattern=[];
    userClickedPattern=[];
    wrongAudio.play();
    gameRunnin=false;
    $("h1").text("Game Over, Press 'A' Key To Restart");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    

}


$(".btn").click(function (event) {

    if(gameRunnin===true)
    {
    var userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    // only checks answer when the whole answer is given by the user
    if(gamePattern.length===userClickedPattern.length)
    checkAnswer();  
    
}
});  




$("body").on("keypress",function(event){                // start and reset of game

    if(gameRunnin=== false)
    {
    var buttonPressed= event.originalEvent.key;
    if(buttonPressed==="A" || buttonPressed==="a")
    {gameRunnin=true;
    nextSequence();// just added
    }
    //if(gameRunnin===false)
    //nextSequence();
}
    
});

