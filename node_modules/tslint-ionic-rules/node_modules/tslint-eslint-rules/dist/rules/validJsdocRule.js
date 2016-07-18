"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require('typescript');
var Lint = require('tslint/lib/lint');
var doctrine = require('doctrine');
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        var opts = this.getOptions().ruleArguments;
        if (opts && opts.length > 0) {
            if (opts[0].prefer) {
                Rule.prefer = opts[0].prefer;
            }
            Rule.requireReturn = opts[0].requireReturn !== false;
            Rule.requireParamDescription = opts[0].requireParamDescription !== false;
            Rule.requireReturnDescription = opts[0].requireReturnDescription !== false;
            Rule.matchDescription = opts[0].matchDescription;
        }
        var walker = new ValidJsdocWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    Rule.FAILURE_STRING = {
        missingBrace: 'JSDoc type missing brace',
        syntaxError: 'JSDoc syntax error',
        missingParameterType: function (name) { return ("missing JSDoc parameter type for '" + name + "'"); },
        missingParameterDescription: function (name) { return ("missing JSDoc parameter description for '" + name + "'"); },
        duplicateParameter: function (name) { return ("duplicate JSDoc parameter '" + name + "'"); },
        unexpectedTag: function (title) { return ("unexpected @" + title + " tag; function has no return statement"); },
        missingReturnType: 'missing JSDoc return type',
        missingReturnDescription: 'missing JSDoc return description',
        prefer: function (name) { return ("use @" + name + " instead"); },
        missingReturn: function (param) { return ("missing JSDoc @" + (param || 'returns') + " for function"); },
        wrongParam: function (expected, actual) { return ("expected JSDoc for '" + expected + "'' but found '" + actual + "'"); },
        missingParam: function (name) { return ("missing JSDoc for parameter '" + name + "'"); },
        wrongDescription: 'JSDoc description does not satisfy the regex pattern',
        invalidRegexDescription: function (error) { return ("configured matchDescription is an invalid RegExp. Error: " + error); }
    };
    Rule.prefer = {};
    Rule.requireReturn = true;
    Rule.requireParamDescription = true;
    Rule.requireReturnDescription = true;
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var ValidJsdocWalker = (function (_super) {
    __extends(ValidJsdocWalker, _super);
    function ValidJsdocWalker() {
        _super.apply(this, arguments);
        this.fns = [];
    }
    ValidJsdocWalker.prototype.visitSourceFile = function (node) {
        _super.prototype.visitSourceFile.call(this, node);
    };
    ValidJsdocWalker.prototype.visitNode = function (node) {
        if (node.kind === ts.SyntaxKind.ClassExpression) {
            this.visitClassExpression(node);
        }
        else {
            _super.prototype.visitNode.call(this, node);
        }
    };
    ValidJsdocWalker.prototype.visitArrowFunction = function (node) {
        this.startFunction(node);
        _super.prototype.visitArrowFunction.call(this, node);
        this.checkJSDoc(node);
    };
    ValidJsdocWalker.prototype.visitFunctionExpression = function (node) {
        this.startFunction(node);
        _super.prototype.visitFunctionExpression.call(this, node);
        this.checkJSDoc(node);
    };
    ValidJsdocWalker.prototype.visitFunctionDeclaration = function (node) {
        this.startFunction(node);
        _super.prototype.visitFunctionDeclaration.call(this, node);
        this.checkJSDoc(node);
    };
    ValidJsdocWalker.prototype.visitClassExpression = function (node) {
        this.startFunction(node);
        _super.prototype.visitNode.call(this, node);
        this.checkJSDoc(node);
    };
    ValidJsdocWalker.prototype.visitClassDeclaration = function (node) {
        this.startFunction(node);
        _super.prototype.visitClassDeclaration.call(this, node);
        this.checkJSDoc(node);
    };
    ValidJsdocWalker.prototype.visitMethodDeclaration = function (node) {
        this.startFunction(node);
        _super.prototype.visitMethodDeclaration.call(this, node);
        this.checkJSDoc(node);
    };
    ValidJsdocWalker.prototype.visitConstructorDeclaration = function (node) {
        this.startFunction(node);
        _super.prototype.visitConstructorDeclaration.call(this, node);
        this.checkJSDoc(node);
    };
    ValidJsdocWalker.prototype.visitReturnStatement = function (node) {
        this.addReturn(node);
        _super.prototype.visitReturnStatement.call(this, node);
    };
    ValidJsdocWalker.prototype.startFunction = function (node) {
        var returnPresent = false;
        if (node.kind === ts.SyntaxKind.ArrowFunction && node.body.kind !== ts.SyntaxKind.Block)
            returnPresent = true;
        if (this.isTypeClass(node))
            returnPresent = true;
        this.fns.push({ node: node, returnPresent: returnPresent });
    };
    ValidJsdocWalker.prototype.addReturn = function (node) {
        var parent = node;
        var nodes = this.fns.map(function (fn) { return fn.node; });
        while (parent && nodes.indexOf(parent) === -1)
            parent = parent.parent;
        if (parent && node.expression) {
            this.fns[nodes.indexOf(parent)].returnPresent = true;
        }
    };
    ValidJsdocWalker.prototype.isTypeClass = function (node) {
        return node.kind === ts.SyntaxKind.ClassExpression || node.kind === ts.SyntaxKind.ClassDeclaration;
    };
    ValidJsdocWalker.prototype.isValidReturnType = function (tag) {
        return tag.type.name === 'void' || tag.type.type === 'UndefinedLiteral';
    };
    ValidJsdocWalker.prototype.getJSDocComment = function (node) {
        var ALLOWED_PARENTS = [
            ts.SyntaxKind.BinaryExpression,
            ts.SyntaxKind.VariableDeclaration,
            ts.SyntaxKind.VariableDeclarationList,
            ts.SyntaxKind.VariableStatement
        ];
        if (!node.getFullText().trim().startsWith('/**')) {
            if (ALLOWED_PARENTS.indexOf(node.parent.kind) !== -1) {
                return this.getJSDocComment(node.parent);
            }
            return {};
        }
        var comments = node.getFullText();
        comments = comments.substring(comments.indexOf('/**'));
        comments = comments.substring(0, comments.indexOf('*/') + 2);
        var start = node.pos;
        var width = comments.length;
        if (!comments.startsWith('/**') || !comments.endsWith('*/')) {
            return {};
        }
        return { comments: comments, start: start, width: width };
    };
    ValidJsdocWalker.prototype.checkJSDoc = function (node) {
        var _this = this;
        var _a = this.getJSDocComment(node), comments = _a.comments, start = _a.start, width = _a.width;
        if (!comments)
            return;
        var jsdoc;
        try {
            jsdoc = doctrine.parse(comments, {
                strict: true,
                unwrap: true,
                sloppy: true
            });
        }
        catch (e) {
            if (/braces/i.test(e.message)) {
                this.addFailure(this.createFailure(start, width, Rule.FAILURE_STRING.missingBrace));
            }
            else {
                this.addFailure(this.createFailure(start, width, Rule.FAILURE_STRING.syntaxError));
            }
            return;
        }
        var fn = this.fns.find(function (f) { return node === f.node; });
        var params = {};
        var hasReturns = false;
        var hasConstructor = false;
        var isOverride = false;
        for (var _i = 0, _b = jsdoc.tags; _i < _b.length; _i++) {
            var tag = _b[_i];
            switch (tag.title) {
                case 'param':
                case 'arg':
                case 'argument':
                    if (!tag.type) {
                        this.addFailure(this.createFailure(start, width, Rule.FAILURE_STRING.missingParameterType(tag.name)));
                    }
                    if (!tag.description && Rule.requireParamDescription) {
                        this.addFailure(this.createFailure(start, width, Rule.FAILURE_STRING.missingParameterDescription(tag.name)));
                    }
                    if (params[tag.name]) {
                        this.addFailure(this.createFailure(start, width, Rule.FAILURE_STRING.duplicateParameter(tag.name)));
                    }
                    else if (tag.name.indexOf('.') === -1) {
                        params[tag.name] = true;
                    }
                    break;
                case 'return':
                case 'returns':
                    hasReturns = true;
                    if (!Rule.requireReturn && !fn.returnPresent && tag.type.name !== 'void' && tag.type.name !== 'undefined') {
                        this.addFailure(this.createFailure(start, width, Rule.FAILURE_STRING.unexpectedTag(tag.title)));
                    }
                    else {
                        if (!tag.type) {
                            this.addFailure(this.createFailure(start, width, Rule.FAILURE_STRING.missingReturnType));
                        }
                        if (!this.isValidReturnType(tag) && !tag.description && Rule.requireReturnDescription) {
                            this.addFailure(this.createFailure(start, width, Rule.FAILURE_STRING.missingReturnDescription));
                        }
                    }
                    break;
                case 'constructor':
                case 'class':
                    hasConstructor = true;
                    break;
                case 'override':
                case 'inheritdoc':
                    isOverride = true;
                    break;
            }
            var title = Rule.prefer[tag.title];
            if (Rule.prefer.hasOwnProperty(tag.title) && tag.title !== title) {
                this.addFailure(this.createFailure(start, width, Rule.FAILURE_STRING.prefer(title)));
            }
        }
        if (!isOverride && !hasReturns && !hasConstructor && node.parent.kind !== ts.SyntaxKind.GetKeyword && !this.isTypeClass(node)) {
            if (Rule.requireReturn || fn.returnPresent) {
                this.addFailure(this.createFailure(start, width, Rule.FAILURE_STRING.missingReturn(Rule.prefer['returns'])));
            }
        }
        var jsdocParams = Object.keys(params);
        var parameters = node.parameters;
        if (parameters) {
            parameters.forEach(function (param, i) {
                if (param.name.kind === ts.SyntaxKind.Identifier) {
                    var name_1 = param.name.text;
                    if (jsdocParams[i] && name_1 !== jsdocParams[i]) {
                        _this.addFailure(_this.createFailure(start, width, Rule.FAILURE_STRING.wrongParam(name_1, jsdocParams[i])));
                    }
                    else if (!params[name_1] && !isOverride) {
                        _this.addFailure(_this.createFailure(start, width, Rule.FAILURE_STRING.missingParam(name_1)));
                    }
                }
            });
        }
        if (Rule.matchDescription) {
            try {
                var regex = new RegExp(Rule.matchDescription);
                if (!regex.test(jsdoc.description)) {
                    this.addFailure(this.createFailure(start, width, Rule.FAILURE_STRING.wrongDescription));
                }
            }
            catch (e) {
                this.addFailure(this.createFailure(start, width, e.message));
            }
        }
    };
    return ValidJsdocWalker;
}(Lint.SkippableTokenAwareRuleWalker));
