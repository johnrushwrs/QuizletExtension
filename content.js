// alert("Hello from your Chrome extension!");

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      // var firstHref = $("a[href^='http']").eq(0).attr("href");

      // console.log(firstHref);
      console.log("Hello! You clicked the browser!");
    }
  }
);