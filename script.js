const isiList = document.getElementById("input-list");
const tombolTambahList = document.querySelector(".button-add");
const daftarList = document.querySelector(".box-list");
const spanList = document.querySelectorAll(".box-list .list > span");

function tambahList() {
	if (isiList.value != "" && cekAdaList() && daftarList.childElementCount < 5) {
		const listBaru = document.createElement("div");
		listBaru.classList.add("list");
		const isiListBaru = document.createElement("span");
		isiListBaru.innerHTML = isiList.value;
		listBaru.appendChild(isiListBaru);
		daftarList.appendChild(listBaru);
		buatTombol(listBaru);
	}
	isiList.value = "";
}

function buatTombol(listBaru) {
	//membuat tombol hapus
	const tombolHapus = document.createElement("div");
	tombolHapus.classList.add("button-delete");
	tombolHapus.innerHTML = `<span>Hapus</span>`;
	listBaru.appendChild(tombolHapus);
	tombolHapus.addEventListener("click", () => hapusList(listBaru));

	// membuat tombol selesai
	const tombolSelesai = document.createElement("div");
	tombolSelesai.classList.add("button-finish");
	tombolSelesai.innerHTML = `<span>Selesai</span>`;
	listBaru.appendChild(tombolSelesai);
	tombolSelesai.addEventListener("click", () => selesaiList(listBaru));
}

function cekAdaList() {
	if (isiList.length == false) {
		return true;
	} else {
		let count = 0;
		for (let i = 0; i < document.querySelectorAll(".list > span").length; i++) {
			if (document.querySelectorAll(".list > span")[i].textContent == isiList.value.trim()) {
				count++;
			}
		}
		if (count == false) {
			return true;
		} else {
			return false;
		}
	}
}

function hapusList(list) {
	daftarList.removeChild(list);
}

function selesaiList(list) {
	list.classList.add("selesai");
}

tombolTambahList.addEventListener("click", tambahList);
