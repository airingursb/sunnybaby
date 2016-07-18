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
        var walker = new NoInnerDeclarationsWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoInnerDeclarationsWalker = (function (_super) {
    __extends(NoInnerDeclarationsWalker, _super);
    function NoInnerDeclarationsWalker() {
        _super.apply(this, arguments);
        this.VALID_PARENT_TYPES = [
            ts.SyntaxKind.SourceFile,
            ts.SyntaxKind.FunctionDeclaration,
            ts.SyntaxKind.FunctionExpression,
            ts.SyntaxKind.ArrowFunction,
            ts.SyntaxKind.MethodDeclaration
        ];
    }
    NoInnerDeclarationsWalker.prototype.visitFunctionDeclaration = function (node) {
        this.validateInnerDeclaration(node);
        _super.prototype.visitFunctionDeclaration.call(this, node);
    };
    NoInnerDeclarationsWalker.prototype.visitVariableStatement = function (node) {
        if (this.hasOption('both') && node.declarationList.getFirstToken().kind === ts.SyntaxKind.VarKeyword) {
            this.validateInnerDeclaration(node);
        }
        _super.prototype.visitVariableStatement.call(this, node);
    };
    NoInnerDeclarationsWalker.prototype.validateInnerDeclaration = function (node) {
        var body = this.nearestBody(node);
        var isValid = (body.isSourceFile && body.distance === 1) || body.distance === 2;
        if (!isValid) {
            var decl = node.kind === ts.SyntaxKind.FunctionDeclaration ? 'function' : 'variable';
            var root = body.isSourceFile ? 'program' : 'function body';
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), "move " + decl + " declaration to " + root + " root"));
        }
    };
    NoInnerDeclarationsWalker.prototype.nearestBody = function (node) {
        var ancestor = node.parent;
        var generation = 1;
        while (ancestor && this.VALID_PARENT_TYPES.indexOf(ancestor.kind) === -1) {
            generation++;
            ancestor = ancestor.parent;
        }
        return {
            isSourceFile: (ancestor && ancestor.kind === ts.SyntaxKind.SourceFile) || !ancestor,
            distance: generation
        };
    };
    return NoInnerDeclarationsWalker;
}(Lint.RuleWalker));
