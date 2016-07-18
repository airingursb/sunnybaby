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
        var walker = new NoInvalidRegexpWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoInvalidRegexpWalker = (function (_super) {
    __extends(NoInvalidRegexpWalker, _super);
    function NoInvalidRegexpWalker() {
        _super.apply(this, arguments);
    }
    NoInvalidRegexpWalker.prototype.visitNewExpression = function (node) {
        this.validateInvalidRegExp(node);
        _super.prototype.visitNewExpression.call(this, node);
    };
    NoInvalidRegexpWalker.prototype.visitCallExpression = function (node) {
        this.validateInvalidRegExp(node);
        _super.prototype.visitCallExpression.call(this, node);
    };
    NoInvalidRegexpWalker.prototype.validateInvalidRegExp = function (node) {
        if (node.expression.getText() === 'RegExp') {
            var args = node.arguments;
            if (args && args.length > 0 && args[0].kind === ts.SyntaxKind.StringLiteral) {
                var expr = args[0].text;
                var flags = args.length > 1 && args[1].kind === ts.SyntaxKind.StringLiteral ? args[1].text : undefined;
                var regex = void 0;
                try {
                    regex = new RegExp(expr, flags);
                }
                catch (e) {
                    this.addFailure(this.createFailure(node.getStart(), node.getWidth(), e.message));
                }
            }
        }
    };
    return NoInvalidRegexpWalker;
}(Lint.RuleWalker));
