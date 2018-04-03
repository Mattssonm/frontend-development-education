window.onload = () => {
//---------- Variable Declaration------------- 
  //Buttons
	let requestApiBtn = document.getElementById("requestApiBtn");
  let showDivBtn = document.getElementById("showDivBtn");
	let addBookBtn = document.getElementById("addBookBtn");
  let viewBooksBtn = document.getElementById("viewBooksBtn");
	let changeBookBtn = document.getElementById("changeBookBtn");
	let deleteBookBtn = document.getElementById("deleteBookBtn");
  let addExampleBtn = document.getElementById("addExampleBtn");
  
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
  let addBookDiv = document.getElementById("addBookDiv");
  let errorText = document.getElementById("errorText");
  let errorDiv = document.getElementById("errorDiv");
  let displayActiveKey = document.getElementById("displayActiveKey");	let activeKey = "";
  let exampleCounter = 0;
  let numberOfTimesCalledApi = 0;
  let lastApiCall = [];
  
//----------- Functions ------------
  function thereIsActiveKey(key) {
    return Boolean(key);
  };
  
  function hideError() {
    errorDiv.style.opacity = 0;
  }
  
  function showError() {
    errorDiv.style.opacity = 1;
  }
  
  function errorLog(message, numberOfFailedCalls) {
    if (message == "Success!") {
      errorDiv.setAttribute("class", "alert-success");
    } else {
      errorDiv.setAttribute("class", "alert-danger");
    }
    errorText.innerHTML = message;
    if (numberOfFailedCalls > 0) {
      errorText.innerHTML += " Failed calls: " + numberOfFailedCalls;
    }
    setTimeout(showError, 100);
    setTimeout(hideError, 3000);
  };

  function callApi(ajax, op, key, id, title, author) {
    let query = "?";
    let url = "https://www.forverkliga.se/JavaScript/api/crud.php";
    lastApiCall = [ajax, op, key, id, title, author];
    console.log(lastApiCall);
    //Add operation
    if (op) {
      if (op == "requestKey") {
        query += "" + op + "";
      } else {
        query += "op=" + op + "";
      }
    }

    //Add key
    if (key) {
      query += "&key=" + key + "";
    }

    //Add id
    if (id) {
      query += "&id=" + id + "";
    }

    //Add title
    if (title) {
      query += "&title=" + title + "";
    }

    //Add author
    if (author) {
      query += "&author=" + author + "";
    }
    
    //Call API with query
    ajax.open('GET', url+query);
    ajax.send();
  };
  
  function displayBookTable(books) {
    let tableBody = document.getElementsByTagName("tbody")[0];
    //Reset table body
    tableBody.innerHTML = "";
    let rowCounter = 1;
    
    //Loop all books and create a row for each
    books.forEach( book => {
      
      //Variable declaration
      let newRow = document.createElement("tr");
      let th = document.createElement("th");
      let titleTd = document.createElement("td");
      let titleSpan = document.createElement("span");
      let titleInput = document.createElement("input");
      let authorTd = document.createElement("td");
      let authorSpan = document.createElement("span");
      let authorInput = document.createElement("input");
      let removeTd = document.createElement("td");
      let removeBtn = document.createElement("i");
      
      //Add event listeners
      titleSpan.addEventListener("click", () => {
        titleTd.replaceChild(titleInput, titleSpan);
      });
      
      authorSpan.addEventListener("click", () => {
        authorTd.replaceChild(authorInput, authorSpan);
      });
      
      titleInput.addEventListener("blur", () => {
        callApi(updateAjax, "update", activeKey, book.id, titleInput.value, book.author)
      });
      
      authorInput.addEventListener("blur", () => {
        callApi(updateAjax, "update", activeKey, book.id, book.title, authorInput.value)
      });
      
      titleInput.addEventListener("mouseout", () => {
        callApi(updateAjax, "update", activeKey, book.id, titleInput.value, book.author)
      });
      
      authorInput.addEventListener("mouseout", () => {
        callApi(updateAjax, "update", activeKey, book.id, book.title, authorInput.value)
      });
      
      titleInput.addEventListener('keypress', function (e) {
          var key = e.which || e.keyCode;
          if (key === 13) {
            callApi(updateAjax, "update", activeKey, book.id, titleInput.value, book.author)
          }
      });
      
      authorInput.addEventListener('keypress', function (e) {
          var key = e.which || e.keyCode;
          if (key === 13) {
            callApi(updateAjax, "update", activeKey, book.id, book.title, authorInput.value)
          }
      });
      
      removeBtn.addEventListener("click", () => {
        callApi(deleteAjax, "delete", activeKey, book.id);
      });
      
      //Set attributes and innerHTML
      th.setAttribute("scope", "row");
      th.innerHTML = rowCounter;
      rowCounter++;
      titleSpan.innerHTML = book.title;
      titleInput.setAttribute("type", "text");
      titleInput.setAttribute("value", book.title);
      authorSpan.innerHTML = book.author;
      authorInput.setAttribute("type", "text");
      authorInput.setAttribute("value", book.author);
      removeBtn.classList.add("fas", "fa-times");
      
      //Append elements
      titleTd.appendChild(titleSpan);
      authorTd.appendChild(authorSpan);
      removeTd.appendChild(removeBtn);
      newRow.appendChild(th);
      newRow.appendChild(titleTd);
      newRow.appendChild(authorTd);
      newRow.appendChild(removeTd)
      tableBody.appendChild(newRow);
    });
  }

//----------- Button Listeners ----------
  
  showDivBtn.addEventListener("click", () => {
    if (addBookDiv.style.opacity == 0) {
      addBookDiv.style.opacity = 1;
    } else {
      addBookDiv.style.opacity = 0;
    }
  });
  
  requestApiBtn.addEventListener("click", () => {
    callApi(keyAjax, "requestKey");
  });
  
  addBookBtn.addEventListener("click", () => {
    if (thereIsActiveKey(activeKey)) {
      callApi(insertAjax, "insert", activeKey, 0, addTitle.value, addAuthor.value);
    } else {
      errorLog("No active key");
    }
  });	
  
//------------- API Load Listeners --------------
  keyAjax.addEventListener("load", () => {
    let parsedJson = JSON.parse(keyAjax.responseText);
    if (parsedJson.status == "error") {
      if (numberOfTimesCalledApi == 10) {
      errorLog("Max calls exceeded", numberOfTimesCalledApi)
      } else {
      callApi(lastApiCall[0], lastApiCall[1]);
      numberOfTimesCalledApi++;
      }
    } else {
      activeKey = parsedJson.key;
      displayActiveKey.innerHTML = "Current Key: " + activeKey;
      errorLog("Success!", numberOfTimesCalledApi);
      numberOfTimesCalledApi = 0;
    }
  });
  
  insertAjax.addEventListener("load", () => {
    let parsedJson = JSON.parse(insertAjax.responseText);
    if (parsedJson.status == "error"){
      if (!addTitle.value || !addAuthor.value) {
        console.log("hej");
        errorLog(parsedJson.message);
      }
      else if (numberOfTimesCalledApi == 10) {
      errorLog("Max calls exceeded", numberOfTimesCalledApi)
      } else {
      callApi(lastApiCall[0], lastApiCall[1], lastApiCall[2], lastApiCall[3], lastApiCall[4], lastApiCall[5]);
      numberOfTimesCalledApi++;
      }
    } else {
      errorLog("Success!", numberOfTimesCalledApi);
      numberOfTimesCalledApi = 0;
      callApi(selectAjax, "select", activeKey);
    }
  });
  
  selectAjax.addEventListener("load", () => {
    let parsedJson = JSON.parse(selectAjax.responseText);
    if (parsedJson.status == "error") {
      if (numberOfTimesCalledApi == 10) {
      errorLog("Max calls exceeded", numberOfTimesCalledApi)
      } else {
      callApi(lastApiCall[0], lastApiCall[1], lastApiCall[2]);
      numberOfTimesCalledApi++;
      }
    } else {
      numberOfTimesCalledApi = 0;
      displayBookTable(parsedJson.data);
    }
  });
  
  updateAjax.addEventListener("load", () => {
    let parsedJson = JSON.parse(updateAjax.responseText);
    if (parsedJson.status == "error"){
      if (numberOfTimesCalledApi == 10) {
      errorLog("Max calls exceeded", numberOfTimesCalledApi)
      } else {
      callApi(lastApiCall[0], lastApiCall[1], lastApiCall[2], lastApiCall[3], lastApiCall[4], lastApiCall[5]);
      numberOfTimesCalledApi++;
      }
    } else {
      errorLog("Success!", numberOfTimesCalledApi);
      numberOfTimesCalledApi = 0;
      callApi(selectAjax, "select", activeKey);
    }
  });
  
  deleteAjax.addEventListener("load", () => {
    let parsedJson = JSON.parse(deleteAjax.responseText);
    if (parsedJson.status == "error"){
      if (numberOfTimesCalledApi == 10) {
      errorLog("Max calls exceeded", numberOfTimesCalledApi)
      } else {
      callApi(lastApiCall[0], lastApiCall[1], lastApiCall[2], lastApiCall[3]);
      numberOfTimesCalledApi++;
      }
    } else {
      errorLog("Success!", numberOfTimesCalledApi);
      numberOfTimesCalledApi = 0;
      callApi(selectAjax, "select", activeKey);
    }
  });
  
  
  //------------- Other --------------
  //Request key on page load
  callApi(keyAjax, "requestKey");
};