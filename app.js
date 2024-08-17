import {boxAlert, changeTheme , hideAlert, changeStatus, deleteAllList} from "./module/interface.js";
import {addList, deleteList} from "./module/database.js";
const inputBox = document.querySelector('.box-input');
const main = document.querySelector('.main');
const panel = document.querySelector('.panel');

// use event delegation
inputBox.addEventListener('click', function (event) {
	const element = event.target;
	if (element.matches('.add')) {
		event.preventDefault();		
		const input = element.previousElementSibling;		
		addList(input.value);
		input.value = '';
	} 
})

main.addEventListener('click', function (event) {
	const element = event.target;	
	if (element.matches('.delete')) {
		deleteList(element);
	} else if (element.matches('.button-status')) {
		changeStatus(element.parentNode.parentNode, element ,element.parentNode.previousElementSibling, element.dataset.status);
	} 
})

panel.addEventListener('click', function (event) {
	const element = event.target;
	if (element.matches('.theme')) {
		changeTheme(element.dataset.changeTo);
	} else if (element.matches('.delete-all')) {
		deleteAllList();
	}
})

boxAlert.addEventListener('click', function (event) {
	const element = event.target;
	if (element.matches('.hide')) {
		hideAlert()
	}
})