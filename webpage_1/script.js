var icons = document.querySelectorAll('.icons');
var cards = document.querySelectorAll('.cards');

for (let i = 0; i < icons.length; i++) {
    icons[i].onclick = function() {
        let j = 0;
        while (j < icons.length) {
            icons[j].classList.remove('active');
            cards[j].classList.remove('active');
            j++;
        }
        icons[i].classList.add('active');
        cards[i].classList.add('active');
    }
}