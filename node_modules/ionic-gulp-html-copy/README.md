# HTML Copy Task
Copy HTML sources to build directory.

## API

### copyHTML([options])

Returns a [stream](http://nodejs.org/api/stream.html) of [Vinyl files](https://github.com/wearefractal/vinyl-fs)
that can be [piped](http://nodejs.org/api/stream.html#stream_readable_pipe_destination_options).

#### Available options:
- **src** (String|Array) Glob or array of globs ([What's a glob?](https://github.com/isaacs/node-glob#glob-primer)) matching HTML source files. Default: `'app/**/*.html'`.
- **dest** (String) Output path for the HTML files. Default: `'www/build'`.

## Example

```
var copyHTML = require('ionic-gulp-html-copy');

gulp.task('html', copyHTML);

gulp.task('html', function(){
  return copyHTML({ dest: 'www/my-custom-build-dir'});
});
```





