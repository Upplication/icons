# Upplication Icons

  This is the collection of icons used by Upplication in our dashboard and/or landing page for Upplication and Wingu products.  
Live demo available for Upplication icons: http://upplication.github.io/icons/upplication 
and for Wingu:  http://upplication.github.io/icons/wingu


## Usage

### Bower
```
$ bower install Upplication/icons
```

### Raw
```html
<link rel="stylesheet" type="text/css" href="//upplication.github.io/icons/upplication/upplication-icons.css" />
<link rel="stylesheet" type="text/css" href="//upplication.github.io/icons/wingu/wingu-icons.css" />
```

## Gulp tasks

### default
```
gulp
```
Runs webfont, demogen, demo tasks.

### version
```
gulp version
```
Runs webfont, demogen and gitwork tasks.

### webfont
```
gulp webfont
```
Takes all the icons available at `lib/icons`, checks them for correct size, generate the base64 version
of a woff font that includes all of them and spit out the `dist/upplication-icons.css` file ready to use.

### demogen
**DO NOT RUN THIS TASK BY ITSELF**
```
gulp demogen
```
Given the available glyphs, generate `index.html` for Upplication and Wingu, containing all of the available icons.

### demo
**DO NOT RUN THIS TASK BY ITSELF**
```
gulp demo
```
Opens the `index.html` files in the OS default browser

### gitwork
```
gulp gitwork
```
If new svg icons or updated ones are available at `lib/icons`:
* Generate a commit mesage containing the list of new/updated icons
* Adds `lib/icons/*.svg` `dist/*` to commit
* Commit

## Contributing

### Icons
There is a really easy way to contribute with icons to this project
* Clone the project
* Run `npm install`
* Add the new icons to `lib/icons` directory. Don't worry if you see icons with names like `uEA01-align-center.svg`.
It's normal and *automatic*. Add as many icons as you want with the name you want to give the glype. For example,
you would create a file named `align-center.svg` but later the script would rename it to `uEA01-align-center.svg`.
* Run `gulp` as much as you need. This will generate the font and css files and open a live local demo with them.
* When you are done, run `npm version patch`
* Run `git push --follow-tags`
* Done! :)

```
$ npm install
$ gulp
```

### Code
As usual :)

## How it works
Given a collecion of svg icons (located at `src/icons`), this repo has a set of scripts that
allows us to:
* Generate a webfont (woff) containing all those icons.
* Generate a CSS file that embeds the woff webfont in base64 format.
* Add each icon to the CSS file with its own class (based on the svg filename) and a common one.
* Generate a html demo page with all the available icons.
* Generate a JSON map of every icon name and their unicode
