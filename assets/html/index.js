const $signinForm = $("#signin-form");

function successAuthentificationHandler({ token }) {
    document.cookie = `token=${token}`
    location.href = location.origin + '/home'
}

function failureAuthentificationHandler() {
    $('.form-group').addClass('has-error');
}

$signinForm.submit(function(ev) {
    $.post("/api/authentification", $signinForm.serializeJSON())
        .then(successAuthentificationHandler)
        .catch(failureAuthentificationHandler)
    ev.preventDefault();
})