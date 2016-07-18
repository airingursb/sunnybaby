# Cordova sqlite storage dependencies

AUTHOR: Christopher J. Brody

LICENSE: [Unlicense (unlicense.org)](http://unlicense.org/) (public domain)

Contains source and object code built from:
- SQLite3 (public domain)
- [liteglue / Android-sqlite-native-driver](https://github.com/liteglue/Android-sqlite-native-driver) (Unlicense, public domain)
- [liteglue / Android-sqlite-connector](https://github.com/liteglue/Android-sqlite-connector) (Unlicense, public domain)

This project provides the following dependencies needed to build [litehelpers / Cordova-sqlite-storage](https://github.com/litehelpers/Cordova-sqlite-storage):
- `sqlite3.h`, `sqlite3.c` - SQLite `3.8.10.2` amalgamation needed to build iOS and Windows versions
- `libs` - [liteglue / Android-sqlite-connector](https://github.com/liteglue/Android-sqlite-connector) JAR and [liteglue / Android-sqlite-native-driver](https://github.com/liteglue/Android-sqlite-native-driver) NDK libraries built with SQLite `3.8.10.2` amalgamation
