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
        var walker = new NoUnexpectedMultilineWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    Rule.FAILURE_STRING = {
        func: 'unexpected newline between function and ( of function call',
        prop: 'unexpected newline between object and [ of property access',
        template: 'unexpected newline between template tag and template literal'
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoUnexpectedMultilineWalker = (function (_super) {
    __extends(NoUnexpectedMultilineWalker, _super);
    function NoUnexpectedMultilineWalker() {
        _super.apply(this, arguments);
    }
    NoUnexpectedMultilineWalker.prototype.visitCallExpression = function (node) {
        var firstLeftParen = node.getChildren().filter(function (ch) { return ch.kind === ts.SyntaxKind.OpenParenToken; })[0];
        if (this.isBreakBefore(firstLeftParen)) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), this.getMessage(node)));
        }
        _super.prototype.visitCallExpression.call(this, node);
    };
    NoUnexpectedMultilineWalker.prototype.visitElementAccessExpression = function (node) {
        var firstLeftSquareBracket = node.getChildren().filter(function (ch) { return ch.kind === ts.SyntaxKind.OpenBracketToken; })[0];
        if (this.isBreakBefore(firstLeftSquareBracket)) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), this.getMessage(node)));
        }
        _super.prototype.visitElementAccessExpression.call(this, node);
    };
    NoUnexpectedMultilineWalker.prototype.visitNode = function (node) {
        if (node.kind === ts.SyntaxKind.TaggedTemplateExpression) {
            var children = node.getChildren();
            var tag = children.filter(function (ch) { return ch.kind === ts.SyntaxKind.Identifier; })[0];
            var tagIndex = children.indexOf(tag);
            if (tag && children[tagIndex + 1]) {
                var template = children[tagIndex + 1];
                if (this.isBreakBefore(template)) {
                    this.addFailure(this.createFailure(node.getStart(), node.getWidth(), this.getMessage(node)));
                }
            }
        }
        _super.prototype.visitNode.call(this, node);
    };
    NoUnexpectedMultilineWalker.prototype.isBreakBefore = function (node) {
        if (node.parent) {
            var children = node.parent.getChildren();
            var nodeIndex = children.indexOf(node);
            if (nodeIndex > 0) {
                var nodeLine = this.getStartPosition(node).line;
                var previousNodeLine = this.getEndPosition(children[nodeIndex - 1]).line;
                if (nodeLine !== previousNodeLine) {
                    return true;
                }
            }
        }
        return false;
    };
    NoUnexpectedMultilineWalker.prototype.getMessage = function (node) {
        switch (node.kind) {
            case ts.SyntaxKind.CallExpression:
                return Rule.FAILURE_STRING.func;
            case ts.SyntaxKind.ElementAccessExpression:
                return Rule.FAILURE_STRING.prop;
            case ts.SyntaxKind.TaggedTemplateExpression:
                return Rule.FAILURE_STRING.template;
            default:
                throw 'Unexpected node type: ' + ts.SyntaxKind[node.kind];
        }
    };
    NoUnexpectedMultilineWalker.prototype.getStartPosition = function (node) {
        return node.getSourceFile().getLineAndCharacterOfPosition(node.getStart());
    };
    NoUnexpectedMultilineWalker.prototype.getEndPosition = function (node) {
        return node.getSourceFile().getLineAndCharacterOfPosition(node.getEnd());
    };
    return NoUnexpectedMultilineWalker;
}(Lint.RuleWalker));
