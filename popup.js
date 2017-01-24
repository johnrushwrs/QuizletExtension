var bkg = chrome.extension.getBackgroundPage();
var access_code = null;
// bkg.console.log('foo');

function change_html(newUrl){
	window.location.href = newUrl;
}

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

function login_attempt(items){

	if (items != null ){
		access_code = items;
		console.log(access_code); // not sure of format
		// change_html("login.html");
	} else{
		login();
	}

}

function login(){
	var redirect_uri = "https://" + chrome.runtime.id + ".chromiumapp.org/provider_cb" 
	console.log(redirect_uri);
	var authorize_url = "https://quizlet.com/authorize?response_type=code&client_id=jcHbwHRK7k&scope=read write_set&state=login_attempt&redirect_uri=" + encodeURIComponent(redirect_uri);

	// chrome.tabs.create({ 'url': authorize_url });

	chrome.identity.launchWebAuthFlow(
		  {'url': authorize_url, 'interactive': true},
		  function(redirect_url) { 
		  		// YOUR_URL/?code=GENERATED_CODE&state=YOUR_STATE&expires_in=60 ===== format
		  		if (typeof(redirect_url) == undefined){
		  			console.log("fucking redirect_url was undefined...");
		  			return;
		  		}
		  		console.log(redirect_url);
		  		console.log(typeof(redirect_url));
		  		var result = redirect_url.split('/');
		  		var code = redirect_url.split('&')[1]
		  		console.log(code)
		  		code = code.slice(5,code.length);
		  		// console.log("THis got ran");
		  		console.log("The code to be sent to ask for the token is " + code);

		  		chrome.identity.launchWebAuthFlow({
		  			'url' : "https://api.quizlet.com/oauth/token", 'interactive' : true
		  		}, function(redirect_url){
		  				console.log(redirect_url);
		  		});

		   });




}

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}



document.addEventListener('DOMContentLoaded', function() {
	console.log("Finished loading dom content");
 	// renderStatus("DOMContentLoaded....");     
 	//var plusBtn = document.querySelector(".add_word");
 	//plusBtn.addEventListener('click', add_word);

 	chrome.storage.local.get("quizlet_access_code", login_attempt);

 	var loginBtn = document.querySelector(".login");
 	loginBtn.addEventListener('click', login);


});