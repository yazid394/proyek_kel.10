let hilang = [];
let ditemukan = [];

function tgl() {
    const t = new Date();
    return `${t.getDate()}/${t.getMonth() + 1}/${t.getFullYear()}`;
}

function updateStat() {
    const totalData = hilang.length + ditemukan.length;
    const persen = totalData === 0? 0 : Math.round((ditemukan.length / totalData) * 100);

    document.getElementById("total").innerHTML = totalData;
    document.getElementById("jumlah-hilang").innerHTML = hilang.length;
    document.getElementById("jumlah-ditemukan").innerHTML = ditemukan.length;
    document.getElementById("persen").innerHTML = `${persen}%`;
}

function tampil(filter = "") {
    let htmlHilang = "";
    let htmlDitemukan = "";

    hilang.forEach((d, i) => {
        if (
            filter && !d.barang.toLowerCase().includes(filter) && !d.lokasi.toLowerCase().includes(filter) && !d.nama.toLowerCase().includes(filter)
        ) return;

        htmlHilang += `
            <tr>
                <td>
                    ${d.nama}<br>
                    <small>${d.hp}</small>
                </td>
                <td>${d.barang}</td>
                <td>${d.lokasi}</td>
                <td>${d.tgl}</td>
                <td>
                    <button class="btn-edit" onclick="edit('hilang', ${i})">
                        Edit
                    </button>
                    <button class="btn-hapus" onclick="hapus('hilang', ${i})">
                        Hapus
                    </button>
                </td>
            </tr>
        `;
    });

    ditemukan.forEach((d, i) => {
        if (
            filter &&
            !d.barang.toLowerCase().includes(filter) &&
            !d.lokasi.toLowerCase().includes(filter) &&
            !d.nama.toLowerCase().includes(filter)
        ) return;

        htmlDitemukan += `
            <tr>
                <td>
                    ${d.nama}<br>
                    <small>${d.hp}</small>
                </td>
                <td>${d.barang}</td>
                <td>${d.lokasi}</td>
                <td>${d.tgl}</td>
                <td>
                    <button class="btn-edit" onclick="edit('ditemukan', ${i})">
                        Edit
                    </button>
                    <button class="btn-hapus" onclick="hapus('ditemukan', ${i})">
                        Hapus
                    </button>
                </td>
            </tr>
        `;
    });

    document.getElementById("tabel-hilang").innerHTML =
        htmlHilang ||
        `<tr><td colspan="5" class="kosong">Belum ada laporan</td></tr>`;

    document.getElementById("tabel-ditemukan").innerHTML =
        htmlDitemukan ||
        `<tr><td colspan="5" class="kosong">Belum ada laporan</td></tr>`;
}

function tambahHilang() {
    const nama = document.getElementById("h-nama").value;
    const hp = document.getElementById("h-hp").value;
    const barang = document.getElementById("h-barang").value;
    const lokasi = document.getElementById("h-lokasi").value;

    if (!nama || !hp || !barang || !lokasi) {
        return alert("Isi semua field wajib!");
    }

    hilang.push({
        nama,
        hp,
        email: document.getElementById("h-email").value,
        alamat: document.getElementById("h-alamat").value,
        barang,
        lokasi,
        deskripsi: document.getElementById("h-deskripsi").value,
        tgl: tgl()
    });

    updateStat();
    tampil();

    [
        "h-nama", "h-hp", "h-email", "h-alamat",
        "h-barang", "h-lokasi", "h-deskripsi"
    ].forEach(id => document.getElementById(id).value = "");
}

function tambahDitemukan() {
    const nama = document.getElementById("d-nama").value;
    const hp = document.getElementById("d-hp").value;
    const barang = document.getElementById("d-barang").value;
    const lokasi = document.getElementById("d-lokasi").value;

    if (!nama || !hp || !barang || !lokasi) {
        return alert("Isi semua field wajib!");
    }

    ditemukan.push({
        nama,
        hp,
        email: document.getElementById("d-email").value,
        alamat: document.getElementById("d-alamat").value,
        barang,
        lokasi,
        deskripsi: document.getElementById("d-deskripsi").value,
        tgl: tgl()
    });

    updateStat();
    tampil();

    ["d-nama", "d-hp", "d-email", "d-alamat","d-barang", "d-lokasi", "d-deskripsi"].forEach(id => document.getElementById(id).value = "");
}

function hapus(tipe, idx) {
    if (!confirm("Hapus data ini?")) return;

    if (tipe === "hilang") {
        hilang.splice(idx, 1);
    } else {
        ditemukan.splice(idx, 1);
    }

    updateStat();
    tampil();
}

let editTipe, editIdx;

function edit(tipe, idx) {
    editTipe = tipe;
    editIdx = idx;

    const data = tipe === "hilang"
        ? hilang[idx]
        : ditemukan[idx];

    document.getElementById("e-nama").value = data.nama;
    document.getElementById("e-hp").value = data.hp;
    document.getElementById("e-barang").value = data.barang;
    document.getElementById("e-lokasi").value = data.lokasi;
    document.getElementById("e-deskripsi").value = data.deskripsi || "";

    document.getElementById("modalEdit").style.display = "flex";
}

function simpanEdit() {
    const dataBaru = {
        nama: document.getElementById("e-nama").value,
        hp: document.getElementById("e-hp").value,
        barang: document.getElementById("e-barang").value,
        lokasi: document.getElementById("e-lokasi").value,
        deskripsi: document.getElementById("e-deskripsi").value,
        tgl:
            editTipe === "hilang"
                ? hilang[editIdx].tgl
                : ditemukan[editIdx].tgl
    };

    if (!dataBaru.nama || !dataBaru.hp || !dataBaru.barang || !dataBaru.lokasi) {
        return alert("Field wajib tidak boleh kosong!");
    }

    if (editTipe === "hilang") {
        hilang[editIdx] = { ...hilang[editIdx], ...dataBaru };
    } else {
        ditemukan[editIdx] = { ...ditemukan[editIdx], ...dataBaru };
    }

    updateStat();
    tampil();
    tutupModal();
}

function batalEdit() {
    document.getElementById("modalEdit").style.display = "none";
}

function cariBarang() {
    const keyword =
        document.getElementById("kata-cari").value.toLowerCase();

    tampil(keyword);
}

function resetCari() {
    document.getElementById("kata-cari").value = "";
    tampil();
}

updateStat();
tampil();