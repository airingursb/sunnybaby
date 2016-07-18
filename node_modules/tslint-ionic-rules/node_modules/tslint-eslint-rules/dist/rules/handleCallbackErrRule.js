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
        var languageService = Lint.createLanguageService(sourceFile.fileName, sourceFile.getFullText());
        return this.applyWithWalker(new ErrCallbackHandlerWalker(sourceFile, this.getOptions(), languageService));
    };
    Rule.FAILURE_STRING = 'error parameter not handled';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var ErrCallbackHandlerWalker = (function (_super) {
    __extends(ErrCallbackHandlerWalker, _super);
    function ErrCallbackHandlerWalker(sourceFile, options, languageService) {
        _super.call(this, sourceFile, options);
        this.languageService = languageService;
        var customExpression = options.ruleArguments[0] || 'err';
        if (customExpression.indexOf('^') === 0) {
            this.errorRegex = new RegExp(customExpression);
        }
        else {
            this.errorRegex = new RegExp("^" + customExpression + "$");
        }
    }
    ErrCallbackHandlerWalker.prototype.visitFunctionDeclaration = function (node) {
        var _this = this;
        node.parameters
            .filter(function (parameter) { return _this.errorRegex.test(parameter.name.getText()); })
            .forEach(function (parameter) {
            _this.validateReferencesForVariable(parameter.name.getText(), parameter.pos);
        });
        _super.prototype.visitFunctionDeclaration.call(this, node);
    };
    ErrCallbackHandlerWalker.prototype.validateReferencesForVariable = function (name, position) {
        var fileName = this.getSourceFile().fileName;
        var highlights = this.languageService.getDocumentHighlights(fileName, position, [fileName]);
        if (highlights === null || highlights[0].highlightSpans.length <= 1) {
            this.addFailure(this.createFailure(position, name.length, Rule.FAILURE_STRING + "'" + name + "'"));
        }
    };
    return ErrCallbackHandlerWalker;
}(Lint.RuleWalker));
