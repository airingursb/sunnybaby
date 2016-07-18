var gulp = require('gulp');

module.exports = function(options) {
  options.src = options.src || 'app/**/*.html';
  options.dest = options.dest || 'www/build';

  return gulp.src(options.src)
    .pipe(gulp.dest(options.dest));
}
