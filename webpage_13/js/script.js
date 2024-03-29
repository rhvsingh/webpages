const mainSection = document.getElementById("main-section")
const sidebar = document.getElementById("sidebar")

function sidebarToggler() {
    mainSection.classList.toggle("col-md-12")
    mainSection.classList.toggle("active-sidebar")
    sidebar.classList.toggle("col-md-0")
    sidebar.classList.toggle("active-sidebar")
}

$(document).ready(function () {
    const examName = document.getElementById("exam-name")
    const examTime = document.getElementById("exam-time")

    /* Main Time Variables */
    const hourLeft = document.getElementById("hour-left")
    const minLeft = document.getElementById("min-left")
    const secLeft = document.getElementById("sec-left")

    /* Tab Switch Buttons */
    const sectionSwitcherButtons = document.getElementById("section-switcher-buttons")

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
    const resultModal = new bootstrap.Modal(document.getElementById("result-modal"))
    const resultShow = document.getElementById("result-show")

    /* Sidebar Questions Overview  */
    const totalCountAnswered = document.getElementById("total-count-answered")
    const totalCountMarked = document.getElementById("total-count-marked")
    const totalCountNotVisited = document.getElementById("total-count-not-visited")
    const totalCountMarkedAnswered = document.getElementById("total-count-marked-answered")
    const totalCountNotAnswered = document.getElementById("total-count-not-answered")

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

    function enterFullScreen(element) {
        if (element.requestFullscreen) {
            element.requestFullscreen()
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen() // Firefox
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen() // Safari
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen() // IE/Edge
        }
    }

    function exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
        }
    }

    // FullScreen Button
    $("#fullscreen-button").on("click", function () {
        if ($(this).attr("data-toggle") == "true") {
            enterFullScreen(document.documentElement)
            $(this).text("Exit Full Screen")
            $(this).attr("data-toggle", "false")
        } else {
            exitFullscreen()
            $(this).text("Switch Full Screen")
            $(this).attr("data-toggle", "true")
        }
    })

    // To activate section when clicked on section button
    $(".section-activator-button").on("click", function (e) {
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
            showQuestions(que_count) //calling showQestions function
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
            showQuestions(que_count) //calling showQestions function
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
            data.examData[sectionSelector].questions[que_count].optionSelected = "0"
            data.examData[sectionSelector].questions[que_count].optionSelectedClass = nameOfClass
        } else if (choice2.checked === true) {
            data.examData[sectionSelector].questions[que_count].optionSelected = "1"
            data.examData[sectionSelector].questions[que_count].optionSelectedClass = nameOfClass
        } else if (choice3.checked === true) {
            data.examData[sectionSelector].questions[que_count].optionSelected = "2"
            data.examData[sectionSelector].questions[que_count].optionSelectedClass = nameOfClass
        } else if (choice4.checked === true) {
            data.examData[sectionSelector].questions[que_count].optionSelected = "3"
            data.examData[sectionSelector].questions[que_count].optionSelectedClass = nameOfClass
        } else {
            data.examData[sectionSelector].questions[que_count].optionSelected = "None"
            data.examData[sectionSelector].questions[que_count].optionSelectedClass = nameOfClass
        }
    }

    function sectionButtonCreater() {
        let dataForButton = data.examData
        let createdButtons = ""
        for (let i = 0; i < dataForButton.length; i++) {
            createdButtons +=
                '<button class="section-activator-button btn btn-sm bg-primary rounded-1 text-white" title="' +
                dataForButton[i].section +
                '" id="' +
                i +
                '">' +
                dataForButton[i].section +
                "</button>"
        }

        sectionSwitcherButtons.innerHTML = createdButtons

        document
            .getElementsByClassName("section-activator-button")[0]
            .classList.add("active-button")
    }

    function sectionButtonClassChange() {
        let sectionActivatorButton = document.getElementsByClassName("section-activator-button")

        for (let i = 0; i < sectionActivatorButton.length; i++) {
            if (sectionActivatorButton[i].classList.contains("active-button")) {
                sectionActivatorButton[i].classList.remove("active-button")
            }
        }

        sectionActivatorButton[sectionSelector].classList.add("active-button")
    }

    function sectionActivator(index) {
        sectionSelector = index

        que_count = 0
        eachTimeClear()
        sectionButtonClassChange()
        showQuestions(que_count)
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
        sectionButtonClassChange()
        showQuestions(que_count)
        showButtons(sectionSelector)
    }

    function examRunner() {
        sectionSelector = 0
        que_count = 0
        sectionButtonCreater()
        showQuestions(que_count)
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

        let timeSpent = data.examData[sectionSelector].questions[index].timeSpent

        min = timeSpent.min
        sec = timeSpent.sec

        if (sec <= 9) {
            eachQuestionSec.innerText = "0" + sec
        } else {
            eachQuestionSec.innerText = sec
        }

        if (min <= 9) {
            eachQuestionMin.innerText = "0" + min
        } else {
            eachQuestionMin.innerText = min
        }

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

    function showQuestions(index) {
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
        </div>`

        data.examData[sectionSelector].questions[index].optionSelectedClass =
            data.examData[sectionSelector].questions[index].optionSelectedClass === ""
                ? "no-not-answered"
                : data.examData[sectionSelector].questions[index].optionSelectedClass

        questionDisplayArea.innerHTML = questionHTML

        eachQuestionTime(index)
        questionsOverview()
    }

    function showButtons(index) {
        let questionData = data.examData[index].questions
        let questionButton = ""
        for (let i = 0; i < questionData.length; i++) {
            questionButton +=
                '<button class="question-button ' +
                questionData[i].optionSelectedClass +
                '" data-index= "' +
                i +
                '">' +
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

        document.getElementsByClassName("question-button")[que_count].classList.add("active-button")

        $(".question-button").on("click", function () {
            que_count = parseInt($(this).attr("data-index"))

            //console.log($(this).attr("class"))

            eachTimeClear()

            /* Resetting classname for active class */
            let allQuestionButtons = document.getElementsByClassName("question-button")
            for (let i = 0; i < allQuestionButtons.length; i++) {
                if (allQuestionButtons[i].classList.contains("active-button")) {
                    allQuestionButtons[i].classList.remove("active-button")
                }
            }
            allQuestionButtons[que_count].classList.add("active-button")

            data.examData[sectionSelector].questions[que_count].optionSelectedClass =
                data.examData[sectionSelector].questions[que_count].optionSelectedClass === ""
                    ? "no-not-answered"
                    : data.examData[sectionSelector].questions[que_count].optionSelectedClass

            $(this).addClass(
                data.examData[sectionSelector].questions[que_count].optionSelectedClass
            )

            showQuestions(que_count)
        })
    }

    /* SideBar Question Counts Shower */

    function questionsOverview() {
        let countAnswered = 0
        let countMarked = 0
        let countNotVisited = 0
        let countMarkedAnswered = 0
        let countNotAnswered = 0

        let computeData = data.examData[sectionSelector]

        countNotVisited = computeData.questions.length

        computeData.questions.forEach((element) => {
            if (element.optionSelectedClass == "no-answered") {
                countAnswered += 1
            }

            if (element.optionSelectedClass == "no-marked") {
                countMarked += 1
            }

            if (element.optionSelectedClass != "") {
                countNotVisited -= 1
            }

            if (element.optionSelectedClass == "no-marked-answered") {
                countMarkedAnswered += 1
            }

            if (element.optionSelectedClass == "no-not-answered") {
                countNotAnswered += 1
            }
        })

        if (countNotVisited == -1) {
            countNotVisited = 0
        }

        totalCountAnswered.innerText = countAnswered
        totalCountMarked.innerText = countMarked
        totalCountNotVisited.innerText = countNotVisited
        totalCountMarkedAnswered.innerText = countMarkedAnswered
        totalCountNotAnswered.innerText = countNotAnswered
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
            formatMaker +=
                "<div><span class='fw-bold fs-4'>Section: " +
                data.examData[i].section +
                "</span><br />"

            let countAnswered = 0
            let countMarked = 0
            let countNotVisited = 0
            let countMarkedAnswered = 0
            let countNotAnswered = 0

            let computeData = data.examData[i]

            countNotVisited = computeData.questions.length

            computeData.questions.forEach((element) => {
                if (element.optionSelectedClass == "no-answered") {
                    countAnswered += 1
                }

                if (element.optionSelectedClass == "no-marked") {
                    countMarked += 1
                }

                if (element.optionSelectedClass != "") {
                    countNotVisited -= 1
                }

                if (element.optionSelectedClass == "no-marked-answered") {
                    countMarkedAnswered += 1
                }

                if (element.optionSelectedClass == "no-not-answered") {
                    countNotAnswered += 1
                }
            })

            if (countNotVisited == -1) {
                countNotVisited = 0
            }

            formatMaker +=
                "<span class='result-total-counts-show'>Total Answered: " +
                countAnswered +
                "</span>"
            formatMaker +=
                "<span class='result-total-counts-show'>Total Marked for Review: " +
                countMarked +
                "</span>"
            formatMaker +=
                "<span class='result-total-counts-show'>Total Marked and Answered for Review: " +
                countMarkedAnswered +
                "</span>"
            formatMaker +=
                "<span class='result-total-counts-show'>Total Questions not visited: " +
                countNotVisited +
                "</span>"
            formatMaker +=
                "<span class='result-total-counts-show'>Total Questions not answered: " +
                countNotAnswered +
                "</span>"

            formatMaker += "<div class='question-answer-show'>"

            let sno = 0
            for (let j = 0; j < questions.length; j++) {
                if (questions[j].optionSelectedClass == "no-answered") {
                    sno++
                    formatMaker +=
                        `<div class='my-2'><span class='fst-italic fw-bold '>Q${sno}. ` +
                        questions[j].question +
                        "</span>"
                    formatMaker += "<br />"
                    formatMaker +=
                        "Selected: " + questions[j].options[parseInt(questions[j].optionSelected)]
                    if (
                        questions[j].answer ==
                        questions[j].options[parseInt(questions[j].optionSelected)]
                    ) {
                        totalScore = totalScore + positive
                        totalCorrectAnswer += 1

                        formatMaker += "(Correct Answer)"
                    } else {
                        totalScore = totalScore - negative
                        totalWrongAnswer += 1

                        formatMaker += "(Wrong Answer)"
                    }

                    formatMaker += "<br />"
                    formatMaker += `Time Taken: ${
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

            formatMaker += "</div>"

            if (sno == 0) {
                formatMaker += "<br />No answer selected"
            }

            formatMaker += "</div>"
        }

        resultShow.innerHTML = `
            <p><span class='fw-bold'>Total Score:</span> ${totalScore}</p>
            <p><span class='fw-bold'>Total Correct Answers:</span> ${totalCorrectAnswer}</p>
            <p><span class='fw-bold'>Total Wrong Answers:</span> ${totalWrongAnswer}</p>
            <hr>
            `

        resultShow.innerHTML += formatMaker

        resultModal.show()
    }
})
