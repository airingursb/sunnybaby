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
        var walker = new NoControlRegexWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    Rule.FAILURE_STRING = 'unexpected control character in regular expression';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoControlRegexWalker = (function (_super) {
    __extends(NoControlRegexWalker, _super);
    function NoControlRegexWalker() {
        _super.apply(this, arguments);
    }
    NoControlRegexWalker.prototype.visitRegularExpressionLiteral = function (node) {
        this.validateControlRegex(node);
        _super.prototype.visitRegularExpressionLiteral.call(this, node);
    };
    NoControlRegexWalker.prototype.visitNewExpression = function (node) {
        if (node.expression.getText() === 'RegExp') {
            this.visitRegularExpressionFunction(node);
        }
        _super.prototype.visitNewExpression.call(this, node);
    };
    NoControlRegexWalker.prototype.visitCallExpression = function (node) {
        if (node.expression.getText() === 'RegExp') {
            this.visitRegularExpressionFunction(node);
        }
        _super.prototype.visitCallExpression.call(this, node);
    };
    NoControlRegexWalker.prototype.visitRegularExpressionFunction = function (node) {
        if (node.arguments && node.arguments.length > 0 && node.arguments[0].kind === ts.SyntaxKind.StringLiteral) {
            this.validateControlRegex(node.arguments[0]);
        }
    };
    NoControlRegexWalker.prototype.validateControlRegex = function (node) {
        if (/[\x00-\x1f]/.test(node.text)) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
        }
    };
    return NoControlRegexWalker;
}(Lint.RuleWalker));
