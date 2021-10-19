var imgBox = document.querySelectorAll('.img-box');
var overlay = document.getElementById('overlay');
var closeButton = document.getElementById('close-button');
var contentShow = document.getElementById('content-show');
var arrowLeft = document.getElementById('arrow-left');
var arrowRight = document.getElementById('arrow-right');
for (let i = 0; i < imgBox.length; i++) {
    imgBox[i].onclick = function() {
        overlay.style.display = 'block';

        setTimeout(function() {
            overlay.style.visibility = 'visible';
            overlay.style.opacity = '1';
            contentShow.innerHTML = imgBox[i].innerHTML;
            contentShow.setAttribute('value', i);
        }, 200);
    }
}

closeButton.onclick = function() {
    overlay.style.visibility = 'hidden';
    overlay.style.opacity = '0';
    setTimeout(function() {
        overlay.style.display = 'none';
    }, 400);
}
arrowLeft.onclick = function() {
    if (contentShow.hasAttribute('value')) {
        let count = parseInt(contentShow.getAttribute('value'));
        if (count > 0) {
            count = count - 1;
            contentShow.innerHTML = imgBox[count].innerHTML;
            contentShow.setAttribute('value', count);
        }
    }
}
arrowRight.onclick = function() {
    if (contentShow.hasAttribute('value')) {
        let count = parseInt(contentShow.getAttribute('value'));
        count = count + 1;
        if (!(imgBox[count].innerHTML == '')) {
            contentShow.innerHTML = imgBox[count].innerHTML;
            contentShow.setAttribute('value', count);
        }
    }
}