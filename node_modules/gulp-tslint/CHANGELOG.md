<a name="5.0.0"></a>
# 5.0.0 (2016-04-24)

## Changes

- support for extends property

<a name="4.3.0"></a>
# 4.3.0 (2016-01-11)

## Changes

- Updated rcloader fixing overriding configuration keys: https://github.com/spalger/rcloader/issues/10

<a name="4.2.0"></a>
# 4.2.0 (2015-12-13)

## Changes

- Added "typings" support, now gulp-tslint types are automatically enabled in TypeScript
- Converted to TypeScript

<a name="4.1.0"></a>
# 4.1.0 (2015-11-29)

## Changes

- summarizeFailureOutput now works with emitError: false

<a name="4.0.0"></a>
# 4.0.0 (2015-11-27)

## Changes

- **breaking change**: Update tslint to 3.0.0
- **breaking change**: tslint is now a peer dependency

<a name="3.2.0"></a>
# 3.2.0 (2015-08-13)

## Changes

- Add the tslint option to supply a custom tslint module

<a name="3.0.0-beta"></a>
# 3.0.0-beta (2015-05-11)

## Changes

- Update tslint to use the TypeScript 1.5.0-beta compiler
- Due to changes to the typescript compiler API, old custom rules may no longer work and may need to be rewritten
- the JSON formatter's line and character positions are now back to being 0-indexed instead of 1-indexed

<a name="2.0.0"></a>
# 2.0.0 (2015-04-12)

## Changes

- Gulp util's logging used for printing errors.

<a name="1.4.0"></a>
# 1.4.1 (2014-11-13)

## Changes

- The PluginError exception now includes information about the failures
- Update tslint to 1.0.0

<a name="1.3.1"></a>
# 1.3.1 (2014-09-28)

## Changes

- Add .npmignore for reduced package size.

<a name="1.2.0"></a>
# 1.2.0 (2014-06-14)

## Changes

- Fix rulesDirectory
- Remove formattersDirectory
