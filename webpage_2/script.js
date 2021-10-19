var subMenu = document.querySelectorAll('.submenu');
var subChild = document.querySelectorAll('.subchild');
var menuBar = document.getElementById('menu-bar');
var box1 = document.getElementById('box-1');

menuBar.onclick = function() {
    menuBar.classList.toggle('active');
    box1.classList.toggle('active');
}

for (let i = 0; i < subMenu.length; i++) {
    subMenu[i].onclick = function() {
        subChild[i].classList.toggle('active');
    }
}