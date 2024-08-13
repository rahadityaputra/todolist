import {sortLists, syncLocalStorageTheme,syncLocalStorage,  data } from "./database.js";
const html = document.querySelector("html");
export const boxList = document.querySelector(".box-list");
const buttonTheme = document.querySelector('.theme');
export const boxAlert = document.querySelector(".alertWrapper");


export function changeTheme(theme) {
	switch (theme) {
		case 'dark' :
			html.classList.add("dark");
			break;
		default:
			html.classList.remove("dark");
			break;
	}
	syncLocalStorageTheme(theme);
	changeThemeIcon(theme);
}

function changeThemeIcon(theme){
	if (theme === 'light') {
		buttonTheme.innerHTML = 'Dark Theme';
		buttonTheme.dataset.changeTo = 'dark';
	} else {
		buttonTheme.innerHTML = 'Light Theme';
		buttonTheme.dataset.changeTo = 'light';
	}	
}

export function addListElement(isiList, status = false) {
	const newList = `<div class="list ${status ? 'list-finish' : ''}">
												<span class="text-white" >${isiList}</span>
												<div class="flex">
													<button class="button-status ${status ?'button-restore' : 'button-finish' }" data-status= "${status}">${status ? 'Restore' : 'Finish'}</button>
                        	<button class="delete bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition" >Delete</button>
												</div>
											</div>`;
	boxList.insertAdjacentHTML('afterbegin', newList)
}

export function hideAlert() {
		boxAlert.style.display = "none";
		data.alert = false;
		return localStorage.setItem("program_todolist", JSON.stringify(data));
	}

// function untuk perubahan status list
export function changeStatus(listWrapper, button, list, currentStatus) {
	console.log(currentStatus);
	
	listWrapper.classList.toggle('list-finish');
	if (currentStatus == 'true') {
		button.classList.replace('button-restore', 'button-finish');
		button.dataset.status = 'false';
		button.innerHTML = 'Finish';
		syncLocalStorage(data,"changeStatus", list.innerText, false);
	} else if(currentStatus == 'false') {
		button.classList.replace('button-finish', 'button-restore');
		button.dataset.status = 'true';
		button.innerHTML = 'Restore';
		syncLocalStorage(data, "changeStatus", list.innerText, true);
	}

	data.lists = sortLists(data.lists);
	renderHtml(data.lists, data.theme, data.alert);
}



function renderHtml(lists, theme, alert) {
	boxList.innerHTML = '';
		lists.forEach(({title, status}) => {
			addListElement(title, status);
		});
		changeTheme(theme);

		if (alert) {
			boxAlert.style.display = 'flex';
		}
	}

	
// render data yang sudah didapatkan
renderHtml(data.lists, data.theme, data.alert);