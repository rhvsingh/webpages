const menuBar = document.getElementById('open-menu');
const closeBar = document.getElementById('close-menu');
const navTag = document.getElementsByTagName('nav');

menuBar.onclick = function() {
    navTag[0].classList.add('active');
}

closeBar.onclick = function() {
    navTag[0].classList.remove('active');
}