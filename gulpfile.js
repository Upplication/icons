// Libs
var fs       = require('fs')
 ,  path     = require('path')
 ,  _        = require('lodash')
 ,  gulp     = require('gulp')
 ,  seq      = require('run-sequence')
 ,  iconfont = require('gulp-iconfont');

// Configs
var fontName  = 'upplication-icons'
 ,  iconClass = 'icon'

// Path shorthands
var srcPath      = './src'
 ,  dstPath      = './dist'
 ,  srcIconsPath = path.join(__dirname, srcPath, 'icons/*.svg')
 ,  dstFontsPath = path.join(__dirname, dstPath, 'fonts')
 ,  srcHtmlTpl   = path.join(__dirname, srcPath, 'index.html.tpl')
 ,  dstHtmlFile  = path.join(__dirname, 'index.html')
 ,  srcCssTpl    = path.join(__dirname, srcPath, 'iconfont.css.tpl')
 ,  dstCssFile   = path.join(__dirname, dstPath, fontName + '.css');

// Runtime variables
var runTimestamp = Math.round( Date.now() / 1000)
 ,  glyphs = [];

// Removes blank lines from the given str
var clean = function(str) {
    return String(str || '')
            .replace(/^\s*[\r\n]/gm, '');
}

/**
 * Generates a set of fonts containing all the icons vailable at
 * src/icons. The font formats are: ['ttf', 'eot', 'woff'].
 */
gulp.task('iconfont', function() {
    return gulp.src([ srcIconsPath ])
    .pipe(iconfont({
        fontName: fontName,                 // required
        formats: ['ttf', 'eot', 'woff'],    // default, 'woff2' and 'svg' are available
        timestamp: runTimestamp,            // recommended to get consistent builds when watching files
    }))
    .on('glyphs', function(_glyphs, options) {
        // Exopse the glyphs globally for later use by other tasks
        glyphs = _glyphs;
        glyphs.forEach(function(glyph) {
            var code = glyph.unicode[0];
            glyph.code = '\\' + code.charCodeAt(0).toString(16);
        })
    })
    .pipe(gulp.dest(dstFontsPath))
});

/**
 * Grabs the generated woff font by the iconfont task, encodes it
 * to base64, embeds it on a css file and populate that file with
 * all the icons available.
 */
gulp.task('webfont', function(cb) {
    var base64font = fs.readFileSync(path.join(dstFontsPath, fontName + '.woff'), 'base64');
    var cssTemplate = fs.readFileSync(srcCssTpl, 'utf8');
    var cssCompiler = _.template(cssTemplate);
    var cssCompiled = cssCompiler({
        fontName: fontName,
        base64font: base64font,
        iconClass: iconClass,
        glyphs: glyphs
    });
    fs.writeFileSync(dstCssFile, clean(cssCompiled));
    cb()
})

gulp.task('demopage', function(cb) {
    var htmlTemplate = fs.readFileSync(srcHtmlTpl, 'utf8');
    var htmlCompiler = _.template(htmlTemplate);
    var htmlCompiled = htmlCompiler({
        fontName: fontName,
        iconClass: iconClass,
        glyphs: glyphs
    });
    fs.writeFileSync(dstHtmlFile, clean(htmlCompiled));
    cb()
})

gulp.task('compile', function(cb) {
    seq('iconfont',
        'webfont',
        'demopage',
        cb
    );
})

gulp.task('default', [ 'compile' ]);