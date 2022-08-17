const content = document.getElementById('content')
const pagination = document.getElementById('pagination')

var clickChange = 0,set,currentPage = 1

let counter = 9
let start = 0
let end = counter

function dataInserter(data) {
    let convertedData = `<article>
    <a href="${data.link}/">
        <div class="image-container">
            <img src="images/${data.imageLink}" alt="${data.altImage}" />
        </div>
        <div class="content-container">${data.title}</div>
    </a>
</article>`
    content.innerHTML += convertedData
}

function contentLoader(start, end,pageData) {
    for (let i = start; i < end && i < pageData.length; i++) {
        dataInserter(pageData[i])
    }
}

function changeView(view) {
    let postButton = document.getElementsByClassName('post-button');
    for (let i = 0; i < postButton.length; i++) {
        if(postButton[i].getAttribute('data-id') == view ){
            postButton[i].classList.add('active')
        }
        else {
            postButton[i].classList.remove('active')
        }
    }
    console.log(view)
    currentPage = view
    end = view * counter
    start = end - counter
    content.innerHTML = ''
    if(clickChange == 1) {
        contentLoader(start, end,set)
    } else {
        contentLoader(start, end,dataChange)
    }
}

function pagPrevButton(){
    if(currentPage == 1) {
        console.log('Do nothing')
    } else {
        changeView(currentPage-1)
        console.log('Prev buttonClick')
    }
}
function pagNextButton(){
    if(currentPage <= completePage) {
        console.log('Next buttonClick')
        changeView(currentPage+1)
    } else {
        console.log('Do nothing')
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
            contentLoader(start,end,dataChange)
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
            contentLoader(start, end,set)
            break;
    }
}

let completePage, remainPage
if (pageData.length / counter && pageData.length % counter == 0) {
    completePage = pageData.length / counter
    pagination.innerHTML = '<span onclick="pagPrevButton()">Prev..</span>'
    for (let i = 1; i <= completePage; i++) {
        if(i == 1) {
            pagination.innerHTML += `<span class='post-button active' onclick='changeView(${i})'>${i}</span>`
            continue
        }
        pagination.innerHTML += `<span class='post-button' onclick='changeView(${i})'>${i}</span>`
    }
    pagination.innerHTML += '<span onclick="pagNextButton()">Next..</span>'
} else if (pageData.length % counter != 0) {
    completePage = Math.floor(pageData.length / counter)
    remainPage = pageData.length % counter
    pagination.innerHTML = '<span onclick="pagPrevButton()">Prev..</span>'
    for (let i = 1; i <= completePage; i++) {
        if(i == 1) {
            pagination.innerHTML += `<span class='post-button active' onclick='changeView(${i})' data-id='${i}'>${i}</span>`
            continue
        }
        pagination.innerHTML += `<span class='post-button' onclick='changeView(${i})' data-id='${i}'>${i}</span>`
    }
    pagination.innerHTML += `<span class='post-button' onclick='changeView(${completePage+1})' data-id='${completePage+1}'>${completePage+1}</span>`
    pagination.innerHTML += '<span onclick="pagNextButton()">Next..</span>'
}