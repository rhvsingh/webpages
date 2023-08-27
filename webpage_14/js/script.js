const canvasElement = document.getElementById("canvas_element")
const resetButton = document.getElementById("reset_button")
const cntx = canvasElement.getContext("2d")
const colorArray = ["#4287f5", "#66f542", "#e9f542", "#f54242"]

let offsetX = canvasElement.offsetLeft
let offsetY = canvasElement.offsetTop
let scrollX = canvasElement.scrollLeft
let scrollY = canvasElement.scrollTop

function circleCreater(yDistance, colorIndex) {
    cntx.beginPath()
    cntx.arc(100, yDistance, 50, 0, 2 * Math.PI)
    cntx.fillStyle = colorArray[colorIndex]
    cntx.fill()
    cntx.lineWidth = "3"
    cntx.stroke()
}

function arrowCreater(x) {
    cntx.beginPath()

    cntx.moveTo(400, x)
    x -= 25
    cntx.lineTo(425, x)
    cntx.lineTo(425, x + 15.5)
    cntx.lineTo(500, x + 15.5)
    x += 15
    cntx.lineTo(500, x + 15.5)
    cntx.lineTo(425, x + 15.5)
    x += 10
    cntx.lineTo(425, x + 20)
    cntx.lineTo(400, x)

    cntx.fillStyle = "black"
    cntx.lineJoin = "melter"
    cntx.fill()
    cntx.stroke()
}

function createCanvasElement() {
    let initialValue = 75

    for (let i = 0; i < 4; i++) {
        circleCreater(initialValue, i)
        arrowCreater(initialValue)
        initialValue += 125
    }
}

createCanvasElement()

function resetCanvas() {
    console.log("resetCanvas")
    cntx.clearRect(0, 0, canvasElement.width, canvasElement.height)
    createCanvasElement()
}

resetButton.onclick = () => {
    resetCanvas()
}

function handleMouseDown(e) {
    e.preventDefault()

    let mouseX = parseInt(e.clientX - offsetX)
    let mouseY = parseInt(e.clientY - offsetY)

    let initialValue = 75

    for (let i = 0; i < 4; i++) {
        circleCreater(initialValue, i)
        if (cntx.isPointInPath(mouseX, mouseY)) {
            /* alert("Clicked") */
            arrowMover(initialValue, i)
            console.log(mouseX, mouseY, i, initialValue)
        }
        initialValue += 125
    }
}

function arrowMover(x, arrowNo) {
    /* cntx.translate(200, x) */
    console.log(x, arrowNo)

    cntx.clearRect(0, 0, canvasElement.width, canvasElement.height)
    let initialValue = 75

    for (let i = 0; i < 4; i++) {
        circleCreater(initialValue, i)
        if (i != arrowNo) {
            arrowCreater(initialValue)
        }
        initialValue += 125
    }
}

canvasElement.addEventListener("mousedown", function (e) {
    handleMouseDown(e)
})

//To check git sign commit
