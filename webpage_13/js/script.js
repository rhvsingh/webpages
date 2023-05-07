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
    const sectionSwitcherButtons = document.getElementById(
        "section-switcher-buttons"
    )
    const questionNumberShow = document.getElementById("question-number-show")
    const positiveMark = document.getElementById("positive-marking")
    const negativeMark = document.getElementById("negative-marking")
    const eachQuestionMin = document.getElementById("each-question-min")
    const eachQuestionSec = document.getElementById("each-question-sec")
    const questionDisplayArea = document.getElementById("question-display-area")
    const markReviewButton = document.getElementById("mark-review-button")
    const clearResponseButton = document.getElementById("clear-response-button")
    const saveNextButton = document.getElementById("save-next-button")
    const activeTestName = document.getElementById("active-test-name")
    const questionButtonsShow = document.getElementById("question-buttons-show")
    const submitTestButton = document.getElementById("submit-test-button")
    const resultModal = new bootstrap.Modal(
        document.getElementById("result-modal")
    )
    const totalScoreContainer = document.getElementById("total-score-container")
    const correctAnswerContainer = document.getElementById(
        "correct-answer-container"
    )
    const wrongAnswerContainer = document.getElementById(
        "wrong-answer-container"
    )

    let timeValue = 15
    let que_count = 0
    let que_numb = 1
    let userScore = 0
    let counter
    let counterLine
    let widthValue = 0
    let mainTimeCounter
    let eachTimeCounter
    let sectionSelector = 0

    //Initialize
    examName.innerText = data.examName
    examTime.innerText = data.examTime
    positiveMark.innerText = "+" + data.positiveMark
    negativeMark.innerText = "-" + data.negativeMark
    examRunner()

    $(".test").on("click", function (e) {
        sectionActivator(parseInt(this.id))
    })

    markReviewButton.onclick = () => {
        let choice1 = document.getElementById("choice-1")
        let choice2 = document.getElementById("choice-2")
        let choice3 = document.getElementById("choice-3")
        let choice4 = document.getElementById("choice-4")

        if (
            choice1.checked === true ||
            choice2.checked === true ||
            choice3.checked === true ||
            choice4.checked === true
        ) {
            buttonClassValueSetter("no-marked-answered")
        } else {
            buttonClassValueSetter("no-marked")
        }

        if (que_count < data.examData[sectionSelector].questions.length - 1) {
            //if question count is less than total question length
            que_count++ //increment the que_count value
            showQuetions(que_count) //calling showQestions function
        } else {
            //console.log("End of questions in this sections")
            sectionSwitcher()
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
        if (
            choice1.checked === true ||
            choice2.checked === true ||
            choice3.checked === true ||
            choice4.checked === true
        ) {
            buttonClassValueSetter("no-answered")
        } else {
            buttonClassValueSetter("no-not-answered")
        }

        if (que_count < data.examData[sectionSelector].questions.length - 1) {
            //if question count is less than total question length
            que_count++ //increment the que_count value
            showQuetions(que_count) //calling showQestions function
        } else {
            //console.log("End of questions in this sections")
            sectionSwitcher()
        }
        showButtons(sectionSelector)
    }

    submitTestButton.onclick = () => {
        if (confirm("Are you sure you want to submit?")) {
            clearInterval(mainTimeCounter)
            clearInterval(eachTimeCounter)

            let totalScore = 0
            let totalCorrectAnswer = 0
            let totalWrongAnswer = 0
            let positive = data.positiveMark
            let negative = data.negativeMark

            for (let i = 0; i < data.examData.length; i++) {
                let questions = data.examData[i].questions
                console.log(questions)
                for (let j = 0; j < questions.length; j++) {
                    if (questions[j].optionSelectedClass == "no-answered") {
                        console.log(questions[j].optionSelected, questions[j])
                        if (
                            questions[j].answer ==
                            questions[j].options[
                                parseInt(questions[j].optionSelected)
                            ]
                        ) {
                            totalScore = totalScore + positive
                            totalCorrectAnswer += 1
                        } else {
                            totalScore = totalScore - negative
                            totalWrongAnswer += 1
                        }
                    }
                }
                //correct answer
                //wrong
            }

            totalScoreContainer.innerText = totalScore
            correctAnswerContainer.innerText = totalCorrectAnswer
            wrongAnswerContainer.innerText = totalWrongAnswer

            resultModal.show()
        }
    }

    function buttonClassValueSetter(nameOfClass) {
        let choice1 = document.getElementById("choice-1")
        let choice2 = document.getElementById("choice-2")
        let choice3 = document.getElementById("choice-3")
        let choice4 = document.getElementById("choice-4")

        if (choice1.checked === true) {
            data.examData[sectionSelector].questions[que_count].optionSelected =
                "0"
            data.examData[sectionSelector].questions[
                que_count
            ].optionSelectedClass = nameOfClass
        } else if (choice2.checked === true) {
            data.examData[sectionSelector].questions[que_count].optionSelected =
                "1"
            data.examData[sectionSelector].questions[
                que_count
            ].optionSelectedClass = nameOfClass
        } else if (choice3.checked === true) {
            data.examData[sectionSelector].questions[que_count].optionSelected =
                "2"
            data.examData[sectionSelector].questions[
                que_count
            ].optionSelectedClass = nameOfClass
        } else if (choice4.checked === true) {
            data.examData[sectionSelector].questions[que_count].optionSelected =
                "3"
            data.examData[sectionSelector].questions[
                que_count
            ].optionSelectedClass = nameOfClass
        } else {
            data.examData[sectionSelector].questions[que_count].optionSelected =
                "None"
            data.examData[sectionSelector].questions[
                que_count
            ].optionSelectedClass = nameOfClass
        }
    }

    function sectionButtonCreater() {
        let dataForButton = data.examData
        let createdButtons = ""
        for (let i = 0; i < dataForButton.length; i++) {
            createdButtons +=
                '<button class="test btn btn-sm bg-primary rounded-1 text-white" title="' +
                dataForButton[i].section +
                '" id="' +
                i +
                '">' +
                dataForButton[i].section +
                "</button>"
        }

        sectionSwitcherButtons.innerHTML = createdButtons
    }

    function sectionActivator(index) {
        sectionSelector = index
        que_count = 0
        showQuetions(que_count)
        showButtons(sectionSelector)
    }

    function sectionSwitcher() {
        let sectionLength = data.examData.length
        if (sectionSelector < sectionLength - 1) {
            sectionSelector += 1
        } else {
            sectionSelector = 0
        }
        que_count = 0
        showQuetions(que_count)
        showButtons(sectionSelector)
    }

    function examRunner() {
        sectionSelector = 0
        que_count = 0
        sectionButtonCreater()
        showQuetions(que_count)
        showButtons(sectionSelector)
        mainTimerStart()
    }

    function toHoursAndMinutes(totalMinutes) {
        const hours = Math.floor(totalMinutes / 60)
        const minutes = totalMinutes % 60

        return { hours, minutes }
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

    function eachQuestionTime() {
        let min = 00
        let sec = 00

        buttonStart.onclick = function () {
            clearInterval(eachTimeCounter)
            eachTimeCounter = setInterval(startTimer, 1000)
        }

        buttonReset.onclick = function () {
            clearInterval(eachTimeCounter)
            sec = "00"
            min = "00"
            eachQuestionSec.innerText = sec
            eachQuestionMin.innerText = min
        }

        function startTimer() {
            sec++

            if (sec <= 9) {
                eachQuestionSec.innerText = "0" + sec
            }
            if (sec > 9) {
                eachQuestionSec.innerText = sec
            }
            if (sec > 59) {
                console.log("seconds")
                min++
                eachQuestionMin.innerText = "0" + min
                sec = 0
                eachQuestionSec.innerText = "0" + 0
            }
            if (min > 9) {
                eachQuestionMin.innerText = min
            }
        }
    }

    function examEndByTimeUp() {
        console.log("Exam End because of time")
    }

    function showQuetions(index) {
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
            <input type="radio" name="question" value="0" ${
                0 == parseInt(questionData.optionSelected) && "checked"
            } id="choice-1">
            <label for="choice-1">${questionData.options[0]}</label>
        </div>
        <div>
            <input type="radio" name="question" value="1" ${
                1 == parseInt(questionData.optionSelected) && "checked"
            } id="choice-2">
            <label for="choice-2">${questionData.options[1]}</label>
        </div>
        <div>
            <input type="radio" name="question" value="2" ${
                2 == parseInt(questionData.optionSelected) && "checked"
            } id="choice-3">
            <label for="choice-3">${questionData.options[2]}</label>
        </div>
        <div>
            <input type="radio" name="question" value="3" ${
                3 == parseInt(questionData.optionSelected) && "checked"
            } id="choice-4">
            <label for="choice-4">${questionData.options[3]}</label>
        </div>
        `

        data.examData[sectionSelector].questions[index].optionSelectedClass =
            data.examData[sectionSelector].questions[index]
                .optionSelectedClass === ""
                ? "no-not-answered"
                : data.examData[sectionSelector].questions[index]
                      .optionSelectedClass

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
        activeTestName.innerText = data.examData[index].section
    }
})
