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
        var walker = new NoExtraSemiWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    Rule.FAILURE_STRING = 'unnecessary semicolon';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoExtraSemiWalker = (function (_super) {
    __extends(NoExtraSemiWalker, _super);
    function NoExtraSemiWalker() {
        _super.apply(this, arguments);
        this.ALLOWED_PARENT_TYPES = [
            ts.SyntaxKind.ForStatement,
            ts.SyntaxKind.ForInStatement,
            ts.SyntaxKind.ForOfStatement,
            ts.SyntaxKind.WhileStatement,
            ts.SyntaxKind.DoStatement
        ];
    }
    NoExtraSemiWalker.prototype.visitNode = function (node) {
        if (node.kind === ts.SyntaxKind.EmptyStatement) {
            this.visitEmptyStatement(node);
        }
        _super.prototype.visitNode.call(this, node);
    };
    NoExtraSemiWalker.prototype.visitClassDeclaration = function (node) {
        this.checkClass(node);
        _super.prototype.visitClassDeclaration.call(this, node);
    };
    NoExtraSemiWalker.prototype.visitEmptyStatement = function (node) {
        if (this.ALLOWED_PARENT_TYPES.indexOf(node.parent.kind) === -1) {
            this.validateNoExtraSemi(node);
        }
    };
    NoExtraSemiWalker.prototype.checkClass = function (node) {
        var children = node.getChildren().slice(node.getChildren().indexOf(node.getChildren().find(function (child) { return child.kind === ts.SyntaxKind.FirstPunctuation; })));
        this.checkClassChildren(children);
    };
    NoExtraSemiWalker.prototype.checkClassChildren = function (children) {
        for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
            var child = children_1[_i];
            if ((child.kind === ts.SyntaxKind.SyntaxList || child.kind === ts.SyntaxKind.SemicolonClassElement) && child.getText() === ';') {
                this.validateNoExtraSemi(child);
            }
            else if (child.kind === ts.SyntaxKind.SyntaxList && child.getText().indexOf(';') !== -1) {
                this.checkClassChildren(child.getChildren());
            }
        }
    };
    NoExtraSemiWalker.prototype.validateNoExtraSemi = function (node) {
        this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
    };
    return NoExtraSemiWalker;
}(Lint.RuleWalker));
