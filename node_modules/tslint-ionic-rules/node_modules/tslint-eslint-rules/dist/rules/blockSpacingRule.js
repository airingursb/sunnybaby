"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require('typescript');
var Lint = require('tslint/lib/lint');
var OPTION_ALWAYS = 'always';
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        var walker = new BlockSpacingWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    Rule.FAILURE_STRING = {
        always: 'Requires a space',
        never: 'Unexpected space(s)'
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var BlockSpacingWalker = (function (_super) {
    __extends(BlockSpacingWalker, _super);
    function BlockSpacingWalker(sourceFile, options) {
        _super.call(this, sourceFile, options);
        this.always = this.hasOption(OPTION_ALWAYS) || (this.getOptions() && this.getOptions().length === 0);
    }
    BlockSpacingWalker.prototype.visitNode = function (node) {
        if (node.kind === ts.SyntaxKind.Block || node.kind === ts.SyntaxKind.CaseBlock) {
            this.checkSpacingInsideBraces(node);
        }
        _super.prototype.visitNode.call(this, node);
    };
    BlockSpacingWalker.prototype.checkSpacingInsideBraces = function (node) {
        var blockChildren = node.getChildren();
        var syntaxList = blockChildren[1];
        var openBraceLocation = this.getStartPosition(blockChildren[0]);
        var closeBraceLocation = this.getStartPosition(blockChildren[blockChildren.length - 1]);
        if (syntaxList.getChildCount() > 0 && openBraceLocation.line === closeBraceLocation.line) {
            if (this.isSpaceBetween(blockChildren[0], blockChildren[1]) !== this.always
                || this.isSpaceBetween(blockChildren[blockChildren.length - 2], blockChildren[blockChildren.length - 1]) !== this.always) {
                var failureString = this.always ? Rule.FAILURE_STRING.always : Rule.FAILURE_STRING.never;
                this.addFailure(this.createFailure(node.getStart(), node.getWidth(), failureString));
            }
        }
    };
    BlockSpacingWalker.prototype.isSpaceBetween = function (node, nextNode) {
        return nextNode.getStart() - node.getEnd() > 0;
    };
    BlockSpacingWalker.prototype.getStartPosition = function (node) {
        return node.getSourceFile().getLineAndCharacterOfPosition(node.getStart());
    };
    return BlockSpacingWalker;
}(Lint.RuleWalker));
