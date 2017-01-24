var bkg = chrome.extension.getBackgroundPage();
var access_code = null;
// bkg.console.log('foo');



function renderStatus(statusText) {
  // document.getElementById('status').textContent = statusText;
  document.querySelector("#status").textContent = statusText;
}

function add_word(e) {
  var link = document.URL;
  // alert("This is the Link : ( " +link+ " )");
  bkg.console.log("fuck is going on");
  console.log("This is supposed to go to the popup's console");
  document.getElementById('quizlet_img').src = "loading.gif";
}

function login(items){

	if (items != null ){
		
	}

}

// var plusBtn = document.querySelector('.add_word');
// var div = document.querySelector('#status');
// console.log(document);
// console.log(plusBtn);
// bkg.console.log("???");
// plusBtn.addEventListener('click', add_word);
// renderStatus("Succeeded in finding the button");



document.addEventListener('DOMContentLoaded', function() {
 	renderStatus("DOMContentLoaded....");     
 	var plusBtn = document.querySelector(".add_word");
 	plusBtn.addEventListener('click', add_word);

 	chrome.StorageArea.get("quizlet_access_code", login);

});