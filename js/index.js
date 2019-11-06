const url = "http://localhost:3000/monsters"

document.addEventListener("DOMContentLoaded", () => {

    fetchMonsters()

    getMonsterForm().addEventListener("submit", createMonster)

    getForwardButton().addEventListener("click", pageUp)

    getBackButton().addEventListener("click", pageDown)
})

let i = 0

function fetchMonsters() {
    fetch(`${url}/?_limit=50&_page=${i}`)
    .then(resp => resp.json())
    .then(monsterArray => monsterArray.forEach(monster => renderMonsters(monster)))
}

function getMonsterForm() {
    const monsterForm = document.querySelector("form")
    return monsterForm 
}

function getMonsterContainer() {
    const monsterContainer = document.querySelector("#monster-container")
    return monsterContainer 
}

function getForwardButton() {
    const forward = document.querySelector("#forward")
    return forward 
}

function pageUp() {
    i++
    getMonsterContainer().innerHTML = "" 
    fetchMonsters()
}

function getBackButton() {
    const back = document.querySelector("#back")
    return back 
}

function pageDown () {
    i--
    getMonsterContainer().innerHTML = ""
    fetchMonsters() 
} 

function renderMonsters(monster){
    const monsterContainer = document.querySelector("#monster-container")
    const monsterDiv = document.createElement("div")
    monsterContainer.append(monsterDiv)

    const header = document.createElement("h2")
    header.innerText = monster.name 

    const subHeader = document.createElement("h4")
    subHeader.innerText = `Age: ${monster.age}`

    const ptag = document.createElement("p")
    ptag.innerText = `Bio: ${monster.description}`

    monsterDiv.append(header, subHeader, ptag)
}

function createMonster(e) { 
    e.preventDefault()

    getMonsterForm().reset()

    let data = {
        name: e.target.name.value, 
        age: e.target.age.value, 
        description: e.target.description.value
    }
    
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
    
    fetch (url, configObj)
        // .then(resp => reponse)
        .then(resp => resp.json()) 
        .then(data => {
            renderMonsters(data)
        })
        // .catch(error => alert(error))
}