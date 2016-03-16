var path     = require('path')
 ,  format   = require('util').format
 ,  through2 = require('through2')
 ,  cheerio  = require('cheerio')
 ,  gutil    = require('gulp-util')

module.exports = function(expectedSize) {
    expectedSize = expectedSize || '500px'

    return through2.obj(function (file, enc, cb) {
        var p = gutil.colors.magenta(path.relative(path.dirname(module.parent.filepath), file.path))
        var $ = cheerio.load(file.contents.toString())
        var $root = $(':root')

        var msg = format('%s: %%s %s', gutil.colors.yellow('WARNING'), gutil.colors.red('Omitting'))
        if (!$root.is('svg')) {
            var _msg = format('File %s is not a valid SVG file.', p)
            gutil.log(format(msg, _msg))
            return cb()
        }

        var height = $root.attr('height')
        var width = $root.attr('width')

        var sizeMsg = '%s of %s was %s when %s was expected.'
        if (width != expectedSize) {
            var _msg = format(sizeMsg, gutil.colors.cyan('Width'), p, gutil.colors.red(width), gutil.colors.green(expectedSize))
            gutil.log(msg, _msg)
            return cb()
        }
        
        if (height != expectedSize) {
            var _msg = format(sizeMsg, gutil.colors.cyan('height'), p, gutil.colors.red(height), gutil.colors.green(expectedSize))
            gutil.log(msg, _msg)
            return cb()
        }

        cb(null, file)
    })
}