const content = document.getElementById('content')
const paginationCount = document.getElementById('pagination-count')
const prevButton = document.getElementById('prev-button')
const nextButton = document.getElementById('next-button')

var clickChange = 0,
    set, currentPage = 1

let counter = 9
let start = 0
let end = counter
let numCheck = true

let completePage

function dataInserter(data) {

    let convertedData
    if (data.desc == '') {

        convertedData =
            `<article>
                <a href="${data.link}/">
                    <div class="image-container">
                        <img src="images/${data.imageLink}" alt="${data.altImage}" />
                    </div>
                    <div class="content-container">
                        <div class="content-title">${data.title}</div>
                        <div class="content-description"></div>
                    </div>
                </a>
            </article>`
    } else {
        convertedData = 
        `<article>
            <a href="${data.link}/">
                <div class="image-container">
                    <img src="images/${data.imageLink}" alt="${data.altImage}" />
                </div>
                <div class="content-container data">
                    <div class="content-title">${data.title}</div>
                    <div class="content-description">${data.desc}</div>
                </div>
            </a>
        </article>`
    }
    content.innerHTML += convertedData
}

function contentLoader(start, end, pageData) {
    for (let i = start; i < end && i < pageData.length; i++) {
        dataInserter(pageData[i])
    }
}

function changeView(view) {
    let postButton = document.getElementsByClassName('post-button');
    for (let i = 0; i < postButton.length; i++) {
        if (postButton[i].getAttribute('data-id') == view) {
            postButton[i].classList.add('active')
        } else {
            postButton[i].classList.remove('active')
        }
    }
    console.log(view)
    currentPage = view
    end = view * counter
    start = end - counter
    content.innerHTML = ''
    if (clickChange == 1) {
        contentLoader(start, end, set)
    } else {
        contentLoader(start, end, dataChange)
    }

    if (currentPage == 1) {
        console.log('Do nothing')
        prevButton.style.visibility = 'hidden'
        prevButton.style.opacity = 0
    } else {
        prevButton.style.visibility = 'visible'
        prevButton.style.opacity = 1
    }

    console.log(currentPage + ' ' + completePage)

    if (!numCheck) {
        if (currentPage > completePage) {
            nextButton.style.visibility = 'hidden'
            nextButton.style.opacity = 0
        } else {
            console.log('Do nothing')
            nextButton.style.visibility = 'visible'
            nextButton.style.opacity = 1
        }
    } else {
        if (currentPage < completePage) {
            nextButton.style.visibility = 'visible'
            nextButton.style.opacity = 1

        } else {
            console.log('Do nothing')

            nextButton.style.visibility = 'hidden'
            nextButton.style.opacity = 0
        }
    }
}

function pagPrevButton() {
    if (currentPage == 1) {
        console.log('Do nothing')
    } else {
        changeView(currentPage - 1)
        console.log('Prev buttonClick')
    }
}

function pagNextButton() {
    prevButton.style.visibility = 'visible'
    prevButton.style.opacity = 1
    if (currentPage <= completePage) {
        console.log('Next buttonClick')
        changeView(currentPage + 1)
    } else {
        console.log('Do nothing')
        nextButton.style.visibility = 'hidden'
        nextButton.style.opacity = 0
    }
}

contentLoader(start, end, pageData)

//pageData.forEach(dataInserter)

const sort = document.getElementById('sort')
var dataChange = pageData

sort.onchange = function (e) {
    switch (e.target.value) {
        case 'recent':
            clickChange = 0
            content.innerHTML = ''
            /* dataChange.forEach(dataInserter) */
            contentLoader(start, end, dataChange)
            break;
        case 'old':
            set = dataChange.slice().sort((a, b) => {
                let date1 = new Date(a.date)
                let date2 = new Date(b.date)
                return date1 - date2
            })
            clickChange = 1
            content.innerHTML = ''
            /* set.forEach(dataInserter) */
            contentLoader(start, end, set)
            break;
    }
}

if (pageData.length / counter && pageData.length % counter == 0) {
    completePage = pageData.length / counter
    numCheck = true
    if (completePage == 1) {
        nextButton.style.visibility = 'hidden'
        nextButton.style.opacity = 0
    }
    for (let i = 1; i <= completePage; i++) {
        if (i == 1) {
            paginationCount.innerHTML += `<span class='post-button active' onclick='changeView(${i})' data-id='${i}'>${i}</span>`
            continue
        }
        paginationCount.innerHTML += `<span class='post-button' onclick='changeView(${i})' data-id='${i}'>${i}</span>`
    }
} else if (pageData.length % counter != 0) {
    completePage = (Math.floor(pageData.length / counter))
    numCheck = false
    if ((1 + completePage) == 1) {
        nextButton.style.visibility = 'hidden'
        nextButton.style.opacity = 0
    }
    for (let i = 1; i <= completePage; i++) {
        if (i == 1) {
            paginationCount.innerHTML += `<span class='post-button active' onclick='changeView(${i})' data-id='${i}'>${i}</span>`
            continue
        }
        paginationCount.innerHTML += `<span class='post-button' onclick='changeView(${i})' data-id='${i}'>${i}</span>`
    }
    paginationCount.innerHTML += `<span class='post-button' onclick='changeView(${completePage + 1})' data-id='${completePage + 1}'>${completePage + 1}</span>`
}

prevButton.style.visibility = 'hidden'
prevButton.style.opacity = 0



/* Drop-down */

const dropDown = document.getElementById('select-drop')
const dropOptions = document.getElementsByClassName('drop-options')
const showSelectedDrop = document.getElementById('show-selected-drop')
const dropToggle = document.getElementsByClassName('drop-toggle')[0]

let onChangeChecker = 0

dropOptions[0].classList.add('active-drop')
showSelectedDrop.innerHTML = dropOptions[0].innerHTML
showSelectedDrop.setAttribute('value', dropOptions[0].getAttribute('value'))

dropDown.onclick = (e) => {
    if (dropDown.classList.toggle('active-drop')) {
        console.log('add')
    } else {
        console.log('remove')
    }
    identify(e)
}

//dropDown.addEventListener('',)

//dropDown.addEventListener('click', identify, false);

function identify(e) {
    for (let i = 0; i < dropOptions.length; i++) {
        if (dropOptions[i] === e.target) {
            if (onChangeChecker == i) {
                continue
            } else {
                onChangeChecker = i
                console.log(i);
                showSelectedDrop.innerHTML = dropOptions[i].innerHTML
                showSelectedDrop.setAttribute('value', dropOptions[i].getAttribute('value'))
                switch (e.target.getAttribute('value')) {
                    case 'recent':
                        clickChange = 0
                        content.innerHTML = ''
                        /* dataChange.forEach(dataInserter) */
                        contentLoader(start, end, dataChange)
                        break;
                    case 'old':
                        set = dataChange.slice().sort((a, b) => {
                            let date1 = new Date(a.date)
                            let date2 = new Date(b.date)
                            return date1 - date2
                        })
                        clickChange = 1
                        content.innerHTML = ''
                        /* set.forEach(dataInserter) */
                        contentLoader(start, end, set)
                        break;
                }
            }

        }
    }
}

dropToggle.addEventListener('mouseover', function (e) {
    for (let i = 0; i < dropOptions.length; i++) {
        dropOptions[i].classList.remove('active-drop')
    }
    e.target.classList.add('active-drop')
})