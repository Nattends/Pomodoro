class TimeParam {
    constructor(sec) {
      this.time = Number(sec) 
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
    
}

let tempsTravail = new TimeParam(0) 
let tempsPause = new TimeParam(0)
let cycles
setInterval(function() {
  cycles = Number(document.querySelector("#nbCycle").innerHTML)
  tempsTravail.time = Number(document.querySelector('#timeWork').innerHTML)
  tempsPause.time = Number(document.querySelector('#timePause').innerHTML)
  updateInfos()
},100)

let uptempsTravail = document.querySelector('#upWork')
uptempsTravail.addEventListener("click", function() {
  tempsTravail.time = Number(document.querySelector('#timeWork').innerHTML)
  if (tempsTravail.time == 60) {
    document.querySelector("#timeWork").innerHTML = 60
  } else if (tempsTravail.time+5 <= 60) {
    tempsTravail.time += 5
    document.querySelector('#timeWork').innerHTML = tempsTravail.time ; 
  }
})

let uptempsPause = document.querySelector('#upPause')
uptempsPause.addEventListener("click", function() {
  tempsPause.time = Number(document.querySelector('#timePause').innerHTML)
  if (tempsPause.time == 60) {
    document.querySelector("#timePause").innerHTML = 60
  } else if (tempsPause.time+5 <= tempsTravail.time) {
    tempsPause.time += 5
    document.querySelector('#timePause').innerHTML = tempsPause.time ; 
  }
})

let upNbCycles = document.querySelector('#upCycles')
upNbCycles.addEventListener("click", function() {
  let cycles = Number(document.querySelector('#nbCycle').innerHTML)
  cycles += 1 
  if (cycles <= 10) {
    document.querySelector('#nbCycle').innerHTML = cycles ; 
  } else {
    document.querySelector("#nbCycle").innerHTML = 10 ; 
  }
})


let downTempsTravail = document.querySelector("#downWork")
downTempsTravail.addEventListener('click', function() {
  tempsTravail.time = Number(document.querySelector("#timeWork").innerHTML)
  if (tempsTravail.time-5 >= 5) {
    document.querySelector("#timeWork").innerHTML = tempsTravail.time-5 ; 
  } 
})

let downTempsPause = document.querySelector("#downPause")
downTempsPause.addEventListener("click", function() {
  tempsPause.time = Number(document.querySelector("#timePause").innerHTML)
  if (tempsPause.time-5 >= 5) {
    document.querySelector("#timePause").innerHTML = tempsPause.time-5
  }
})


let downNbCycles = document.querySelector("#downCycles")
downNbCycles.addEventListener("click", function() {
  let cycles = Number(document.querySelector('#nbCycle').innerHTML)
  cycles -= 1 
  if (cycles >= 1) {
    document.querySelector('#nbCycle').innerHTML = cycles ; 
  } else {
    document.querySelector("#nbCycle").innerHTML = 1 ; 
  }

})


function updateInfos() {
  document.querySelector("#infosTravail").innerHTML = `${tempsTravail.time*cycles}min de travail`
  document.querySelector("#infosPause").innerHTML = `${tempsPause.time*cycles}min de pause`
  document.querySelector("#infosTotal").innerHTML = `${formatTime(tempsTravail, tempsPause, cycles)} au total`
}

function formatTime(tempsTravail, tempsPause, cycles) {
  let minTotal = Number(tempsTravail.time*cycles+tempsPause.time*cycles)
  let min = minTotal%60
  let h = Math.floor(minTotal/60)
  if (h < 10 && min < 10) {
    return `0${h}h0${min}`
  } else if (h<10) {
    return `0${h}h${min}`
  } else if (min<10) {
    return `${h}h0${min}`
  } else {
    return `${h}h${min}`
  }
}