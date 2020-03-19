# Library Referring URLs

This is a simple site template to help libraries set up a referring URL system to authenticate patrons for remote access to the library's online resources. It uses regular expressions for barcode matching to authentication. It's built using PHP, jQuery, and Bootstrap.

# Customizing the code

You're welcome to reuse and repurpose the code as you wish! The following files require customization.

## `header.php`

This page is mostly HTML and can be easily edited with the relevant names and URLs for your library.

```html
line 9:     <title>Authenticating [YOUR LIBRARY NAME] patrons</title>
```

```html
line 35:    <a href="[YOUR LIBRARY WEBSITE]" target="_blank"><img src="[YOUR LIBRARY LOGO]" alt="[YOUR LIBRARY NAME]" title="[YOUR LIBRARY NAME]"/></a>
```
