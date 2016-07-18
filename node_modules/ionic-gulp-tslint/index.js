var gulp = require('gulp'),
    tslint = require('gulp-tslint'),
    assign = require('lodash.assign');

var defaultOptions = {
  src: 'app/**/*.ts',
  tslintOptions: {
    configuration: 'tslint.json'
  },
  reporter: "verbose",
  reportOptions: {}
};

module.exports = function(options) {
  options = assign(defaultOptions, options);

  return gulp.src(options.src)
      .pipe(tslint(options.tslintOptions))
      .pipe(tslint.report(options.reporter, options.reportOptions));
}
