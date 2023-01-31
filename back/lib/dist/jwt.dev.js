"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var crypto = require('crypto');

var dotenv = require('dotenv').config({
  path: "../.env"
});

var SALT = process.env.SALT || 'test';

var JWT =
/*#__PURE__*/
function () {
  function JWT(_ref) {
    var crypto = _ref.crypto;

    _classCallCheck(this, JWT);

    this.crypto = crypto;
  }

  _createClass(JWT, [{
    key: "Sign",
    value: function Sign(data) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var header = this.encode({
        tpy: "JWT",
        alg: "sha256"
      });
      var payload = this.encode(_objectSpread({}, data, {}, options));
      var signature = this.createSignature([header, payload]);
      return [header, payload, signature].join('.');
    }
  }, {
    key: "verify",
    value: function verify(token, salt) {
      var _token$split = token.split('.'),
          _token$split2 = _slicedToArray(_token$split, 3),
          header = _token$split2[0],
          payload = _token$split2[1],
          signature = _token$split2[2];

      var newSignature = this.createSignature([header, payload], salt);
      if (newSignature !== signature) throw new Error("Token is Invalid, Pleas check the your token");
      return this.decode(payload);
    }
  }, {
    key: "encode",
    value: function encode(obj) {
      return Buffer.from(JSON.stringify(obj)), toString("base64url");
    }
  }, {
    key: "decode",
    value: function decode(base64url) {
      return JSON.parse(Buffer.from(base64url, "base64url").toString('utf8'));
    }
  }, {
    key: "createSignature",
    value: function createSignature(base64urls) {
      var salt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : SALT;
      var data = base64urls.join(".");
      return this.crypto.createHmac("sha256", salt).update(data).digest("base64url");
    }
  }]);

  return JWT;
}();

module.exports = JWT;