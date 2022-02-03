const switchSec1 = document.getElementsByClassName('switcher-section-1');
const switchSec2 = document.getElementsByClassName('switcher-section-2');
const menuToggler = document.getElementById('menu-toggler');
const navigation = document.getElementById('navigation');

for (let i = 0; i < switchSec1.length; i++) {
    switchSec1[i].onclick = function() {
        let j = 0;
        while (j < switchSec1.length) {
            switchSec1[j].className = 'switcher-section-1';
            switchSec2[j].className = 'switcher-section-2';
            j++;
        }
        switchSec1[i].className = 'switcher-section-1 is-active';
        switchSec2[i].className = 'switcher-section-2 is-active';
    }
}

menuToggler.onclick = function() {
    navigation.classList.toggle('active');
}