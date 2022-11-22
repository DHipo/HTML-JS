let addplayer = document.getElementById("Add")
let startTournament = document.getElementById("Start")
let DShow = document.getElementById("div-INPUT")
let DPlayer = document.getElementById("div-Players")
let newh2 = document.createElement("h2")
let newh1 = document.createElement("h1")
let inp = document.getElementById("Input")
let names = []
let cant = 0
let cant1 = 0      

function play(){
    newh1.innerHTML = "Tournament" + "<br>"
    newh1.style.textDecoration = "underline"
    DShow.appendChild(newh1)

    for(players in names){
        let numRa = Math.floor(Math.random() % names.length)
        console.log("players")
        newh2.innerText = names[numRa]
        DShow.append(newh2)
    }
}

function press(){
    showUp()
    getPlayers()
    if (cant != 10)
        newh2.innerHTML = "Remaind players to put " + (10-cant) + "/10"
    else newh2.innerHTML = "Players full!"
    DShow.appendChild(newh2)
    inp.value = ""
}

function getPlayers(){
    if(cant == 10)
        return

    names[cant] = inp.value
    console.log(names)
    cant++;
}

inp.onkeydown = function(key){
    if(key.keyCode === 13){
        press()
        console.log("pressed")
    }
}

function matchUp(){
}

function showUp(){
    let playerh2 = document.createElement("h2")
    if (cant1 < 10){
        playerh2.innerHTML = inp.value
        playerh2.className = "player-h2"
        DPlayer.append(playerh2)
        cant1++;
    }
}