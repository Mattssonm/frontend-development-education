window.onload = () => {
	//---------- Variable Declaration------------- 
	let requestApiBtn = document.getElementById("requestApiBtn");
	let addBookBtn = document.getElementById("addBookBtn");
	let addTitle = document.getElementById("addTitle");
	let addAuthor = document.getElementById("addAuthor");
	let viewBooksBtn = document.getElementById("viewBooksBtn");
	let changeBookBtn = document.getElementById("changeBookBtn");
	let deleteBookBtn = document.getElementById("deleteBookBtn");
	let consoleDiv = document.getElementById("consoleDiv");
	let activeKey = "";

//----------- Functions ------------

function thereIsActiveKey(key) {
	return Boolean(key);
};
	
function callApi(ajax, op, key, id, title, author) {
	let query = "?";
	let url = "https://www.forverkliga.se/JavaScript/api/crud.php";
	
	//set operation
	if (op) {
		if (op == "requestKey") {
			query += "" + op + "";
		} else {
			query += "op=" + op + "";
		}
	}
	
	//set key
	if (key) {
		query += "&key=" + key + "";
	}
	
	//set id
	if (id) {
		query += "&id=" + id + "";
	}
	
	//set title
	if (title) {
		query += "&title=" + title + "";
	}
	
	//set author
	if (author) {
		query += "&author=" + author + "";
	}
	consoleLog(query);
	//call API with query
	ajax.open('GET', url+query);
	ajax.send();
};

function consoleLog(message) {
	let text = document.createElement("p")
	text.innerHTML = message;
	consoleDiv.appendChild(text);
}
	
	
//----------- API Key ----------
	
	requestApiBtn.onclick = () => {
		let keyAjax = new XMLHttpRequest();
		callApi(keyAjax, "requestKey");
		
		keyAjax.addEventListener("load", event => {
			let parsedJson = JSON.parse(keyAjax.responseText);
			activeKey = parsedJson.key;
			consoleLog("Active Key: " + activeKey);
		});
	};

//------------- Write to API --------------

addBookBtn.onclick = () => {
	if (thereIsActiveKey(activeKey)) {
		let insertAjax = new XMLHttpRequest();
		callApi(insertAjax, "insert", activeKey, 0, addTitle.value, addAuthor.value);
		
		insertAjax.addEventListener("load", event => {
			let parsedJson = JSON.parse(insertAjax.responseText);
			consoleLog(JSON.stringify(parsedJson));
		});
		
	} else {
		consoleLog("No active key");
	}
}	
	
//------------- Read API --------------
viewBooksBtn.onclick = () => {
	if (thereIsActiveKey(activeKey)) {
		let selectAjax = new XMLHttpRequest();
		callApi(selectAjax, "select", activeKey);
		
		selectAjax.addEventListener("load", event => {
			let parsedJson = JSON.parse(selectAjax.responseText);
			consoleLog(JSON.stringify(parsedJson));
		});
	} else {
		consoleLog("No active key");
	}
}
	
	
};