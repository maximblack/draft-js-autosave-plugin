'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultTheme = undefined;

var _decorateComponentWithProps = require('decorate-component-with-props');

var _decorateComponentWithProps2 = _interopRequireDefault(_decorateComponentWithProps);

var _SavingComponent = require('./SavingComponent');

var _SavingComponent2 = _interopRequireDefault(_SavingComponent);

var _styles = {
  "container": "draftJsAutosavePlugin__container__2g1sD",
  "containerSaving": "draftJsAutosavePlugin__containerSaving__BXmNT",
  "textSaving": "draftJsAutosavePlugin__textSaving__2otIk",
  "textSaved": "draftJsAutosavePlugin__textSaved__3GmTM"
};

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultTheme = exports.defaultTheme = {
  // Inline style object for saving component container
  container: _styles2.default.container,
  containerSaving: _styles2.default.containerSaving,
  // Inline style object for saving icon, base and saving
  saved: _styles2.default.saved,
  saving: _styles2.default.saving
};

exports.default = function (config) {
  var _editorState = void 0;
  var _debounce = void 0;
  var _clean = true;

  var _getIsClean = function _getIsClean() {
    return _clean;
  };

  var _save = function _save(editorState) {
    _clean = true;
    _editorState = editorState;
    config.saveFunction(editorState);
  };

  var onChange = function onChange(editorState) {
    if (!editorState) return editorState;
    // Avoid setting unclean state on initial render
    if (!_editorState) {
      _editorState = editorState;
    }
    // if content has changed or save wanted on all changes
    if (config.saveAlways || editorState.getCurrentContent() !== _editorState.getCurrentContent()) {
      _clean = false;
      if (_debounce) {
        clearTimeout(_debounce);
      }
      _debounce = setTimeout(_save, config.debounceTime || 2000, editorState);
    }
    return editorState;
  };

  // Styles are overwritten instead of merged as merging causes a lot of confusion.
  //
  // Why? Because when merging a developer needs to know all of the underlying
  // styles which needs a deep dive into the code. Merging also makes it prone to
  // errors when upgrading as basically every styling change would become a major
  // breaking change. 1px of an increased padding can break a whole layout.
  var _config$theme = config.theme,
      theme = _config$theme === undefined ? defaultTheme : _config$theme,
      _config$savingCompone = config.savingComponent,
      savingComponent = _config$savingCompone === undefined ? _SavingComponent2.default : _config$savingCompone;

  return {
    SavingComponent: (0, _decorateComponentWithProps2.default)(savingComponent, { theme: theme, getIsClean: _getIsClean }),
    onChange: onChange,
    _getIsClean: _getIsClean
  };
};