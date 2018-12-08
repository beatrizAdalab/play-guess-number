'use strict';

//MODELS-------------------------------------------------

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.ceil(Math.floor(Math.random() * (max - min + 1)) + min); //The maximum is inclusive and the minimum is inclusive 
}

let randomNumber = getRandomIntInclusive(1, 100);

const bubbles = [{
        src: "assets/images/bubbles/bubble10.png",
        top: "1%"
    },
    {
        src: "assets/images/bubbles/bubble9.png",
        top: "5%"
    },
    {
        src: "assets/images/bubbles/bubble8.png",
        top: "9%"
    },
    {
        src: "assets/images/bubbles/bubble7.png",
        top: "13%"
    },
    {
        src: "assets/images/bubbles/bubble6.png",
        top: "17%"
    },
    {
        src: "assets/images/bubbles/bubble5.png",
        top: "21%"
    },
    {
        src: "assets/images/bubbles/bubble4.png",
        top: "25%"
    },
    {
        src: "assets/images/bubbles/bubble3.png",
        top: "29%"
    },
    {
        src: "assets/images/bubbles/bubble2.png",
        top: "33%"
    },
    {
        src: "assets/images/bubbles/bubble1.png",
        top: "37%"
    },
]

let acc = 0;


//VIEWS-------------------------------------------------------------------------

const userNumber = document.querySelector("#user-number");
const track = document.querySelector(".user-number");
const btnTry = document.querySelector(".btn-try");
const btnStart = document.querySelector(".btn-start");

const boxTry = document.querySelector(".play-try");
const registerWin = document.querySelector(".register-win");
const userName = document.querySelector("#user-name");
const btnSave = document.querySelector(".btn-save");

const imageBubble = document.querySelector(".image-bubble");
const containerImgBubble = document.querySelector(".container-image-bubble");
const players = document.querySelector(".players");

const musicAudio = new Audio("assets/audios/Happy.mp3");
musicAudio.loop = true;
musicAudio.preload = true;
const popAudio = new Audio("assets/audios/pop.mp3");
const falseAudio = new Audio("assets/audios/error.mp3");
const trueAudio = new Audio("assets/audios/aplausos.mp3");


//CONTROL------------------------------------------------

musicAudio.play(); // Music


function reset() { // Return to initial values
    acc = 0;
    randomNumber = getRandomIntInclusive(1, 100);
    userNumber.value = "";
    registerWin.classList.add("hidden");
    boxTry.classList.remove("hidden");
    track.innerHTML = `Introduce aquí tu número del 1 al 100`;
    containerImgBubble.style.display = "block";
    btnTry.classList.remove("hidden");
    btnStart.classList.add("hidden");
    userNumber.classList.remove("hidden");
    imageBubble.src = bubbles[0].src;
    containerImgBubble.style.top = bubbles[0].top;
};

function bubbleCount() { // the bubble goes down and the number changes and disappears at the tenth attempt
    let n = acc;
    if (n < 10) {
        imageBubble.src = bubbles[n].src;
        containerImgBubble.style.top = bubbles[n].top;
    } else {
        popAudio.play();
        containerImgBubble.style.display = "none";
        track.innerHTML = "Upss GAME OVER ";
        btnTry.classList.add("hidden");
        btnStart.classList.remove("hidden");
        userNumber.classList.add("hidden");
    }
}

function createPlayer() { // New player and add to Score
    let newPlayer = document.createElement("li");
    newPlayer.classList.add("player-item")
    newPlayer.innerHTML = ` ${userName.value} - <strong>${acc} </strong> intentos`;
    players.appendChild(newPlayer);
    userName.value="";
}


function handlerBtnTry(e) { //Possibilities when trying a number
    e.preventDefault();

    if (parseInt(userNumber.value) < 101 && parseInt(userNumber.value) > 0) {

        if (randomNumber === parseInt(userNumber.value)) {
            track.innerHTML = `¡Enhorabuena has ACERTADO!`;
            trueAudio.play();
            registerWin.classList.remove("hidden");
            boxTry.classList.add("hidden");

        } else if (randomNumber < parseInt(userNumber.value)) {
            falseAudio.play();
            track.innerHTML = `${parseInt(userNumber.value)} es demasiado ALTO`;
            acc += 1;
            bubbleCount();
            userNumber.value = "";

        } else {
            track.innerHTML = `${parseInt(userNumber.value)} es demasiado BAJO`;
            falseAudio.play();
            acc += 1;
            bubbleCount();
            userNumber.value = "";
        }
    } else {
        track.innerHTML = `Introduce un número </br>mayor de 0 y menor que 100`;
        userNumber.value = "";
    }
}


function handlerBtnSave(e) {
    e.preventDefault();
    createPlayer();
    reset();
};

function handlerBtnStart(e) {
    e.preventDefault();
    reset();
};


btnTry.addEventListener("click", handlerBtnTry);
btnSave.addEventListener("click", handlerBtnSave);
btnStart.addEventListener("click", handlerBtnStart);