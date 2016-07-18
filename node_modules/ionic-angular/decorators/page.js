"use strict";
var core_1 = require('@angular/core');
var _reflect = Reflect;
/**
 * @private
 */
function Page(config) {
    return function (cls) {
        // deprecated warning: added beta.8 2016-05-27
        void 0;
        config.selector = 'ion-page';
        config.host = config.host || {};
        config.host['[hidden]'] = '_hidden';
        config.host['[class.tab-subpage]'] = '_tabSubPage';
        var annotations = _reflect.getMetadata('annotations', cls) || [];
        annotations.push(new core_1.Component(config));
        _reflect.defineMetadata('annotations', annotations, cls);
        return cls;
    };
}
exports.Page = Page;
