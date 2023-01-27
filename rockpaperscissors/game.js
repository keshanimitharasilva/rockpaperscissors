/*COIS 3420H ASSIGNMENT 3 Q2 - W2021 - KESHANI SILVA*/ 

//ALLOW EXPLICITLY DECLARING VARIABLES
"use strict"; 

//ENSURE HTML IS FULLY PARSED BEFORE EXECUTING JAVASCRIPT
window.addEventListener("DOMContentLoaded", () => {

/***********************************************************************************/
/*                               GLOBAL VARIABLES                                  */
/***********************************************************************************/
    //Game form selectors
    let gameForm = document.getElementById("playForm"); 
    let buttons = document.querySelectorAll(".select button"); 
    let restart = document.getElementById("restart"); 

    //Chosen moves and points board selectors
    let playerChose = document.getElementById("youPicked"); 
    let gameChose = document.getElementById("gamePicked"); 
    let roundsBoard = document.getElementById("rounds"); 
    let winsBoard = document.getElementById("wins");
    let lossesBoard = document.getElementById("losses");
    let wonMessage = document.getElementById("wonMessage");
    let lostMessage = document.getElementById("lostMessage");
    let drawMessage = document.getElementById("drawMessage");

    //Game over and name form selectors
    let gameOver = document.getElementById("gameOverContainer"); 
    let nameForm = document.getElementById("enterName"); 
    let hsName = document.getElementById("hsName"); 
    let hsNameError = document.getElementById("hsNameError"); 

    //High scores selectors
    let seeHighScores = document.getElementById("seeHighScores");
    let modal = document.getElementById("modal"); 
    let closeBtn = document.getElementById("close-btn"); 

    //Variables to track points
    let rounds = 0; 
    let wins = 0; 
    let losses = 0;  

    //Declare draw boolean
    let draw = false;

    //Array with the computers choice
    let gameSelect = ["rock", "paper", "scissors"]; 


/***********************************************************************************/
/*                               FUNCTION WITH GAME LOGIC                          */
/***********************************************************************************/
    
    const rps = () => {
        //For each button from array buttons 
        buttons.forEach( btn => {

            btn.addEventListener("click", (ev)=>{
                //Prevent default button behaviour
                ev.preventDefault(); 

                //Count and record the number of rounds
                rounds = rounds + 1; 
                roundsBoard.innerHTML = `${rounds} `; 

                //Get the user's choice from button id 
                let clickedBtn = btn.getAttribute("id");

                //Randomly choose the computer's choice from the array
                gameChose.innerHTML = gameSelect[Math.floor(Math.random() * gameSelect.length)];

                //If both the user and computer chose the same move
                if(clickedBtn === gameChose.innerHTML){
                    //Set draw to true
                    draw = true;
                    //Show "It's A Draw" message
                    wonMessage.classList.add("hidden"); 
                    lostMessage.classList.add("hidden");
                    drawMessage.classList.remove("hidden");  
                }

                //RECORD MOVE AND CALL APPOPRIATE FUNCTION IF: 
                //User chose rock and computer chose paper 
                else if(clickedBtn == "rock" && gameChose.innerHTML =="paper"){
                    playerChose.innerHTML = " rock"; 
                    lost(); 
                }
                //User chose rock and computer chose scissors
                else if(clickedBtn == "rock" && gameChose.innerHTML =="scissors"){
                    playerChose.innerHTML = " rock"; 
                    won(); 
                }
                //User chose paper and computer chose rock
                else if(clickedBtn == "paper" && gameChose.innerHTML =="rock"){
                    playerChose.innerHTML = " paper"; 
                    won(); 
                }
                //User chose paper and computer chose scissors
                else if(clickedBtn == "paper" && gameChose.innerHTML =="scissors"){
                    playerChose.innerHTML = " paper"; 
                    lost(); 
                }
                //User chose scissors and computer chose rock
                else if(clickedBtn == "scissors" && gameChose.innerHTML =="rock"){
                    playerChose.innerHTML = " scissors"; 
                    lost(); 
                }
                //User chose scissors and computer chose paper
                else if(clickedBtn == "scissors" && gameChose.innerHTML =="paper"){
                    playerChose.innerHTML = " scissors"; 
                    won(); 
                }
            })
        })
    }

    //Call the game logic function
    rps(); 


/***********************************************************************************/
/*                               CLICK 'RESET' BUTTON                              */
/***********************************************************************************/
    restart.addEventListener("click", (ev) => { 
        //Prevent default button behaviour 
        ev.preventDefault; 
        //Call function to clear all variables
        clearAll(); 
    });


/***********************************************************************************/
/*                          CLICK 'SEE HIGH SCORES' BUTTON                         */
/***********************************************************************************/

    seeHighScores.addEventListener("click", (ev) => {
        //Call function to get highscores using AJAX into a modal
        getHighScores(); 

    });


/***********************************************************************************/
/*                      SUBMIT NAME FORM TO RECORD HIGH SCORES                     */
/***********************************************************************************/
nameForm.addEventListener("submit", (ev) => {

    //Prevent default form behaviour 
    ev.preventDefault();

    //If the user did not input any value
    if (hsName.value.length == 0){
        //Show error message 
        hsNameError.innerHTML = "<p>Please Enter Your Name</p>"; 
    }

    //Else if user succesfully entered the value
    else{
        //Remove error message
        hsNameError.innerHTML = ""

        /********** USE AJAX TO SUBMIT FORM TO A PHP BACKEND API **********/

        //Code referenced from: https://javascript.info/xmlhttprequest

        //Declare object with form data
        let nameFormData = new FormData(document.forms.nameForm);
        
        //Append other fields to form data object
        nameFormData.append("hsName", `${hsName.value}`);
        nameFormData.append("plays", `${rounds}`);
        nameFormData.append("wins", `${wins}`);
        nameFormData.append("losses", `${losses}`);

        //Create new xmlhttp request 
        const xhr = new XMLHttpRequest();

        //Open xhr POST request to API
        xhr.open("POST", "api_name.php"); 

        //Send the xhr request with form data object 
        xhr.send(nameFormData);

        //Hide game over message 
        gameOver.classList.add("hidden"); 

        //Show game 
        gameForm.style.display = "block"; 

        //Call function to get highscores using AJAX into a modal
        getHighScores();

        //Restart the game by clearing all variables
        clearAll();
    }
});


/***********************************************************************************/
/*                          CLICK 'CLOSE MODAL' BUTTON                             */
/***********************************************************************************/
    /* Modal code referenced from: 
    https://medium.com/@nerdplusdog/a-how-to-guide-for-modal-boxes-with-javascript-html-and-css-6a49d063987e */

    closeBtn.addEventListener("click", (ev) => {
        //Make modal disappear 
        modal.style.display = "none"; 
    }); 


/***********************************************************************************/
/*                          CLICK OUTSIDE MODAL                                    */
/***********************************************************************************/
    /* Modal code referenced from: 
    https://medium.com/@nerdplusdog/a-how-to-guide-for-modal-boxes-with-javascript-html-and-css-6a49d063987e */

    window.addEventListener("click", (ev) => {
        if(ev.target == modal){
            //Make modal disappear 
            modal.style.display = "none"
          }
    }); 


/***********************************************************************************/
/*                               FUNCTIONS                                         */
/***********************************************************************************/

    //-----------------WHEN A ROUND IS WON---------------------------
    function won(){

        //Add one more win
        wins = wins + 1; 

        //Record updated wins in the score board
        winsBoard.innerHTML = `${wins} `;

        //Display "You Won" message
        lostMessage.classList.add("hidden"); 
        drawMessage.classList.add("hidden"); 
        wonMessage.classList.remove("hidden"); 
    }

    //-----------------WHEN A ROUND IS LOST---------------------------
    function lost(){

        //Add one more loss
        losses = losses + 1; 

        //Record updated losses in score board
        lossesBoard.innerHTML = `${losses} `;

        //Display "You Lost" message
        wonMessage.classList.add("hidden"); 
        drawMessage.classList.add("hidden"); 
        lostMessage.classList.remove("hidden"); 

        //If losses exceed 10
        if(losses > 10){
            //GAME OVER: Hide the game form and make game over div appear 
            gameOver.classList.remove("hidden")
            gameForm.style.display = "none"; 
        }
    }

    //----------------------RESET THE GAME---------------------------
    function clearAll(){

        //Set all counters to zero and draw to false 
        rounds = 0; 
        wins = 0; 
        losses = 0; 
        draw = "false"; 

        //Clear score board 
        roundsBoard.innerHTML = ""; 
        winsBoard.innerHTML = ""; 
        lossesBoard.innerHTML = ""; 

        //Make all messages disappear 
        gameChose.innerHTML = "";
        playerChose.innerHTML = "";
        wonMessage.classList.add("hidden"); 
        drawMessage.classList.add("hidden"); 
        lostMessage.classList.add("hidden"); 
    }

    //-----------------USE AJAX TO GET HIGHSCORES---------------------------
    /*Modal code referenced from: 
    https://medium.com/@nerdplusdog/a-how-to-guide-for-modal-boxes-with-javascript-html-and-css-6a49d063987e */
    function getHighScores(){

        //Make high scores modal appear 
        modal.style.display = "block";

        //Create new xmlhttp request 
        const xhr = new XMLHttpRequest();

        //Open xhr GET request to API
        xhr.open("GET", "api_highscore.php");

        //Once xhr has succesfully loaded
        xhr.addEventListener("load", (ev) => {

            //Select DOM element that will accept the xhr response content
            const tableBody = document.getElementsByTagName("tbody")[0]; 

            //Once xhr request has succeeded
            if (xhr.status == 200) {

                //Parse  xhr response
                const apidata = JSON.parse(xhr.response);
                console.log(apidata); 

                let output = "";
                let rank = 1; 

                //Loop through each array element in the xhr response
                apidata.forEach(function (data) {
                    //Record into HTML string 
                    output +=  `<tr>
                                <td>${rank}</td>
                                <td>${data.getscore}</td>
                                <td>${data.getname}</td>
                                </tr>`;
                    //Count rank 
                    rank += 1; 
                });

                //Insert HTML into each sucessive table row 
                tableBody.insertAdjacentHTML("beforeend", `${output}`);
            } 
            //If xhr request didn't succeed
            else {
                //Insert HTML error message into table row 
                tableBody.insertAdjacentHTML("beforeend", "<tr><td>Something went wrong</td></tr>");
            }
        });

        //Send xhr request 
        xhr.send();      
    }
    
});