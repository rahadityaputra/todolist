const isiList = document.getElementById("input-list");
const daftarList = document.querySelector(".box-list");
const spanList = document.querySelectorAll(".box-list .list > span");
const container = document.querySelector('.container');

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
	
	// membuat tombol selesai
	const tombolSelesai = document.createElement("span");
	tombolSelesai.classList.add("button-finish");
	tombolSelesai.innerHTML = `Selesai`;
	listBaru.appendChild(tombolSelesai);
	
	//membuat tombol hapus
	const tombolHapus = document.createElement("span");
	tombolHapus.classList.add("button-delete");
	tombolHapus.innerHTML = `Hapus`;
	listBaru.appendChild(tombolHapus);
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

function turun(buttonFinish) {
	const list = buttonFinish.parentNode;
	daftarList.appendChild(list);
}

container.addEventListener('click', function (e) {
	if (e.target.className == 'button-add') {
		tambahList();
	} else if (e.target.className == 'button-finish') {
		// todo membuat list yang diberi tanda selesai turun ke urutan bawah
		// 
		turun(e.target);
		e.target.previousElementSibling.style.textDecoration = 'line-through';
	} else if (e.target.className == 'button-delete') {
		e.target.parentNode.parentNode.removeChild(e.target.parentNode);
	}
})

// untuk fitur mode gelap

const buttonTheme = document.querySelector('.mode');
const html = document.querySelector('html');

buttonTheme.addEventListener('click', function () {
	html.classList.toggle('gelap');
})