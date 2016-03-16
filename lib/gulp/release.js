var plexer   = require('plexer')
 ,  semver   = require('semver')
 ,  through2 = require('through2')
 ,  gutil    = require('gulp-util')
 ,  git      = require('gulp-git')

module.exports = function() {

	var version = null;
	var versionMessage = '\r\n';

    var inStream = through2.obj(function (file, enc, cb) {
    	if (/package\.json$/.test(file.path)) {
    		var pkg = JSON.parse(file.contents.toString())
    		console.log(pkg)
    		pkg.version = semver.inc(pkg.version, 'patch')
    		version = pkg.version
			var _file = new gutil.File({
				cwd: file.cwd,
				base: file.base,
				path: file.path,
				contents: new Buffer(JSON.stringify(pkg, null, 2))
			})
			return cb(null, _file)
    	}

    	var iconsRgx = /icons\/(.*)\.svg$/;
    	var iconMatch = iconsRgx.exec(file.path);
    	if (iconMatch != null)
    		versionMessage += '* Added icon ' + iconMatch[1] + '\r\n'
        cb(null, file)
    })

    var outStream = inStream
    .pipe(git.commit('Version release: ' + version))

    return plexer.obj(inStream, outStream)
}