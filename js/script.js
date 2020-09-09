/**********************************
 * 								  
 *     UPDATE THESE VARIABLES	  
 *   with stuff for your library  
 * 								  
 *********************************/
// 01. Library name
const libName = "My Local Library";

// 02. URL to library logo
const libLogo = "https://mylibrary.org/logo.png";

// 02. Library website
const libURL = "https://mylibrary.org";

// 03. Online library card signup page / info about getting a card
const libGetCard = "https://mylibrary.org/library-cards";

// 04. Library's online resources page 
const libResources = "https://mylibrary.org/resources";

// 05. Regular expression to match a library barcode
// e.g. ^1234567+[0-9]{7}$
//--------------------------------------------------
// for help check out: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
let patterns = new Array(
  {
    regex: new RegExp("^1234567+[0-9]{7}$"),
    length: 14 
  },
  {
    regex: new RegExp(" "),
    length: 0
  }
);

// 06. array of online resources to be used
let databases = new Array(
  {
    id: "abc",
    name: "Sample Database 1",
    url: "https://database-one.com",
    subTitle: "Search historical newspapers!"
  },
  {
    id: "def",
    name: "Sample Database 2",
    url: "https://database-two.com",
    subTitle: "Search business records!"
  }
);






/**     DO NOT EDIT BELOW THIS POINT!      **/









/*********************************
 *	   				VARIABLES				  
 *	  DO NOT need to be updated!	  	  
 *********************************/

// CREATE OBJECT to hold all variables for evaluation and redirection...
let transfer = {
  query: "", // pulled from databases object
  name: "", // pulled from databases object
  url: "", // pulled from databases object
  subtitle: "", // pulled from databases object
  bcode: "", // put sanitized barcode here
  codeLength: 0, // generate from sanitized barcode
  codePattern: "", // insert after comparing lengths
  legit: false // boolean: does query code exist
};


/****************************************************
 *	   				        FUNCTIONS			          
 *	  Sanitizing and evaluating input, redirection	  
 ****************************************************/

// GET QUERY STRING
//-----------------
// Uses regex to get the value of the url query string
// to determine what database to use
/**
 * Get the value of a querystring
 * @param  {String} field The field to get the value of
 * @param  {String} url   The URL to get the value from (optional)
 * @return {String}       The field value
 */
var getQueryString = function ( field, url ) {
	var href = url ? url : window.location.href;
	var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
	var string = reg.exec(href);
	return string ? string[1] : null;
};

// CLEAN INPUT
//------------
// Sanitize the form input by removing special characters
function cleanInput(input) {
  let trimmed = input.trim();
  let cleaned = trimmed.replace(/[^a-zA-Z0-9]/g, "");
  return cleaned;
}

// VALIDATE QUERY
//---------------
// Ensure the database code passed in the URL is valid
function validateQuery(raw) {
  let qPattern = new RegExp("^[a-z]{3}$", "i");
  let cleanQuery = cleanInput(raw).toLowerCase();
  let returnVar = "";

  if(qPattern.test(cleanQuery)) {
    returnVar = cleanQuery;
  }
  else {
    returnVar = "wrong";
  }

  return returnVar;
}

// GET PATTERN
//------------
// Compare length of sanitized barcode input with length of existing approved pattern(s)
// Give an error message if length doesn't match
function getPattern(length) {
  let it = 0;
  let len = patterns.length;

  while (it < len) {
    let patternLength = patterns[it]["length"];

    if (length === patternLength) {
      transfer["codePattern"] = patterns[it]["regex"];
      break;
    } else {
      document.getElementById("feedback").innerHTML = `<p class="alert alert-danger"><strong>Attention!</strong> That library card number isn't valid. Try again or <a href="${libGetCard}" target="_blank">sign up for a library card</a></p>`;
    }
    it++;
  }
}

// VERIFY BARCODE
//---------------
// Evaluate barcode input against relevant pattern determined in getPattern()
function verifyBarcode(pattern, code, legit) {
  if (pattern.test(code)) {
    // if the barcode matches the pattern, give alert mmessage
    // and redirect to URL associated with the database
    if (legit === true) {
      document.getElementById("feedback").innerHTML = `<p class="alert alert-success"><strong>You've logged in!</strong> We are now redirecting you to <code>${transfer["name"]}</code> <em>(this may take a minute)</em></p>`;
      redirect(transfer["url"]);
    }

    // if the barcode matches the pattern but the db code doesn't exist
    // give an error and point to online resources page
    else {
      document.getElementById("feedback").innerHTML = `<p class="alert alert-warning"><strong>Oops!</strong> You're trying to access a site that doesn't use this authentication feature. <a href="${libResources}" target="_blank">Go back to our online resources page</a> and try again.</p>`;
    }
  }

  // if the barcode number doesn't match the pattern
  // give an error and link to page with card signup info
  else {
    document.getElementById("feedback").innerHTML = `<p class="alert alert-danger"><strong>Attention!</strong> That library card number isn't valid. Try again or <a href="${libGetCard}" target="_blank">sign up for a library card</a></p>`;
  }
}

// REDIRECT
//---------
// Redirect user to the url for the relevant database
function redirect(url) {
  let ua = navigator.userAgent.toLowerCase(),
    isIE = ua.indexOf("msie") !== -1,
    version = parseInt(ua.substr(4, 2), 10);

  // Internet Explorer 8 and lower
  if (isIE && version < 9) {
    var link = document.createElement("a");
    link.href = url;
    document.body.appendChild(link);
    link.click();
  }

  // All other browsers can use the standard window.location.href (they don't lose HTTP_REFERER like Internet Explorer 8 & lower does)
  else {
    window.location.href = url;
    // window.location.replace(url);
  }
} // end redirect function


/********************************************
 *	   				 MAIN FUNCTION					  
 *	  runs once all DOM content has loaded		  
 ********************************************/
document.addEventListener("DOMContentLoaded", function main(event) {
	let i = 0;
	let l = databases.length;
    let rawQuery = getQueryString("db");
    let query = validateQuery(rawQuery);

	while (i < l) {
		let f = databases[i]["id"];

		// if the database ID matches the query string value
		// set the page title and database title to the relevant values
		if (f === query) {
			transfer["query"] = databases[i]["id"];
			transfer["url"] = databases[i]["url"];
			transfer["name"] = databases[i]["name"];
			transfer["legit"] = true;
			break;
    }
    else {
      transfer["name"] = "our online resources";
      transfer["legit"] = false;
    }
		i++;
	}

	// HEADER: set page, header info to relevant database
    // & populate transfer object properties
    if (libLogo) {
        document.querySelectorAll("header").innerHTML = `<a href="${libURL}"><img src="${libLogo}" alt="${libName}"></a><h2 id="pageTitle">Remote User Authentication</h2>`;
    } else {
        document.querySelectorAll("header").innerHTML = `<h2 id="pageTitle">Remote User Authentication</h2>`;
    }
    
	document.getElementById("dbTitle").innerHTML = transfer["name"];

	// FOOTER: update year, have link to library website
	let d = new Date();
	let year = d.getFullYear();

	document.getElementById("footer").innerHTML = `<p>&copy; <a href="${libURL}" target="_blank">${libName}</a> ${year}</p>`;


	/***************************************************
	*	   			          FORM SUBMISSION					  
	*	    Analyze input & redirect if conditions met	  
	***************************************************/
	document.getElementById("libBarcode").addEventListener("submit", function(event) {
		event.preventDefault();

		// set variable with barcode number entered in the form
		let code = document.getElementById("inputBarcode").value;

		// 01. Sanitize barcode input
        let cleanedCode = cleanInput(code);
        transfer["bcode"] = cleanedCode.toUpperCase();
        transfer["codeLength"] = cleanedCode.length;

		// 02. Check barcode length to see what pattern it should eval against
		getPattern(transfer["codeLength"]);

		// 03. Evaluate barcode against relevant regex pattern
		verifyBarcode(transfer["codePattern"], transfer["bcode"], transfer["legit"]);
	});
});
