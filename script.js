const isiList = document.getElementById("input-list");
const daftarList = document.querySelector(".box-list");
const spanList = document.querySelectorAll(".box-list .list > span");
const container = document.querySelector(".container");

// ==================Menyambungkan Ke Local Storage===================

let kumpulanList = {};

if (localStorage["program_todolist"]) {
	kumpulanList = JSON.parse(localStorage["program_todolist"]);
	for (let [list, status] of Object.entries(kumpulanList)) {
		tambahElementList(list, status);
	}
}

function syncLocalStorage(aktivitas, teks, status = false) {
	switch (aktivitas) {
		case "tambah":
			kumpulanList[teks] = status;
			break;
		case "hapus":
			delete kumpulanList[teks];
			break;
		case "hapus semua":
			kumpulanList = {};
			break;
		default:
			break;
	}

	return localStorage.setItem("program_todolist", JSON.stringify(kumpulanList));
}
// ==================Kode untuk fitur to do list===================

function tambahDataList() {
	if (isiList.value != "" && !cekAdaList(isiList.value)) {
		syncLocalStorage("tambah", isiList.value);
		tambahElementList(isiList.value);
	}
	isiList.value = "";
}

function tambahElementList(isiList, status = false) {
	const listTerbaru = `<div class="list">
							<span class=${status ? "selesai" : ""}>${isiList}</span>
							<span class="button button-finish" onclick = "listSelesai(this.previousElementSibling)">
                            	<svg data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                              	   <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
                           		</svg>
                       		 </span>
                        	<span class="button button-delete" onclick = "hapusList(this)">
                           		<svg data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                	<path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            		    ></path>
                         	   </svg>
                        	</span>
						</div>`;
	daftarList.insertAdjacentHTML("beforeend", listTerbaru);
}

function listSelesai(list) {
	syncLocalStorage("tambah", list.innerText, list.classList.toggle("selesai"));
}

function hapusList(tombolHapus) {
	tombolHapus.parentNode.remove();
	syncLocalStorage("hapus", tombolHapus.previousElementSibling.previousElementSibling.innerText);
}

function cekAdaList(isiList) {
	let ada = false;
	for(let list in kumpulanList){
		ada = (list == isiList);
	}
	return ada;
}



container.addEventListener("click", function (e) {
	if (e.target.className == "button button-add" || e.target.parentNode.className == "button button-add") {
		tambahDataList();
	} else if (e.target.className == "button button-delete-all" || e.target.parentNode.className == "button button-delete-all") {
		daftarList.innerHTML = "";
		syncLocalStorage("hapus semua");
	}
});




// untuk fitur mode gelap
const buttonTheme = document.querySelector(".mode");
const html = document.querySelector("html");

// local storage untuk mode tampilan light mode dan dark mode
let modeSekarang = localStorage.getItem("modeSekarang");

if (localStorage.getItem("modeSekarang") === "dark") {
	html.classList.toggle("gelap");
	buttonTheme.innerHTML = `<svg data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
		<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"></path>
	  </svg>`;
}

buttonTheme.addEventListener("click", function () {
	html.classList.toggle("gelap");
	if (html.className == "gelap") {
		modeSekarang = localStorage.setItem("modeSekarang", "dark");

		buttonTheme.innerHTML = `<svg data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
		<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"></path>
	  </svg>`;
	} else {
		modeSekarang = localStorage.setItem("modeSekarang", "light");
		buttonTheme.innerHTML = `<svg data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
		<path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"></path>
	</svg>`;
	}
});
