# Upplication Icons
This is the collection of icons used by Upplication in our dashboard and/or landing page.

## How it works
Given a collecion of svg icons (located at `src/icons`), this repo has a set of scripts that
allows us to:
* Generate a webfont (ttf, woff, eot) containing all those icons.
* Generate a CSS file that embeds the woff webfont in base64 format.
* Add each icon to the CSS file with its own class (based on the svg filename) and a common one.
* Generate a html demo page with all the available icons.

## Usage

### Bower
```
$ bower install Upplication/icons
```

### Raw
```html
<link rel="stylesheet" type="text/css" href="//upplication.github.io/dist/upplication-icons.css" />
```

## Contributing
After cloning the repo, run the following:

```
$ npm install
$ gulp
```

If no changes are made to the config variables in the gulpfile this will
generate the following files
* `dist/upplication-icons.css`
* `dist/fonts/upplication-icons.eot`
* `dist/fonts/upplication-icons.ttf`
* `dist/fonts/upplication-icons.woff`