//CONTROL------------------------------------------------
musicAudio.play();// Music

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
  userName.value = "";
}


function handlerBtnTry(e) { //Possibilities when trying a number
  e.preventDefault();

  function print(data) { // paint the feedback
    falseAudio.play();
    track.innerHTML = `${parseInt(userNumber.value)} es demasiado ${data}`;
    acc += 1;
    bubbleCount();
    userNumber.value = "";
  }

  if (parseInt(userNumber.value) < 101 && parseInt(userNumber.value) > 0) {

    if (randomNumber === parseInt(userNumber.value)) {
      track.innerHTML = `¡Enhorabuena has ACERTADO!`;
      trueAudio.play();
      registerWin.classList.remove("hidden");
      boxTry.classList.add("hidden");

    }
    randomNumber < parseInt(userNumber.value) ? print("ALTO") : print("BAJO");

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

//Listeners
btnTry.addEventListener("click", handlerBtnTry);
btnSave.addEventListener("click", handlerBtnSave);
btnStart.addEventListener("click", handlerBtnStart);

