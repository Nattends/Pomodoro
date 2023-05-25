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


gray = "222222"
white = "FFFFFF"
green = "68c97a"
yellow = "ffb53e"
red  = "d92110"
blue = "3ebbff"

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
  }
  
  let mainBox = document.getElementById('mainBox')
  mainBox.style.backgroundColor = `#${color}`
  mainBox.style.boxShadow = `6px -2px 33px -6px #${color}`
}

let play = 0
let obj = new Time(Number(document.querySelector('#time').innerHTML.split(':')[1])+
Number(document.querySelector('#time').innerHTML.split(':')[0])*60) 
setInterval(function() {
  if (obj.time == 0) {
    changeColor(green)
    document.querySelector('#btnLaunch').innerHTML = "Launch"
    play = 0 
  } 
})


var inter
let launch = document.querySelector('#btnLaunch')
launch.addEventListener("click", function() {
  obj.time = Number(document.querySelector('#time').innerHTML.split(':')[1])+
  Number(document.querySelector('#time').innerHTML.split(':')[0])*60
  if (document.querySelector('#btnLaunch').innerHTML == "Launch" ||
  document.querySelector('#btnLaunch').innerHTML == "Resume") {
    document.querySelector('#btnLaunch').innerHTML = "Pause"
    changeColor(red)
    play = 1
    inter = setInterval(function() {
      if (obj.time > 0 && play == 1) {
        obj.launchTimer()
      }
      if (obj.time < 0 || play == 0) {
        clearInterval(inter)
      }
    }, 1000)
    } else {
      document.querySelector('#btnLaunch').innerHTML = "Resume"
      changeColor(yellow)
      clearInterval(inter)
      play = 1 
      obj.time = Number(document.querySelector('#time').innerHTML.split(':')[1])+
      Number(document.querySelector('#time').innerHTML.split(':')[0])*60 
      console.log(obj.time)
    }
});

let reset = document.querySelector('#btnReset') 
reset.addEventListener("click", function() {
  changeColor(blue)
  clearInterval(inter)
  document.querySelector('#btnLaunch').innerHTML = "Launch"
  obj.time = 0 ; 
  obj.format = "00:00"
  document.querySelector('#time').innerHTML = obj.showTime() ;
  console.log('reset() done')
})



let up = document.querySelector('#triangleTop')
up.addEventListener("click", function() {
  if (obj.time == 0) {
    changeColor(blue)
  }
  if (obj.time <= 3600-300) {
    obj.time += 300
  }
  document.querySelector('#time').innerHTML = obj.showTime();
  console.log('up()')
})

let down = document.querySelector('#triangleBottom')
down.addEventListener("click", function() {
  if (obj.time-300 >= 300) {
    obj.time -= 300
  } 
  document.querySelector('#time').innerHTML = obj.showTime() ;
  console.log('Down()')
})