var through2 = require('through2')
 ,  cheerio  = require('cheerio')
 ,  gutil    = require('gulp-util')
 ,  svgpath = require('svgpath')
 ,  cheerio = require('cheerio')
 ,  svgbbox = require('svg-path-bounding-box')

module.exports = function(expectedSize) {
    expectedSize = expectedSize || 1000

    return through2.obj(function (file, enc, cb) {

        var $ = cheerio.load(file.contents.toString());
        var $svg = $('svg')
        var $path = $svg.find('> path');

        if ($path.length <= 0) {
            console.error('Error svg is not single path')
        }

        var orgPath = $path.attr('d');
        var orgBbox = svgbbox(orgPath);
        // console.log(orgBbox.width + ' x ' + orgBbox.height)

        var largestMeasure = Math.max(orgBbox.width, orgBbox.height);
        var scale = expectedSize / largestMeasure ;
        var p = svgpath(orgPath)
                    .scale(scale)
                    .translate(-orgBbox.minX, -orgBbox.minY)

        // console.log('scale factor ' + scale)
        var newPath = p.toString()
        var newBbox = svgbbox(newPath)
        console.log(newBbox)
        // console.log(newBbox.width + ' x ' + newBbox.height)

        $svg.attr('width', newBbox.width)
        $svg.attr('height', newBbox.height)
        $path.attr('d', newPath);


        var svgIconFile = new gutil.File({
            cwd: file.cwd,
            base: file.base,
            path: file.path,
            contents: new Buffer($.html())
        })

        // console.log(svgIconFile.contents.toString())
        cb(null, svgIconFile)
    })
}