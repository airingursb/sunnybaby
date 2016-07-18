"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require('typescript');
var Lint = require('tslint/lib/lint');
var OPTION_1TBS = '1tbs';
var OPTION_ALLMAN = 'allman';
var OPTION_STROUSTRUP = 'stroustrup';
var BraceStyle;
(function (BraceStyle) {
    BraceStyle[BraceStyle["OneTBS"] = 0] = "OneTBS";
    BraceStyle[BraceStyle["Allman"] = 1] = "Allman";
    BraceStyle[BraceStyle["Stroustrup"] = 2] = "Stroustrup";
})(BraceStyle || (BraceStyle = {}));
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        var walker = new BraceStyleWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    Rule.FAILURE_STRING = {
        open: 'Opening curly brace does not appear on the same line as controlling statement.',
        openAllman: 'Opening curly brace appears on the same line as controlling statement.',
        body: 'Statement inside of curly braces should be on next line.',
        close: 'Closing curly brace does not appear on the same line as the subsequent block.',
        closeSingle: 'Closing curly brace should be on the same line as opening curly brace or on the line after the previous block.',
        closeStroustrupAllman: 'Closing curly brace appears on the same line as the subsequent block.'
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var BraceStyleWalker = (function (_super) {
    __extends(BraceStyleWalker, _super);
    function BraceStyleWalker(sourceFile, options) {
        _super.call(this, sourceFile, options);
        this.allowSingleLine = false;
        if (this.hasOption(OPTION_1TBS)) {
            this.braceStyle = BraceStyle.OneTBS;
        }
        else if (this.hasOption(OPTION_ALLMAN)) {
            this.braceStyle = BraceStyle.Allman;
        }
        else if (this.hasOption(OPTION_STROUSTRUP)) {
            this.braceStyle = BraceStyle.Stroustrup;
        }
        else {
        }
        this.allowSingleLine = this.getOptions()[1] && this.getOptions()[1].allowSingleLine;
    }
    BraceStyleWalker.prototype.visitTryStatement = function (tryStatement) {
        _super.prototype.visitTryStatement.call(this, tryStatement);
        var catchClause = tryStatement.getChildren().filter(function (ch) { return ch.kind === ts.SyntaxKind.CatchClause; }).shift();
        var previousNode = tryStatement.getChildren()[tryStatement.getChildren().indexOf(catchClause) - 1];
        var openingBracketError = this.areOnSameLine(previousNode, catchClause) !== (this.braceStyle === BraceStyle.OneTBS);
        if (this.allowSingleLine && this.getStartPosition(catchClause).line === this.getEndPosition(tryStatement).line) {
            return;
        }
        if (openingBracketError) {
            var failureString = this.braceStyle === BraceStyle.OneTBS ? Rule.FAILURE_STRING.open : Rule.FAILURE_STRING.openAllman;
            this.addFailure(this.createFailure(catchClause.getStart(), catchClause.getWidth(), failureString));
        }
    };
    BraceStyleWalker.prototype.visitIfStatement = function (ifStatement) {
        _super.prototype.visitIfStatement.call(this, ifStatement);
        var elseKeyword = ifStatement.getChildren().filter(function (ch) { return ch.kind === ts.SyntaxKind.ElseKeyword; }).shift();
        if (!elseKeyword) {
            return;
        }
        var previousNode = ifStatement.getChildren()[ifStatement.getChildren().indexOf(elseKeyword) - 1];
        var openingBracketError = this.areOnSameLine(previousNode, elseKeyword) !== (this.braceStyle === BraceStyle.OneTBS);
        if (this.allowSingleLine && this.getStartPosition(elseKeyword).line === this.getEndPosition(ifStatement).line) {
            return;
        }
        if (!ifStatement.getChildren().some(function (ch) { return ch.kind === ts.SyntaxKind.Block; })) {
            return;
        }
        if (openingBracketError) {
            var failureString = this.braceStyle === BraceStyle.OneTBS ? Rule.FAILURE_STRING.open : Rule.FAILURE_STRING.openAllman;
            this.addFailure(this.createFailure(elseKeyword.getStart(), elseKeyword.getWidth(), failureString));
        }
    };
    BraceStyleWalker.prototype.visitBlock = function (block) {
        _super.prototype.visitBlock.call(this, block);
        if (this.allowSingleLine && this.getStartPosition(block).line === this.getEndPosition(block).line) {
            return;
        }
        var blockChildren = block.getChildren();
        var openingCurlyBrace = blockChildren.filter(function (ch) { return ch.kind === ts.SyntaxKind.OpenBraceToken; }).shift();
        var closingCurlyBrace = blockChildren.filter(function (ch) { return ch.kind === ts.SyntaxKind.CloseBraceToken; }).pop();
        var syntaxList = blockChildren.filter(function (ch) { return ch.kind === ts.SyntaxKind.SyntaxList; }).shift();
        var blockPreviousNode = block.parent.getChildren()[block.parent.getChildren().indexOf(block) - 1];
        if (!openingCurlyBrace || !closingCurlyBrace || !syntaxList || !blockPreviousNode) {
            return;
        }
        var openingBracketError = this.areOnSameLine(blockPreviousNode, block) === (this.braceStyle === BraceStyle.Allman);
        if (openingBracketError) {
            var failureString = this.braceStyle === BraceStyle.Allman ? Rule.FAILURE_STRING.openAllman : Rule.FAILURE_STRING.open;
            this.addFailure(this.createFailure(openingCurlyBrace.getStart(), openingCurlyBrace.getWidth(), failureString));
        }
        if (syntaxList.getChildCount() > 0) {
            var bodyError = this.areOnSameLine(openingCurlyBrace, syntaxList);
            if (bodyError) {
                this.addFailure(this.createFailure(syntaxList.getStart(), syntaxList.getWidth(), Rule.FAILURE_STRING.body));
            }
            var nodeBeforeClosingBracket = syntaxList.getChildren()[syntaxList.getChildren().length - 1];
            var closingBracketError = this.areOnSameLine(nodeBeforeClosingBracket, closingCurlyBrace);
            if (closingBracketError) {
                this.addFailure(this.createFailure(closingCurlyBrace.getStart(), closingCurlyBrace.getWidth(), Rule.FAILURE_STRING.closeSingle));
            }
        }
    };
    BraceStyleWalker.prototype.areOnSameLine = function (node, nextNode) {
        return this.getEndPosition(node).line === this.getStartPosition(nextNode).line;
    };
    BraceStyleWalker.prototype.getStartPosition = function (node) {
        return node.getSourceFile().getLineAndCharacterOfPosition(node.getStart());
    };
    BraceStyleWalker.prototype.getEndPosition = function (node) {
        return node.getSourceFile().getLineAndCharacterOfPosition(node.getEnd());
    };
    return BraceStyleWalker;
}(Lint.RuleWalker));
