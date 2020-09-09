# Library Referring URLs

This is a simple site template to help libraries set up a referring URL system to enable remote access to the library's online resources. It uses regular expressions for barcode matching to authenticate patrons. Version 2.0 has been refactored to use only vanilla JS and HTML instead of jQuery and PHP, so it will hopefully be easier for people to use.

# How to use

1. Customize the code (see below) with all of your specific library information, including:
    - Links to your library's website, logo, online resources page, and library card information
    - Your library's barcode pattern information
    - Database info such as ID code (a 3-character code you create yourself), URL, and title
2. Upload the code to a directory on your library's website, like `https://mylibrary.org/auth`
3. Set up links to the databases you specified like so: `https://mylibrary.org/auth/index.html?db=abc`


# Customizing the code

You're welcome to reuse and repurpose the code as you wish! Version 2.0 handles all customizations through the `script.js` file in `js`.

## `js/script.js`

**line 8:** enter your library name between the quotation marks
```javascript
const libName = "My Local Library";
```

**line 11:** enter the URL for your library's logo
```javascript
const libLogo = "https://mylibrary.org/logo.png";
```

**line 14:** enter your library website between the quotation marks
```javascript
const libURL = "https://mylibrary.org";
```

**line 17:** enter the page on your website with information about how to obtain a library card
```javascript
const libGetCard = "https://mylibrary.org/library-cards";
```

**line 20:** enter the page on your website with links to your online resources/databases
```javascript
const libResources = "https://mylibrary.org/resources";
```

**lines 26-35:** create a [regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) to match each of your library's barcode patterns and add the length for each pattern. You can delete the second entry if your library only uses 1 pattern
```javascript
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
```

**lines 38-51:** replace the id, name, url, and title with relevant info for your chosen resource
```javascript
let databases = new Array(
  {
    id: "abc", // this is a 3-character code you create yourself
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
```
