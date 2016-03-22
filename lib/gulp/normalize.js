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

        // 1. Scale to the expected size
        var largestMeasure = Math.max(orgBbox.width, orgBbox.height);
        var scale = expectedSize / largestMeasure ;
        var p = svgpath(orgPath)
                    .translate(-orgBbox.minX, -orgBbox.minY)
                    .scale(scale)

        // 2. Center icon on a expectedSize x expectedSize viewbox
        var newPath = p.toString()
        var newBbox = svgbbox(newPath)
        var height = newBbox.height
        var width = newBbox.width

        var xTrasnlation = Math.abs(expectedSize - width) / 2;
        var yTrasnlation = Math.abs(expectedSize - height) / 2;

        console.log(xTrasnlation)
        console.log(yTrasnlation)
        var centeredPath = svgpath(newPath)
                            .translate(xTrasnlation, yTrasnlation)

        $svg.attr('width', expectedSize)
        $svg.attr('height', expectedSize)
        $path.attr('d', centeredPath.toString());


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