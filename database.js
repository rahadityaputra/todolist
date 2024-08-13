import { addListElement, boxList } from "./interface.js";

// function untuk mengambil data dari program todolist dari local storage
export function getDataFromLocalStorage(key) {
	const defaultData = {
		theme : "light",
		lists : [],
		alert : true
	}
	const data = JSON.parse(localStorage.getItem(key));
	try {
		return data ? data : defaultData;
	} catch (error) {
			console.error('Error parsing JSON from localStorage:', error);
			return defaultData;
	}
}


export function syncLocalStorage(data, activity, text, listStatus = false) {
	const index = data.lists.findIndex(({title, status}) => {
		return title == text;
	})
	switch (activity) {
		case "add":
			data.lists.push({title : text, status : listStatus});
			break;
		case "delete":		
				data.lists.splice(index, 1);
			break;
		case 'changeStatus':
			data.lists[index].status = listStatus;
			break;
		case "deleteAll":
			data.lists = [];
			break;
		default:
			break;
	}
	return localStorage.setItem("program_todolist", JSON.stringify(data));
}

export function syncLocalStorageTheme(theme) {
	data.theme = theme;
	return localStorage.setItem("program_todolist", JSON.stringify(data));
}


export function addList(list) {
	if (list != "" && !isListInData(list)) {
		syncLocalStorage(data, "add", list);
		addListElement(list);
	}
}

export function deleteList(tombolHapus) {
	tombolHapus.parentNode.parentNode.remove();
	syncLocalStorage(data, "delete", tombolHapus.parentNode.previousElementSibling.innerText);
}

function isListInData(list) {
	let ada = false;
	for(let list in data.list){
		ada = (list === isiList);
		if (ada === true) {
			break;
		}
	}
	return ada;
}

export function deleteAllList() {
	daftarList.innerHTML = "";
	syncLocalStorage("deleteAll");
}

export function sortLists(lists) {
	return lists.sort((a,b) => {
		const currentlistStatus = a.status;
		const nextlistStatus = b.status;
		if (!currentlistStatus && nextlistStatus) {
			return -1;
		}

		return 1;
	})
}

// const apalah = [false, true, false, false, true, true, false, true];
// console.log(sortLists(apalah));


// objek untuk menampung data dari local storage
export const data = getDataFromLocalStorage('program_todolist');