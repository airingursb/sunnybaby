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
        var walker = new ArrayBracketSpacingWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    Rule.FAILURE_STRING = {
        noBeginningSpace: 'There should be no space after "["',
        noEndingSpace: 'There should be no space before "]"',
        requiredBeginningSpace: 'A space is required after "["',
        requiredEndingSpace: 'A space is required before "]"'
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var ArrayBracketSpacingWalker = (function (_super) {
    __extends(ArrayBracketSpacingWalker, _super);
    function ArrayBracketSpacingWalker(sourceFile, options) {
        _super.call(this, sourceFile, options);
        this.singleValueException = false;
        this.objectsInArraysException = false;
        this.arraysInArraysException = false;
        var ruleOptions = this.getOptions();
        this.spaced = this.hasOption(OPTION_ALWAYS) || (ruleOptions && ruleOptions.length === 0);
        if (ruleOptions[1]) {
            this.singleValueException = typeof ruleOptions[1].singleValue !== 'undefined' && ruleOptions[1].singleValue !== this.spaced;
            this.objectsInArraysException = typeof ruleOptions[1].objectsInArrays !== 'undefined' && ruleOptions[1].objectsInArrays !== this.spaced;
            this.arraysInArraysException = typeof ruleOptions[1].arraysInArrays !== 'undefined' && ruleOptions[1].arraysInArrays !== this.spaced;
        }
    }
    ArrayBracketSpacingWalker.prototype.visitNode = function (node) {
        if (node.kind === ts.SyntaxKind.ArrayBindingPattern) {
            this.validateSquareBrackets(node);
        }
        _super.prototype.visitNode.call(this, node);
    };
    ArrayBracketSpacingWalker.prototype.visitArrayLiteralExpression = function (node) {
        this.validateSquareBrackets(node);
        _super.prototype.visitArrayLiteralExpression.call(this, node);
    };
    ArrayBracketSpacingWalker.prototype.validateSquareBrackets = function (node) {
        var children = node.getChildren();
        var isSpaceAfterOpeningBracket = this.isSpaceBetween(children[0], children[1]);
        var isBreakAfterOpeningBracket = this.isLineBreakBetween(children[0], children[1]);
        var isSpaceBeforeClosingBracket = this.isSpaceBetween(children[children.length - 2], children[children.length - 1]);
        var isBreakBeforeClosingBracket = this.isLineBreakBetween(children[children.length - 2], children[children.length - 1]);
        var syntaxList = node.getChildren()[1];
        var itemsInArrayPattern = syntaxList.getChildren().filter(function (child) {
            return child.kind !== ts.SyntaxKind.CommaToken;
        });
        if (this.spaced && itemsInArrayPattern.length === 0) {
            return;
        }
        var openingBracketMustBeSpaced = (this.singleValueException && itemsInArrayPattern.length === 1) ||
            (this.arraysInArraysException && itemsInArrayPattern[0] && itemsInArrayPattern[0].kind === ts.SyntaxKind.ArrayLiteralExpression) ||
            (this.objectsInArraysException && itemsInArrayPattern[0] && itemsInArrayPattern[0].kind === ts.SyntaxKind.ObjectLiteralExpression)
            ? !this.spaced : this.spaced;
        var closingBracketMustBeSpaced = (this.singleValueException
            && itemsInArrayPattern.length === 1) ||
            (this.arraysInArraysException &&
                itemsInArrayPattern[itemsInArrayPattern.length - 1] &&
                itemsInArrayPattern[itemsInArrayPattern.length - 1].kind === ts.SyntaxKind.ArrayLiteralExpression) ||
            (this.objectsInArraysException
                && itemsInArrayPattern[itemsInArrayPattern.length - 1]
                && itemsInArrayPattern[itemsInArrayPattern.length - 1].kind === ts.SyntaxKind.ObjectLiteralExpression)
            ? !this.spaced : this.spaced;
        if (!isBreakAfterOpeningBracket) {
            if (openingBracketMustBeSpaced && !isSpaceAfterOpeningBracket) {
                this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING.requiredBeginningSpace));
            }
            if (!openingBracketMustBeSpaced && isSpaceAfterOpeningBracket) {
                this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING.noBeginningSpace));
            }
        }
        if (!isBreakBeforeClosingBracket) {
            if (closingBracketMustBeSpaced && !isSpaceBeforeClosingBracket) {
                this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING.requiredEndingSpace));
            }
            if (!closingBracketMustBeSpaced && isSpaceBeforeClosingBracket) {
                this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING.noEndingSpace));
            }
        }
    };
    ArrayBracketSpacingWalker.prototype.isSpaceBetween = function (node, nextNode) {
        return nextNode.getStart() - node.getEnd() > 0;
    };
    ArrayBracketSpacingWalker.prototype.isLineBreakBetween = function (node, nextNode) {
        return this.getEndPosition(node).line !== this.getStartPosition(nextNode).line;
    };
    ArrayBracketSpacingWalker.prototype.getStartPosition = function (node) {
        return node.getSourceFile().getLineAndCharacterOfPosition(node.getStart());
    };
    ArrayBracketSpacingWalker.prototype.getEndPosition = function (node) {
        return node.getSourceFile().getLineAndCharacterOfPosition(node.getEnd());
    };
    return ArrayBracketSpacingWalker;
}(Lint.RuleWalker));
