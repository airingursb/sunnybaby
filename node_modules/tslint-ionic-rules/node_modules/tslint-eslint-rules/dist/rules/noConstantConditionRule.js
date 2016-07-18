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
        var walker = new NoConstantConditionWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    Rule.FAILURE_STRING = 'unexpected constant condition';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoConstantConditionWalker = (function (_super) {
    __extends(NoConstantConditionWalker, _super);
    function NoConstantConditionWalker() {
        _super.apply(this, arguments);
        this.isInConditional = false;
    }
    NoConstantConditionWalker.prototype.visitIfStatement = function (node) {
        this.validateCondition(node.expression);
        _super.prototype.visitIfStatement.call(this, node);
    };
    NoConstantConditionWalker.prototype.visitWhileStatement = function (node) {
        this.validateCondition(node.expression);
        _super.prototype.visitWhileStatement.call(this, node);
    };
    NoConstantConditionWalker.prototype.visitDoStatement = function (node) {
        this.validateCondition(node.expression);
        _super.prototype.visitDoStatement.call(this, node);
    };
    NoConstantConditionWalker.prototype.visitForStatement = function (node) {
        if (node.condition) {
            this.validateCondition(node.condition);
        }
        _super.prototype.visitForStatement.call(this, node);
    };
    NoConstantConditionWalker.prototype.visitConditionalExpression = function (node) {
        this.validateCondition(node.condition);
        _super.prototype.visitConditionalExpression.call(this, node);
    };
    NoConstantConditionWalker.prototype.validateCondition = function (expression) {
        this.isInConditional = true;
        if (this.isConstant(expression)) {
            this.addFailure(this.createFailure(expression.getStart(), expression.getWidth(), Rule.FAILURE_STRING));
        }
        this.walkChildren(expression);
        this.isInConditional = false;
    };
    NoConstantConditionWalker.prototype.isConstant = function (node) {
        switch (node.kind) {
            case ts.SyntaxKind.StringLiteral:
            case ts.SyntaxKind.NumericLiteral:
            case ts.SyntaxKind.TrueKeyword:
            case ts.SyntaxKind.FalseKeyword:
            case ts.SyntaxKind.ArrowFunction:
            case ts.SyntaxKind.FunctionExpression:
            case ts.SyntaxKind.ObjectLiteralExpression:
            case ts.SyntaxKind.ArrayLiteralExpression:
                return true;
            case ts.SyntaxKind.PostfixUnaryExpression:
                return true;
            case ts.SyntaxKind.BinaryExpression:
                if (this.isAssignmentToken(node.operatorToken)) {
                    return this.isConstant(node.right);
                }
                return this.isConstant(node.left) && this.isConstant(node.right);
            case ts.SyntaxKind.ConditionalExpression:
                return this.isConstant(node.condition);
            case ts.SyntaxKind.PrefixUnaryExpression:
                if (node.getFirstToken().kind === ts.SyntaxKind.ExclamationToken) {
                    return this.isConstant(node.operand);
                }
                return true;
            case ts.SyntaxKind.ParenthesizedExpression:
                return this.isConstant(node.expression);
        }
        return false;
    };
    NoConstantConditionWalker.prototype.isAssignmentToken = function (token) {
        return token.kind >= ts.SyntaxKind.FirstAssignment && token.kind <= ts.SyntaxKind.LastAssignment;
    };
    return NoConstantConditionWalker;
}(Lint.RuleWalker));
