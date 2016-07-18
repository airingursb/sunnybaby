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
        var walker = new UseIsnanWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    Rule.FAILURE_STRING = 'use the isNaN function to compare with NaN';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var UseIsnanWalker = (function (_super) {
    __extends(UseIsnanWalker, _super);
    function UseIsnanWalker() {
        _super.apply(this, arguments);
        this.OPERATORS = [ts.SyntaxKind.EqualsEqualsToken, ts.SyntaxKind.EqualsEqualsEqualsToken, ts.SyntaxKind.ExclamationEqualsToken, ts.SyntaxKind.ExclamationEqualsEqualsToken];
    }
    UseIsnanWalker.prototype.visitBinaryExpression = function (node) {
        this.validateUseIsnan(node);
        _super.prototype.visitBinaryExpression.call(this, node);
    };
    UseIsnanWalker.prototype.validateUseIsnan = function (node) {
        if (this.OPERATORS.indexOf(node.operatorToken.kind) !== -1) {
            if (node.left.getText() === 'NaN' || node.right.getText() === 'NaN') {
                this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
            }
        }
    };
    return UseIsnanWalker;
}(Lint.RuleWalker));
