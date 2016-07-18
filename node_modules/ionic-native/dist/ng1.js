"use strict";
/**
 * Initialize the ionic.native Angular module if we're running in ng1.
 * This iterates through the list of registered plugins and dynamically
 * creates Angular 1 services of the form $cordovaSERVICE, ex: $cordovStatusBar.
 */
function initAngular1(plugins) {
    if (window.angular) {
        window.angular.module('ionic.native', []);
        for (var name in plugins) {
            var serviceName = '$cordova' + name;
            var cls = plugins[name];
            (function (serviceName, cls, name) {
                window.angular.module('ionic.native').service(serviceName, [function () {
                        var funcs = {};
                        for (var k in cls) {
                            funcs[k] = cls[k];
                        }
                        funcs['name'] = name;
                        return funcs;
                    }]);
            })(serviceName, cls, name);
        }
    }
}
exports.initAngular1 = initAngular1;
//# sourceMappingURL=ng1.js.map