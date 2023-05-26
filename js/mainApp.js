export class Time {
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


let gray = "222222"
let white = "FFFFFF"
let green = "68c97a"
let yellow = "ffb53e"
let red  = "d92110"
let blue = "3ebbff"

function changeColor(color) {
  gray = "222222"
  white = "FFFFFF"
  green = "68c97a"
  yellow = "ffb53e"
  red  = "d92110"
  blue = "3ebbff"
  let texte = document.getElementById('job')
  if (color == "68c97a") { // green
    texte.style.visibility = "visible" ;
    texte.style.color = `#${color}` ;  
    texte.innerHTML = 'Repos'
  } else if (color == 'ffb53e') { // yellow 
    texte.style.visibility = "visible" ;
    texte.style.color = `#${color}` ;  
    texte.innerHTML = 'Chrono en pause'
  } else if (color == "d92110") { //red
    texte.style.visibility = "visible" ;
    texte.style.color = `#${color}` ;  
    texte.innerHTML = 'Travail'
  } else if (color == "3ebbff") { //blue
    texte.style.visibility = "hidden" ;
    texte.style.color = `#${blue}` ;  
  }
  
  let mainBox = document.getElementById('mainBox')
  mainBox.style.backgroundColor = `#${color}`
  mainBox.style.boxShadow = `6px -2px 33px -6px #${color}`
}



// 0 = 
// 1 = 
let resetSwitch = 0 
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
    console.log(`var pause : ${pause}`)
    if (pause == 0) {
      changeColor(red)
    } else if (pause == 1) {
      changeColor(green)
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
          changeColor(green)
          pause = 1
          document.querySelector("#btnLaunch").innerHTML = "Take break"
        } else {
          changeColor(blue)
          pause = 0 
          document.querySelector('#btnLaunch').innerHTML = "Launch"
        }
        clearInterval(inter)
        temps.time += 2 ; 
        temps.format = "00:02" ;
        document.querySelector('#time').innerHTML = temps.format
      }
    }, 1000)
  } else if (temps.time > 0){
      console.log('pause()')
      document.querySelector('#btnLaunch').innerHTML = "Resume"
      changeColor(yellow)
      clearInterval(inter)
      temps.time = Number(document.querySelector('#time').innerHTML.split(':')[1])+
      Number(document.querySelector('#time').innerHTML.split(':')[0])*60 
  }
});

let reset = document.querySelector('#btnReset') 
reset.addEventListener("click", function() {
  // Il faut modifier la couleur pour que ce soit en bleu 
  // Il faut modifier l'affichage du texte
  pause = 0
  clearInterval(inter)
  resetSwitch = 1
  changeColor(blue)
  document.querySelector('#btnLaunch').innerHTML = "Launch"
  temps.time = 300 ; 
  temps.format = "05:00"
  document.querySelector('#time').innerHTML = temps.showTime() ;
  console.log('reset() done')
})

let up = document.querySelector('#triangleTop')
up.addEventListener("click", function() {
  if (temps.time <= 3600-300) {
    temps.time += 300
  } else if (temps.time+300 > 3600) {
    temps.time = 3600
  }
  document.querySelector('#time').innerHTML = temps.showTime();
  console.log('up()')
})

let down = document.querySelector('#triangleBottom')
down.addEventListener("click", function() {
  if (temps.time-300 <= 300) {
    temps.time = 300
  } else if(temps.time-300 >= 300) {
    temps.time -= 300
  }
  document.querySelector('#time').innerHTML = temps.showTime() ;
  console.log('Down()')
})