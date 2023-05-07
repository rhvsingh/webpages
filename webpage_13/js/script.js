const mainSection = document.getElementById("main-section")
const sidebar = document.getElementById("sidebar")

function sidebarToggler() {
    mainSection.classList.toggle("active-sidebar")
    sidebar.classList.toggle("active-sidebar")
}

$(document).ready(function () {
    const examName = document.getElementById("exam-name")
    const examTime = document.getElementById("exam-time")
    const hourLeft = document.getElementById("hour-left")
    const minLeft = document.getElementById("min-left")
    const secLeft = document.getElementById("sec-left")
    const questionNumberShow = document.getElementById("question-number-show")
    const positiveMark = document.getElementById("positive-marking")
    const negativeMark = document.getElementById("negative-marking")
    const questionDisplayArea = document.getElementById("question-display-area")
    const markReviewButton = document.getElementById("mark-review-button")
    const clearResponseButton = document.getElementById("clear-response-button")
    const saveNextButton = document.getElementById("save-next-button")
    const activeTestName = document.getElementById("active-test-name")
    const questionButtonsShow = document.getElementById("question-buttons-show")

    let timeValue = 15
    let que_count = 0
    let que_numb = 1
    let userScore = 0
    let counter
    let counterLine
    let widthValue = 0
    let mainTimeCounter
    let sectionSelector = 0

    //Initialize
    examName.innerText = data.examName
    examTime.innerText = data.examTime
    positiveMark.innerText = "+" + data.positiveMark
    negativeMark.innerText = "-" + data.negativeMark

    mainTimerStart()

    markReviewButton.onclick = () => {
        let choice1 = document.getElementById("choice-1")
        let choice2 = document.getElementById("choice-2")
        let choice3 = document.getElementById("choice-3")
        let choice4 = document.getElementById("choice-4")

        if (choice1.checked === true) {
            data.examData[sectionSelector].questions[que_count].optionSelected =
                "0"
            data.examData[sectionSelector].questions[
                que_count
            ].optionSelectedClass = "no-marked-answered"
        } else if (choice2.checked === true) {
            data.examData[sectionSelector].questions[que_count].optionSelected =
                "1"
            data.examData[sectionSelector].questions[
                que_count
            ].optionSelectedClass = "no-marked-answered"
        } else if (choice3.checked === true) {
            data.examData[sectionSelector].questions[que_count].optionSelected =
                "2"
            data.examData[sectionSelector].questions[
                que_count
            ].optionSelectedClass = "no-marked-answered"
        } else if (choice4.checked === true) {
            data.examData[sectionSelector].questions[que_count].optionSelected =
                "3"
            data.examData[sectionSelector].questions[
                que_count
            ].optionSelectedClass = "no-marked-answered"
        } else {
            data.examData[sectionSelector].questions[que_count].optionSelected =
                "None"
            data.examData[sectionSelector].questions[
                que_count
            ].optionSelectedClass = "no-marked"
        }

        if (que_count < data.examData[sectionSelector].questions.length - 1) {
            //if question count is less than total question length
            que_count++ //increment the que_count value
            showQuetions(que_count) //calling showQestions function
        } else {
            console.log("End of questions in this sections")
        }
        showButtons(sectionSelector)
    }

    clearResponseButton.onclick = () => {
        let choice1 = document.getElementById("choice-1")
        let choice2 = document.getElementById("choice-2")
        let choice3 = document.getElementById("choice-3")
        let choice4 = document.getElementById("choice-4")

        choice1.checked = false
        choice2.checked = false
        choice3.checked = false
        choice4.checked = false
    }

    saveNextButton.onclick = () => {
        let choice1 = document.getElementById("choice-1")
        let choice2 = document.getElementById("choice-2")
        let choice3 = document.getElementById("choice-3")
        let choice4 = document.getElementById("choice-4")

        if (choice1.checked === true) {
            data.examData[sectionSelector].questions[que_count].optionSelected =
                "0"
            data.examData[sectionSelector].questions[
                que_count
            ].optionSelectedClass = "no-answered"
        } else if (choice2.checked === true) {
            data.examData[sectionSelector].questions[que_count].optionSelected =
                "1"
            data.examData[sectionSelector].questions[
                que_count
            ].optionSelectedClass = "no-answered"
        } else if (choice3.checked === true) {
            data.examData[sectionSelector].questions[que_count].optionSelected =
                "2"
            data.examData[sectionSelector].questions[
                que_count
            ].optionSelectedClass = "no-answered"
        } else if (choice4.checked === true) {
            data.examData[sectionSelector].questions[que_count].optionSelected =
                "3"
            data.examData[sectionSelector].questions[
                que_count
            ].optionSelectedClass = "no-answered"
        } else {
        }

        if (que_count < data.examData[sectionSelector].questions.length - 1) {
            //if question count is less than total question length
            que_count++ //increment the que_count value
            showQuetions(que_count) //calling showQestions function
        } else {
            console.log("End of questions in this sections")
        }
        showButtons(sectionSelector)
    }

    examRunner()

    function examRunner() {
        sectionSelector = 0
        que_count = 0
        showQuetions(que_count)
        showButtons(sectionSelector)
    }

    function mainTimerStart() {
        let convertedTime = toHoursAndMinutes(parseInt(data.examTime))
        let examSec = 0
        examMin = convertedTime.minutes
        examHour = convertedTime.hours

        hourLeft.innerText = "0" + examHour
        minLeft.innerText = examMin
        secLeft.innerText = "0" + examSec

        mainTimeCounter = setInterval(timer, 1000)

        function timer() {
            if (examSec == 0) {
                if (examMin == 0) {
                    if (examHour == 0) {
                        console.log("Time Up.")
                        examEndByTimeUp()
                        clearInterval(mainTimerStart)
                    } else {
                        examHour -= 1
                        examMin = 59
                        examSec = 59
                    }
                } else {
                    examMin -= 1
                    examSec = 59
                }
            } else {
                examSec -= 1
            }

            secLeft.innerText = examSec < 10 ? "0" + examSec : examSec
            minLeft.innerText = examMin < 10 ? "0" + examMin : examMin
            hourLeft.innerText = examHour < 10 ? "0" + examHour : examHour
        }
    }

    function toHoursAndMinutes(totalMinutes) {
        const hours = Math.floor(totalMinutes / 60)
        const minutes = totalMinutes % 60

        return { hours, minutes }
    }

    function examEndByTimeUp() {
        console.log("Exam End because of time")
    }

    function showQuetions(index) {
        //creating a new span and div tag for question and option and passing the value using array index
        let questionData = data.examData[sectionSelector].questions[index]

        questionNumberShow.innerText = questionData.numb

        let questionHTML = `
        ${questionData.question}
        <br />
        <ol>
            <li>${questionData.options[0]}</li>
            <li>${questionData.options[1]}</li>
            <li>${questionData.options[2]}</li>
            <li>${questionData.options[3]}</li>
        </ol>
        <div>
            <input type="radio" name="question" value="0" id="choice-1">
            <label for="choice-1">${questionData.options[0]}</label>
        </div>
        <div>
            <input type="radio" name="question" value="1" id="choice-2">
            <label for="choice-2">${questionData.options[1]}</label>
        </div>
        <div>
            <input type="radio" name="question" value="2" id="choice-3">
            <label for="choice-3">${questionData.options[2]}</label>
        </div>
        <div>
            <input type="radio" name="question" value="3" id="choice-4">
            <label for="choice-4">${questionData.options[3]}</label>
        </div>
        `

        data.examData[sectionSelector].questions[index].optionSelectedClass =
            "no-not-answered"

        questionDisplayArea.innerHTML = questionHTML
    }

    function showButtons(index) {
        let questionData = data.examData[index].questions
        let questionButton = ""
        for (let i = 0; i < questionData.length; i++) {
            questionButton +=
                '<button class="' +
                questionData[i].optionSelectedClass +
                '" disabled>' +
                questionData[i].numb +
                "</button>"
        }

        //5 options
        //no-not-answered
        //no-answered
        //no-marked
        //no-not-visited
        //no-marked-answered

        questionButtonsShow.innerHTML = questionButton
    }
})
