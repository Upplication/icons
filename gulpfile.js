// Libs
var fs        = require('fs')
 ,  path      = require('path')
 ,  _         = require('lodash')
 ,  gulp      = require('gulp')
 ,  gutil     = require('gulp-util')
 ,  rename    = require('gulp-rename')
 ,  open      = require('gulp-open')
 ,  cssmin    = require('gulp-clean-css')
 ,  less      = require('gulp-less')
 ,  seq       = require('run-sequence')
 ,  svgsize   = require('./lib/gulp/svgsize')
 ,  normalize = require('./lib/gulp/normalize')
 ,  webfont   = require('./lib/gulp/webfont')
 ,  release   = require('./lib/gulp/release')

// Configs
var fontName  = 'upplication-icons'
 ,  iconClass = 'icon'
 ,  svgSize   = '500px'

// Path shorthands
var srcPath      = './lib'
 ,  dstPath      = './dist'
 ,  srcIconsPath = path.join(__dirname, srcPath, 'icons/*.svg')
 ,  srcHtmlTpl   = path.join(__dirname, srcPath, 'index.html.tpl')
 ,  dstHtmlFile  = path.join(__dirname, dstPath, 'index.html')
 ,  srcCssTpl    = path.join(__dirname, srcPath, 'iconfont.less.tpl')
 ,  dstCssFile   = path.join(__dirname, dstPath, fontName + '.css')

var glyphs = [] // For sharing data among tasks

gulp.task('svgs', function() {
    return gulp.src([ srcIconsPath ])
    .pipe(normalize())
    .pipe(gulp.dest('./meh'))
})

/**
 * Generates a css file containing a base64 encoded version
 * of the font generated by the given svg icons
 */
gulp.task('webfont', function() {
    return gulp.src([ srcIconsPath ])
    .pipe(svgsize())
    .pipe(webfont({
        fontName: fontName,
        iconClass: iconClass,
        cssTemplate: srcCssTpl,
        extension: 'less',
        centerHorizontally: true,
        fixedWidth: true,
        normalize: true
    }))
    .on('glyphs', function(g) {
        glyphs = g
        gutil.log('Generated webfont', gutil.colors.green(fontName), 'with', gutil.colors.cyan(g.length), 'glyphs')
    })
    .pipe(gulp.dest(dstPath))
    .pipe(less())
    .pipe(gulp.dest(dstPath))
});

gulp.task('minify', function() {
    return gulp.src(dstCssFile)
        .pipe(cssmin({ compatibility: 'ie8' }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest(dstPath))
})

gulp.task('demogen', function(cb) {
    var htmlTemplate = fs.readFileSync(srcHtmlTpl, 'utf8');
    var htmlCompiler = _.template(htmlTemplate);
    var htmlCompiled = htmlCompiler({
        fontName: fontName,
        iconClass: iconClass,
        glyphs: glyphs
    });
    fs.writeFileSync(dstHtmlFile, htmlCompiled);
    cb()
})

gulp.task('demo', function() {
    return gulp.src(dstHtmlFile)
                .pipe(open());
})

gulp.task('gitwork', release())

gulp.task('version', function(cb) {
    seq('webfont',
        'minify',
        'demogen',
        'gitwork',
        cb
    );
})

gulp.task('default', function(cb) {
    seq('webfont',
        'minify',
        'demogen',
        'demo',
        cb
    );
});