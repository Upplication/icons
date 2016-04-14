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
                'dist/*.css',
                'lib/icons/*.svg'
            ])
            .pipe(git.add())
            .pipe(git.commit('Version release: ' + pkg.version + '\r\n\r\n' + msg))
            .on('end', function() {
                git.tag('v' + pkg.version, msg, function() {
                    cb()
                })
            })
        }

        git.status({ args: '--porcelain', quiet: true }, function (err, stdout) {
            if (err) throw err;

            var newIcons = [];
            var updatedIcons = [];

            stdout
            .split(/\r?\n/)
            .forEach(function(line) {
                var rgx = /^(\?\?|\sM|A\s) lib\/icons\/(.*?)\.svg$/;
                var match = rgx.exec(line);

                if (match != null) {
                    var mode = match[1].trim();
                    var icon = match[2];
                    if (mode == '??' || mode == 'A')
                        newIcons.push(icon);
                    else if (mode == 'M')
                        updatedIcons.push(icon);
                }
            })

            msg += newIcons.map(function (icon) {
                return '* Added icon: ' + icon
            }).join('\r\n')

            if (updatedIcons.length > 0)
                msg += '\r\n';

            msg += updatedIcons.map(function (icon) {
                return '* Updated icon: ' + icon
            }).join('\r\n')

            if (newIcons.length > 0) {
                commitAndTag()
            }
            else
                cb()
        });
    }
}