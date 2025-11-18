function addClass(containerDiv, className) {
    containerDiv.classList.add(className)
}

function generatePattern(dimension, boxes) {
    const pattern = []
    while (pattern.length < boxes) {
        const randowNumber = Math.floor(1 + Math.random() * dimension * dimension)
        if (!pattern.includes(randowNumber)) {
           pattern.push(randowNumber) 
        }
    }
    return pattern
}

function createMatrix(dimension, container, boxes, seconds) {
    container.innerHTML = ""
    let counter = 1 

    let revealed = false

    let rights = 0 
    let wrongs = 0

    // Mostrar valores iniciales
    document.getElementById("rights").textContent = rights
    document.getElementById("wrongs").textContent = wrongs
    
    const pattern = generatePattern(dimension, boxes)

    for (let i = 0; i < dimension; i++) {
        const div = document.createElement("div")
        addClass(div, "demo")
        for (let j = 0; j < dimension; j++) {
            const content = document.createElement("div")
            addClass(content, "content")
            content.textContent = counter

            // codigo de casilla correcta
            if (pattern.includes(counter)) {
                addClass(content, "highlight")

                content.onclick = function () {
                    if (!revealed) return; // No permitir clic antes de ocultar

                    // mensaje de ganar
                    rights++
                    document.getElementById("rights").textContent = rights

                    content.style.backgroundColor = "lightgreen"
                    content.style.pointerEvents = "none" // Deshabilitar segundo clic

                    if (rights === pattern.length) {
                        alert("¡Ganaste!")
                        createMemoryGame()
                    }
                }

            } else {
                // codigo de casilla incorrecta
                content.onclick = function () {
                    if (!revealed) return;

                    wrongs++
                    document.getElementById("wrongs").textContent = wrongs

                    content.style.backgroundColor = "red"
                    content.style.pointerEvents = "none"
                }
            }

            div.appendChild(content)
            counter++
        }

        container.appendChild(div)
    }

    // Ocultar las casillas mostradas inicialmente
    const highlights = document.querySelectorAll(".highlight")

    setTimeout(() => {
        highlights.forEach(element => element.classList.remove("highlight"))
        revealed = true
    }, seconds * 1000)
}

function createMemoryGame() {
    const container = document.getElementById('game')
    const dimensionValue = parseInt(document.getElementById('dimension').value)
    const boxesValue = document.getElementById('boxes').value
    const secondsValue = document.getElementById('seconds').value

    createMatrix(dimensionValue, container, boxesValue, secondsValue)
}

document.addEventListener("DOMContentLoaded", function () {
    console.log("Ya se cargo este DOM")
    const btn = document.getElementById('generate-matrix')
    btn.addEventListener('click', createMemoryGame)
})

