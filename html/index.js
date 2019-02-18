const $signinForm = $("#signin-form");

function successAuthentificationHandler({ token }) {
    document.cookie = `token=${token}`
    location.href = '/home'
}

function failureAuthentificationHandler() {
    $('.form-group').addClass('has-error');
}

$signinForm.submit(function(ev) {
    $.post("http://localhost:8000/authentification", $signinForm.serializeJSON())
        .then(successAuthentificationHandler)
        .catch(failureAuthentificationHandler)
    ev.preventDefault();
})