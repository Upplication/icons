/**
 * Note: I'm not proud of this script. DON'T TAKE THIS AS A MODEL TO FOLLOW
 * @author Juan Jose
 */
var fs       = require('fs')
 ,  plexer   = require('plexer')
 ,  semver   = require('semver')
 ,  through2 = require('through2')
 ,  gulp     = require('gulp')
 ,  gutil    = require('gulp-util')
 ,  git      = require('gulp-git')

module.exports = function() {

    return function(cb) {
        var version = null;
        var versionMessage = '\r\n';

        var msg = ''
        var pkg = JSON.parse(fs.readFileSync('package.json'))
        pkg.version = semver.inc(pkg.version, 'patch')
        fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2))

        var commitAndTag = function() {
            gulp.src([
                'package.json',
                'index.html',
                'dist/*.css',
                'lib/icons/*.svg'
            ])
            .pipe(git.add())
            .pipe(git.commit('Version release: ' + pkg.version))
            .on('end', function() {
                git.tag('v' + pkg.version, msg, function() {
                    cb()
                })
            })
        }

        git.status({ args: '--porcelain', quiet: true }, function (err, stdout) {
            if (err) throw err;

            var newIcons = stdout
            .split('\r?\n').filter(function(line) {
                return /^\?\? .*[\\/](.*?)\.svg$/m.test(line)
            })
            .map(function(line) {
                return /^\?\? .*[\\/](.*?)\.svg$/m.exec(line)[1]
            })

            msg = newIcons.map(function (icon) {
                return '* Added icon ' + icon
            }).join('\r\n')

            if (newIcons.length > 0) {
                commitAndTag()
            }
            else
                cb()
        });
    }
}