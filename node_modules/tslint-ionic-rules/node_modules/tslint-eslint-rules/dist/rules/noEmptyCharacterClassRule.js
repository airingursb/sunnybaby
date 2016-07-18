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
        var walker = new NoEmptyCharacterClassWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    Rule.FAILURE_STRING = "don't use empty classes in regular expressions";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoEmptyCharacterClassWalker = (function (_super) {
    __extends(NoEmptyCharacterClassWalker, _super);
    function NoEmptyCharacterClassWalker() {
        _super.apply(this, arguments);
    }
    NoEmptyCharacterClassWalker.prototype.visitRegularExpressionLiteral = function (node) {
        this.validateEmptyCharacterClass(node);
        _super.prototype.visitRegularExpressionLiteral.call(this, node);
    };
    NoEmptyCharacterClassWalker.prototype.validateEmptyCharacterClass = function (node) {
        if (!(/^\/([^\\[]|\\.|\[([^\\\]]|\\.)+\])*\/[gim]*$/.test(node.text))) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
        }
    };
    return NoEmptyCharacterClassWalker;
}(Lint.RuleWalker));
