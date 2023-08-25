var play = false;
var score;
var action;
var timeleft;
var correctAns;
//start reset button
document.getElementById("startbtn").onclick = function(){
    //if we are playing - reload page
        if(play==true){
            location.reload();
        }
        else{
            //if we are not playing

            play = true;
            score = 0;
            document.getElementById("scoreval").innerHTML = score;

            //show countdown box
            // document.getElementById("time").style.display = "block";
            show("time");
            timeleft = 60;
            document.getElementById("timeval").innerHTML = timeleft;

            //hide gameover box
            document.getElementById("gameover").style.display = "none";

             //change btn to reset
             document.getElementById("startbtn").innerHTML = "Reset Game";

             //start countdown
             startCountdown();

             //generate multiple Q&A
             generateQA();

        }

}
function startCountdown(){
    action = setInterval(function(){
        timeleft -= 1;

        document.getElementById("timeval").innerHTML = timeleft;

            if(timeleft==0){
                //gameover
               stopCountDown();
             
            //    document.getElementById("gameover").style.display = "block";
            show("gameover");

               document.getElementById("gameover").innerHTML =
                "<p>game over!</p> <p>your scroe is "+ score +". </p>";

                hide("time");
                hide("correct");
                hide("wrong");
                play = false;
           document.getElementById("startbtn").innerHTML = "Start Game";
            }
    }, 1000);
}

function stopCountDown(){
    clearInterval(action);
}
    
function hide(Id){
    document.getElementById(Id).style.display = "none";
}

function show(Id){
    document.getElementById(Id).style.display = "block";
}

function generateQA(){
    var x = 1+ Math.round(9*Math.random());
    var y = 1+ Math.round(9*Math.random());
    correctAns = x*y;
   
    document.getElementById("question").innerHTML = x + "x" + y;

    var correctposition = 1+ Math.round(3*Math.random());
  
    document.getElementById("box"+correctposition).innerHTML = correctAns;

    var answers = [correctAns];

    for(i=1;i<5;i++){
        if(i!==correctposition){

        var wrongAns;
            
            do{

                wrongAns = 
                (1+ Math.round(9*Math.random())) * (1+ Math.round(9*Math.random()));
           
            }while(answers.indexOf(wrongAns)>-1)

        document.getElementById("box"+i).innerHTML = wrongAns;

        answers.push(wrongAns);
        }
    }
}

for(i=1; i<5; i++){
       
document.getElementById("box"+i).onclick = function(){
    if(play==true){
        if(this.innerHTML == correctAns){
            //correct answer
            score++;  //increase count by 1
            document.getElementById("scoreval").innerHTML = score;

            hide("wrong");
            show("correct");

            setTimeout(function(){
                hide("correct");
            },1000);

            generateQA();
        }
      
        else{
            //wrong answer
            hide("correct");
            show("wrong");

            setTimeout(function(){
                hide("wrong");
            },1000);

        }
    }
}

}