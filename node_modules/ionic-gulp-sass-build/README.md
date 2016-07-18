# Sass Build Task
Compile your Sass sources into a CSS bundle.

## API

### sassBuild([options])

Returns a [stream](http://nodejs.org/api/stream.html) of [Vinyl files](https://github.com/wearefractal/vinyl-fs)
that can be [piped](http://nodejs.org/api/stream.html#stream_readable_pipe_destination_options).

#### Available options:
- **src** (String|Array) Glob or array of globs ([What's a glob?](https://github.com/isaacs/node-glob#glob-primer)) matching Sass entry files. Default: `'app/theme/app.+(ios|md|wp).scss'`.
- **dest** (String) Output path for the compiled CSS bundle(s). Default: `'www/build/css'`.
- **sassOptions** (Object) [Sass options](https://github.com/sass/node-sass#options). Default:
```
{
  includePaths: [
    'node_modules/ionic-angular',
    'node_modules/ionicons/dist/scss'
  ]
}
```
- **autoprefixerOptions** (Object) [Autoprefixer options](https://github.com/postcss/autoprefixer#options). Default:
```
{
  browsers: [
    'last 2 versions',
    'iOS >= 7',
    'Android >= 4',
    'Explorer >= 10',
    'ExplorerMobile >= 11'
  ],
  cascade: false
}
```
- **onError** (Function) Error handler when there are errors in the Sass stream. Default:
```
function(err) {
  console.error(err.message);
  this.emit('end');
}
```

## Example

```
var sassBuild = require('ionic-gulp-sass-build');

gulp.task('sass', sassBuild);

gulp.task('sass', function(){
  return sassBuild({
    dest: 'www/my-custom-build-dir',
    sassOptions: {
      includePaths: [
        'node_modules/ionic-angular',
        'node_modules/ionicons/dist/scss',
        'node_modules/bootstrap-sass'
      ]
    }
  });
});
```





