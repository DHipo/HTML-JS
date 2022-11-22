//get element
let div = document.getElementById("intial")
let inp = document.getElementById("times")
let btn = document.getElementById("btn")
//do a fragment
let fr = document.createDocumentFragment()

document.body.append(document.createElement("hr"))

//Style
btn.style.borderRadius = "5%"
btn.style.background = "grey"
btn.style.border = "none"
btn.style.height = "25px"
btn.style.width = "75px"

inp.style.border = "none"
inp.placeholder = "Ingrese un numero" 
inp.style.width = "8%"

div.style.textAlign = "CENTER"
div.style.fontFamily = "'Roboto Mono', monospace"
div.style.marginTop = "5%"

const press = function(){
    if(inp.value < 10){
        for(let i=1; i<=inp.value; i++){
            let nwh1 = document.createElement("h1")
            nwh1.innerHTML = i + "<br>"
            fr.appendChild(nwh1)
            div.append(fr)
        }
    }else{
        alert("Demasiados numeros")
    }
}

inp.onkeydown = function(key){
    if(key.keyCode === 13){
        press()
    }
}

btn.onclick = function(){
    let div = document.createElement("div")
    let nwh1 = document.createElement("h1")
    nwh1.innerHTML = "-elemento agregado-"
    div.appendChild(nwh1)
}