const result = document.getElementById('result');

function emailCheck() {
    let emailAdd = document.getElementById('email');
    if (emailAdd.value == '') {
        alert('Fill form');
    } else {
        result.innerText = 'Thank you!';
        setTimeout(function() {
            result.innerText = '';
        }, 2000);
    }
}