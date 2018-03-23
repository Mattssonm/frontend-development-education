window.onload = () => {
//---------- Variable Declaration------------- 
  //Buttons
	let requestApiBtn = document.getElementById("requestApiBtn");
	let addBookBtn = document.getElementById("addBookBtn");
  let viewBooksBtn = document.getElementById("viewBooksBtn");
	let changeBookBtn = document.getElementById("changeBookBtn");
	let deleteBookBtn = document.getElementById("deleteBookBtn");
  
  //Inputs
	let addTitle = document.getElementById("addTitle");
	let addAuthor = document.getElementById("addAuthor");
  let updateId = document.getElementById("updateId");
  let updateTitle = document.getElementById("updateTitle");
  let updateAuthor = document.getElementById("updateAuthor");
  let deleteId = document.getElementById("deleteId");
  
  //Ajax 
  let keyAjax = new XMLHttpRequest();
  let insertAjax = new XMLHttpRequest();
  let selectAjax = new XMLHttpRequest();
  let updateAjax = new XMLHttpRequest();
  let deleteAjax = new XMLHttpRequest();
  
  //Other
  let consoleDiv = document.getElementById("consoleDiv");
	let activeKey = "";
  
  

//----------- Functions ------------
  function thereIsActiveKey(key) {
    return Boolean(key);
  };
  
  function consoleLog(message) {
    let text = document.createElement("p")
    text.innerHTML = message;
    consoleDiv.appendChild(text);
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

    //add key
    if (key) {
      query += "&key=" + key + "";
    }

    //add id
    if (id) {
      query += "&id=" + id + "";
    }

    //add title
    if (title) {
      query += "&title=" + title + "";
    }

    //add author
    if (author) {
      query += "&author=" + author + "";
    }
    consoleLog(query);
    
    //call API with query
    ajax.open('GET', url+query);
    ajax.send();
  };

//----------- Button Listeners ----------
  requestApiBtn.onclick = () => {
    callApi(keyAjax, "requestKey");
  };
  
  addBookBtn.onclick = () => {
    if (thereIsActiveKey(activeKey)) {
      callApi(insertAjax, "insert", activeKey, 0, addTitle.value, addAuthor.value);
    } else {
      consoleLog("No active key");
    }
  }	
  
  viewBooksBtn.onclick = () => {
    if (thereIsActiveKey(activeKey)) {
      callApi(selectAjax, "select", activeKey);
    } else {
      consoleLog("No active key");
    }
  }
  
  changeBookBtn.onclick = () => {
    if (thereIsActiveKey(activeKey)) {
      callApi(updateAjax, "update", activeKey, updateId.value, updateTitle.value, updateAuthor.value);
    } else {
      consoleLog("No active key");
    }
  }
  
  deleteBookBtn.onclick = () => {
    if (thereIsActiveKey(activeKey)) {
      callApi(deleteAjax, "delete", activeKey, deleteId.value);
    } else {
      consoleLog("No active key");
    }
  }
//------------- API Load Listeners --------------
  keyAjax.onreadystatechange = () => {
    if (keyAjax.readyState == 4 && keyAjax.status === 200) {
      let parsedJson = JSON.parse(keyAjax.responseText);
      activeKey = parsedJson.key;
      consoleLog("Active Key: " + activeKey);
    }
  };
  
  insertAjax.onreadystatechange = () => {
    if (insertAjax.readyState == 4 && insertAjax.status === 200) {
      let parsedJson = JSON.parse(insertAjax.responseText);
      consoleLog(JSON.stringify(parsedJson));
    }
  };
  
  selectAjax.addEventListener("load", () => {
    let parsedJson = JSON.parse(selectAjax.responseText);
    consoleLog(JSON.stringify(parsedJson));
  });
  
  updateAjax.addEventListener("load", () => {
    let parsedJson = JSON.parse(updateAjax.responseText);
    consoleLog(JSON.stringify(parsedJson));
  });
  
  deleteAjax.addEventListener("load", () => {
    let parsedJson = JSON.parse(deleteAjax.responseText);
    consoleLog(JSON.stringify(parsedJson));
  });
};