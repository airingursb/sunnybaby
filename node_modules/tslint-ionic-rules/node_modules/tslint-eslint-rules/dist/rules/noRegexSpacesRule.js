"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require('tslint/lib/lint');
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        var walker = new NoRegexSpacesWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoRegexSpacesWalker = (function (_super) {
    __extends(NoRegexSpacesWalker, _super);
    function NoRegexSpacesWalker() {
        _super.apply(this, arguments);
    }
    NoRegexSpacesWalker.prototype.visitRegularExpressionLiteral = function (node) {
        this.validateMultipleSpaces(node);
        _super.prototype.visitRegularExpressionLiteral.call(this, node);
    };
    NoRegexSpacesWalker.prototype.validateMultipleSpaces = function (node) {
        var res = /( {2,})+?/.exec(node.text);
        if (res) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), "spaces are hard to count - use {" + res[0].length + "}"));
        }
    };
    return NoRegexSpacesWalker;
}(Lint.RuleWalker));
