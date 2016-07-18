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
        var walker = new NoExAssignWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    Rule.FAILURE_STRING = 'do not assign to the exception parameter.';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoExAssignWalker = (function (_super) {
    __extends(NoExAssignWalker, _super);
    function NoExAssignWalker() {
        _super.apply(this, arguments);
        this.isInCatchClause = false;
        this.currentIdentifier = null;
    }
    NoExAssignWalker.prototype.visitCatchClause = function (node) {
        this.isInCatchClause = true;
        _super.prototype.visitCatchClause.call(this, node);
        this.currentIdentifier = null;
        this.isInCatchClause = false;
    };
    NoExAssignWalker.prototype.visitIdentifier = function (node) {
        if (!this.currentIdentifier) {
            this.currentIdentifier = node;
        }
        else if (this.currentIdentifier.text === node.text) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
        }
        _super.prototype.visitIdentifier.call(this, node);
    };
    return NoExAssignWalker;
}(Lint.RuleWalker));
