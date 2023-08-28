const canvasElement = document.getElementById("canvas_element")
const resetButton = document.getElementById("reset_button")
const cntx = canvasElement.getContext("2d")
const colorArray = ["#4287f5", "#66f542", "#e9f542", "#f54242"]

let offsetX = canvasElement.offsetLeft
let offsetY = canvasElement.offsetTop
let scrollX = canvasElement.scrollLeft
let scrollY = canvasElement.scrollTop

function circleCreater(yDistance, colorIndex, changeColor = 0) {
    cntx.beginPath()
    cntx.arc(100, yDistance, 50, 0, 2 * Math.PI)
    if (changeColor == 1) {
        cntx.fillStyle = "#2f3030"
    } else {
        cntx.fillStyle = colorArray[colorIndex]
    }
    cntx.fill()
    cntx.lineWidth = "3"
    cntx.stroke()
}

function arrowCreater(x, finalValue = 400) {
    cntx.beginPath()

    cntx.moveTo(finalValue, x)
    x -= 25
    cntx.lineTo(finalValue + 25, x)
    cntx.lineTo(finalValue + 25, x + 15.5)
    cntx.lineTo(finalValue + 100, x + 15.5)
    x += 15
    cntx.lineTo(finalValue + 100, x + 15.5)
    cntx.lineTo(finalValue + 25, x + 15.5)
    x += 10
    cntx.lineTo(finalValue + 25, x + 20)
    cntx.lineTo(finalValue, x)

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
    //console.log("resetCanvas")
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
            arrowMover(i)
        }
        initialValue += 125
    }
}

function arrowShifter(x, arrowNo, finalValue = 400) {
    cntx.beginPath()

    cntx.moveTo(finalValue, x)
    x -= 25
    cntx.lineTo(finalValue + 25, x)
    cntx.lineTo(finalValue + 25, x + 15.5)
    cntx.lineTo(finalValue + 100, x + 15.5)
    x += 15
    cntx.lineTo(finalValue + 100, x + 15.5)
    cntx.lineTo(finalValue + 25, x + 15.5)
    x += 10
    cntx.lineTo(finalValue + 25, x + 20)
    cntx.lineTo(finalValue, x)

    cntx.fillStyle = "black"
    cntx.lineJoin = "melter"
    cntx.fill()
    cntx.stroke()

    if (finalValue > 150) {
        finalValue -= 1
        setTimeout(function () {
            arrowMover(arrowNo, 1)
            arrowShifter(x, arrowNo, finalValue)
        }, 5)
    } else {
        //change color of the circle
        let initialValue = 75

        for (let i = 0; i < 4; i++) {
            if (i == arrowNo) {
                circleCreater(initialValue, i, 1)
            } else {
                circleCreater(initialValue, i)
            }
            initialValue += 125
        }
    }
}

function arrowMover(arrowNo, checker = 0) {
    cntx.clearRect(0, 0, canvasElement.width, canvasElement.height)
    let initialValue = 75

    for (let i = 0; i < 4; i++) {
        circleCreater(initialValue, i)

        if (i != arrowNo) {
            arrowCreater(initialValue)
        } else {
            if (checker == 0) {
                arrowShifter(initialValue, arrowNo)
            }
        }

        initialValue += 125
    }
}

canvasElement.addEventListener("mousedown", function (e) {
    handleMouseDown(e)
})
