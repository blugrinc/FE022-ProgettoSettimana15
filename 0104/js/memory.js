let arrayAnimali = 
['🐱', '🦉', '🐾', '🦄', '🦋', '🐛', '🐝','🐬',
 '🐱', '🦉', '🐾', '🦄', '🦋', '🐛', '🐝','🐬']; /* 16 */

//libreria per icone
//https://html-css-js.com/html/character-codes/


let arrayComparison = []
document.body.onload = startGame();

var interval;  // mi serviranno alcune variabili - 1. interval 
var iconsFind = document.getElementsByClassName("find"); // 2. una agganciata alla classe find 
var modal = document.getElementById('modal'); // 3. una agganciata al'id modal 
var timer = document.querySelector(".timer"); // 4. una agganciata alla classe timer

function shuffle(a) { //una funzione che serve a mescolare in modo random
    var currentIndex = a.length;
    var temporaryValue, randomIndex;
  
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = a[currentIndex];
      a[currentIndex] = a[randomIndex];
      a[randomIndex] = temporaryValue;
    }
    return a;
  }
  
  function playAgain(){ // una funzione che rimuove la classe active e chiama la funzione startGame()
    modal.classList.remove("active");
    startGame();
  }
  
  function startGame(){  // la funzione startGame 
    clearInterval(interval); //che pulisce il timer, 
    arrayConfronto = [];  //dichiara un array vuoto,
  
    var arrayShuffle = shuffle(arrayAnimali);  //mescola casualmente l'array degli animali

  
    var lista = document.getElementById('griglia'); // aggancia il contenitore con id griglia
    while (lista.hasChildNodes()) {  
      lista.removeChild(lista.firstChild);
    } // pulisce tutti gli elementi che eventualmente contiene
  
    for(var i = 0; i < 16; i++){        // poi fa ciclo per creare i 24 div child    
      var box = document.createElement('div');
      var element = document.createElement('div');
      element.className = 'icon'; //aggiunge la class icon e 
      document.getElementById('griglia').appendChild(box).appendChild(element);
      element.innerHTML = arrayShuffle[i];  //l'elemento dell'array in base all'indice progressivo
    }
  
  
    startTimer();  // chiama la funzione timer e 
  
    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];// creo un array dei div con le stesse proprietà (sintassi spread) 

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax 
    // https://www.tutorialspoint.com/es6/es6_operators.htm

  
    for (var i = 0; i < icons.length; i++){
      icons[i].addEventListener("click", displayIcon);
      icons[i].addEventListener("click", openModal); //e le due funzioni definite sotto
    }
  }
  
  
  function displayIcon(){
  
    var icon = document.getElementsByClassName("icon");
    var icons = [...icon]; // è un operatore che serve per passare un array come argomento:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax 
    // https://www.tutorialspoint.com/es6/es6_operators.htm (cerca spread nella pagina)
  
    this.classList.toggle("show"); //mette/toglie la classe show
    arrayComparison.push(this); //aggiunge l'oggetto su cui ha cliccato all'array del confronto
  
    var len = arrayComparison.length;
    if(len === 2){  //se nel confronto ci sono due elementi
        //se sono uguali aggiunge la classe find
      if(arrayComparison[0].innerHTML === arrayComparison[1].innerHTML){
        arrayComparison[0].classList.add("find","disabled"); // find e disabled da definire su CSS
        arrayComparison[1].classList.add("find","disabled");
        arrayComparison = [];               
      } else {  //altrimenti (ha sbagliato) aggiunge solo la classe disabled
        icons.forEach(function(item){
          item.classList.add('disabled');
        });
        setTimeout(function(){ // con il timeout rimuove  la classe show per nasconderli
          arrayComparison[0].classList.remove("show"); // show su CSS 
          arrayComparison[1].classList.remove("show");
          icons.forEach(function(item){
            item.classList.remove('disabled');
            for(var i = 0; i < iconsFind.length; i++){
                iconsFind[i].classList.add("disabled");
              }
          });
          arrayComparison = [];
        },700); 
       }
    }
  }
  
  
  function openModal(){ //una funzione che viene mostrata alla fine quando sono tutte le risposte esatte  
    if (iconsFind.length == 16){
      clearInterval(interval);
      modal.classList.add("active");
      document.getElementById("tempoTrascorso").innerHTML = timer.innerHTML;
      closeModal();
    }
  }
  
  function closeModal(){ // una funzione che nasconde la modale alla fine e riavvia il gioco   
    closeicon.addEventListener("click", function(e){
      modal.classList.remove("active");
      startGame();
    });
  }
  

  function startTimer() { // una funzione che calcola il tempo e aggiorna il contenitore sotto
    var secondi = 0 
    var minuti = 0
    var ore = 0 
    interval = setInterval( 
        function(){ 
            timer.innerHTML = "tempo:" + minuti + "min" + secondi + "sec";
                    secondi += 1                    
                    if (secondi == 60){ 
                        minuti += 1;
                        secondi = 0;
                    } 
                    if (minuti == 60){
                        ore += 1;
                        minuti = 0;
                    }
                },1000);
    }