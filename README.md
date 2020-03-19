# Library Referring URLs

This is a simple site template to help libraries set up a referring URL system to authenticate patrons for remote access to the library's online resources. It uses regular expressions for barcode matching to authentication. It's built using PHP, jQuery, and Bootstrap.

# Customizing the code

You're welcome to reuse and repurpose the code as you wish! The following files require customization.

## `header.php`

This page is mostly HTML and can be easily edited with the relevant names and URLs for your library.

**line 9:**
```html
<title>Authenticating [YOUR LIBRARY NAME] patrons</title>
```

**line 35:**
```html
<a href="[YOUR LIBRARY WEBSITE]" target="_blank"><img src="[YOUR LIBRARY LOGO]" alt="[YOUR LIBRARY NAME]" title="[YOUR LIBRARY NAME]"/></a>
```

## `js/custom.js`

All of the logic for barcode matching and site redirection is done in this file.

**line 10:** enter your library name between the quotation marks
```javascript
const libName = " ";
```

**line 13:** enter your library website between the quotation marks
```javascript
const libURL = " ";
```

**line 17:** create a [regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) to match your library's barcode
```javascript
let patt2 = new RegExp(' ');
```

**lines 20-33:** replace the id, name, url, and title with relevant info for your chosen resource
```javascript
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
```

**line 138:** 
```javascript
$("#bcErr").html("<p class=\"alert alert-warning\"><b>Oops!</b> You're trying to access a site that doesn't use this authentication feature. <a href=\"[YOUR ONLINE RESOURCES PAGE]\" target=\"_blank\">Go back to our online resources page</a> and try again.</p>");
```

**line 146:**
```javascript
$("#bcErr").html("<p class=\"alert alert-danger\"><b>Attention!</b> That library card number isn't right. Try again or <a href=\"[YOUR WEBSITE PAGE ABOUT LIBRARY CARDS]\" target=\"_blank\">sign up for a library card</a></p>");
```
