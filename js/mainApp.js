class Time {
  constructor(sec) {
    this.time = Number(sec) 
    this.format = this.showTime()
  }

  addTime(sec) {
    this.time += sec
    
    if (this.time > 3600) {
      this.time = 3600
    }
    this.format = this.showTime()
  }
  
  removeTime(sec=1) {
    if (this.time < sec) {
      this.time = 0
    } else {
      this.time -= sec 
    }
    this.format = this.showTime()
  }

  showTime() {
    let texte = ""
    let min = Math.floor(this.time/60)
    let sec = this.time - (min*60)
    if (String(min).length == 1) {
      texte += `0${min}`
    } else {
      texte += `${min}`
    }
    texte += `:`
    if(String(sec).length == 1) {
      texte += `0${sec}`
    } else {
      texte += `${sec}`
    }
    this.format = texte
    return texte 
  }

  launchTimer() {
    this.removeTime(1);
    document.querySelector('#time').innerHTML = this.showTime() ;
  }
} 



let Color = {
  gray : "222222",
  white : "FFFFFF",
  green : "68c97a",
  yellow : "ffb53e",
  red  : "d92110",
  blue : "3ebbff" 

}

function changeColor(color) {
  let texte = document.getElementById('job')
  if (color == Color.green) { // green
    texte.style.visibility = "visible" ;
    texte.style.color = `#${color}` ;  
  } else if (color == Color.yellow) { // yellow 
    texte.style.visibility = "visible" ;
    texte.style.color = `#${color}` ;  
    texte.innerHTML = 'Chrono en pause'
  } else if (color == Color.red) { //red
    texte.style.visibility = "visible" ;
    texte.style.color = `#${color}` ;  
    texte.innerHTML = 'Travail'
  } else if (color == Color.blue) { //blue
    texte.style.visibility = "hidden" ;
    texte.style.color = `#${color}` ;  
  }
  
  let mainBox = document.getElementById('mainBox')
  mainBox.style.backgroundColor = `#${color}`
  mainBox.style.boxShadow = `6px -2px 33px -6px #${color}`
}



// 0 = 
// 1 = 
let resetSwitch = 0 
let nbPause = 0
let temps = new Time(Number(document.querySelector('#time').innerHTML.split(':')[1])+
Number(document.querySelector('#time').innerHTML.split(':')[0])*60) 
/* setInterval(function() {
  if (temps.time == 0 && resetSwitch == 0 && pause == 0) {
    changeColor(green)
  } 
}, 100) 
*/

let pause = 0 
 
var inter
let launch = document.querySelector('#btnLaunch')
launch.addEventListener("click", function() {
  resetSwitch = 0 
  temps.time = Number(document.querySelector('#time').innerHTML.split(':')[1])+
  Number(document.querySelector('#time').innerHTML.split(':')[0])*60
  let doc = document.querySelector('#btnLaunch').innerHTML
  if ((doc == "Launch" ||
  doc == "Resume" ||
  doc == "Take break") && 
  temps.time > 0) {
    document.querySelector('#btnLaunch').innerHTML = "Pause"
    if (pause == 0) {
      changeColor(Color.red)
    } else if (pause == 1 || longBreak == 2) {
      changeColor(Color.green)
    }

    inter = setInterval(function() {
      if (temps.time > 0) {
        resetSwitch = 0 
        temps.launchTimer()
      }

      if (temps.time <= 0) {
        var audio = new Audio("src/audio.wav")
        audio.play()
        if (pause == 0) {
          changeColor(Color.green)
          pause = 1
          nbPause += 1 
          document.querySelector("#btnLaunch").innerHTML = "Take break"
          if (nbPause == 4) {
            document.querySelector("#job").innerHTML = "Take long break"
            nbPause = 0 
            temps.time += 900 ; 
            temps.format = "15:00" ;
            document.querySelector('#time').innerHTML = temps.format
          } else {
            document.querySelector("#job").innerHTML = "Take short break"
            temps.time += 300 ; 
            temps.format = "05:00" ;
            document.querySelector('#time').innerHTML = temps.format
          }
        } else {
          changeColor(Color.blue)
          pause = 0 
          document.querySelector('#btnLaunch').innerHTML = "Launch"
          temps.time += 1500 ; 
          temps.format = "25:00" ;
          document.querySelector('#time').innerHTML = temps.format
        }
        clearInterval(inter)

      }

    }, 1000)
  } else if (temps.time > 0){
      document.querySelector('#btnLaunch').innerHTML = "Resume"
      changeColor(Color.yellow)
      clearInterval(inter)
      temps.time = Number(document.querySelector('#time').innerHTML.split(':')[1])+
      Number(document.querySelector('#time').innerHTML.split(':')[0])*60 
  }
  
});

let reset = document.querySelector('#btnReset') 
reset.addEventListener("click", function() {
  // Il faut modifier la couleur pour que ce soit en bleu 
  // Il faut modifier l'affichage du texte
  changeColor(Color.blue)
  temps.time = 1500 
  temps.format = "25:00"
  pause = 0 ; resetSwitch = 1
  clearInterval(inter)
  document.querySelector('#btnLaunch').innerHTML = "Launch"
  document.querySelector('#time').innerHTML = temps.showTime() ;
})

let up = document.querySelector('#triangleTop')
up.addEventListener("click", function() {
  if (temps.time <= 3600-300) {
    temps.time += 300
  } else if (temps.time+300 > 3600) {
    temps.time = 3600
  }
  document.querySelector('#time').innerHTML = temps.showTime();
})

let down = document.querySelector('#triangleBottom')
down.addEventListener("click", function() {
  if (temps.time-300 <= 300) {
    temps.time = 300
  } else if(temps.time-300 >= 300) {
    temps.time -= 300
  }
  document.querySelector('#time').innerHTML = temps.showTime() ;
})