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
        var walker = new NoDuplicateCaseWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    Rule.FAILURE_STRING = 'duplicate case label';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoDuplicateCaseWalker = (function (_super) {
    __extends(NoDuplicateCaseWalker, _super);
    function NoDuplicateCaseWalker() {
        _super.apply(this, arguments);
    }
    NoDuplicateCaseWalker.prototype.visitSwitchStatement = function (node) {
        this.validateNoDupeCase(node);
        _super.prototype.visitSwitchStatement.call(this, node);
    };
    NoDuplicateCaseWalker.prototype.validateNoDupeCase = function (node) {
        var _this = this;
        var cases = new Map();
        node.caseBlock.clauses.forEach(function (clause) {
            if (clause.kind === ts.SyntaxKind.CaseClause) {
                var key = clause.getText();
                if (cases.has(key)) {
                    _this.addFailure(_this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
                }
                else {
                    cases.set(key, clause);
                }
            }
        });
    };
    return NoDuplicateCaseWalker;
}(Lint.RuleWalker));
