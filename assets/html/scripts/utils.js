const env = {
    API_HOST: 'localhost',
    API_PORT: '8000'
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function makeRequest(opts) {
    return $.ajax(Object.assign(opts, {
        url: `/api${opts.url}`,
        headers: { Authentification: getCookie('token')
    }}))
}

function openModal(title, $body) {
    $("#modal .modal-title").text(title);
    $('#modal .modal-body').empty();
    $('#modal .modal-body').append($body);
    $("#modal").css({ display: 'block' });
}

function closeModal() {
    $("#modal").css({ display: 'none' });
}