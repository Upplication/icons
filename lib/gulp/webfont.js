var fs       = require('fs')
 ,  path     = require('path')
 ,  through  = require('through2').obj
 ,  plexer   = require('plexer')
 ,  _        = require('lodash')
 ,  gutil    = require('gulp-util')
 ,  iconfont = require('gulp-iconfont')

 module.exports = function(options) {

    var cssTpl = fs.readFileSync(options.cssTemplate, 'utf8')
    var css = _.template(cssTpl)

	// Runtime variables
	var stream = null
	 ,  runTimestamp = Math.round(Date.now() / 1000)
	 ,  glyphs = []

    var inStream = iconfont({
        fontName: options.fontName,
        formats: ['woff'],
        timestamp: runTimestamp,
    })
    .on('glyphs', function(_glyphs, options) {
        // Exopse the glyphs for later use
        glyphs = _glyphs.map(function(glyph) {
            var code = glyph.unicode[0]
            glyph.code = '\\' + code.charCodeAt(0).toString(16)
            return glyph
        })
        stream.emit('glyphs', glyphs)
    })

    var outStream = inStream
    .pipe(through(function (file, enc, cb) {

		var fontFile = new gutil.File({
			cwd: file.cwd,
			base: file.base,
			path: path.join(file.base, options.fontName) + '.css',
			contents: new Buffer(css({
		        fontName: options.fontName,
		        iconClass: options.iconClass,
		        base64font: file.contents.toString('base64'),
		        glyphs: glyphs
		    }))
		})

    	return cb(null, fontFile)
    }))

    stream = plexer.obj(inStream, outStream)
    return stream
}