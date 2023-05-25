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
    const resultShow = document.getElementById("result-show")

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

        eachTimeClear()

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

        eachTimeClear()

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
            eachTimeClear()
            finalResult()
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
        eachTimeClear()
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
        eachTimeClear()
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

    function eachTimeClear() {
        clearInterval(eachTimeCounter)
        eachQuestionSec.innerText = "00"
        eachQuestionMin.innerText = "00"
    }

    function eachQuestionTime(index) {
        let min = 0
        let sec = 0

        let timeSpent =
            data.examData[sectionSelector].questions[index].timeSpent

        min = timeSpent.min
        sec = timeSpent.sec

        eachTimeCounter = setInterval(startTimer, 1000)

        /* buttonStart.onclick = function () {
            clearInterval(eachTimeCounter)
            
        }

        buttonReset.onclick = function () {
            clearInterval(eachTimeCounter)
            sec = "00"
            min = "00"
            eachQuestionSec.innerText = sec
            eachQuestionMin.innerText = min
        } */

        function startTimer() {
            sec++

            if (sec <= 9) {
                eachQuestionSec.innerText = "0" + sec
            }
            if (sec > 9) {
                eachQuestionSec.innerText = sec
            }
            if (sec > 59) {
                min++
                eachQuestionMin.innerText = "0" + min
                sec = 0
                eachQuestionSec.innerText = "0" + 0
            }
            if (min > 9) {
                eachQuestionMin.innerText = min
            }

            data.examData[sectionSelector].questions[index].timeSpent.min = min
            data.examData[sectionSelector].questions[index].timeSpent.sec = sec
        }
    }

    function examEndByTimeUp() {
        console.log("Exam End because of time")
        clearInterval(mainTimeCounter)
        clearInterval(eachTimeCounter)

        finalResult()
    }

    function showQuetions(index) {
        let questionData = data.examData[sectionSelector].questions[index]

        eachQuestionTime(index)

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
        </div>`

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

    function finalResult() {
        let totalScore = 0
        let totalCorrectAnswer = 0
        let totalWrongAnswer = 0
        let positive = data.positiveMark
        let negative = data.negativeMark

        let formatMaker = ""

        for (let i = 0; i < data.examData.length; i++) {
            let questions = data.examData[i].questions
            formatMaker += "<div> Section: " + data.examData[i].section
            formatMaker += "<br />"

            let sno = 0
            for (let j = 0; j < questions.length; j++) {
                if (questions[j].optionSelectedClass == "no-answered") {
                    sno++
                    formatMaker +=
                        `<div class='my-2'>${sno}. ` + questions[j].question
                    formatMaker += "<br />"

                    if (
                        questions[j].answer ==
                        questions[j].options[
                            parseInt(questions[j].optionSelected)
                        ]
                    ) {
                        totalScore = totalScore + positive
                        totalCorrectAnswer += 1

                        formatMaker += "Selected answer correct"
                    } else {
                        totalScore = totalScore - negative
                        totalWrongAnswer += 1

                        formatMaker += "Selected answer wrong"
                    }

                    formatMaker += "<br />"
                    formatMaker += `Time taken: ${
                        questions[j].timeSpent.min > 9
                            ? questions[j].timeSpent.min
                            : "0" + questions[j].timeSpent.min
                    }
                            : ${
                                questions[j].timeSpent.sec > 9
                                    ? questions[j].timeSpent.sec
                                    : "0" + questions[j].timeSpent.sec
                            }`

                    formatMaker += "</div>"
                }
            }

            if (sno == 0) {
                formatMaker += "No answer selected"
            }

            formatMaker += "</div>"
        }

        resultShow.innerHTML = `
            <p>Total Score: ${totalScore}</p>
            <p>Total Correct Answers: ${totalCorrectAnswer}</p>
            <p>Total Wrong Answers: ${totalWrongAnswer}</p>
            <hr>
            `

        resultShow.innerHTML += formatMaker

        resultModal.show()
    }
})
