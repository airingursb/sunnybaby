# Fonts Copy Task
Copy Ionic fonts to build directory.

## API

### copyFonts([options])

Returns a [stream](http://nodejs.org/api/stream.html) of [Vinyl files](https://github.com/wearefractal/vinyl-fs)
that can be [piped](http://nodejs.org/api/stream.html#stream_readable_pipe_destination_options).

#### Available options:
- **src** (String|Array) Glob or array of globs ([What's a glob?](https://github.com/isaacs/node-glob#glob-primer)) matching font source files. Default: `'node_modules/ionic-angular/fonts/**/*.+(ttf|woff|woff2)'`.
- **dest** (String) Output path for the fonts. Default: `'www/build/fonts'`.

## Example

```
var copyFonts = require('ionic-gulp-fonts-copy');

gulp.task('fonts', copyFonts);

gulp.task('fonts', function(){
  return copyFonts({ dest: 'www/my-custom-build-dir'});
});
```






