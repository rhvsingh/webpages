import {
    pageData
} from './pageData.js'

const content = document.getElementById('content')
const pagination = document.getElementById('pagination')

pageData.forEach(dataInserter)

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

const sort = document.getElementById('sort');
var dataChange = pageData

sort.onchange = function (e) {
    switch (e.target.value) {
        case 'recent':
            content.innerHTML = ''
            dataChange.forEach(dataInserter)
            break;
        case 'old':
            let set = dataChange.slice().sort((a, b) => {
                let date1 = new Date(a.date)
                let date2 = new Date(b.date)
                return date1 - date2
            })
            content.innerHTML = ''
            set.forEach(dataInserter)
            break;
    }
}

let pageLenght = pageData.length / 3
let completePage,remainPage;
if (pageData.length / 3 && pageData.length % 3 == 0) {
    completePage = pageData.length/3;
    for(let i = 1; i <= completePage; i++) {
        pagination.innerHTML +=  `<span onclick='changeView(${i})'>${i}</span>`;
    }
} else if (pageData.length % 3 != 0) {
    completePage = Math.floor(pageData.length/3);
    remainPage = pageData.length % 3;
    for(let i = 1; i <= completePage; i++) {
        pagination.innerHTML +=  `<span onclick='changeView(${i})'>${i}</span>`;
    }
    pagination.innerHTML +=  `<span onclick='changeView(${completePage+1})'>${completePage+1}</span>`;
}

function changeView(view) {}

