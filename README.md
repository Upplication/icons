# Upplication Icons
This is the collection of icons used by Upplication in our dashboard and/or landing page.  
Live demo available at http://upplication.github.io/icons

## Usage

### Bower
```
$ bower install Upplication/icons
```

### Raw
```html
<link rel="stylesheet" type="text/css" href="//upplication.github.io/icons/upplication-icons.css" />
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
Given the available glyphs, generate `index.html`, containing all of the available icons.

### demo
**DO NOT RUN THIS TASK BY ITSELF**
```
gulp demo
```
Opens the `index.html` file in the OS default browser

### gitwork
```
gulp gitwork
```
If untracked svg icons are available at `lib/icons`:
* Adds all of them to commit
* Generate a message containing the list of new icons
* Bump `package.json` patch version
* Adds `package.json` and `dist/*.css` to commit
* Commits with the new version + previous message
* Tags the previous commit with tne new version and message as release notes

## Contributing

### Icons
There is a really easy way to contribute with icons to this project
* Clone the project
* Run `npm install`
* Add the new icons to `lib/icons` directory
* Run `gulp` as much as you need. This will generate the font and css files and open a live local demo with them.
* When you are done, run `gulp version`
* Run `git push --follow-tags` OR `git push && git push --tags`
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
