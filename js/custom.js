$(document).ready(function(){

	/**********************************
	 * 								  *
	 *     UPDATE THESE VARIABLES	  *
	 *   with stuff for your library  *
	 * 								  *
	 *********************************/
	// 01. Library name
	const libName = " ";

	// 02. Library website
	const libURL = " ";

	// 03. Regular expression to match a library barcode
	// e.g. ^1234567+[0-9]{7}$
	let patt2 = new RegExp(' ');

	// 04. array of online resources to be used 
	let databases = new Array(
		{
			id: "abc", 
			name: "Resource ABC", 
			url: "https://abc.com", 
			pageTitle: "Search Historic Newspapers!"
		},
		{
			id: "def", 
			name: "Resource DEF", 
			url: "https://def.com", 
			pageTitle: "Search Business Records"
		},
	)
	
	/************************
	*	    VARIABLES	    *
	*  don't update these!  *
	************************/
	// query string value from hidden form field
	let q2 = $("#inputDB").val();


	/**************************
	*	       HEADER		  *
	*  changes database name  *
	*  and greeting based on  *
	*  db code from query     *
	**************************/
	let i = 0;
	let l = databases.length;
	let id = "";
	let legit = false;

	// while i is less than number of databases in array
	while (i < l) {
		let f = databases[i]["id"];

		// if the database ID matches the query string value
		// set the page title and database title to the relevant values
		if(f === q2) {
			$("#pageTitle").html(databases[i]["pageTitle"]);
			$("#dbTitle").html("<strong>"+databases[i]["name"]+"</strong");
			id = i;
			legit = true;
			break;
		} 
		
		// otherwise use basic online resources language
		else {
			$("#pageTitle").html("Use Online Resources From Home!");
			$("#dbTitle").html("our online resources");
			legit = false;
		}
		i++;
	}
	

	/*********************
	*	    FOOTER		 *
	*  link to library   *
	*  website & update  *
	*  copyright year    *
	*********************/
	var d = new Date();
	var year = d.getFullYear();

	$("footer").html("<p>&copy; <a href=\""+libURL+"\" target=\"_blank\">"+libName+"</a> "+year+"</p>");

	
	/****************************
	*	  REDIRECT FUNCTION		*
	****************************/
	function redirect (url) {
		var ua        = navigator.userAgent.toLowerCase(),
			isIE      = ua.indexOf('msie') !== -1,
			version   = parseInt(ua.substr(4, 2), 10);

		// Internet Explorer 8 and lower
		if (isIE && version < 9) {
			var link = document.createElement('a');
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
	

	/****************************
	*	   SUBMIT FUNCTION		*
	****************************/
	$("#libBarcode").submit(function(event){

		// prevent default form submission action
		event.preventDefault();

		// set variable with barcode number entered in the form
		var code = $("#inputBarcode").val();
		
		// check the barcode input against the regex pattern
		if(patt2.test(code)) {

			// if the barcode matches the pattern, give alert mmessage
			// and redirect to URL associated with the database
			if (legit === true) {
				$("#bcErr").html("<p class=\"alert alert-success\"><b>You've logged in!</b> We are now redirecting you to <code>"+databases[id]["name"]+"</code> <em>(this may take a minute)</em></p>");
				redirect(databases[id]["url"]);
			} 
			
			// if the barcode matches the pattern but the db code doesn't exist
			// give an error and point to online resources page
			else {
				$("#bcErr").html("<p class=\"alert alert-warning\"><b>Oops!</b> You're trying to access a site that doesn't use this authentication feature. <a href=\"[YOUR ONLINE RESOURCES PAGE]\" target=\"_blank\">Go back to our online resources page</a> and try again.</p>");
			}
			
		} 
		
		// if the barcode number doesn't match the pattern
		// give an error and link to page with card signup info
		else {
			$("#bcErr").html("<p class=\"alert alert-danger\"><b>Attention!</b> That library card number isn't right. Try again or <a href=\"[YOUR WEBSITE PAGE ABOUT LIBRARY CARDS]\" target=\"_blank\">sign up for a library card</a></p>");
		}	
	})
});
