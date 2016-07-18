"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require('typescript');
var Lint = require('tslint/lib/lint');
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        var walker = new NoSparseArraysWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    Rule.FAILURE_STRING = 'unexpected comma in middle of array';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoSparseArraysWalker = (function (_super) {
    __extends(NoSparseArraysWalker, _super);
    function NoSparseArraysWalker() {
        _super.apply(this, arguments);
    }
    NoSparseArraysWalker.prototype.visitArrayLiteralExpression = function (node) {
        this.validateNoSparseArray(node);
        _super.prototype.visitArrayLiteralExpression.call(this, node);
    };
    NoSparseArraysWalker.prototype.validateNoSparseArray = function (node) {
        var hasEmptySlot = node.elements.some(function (el) { return el.kind === ts.SyntaxKind.OmittedExpression; });
        if (hasEmptySlot) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
        }
    };
    return NoSparseArraysWalker;
}(Lint.RuleWalker));
