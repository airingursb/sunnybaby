# Scripts Copy Task
Copy default 3rd party scripts to build directory.

## API

### copyScripts([options])

Returns a [stream](http://nodejs.org/api/stream.html) of [Vinyl files](https://github.com/wearefractal/vinyl-fs)
that can be [piped](http://nodejs.org/api/stream.html#stream_readable_pipe_destination_options).

#### Available options:
- **src** (String|Array) Glob or array of globs ([What's a glob?](https://github.com/isaacs/node-glob#glob-primer)) matching 3rd party script files. Default:
```
[
  'node_modules/es6-shim/es6-shim.min.js',
  'node_modules/zone.js/dist/zone.js',
  'node_modules/reflect-metadata/Reflect.js'
]
```
- **dest** (String) Output path for the HTML files. Default: `'www/build/js'`.

## Example

```
var copyScripts = require('ionic-gulp-scripts-copy');

gulp.task('scripts', copyScripts);

gulp.task('scripts', function(){
  return copyScripts({ dest: 'www/my-custom-build-dir' });
});
```
