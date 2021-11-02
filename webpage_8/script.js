const loginButton = document.getElementById('login-button');
const loginForm = document.getElementById('login-form');
const closeLogin = document.getElementById('close-login');

loginButton.onclick = function() {
    loginForm.classList.toggle('active');
}

closeLogin.onclick = function() {
    loginForm.classList.remove('active');
}