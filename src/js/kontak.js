const form = document.getElementById('contactForm');

form.onsubmit = function () {

    let nama = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let hp = document.getElementById('phone').value;
    let pesan = document.getElementById('message').value;

    if (nama == "") {
        alert("Nama harus diisi!");
        return;
    }

    if (email == "") {
        alert("Email harus diisi!");
        return;
    }

    if (hp == "") {
        alert("Nomor HP harus diisi!");
        return;
    }

    if (pesan == "") {
        alert("Pesan harus diisi!");
        return;
    }


    if (email.indexOf("@gmail.com") == -1) {
        alert("Email harus pakai @gamil.com");
        return;
    }

    if (email.indexOf(".") == -1) {
        alert("Email harus pakai titik");
        return;
    }


    alert("Data sudah terkirim");

    document.getElementById('username').value = "";
    document.getElementById('email').value = "";
    document.getElementById('phone').value = "";
    document.getElementById('message').value = "";
}