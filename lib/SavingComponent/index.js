'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SavingComponent = function SavingComponent(_ref) {
  var saving = _ref.saving,
      getIsClean = _ref.getIsClean,
      theme = _ref.theme;

  var saved = getIsClean() && !saving;
  return _react2.default.createElement(
    'div',
    { className: saved ? theme.container : theme.container + ' ' + theme.containerSaving },
    _react2.default.createElement(
      'span',
      {
        className: saved ? theme.textSaved : theme.textSaving
      },
      !saved && 'Saving...',
      saved && 'All Changes Saved.'
    ),
    _react2.default.createElement(
      'span',
      { style: { marginLeft: '0.2em' } },
      '🖫'
    )
  );
};

SavingComponent.propTypes = {
  getIsClean: _propTypes2.default.func.isRequired,
  saving: _propTypes2.default.bool,
  theme: _propTypes2.default.object.isRequired
};

exports.default = SavingComponent;