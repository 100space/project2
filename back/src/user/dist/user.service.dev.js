"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var dotenv = require("dotenv").config({
  path: "../../.env"
});

var SALT = process.env.SALT || "test";

var UserService =
/*#__PURE__*/
function () {
  function UserService(_ref) {
    var _this = this;

    var userRepository = _ref.userRepository,
        jwt = _ref.jwt;

    _classCallCheck(this, UserService);

    this.userRepository = userRepository;
    this.jwt = jwt;
    this.crypto = jwt.crypto;
    this.mainChange = {
      notice: "0001",
      community: "0002",
      qna: "0003"
    };

    this.dateTimeVal = function (dayobj) {
      var value = JSON.stringify(dayobj).slice(1, 20);
      return {
        date: value.slice(0, 10),
        time: value.slice(11, 19)
      };
    };

    this.objDateTime = function (obj) {
      obj = obj.map(function (x) {
        var _this$dateTimeVal = _this.dateTimeVal(x.createdAt),
            date = _this$dateTimeVal.date,
            time = _this$dateTimeVal.time;

        x.createdAt = date;
        x.createdTime = time;
        return x;
      });
      return obj;
    };
  }

  _createClass(UserService, [{
    key: "HotValue",
    value: function HotValue() {
      var response;
      return regeneratorRuntime.async(function HotValue$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return regeneratorRuntime.awrap(this.userRepository.hotValue());

            case 3:
              response = _context.sent;
              return _context.abrupt("return", response);

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              throw new Error(_context.t0);

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, null, this, [[0, 7]]);
    }
  }, {
    key: "SignUp",
    value: function SignUp(_ref2) {
      var userPic, userId, userPw, userName, nickName, address1, address2, gender, phoneNum, userEmail, userIntro, provider, hash, address, user;
      return regeneratorRuntime.async(function SignUp$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              userPic = _ref2.filename, userId = _ref2.userId, userPw = _ref2.userPw, userName = _ref2.userName, nickName = _ref2.nickName, address1 = _ref2.address1, address2 = _ref2.address2, gender = _ref2.gender, phoneNum = _ref2.phoneNum, userEmail = _ref2.userEmail, userIntro = _ref2.userIntro, provider = _ref2.provider;
              _context2.prev = 1;

              if (!(!userId || !userPw || !userName)) {
                _context2.next = 4;
                break;
              }

              throw "Invalid or empty, Confirm your Information";

            case 4:
              hash = this.crypto.createHmac("sha256", SALT).update(userPw).digest("hex");
              address = address1 + " " + address2;
              _context2.next = 8;
              return regeneratorRuntime.awrap(this.userRepository.addUser({
                userPic: userPic,
                userId: userId,
                userPw: hash,
                userName: userName,
                nickName: nickName,
                address: address,
                gender: gender,
                phoneNum: phoneNum,
                userEmail: userEmail,
                userIntro: userIntro
              }));

            case 8:
              user = _context2.sent;
              return _context2.abrupt("return", user);

            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2["catch"](1);
              throw new Error(_context2.t0);

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this, [[1, 12]]);
    }
  }, {
    key: "CheckId",
    value: function CheckId(_ref3) {
      var userId, user;
      return regeneratorRuntime.async(function CheckId$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              userId = _ref3.userId;
              _context3.prev = 1;
              _context3.next = 4;
              return regeneratorRuntime.awrap(this.userRepository.checkId({
                userId: userId
              }));

            case 4:
              user = _context3.sent;
              return _context3.abrupt("return", user);

            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3["catch"](1);
              throw new Error(_context3.t0);

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this, [[1, 8]]);
    }
  }, {
    key: "CheckNick",
    value: function CheckNick(_ref4) {
      var nickName, user;
      return regeneratorRuntime.async(function CheckNick$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              nickName = _ref4.nickName;
              _context4.prev = 1;
              _context4.next = 4;
              return regeneratorRuntime.awrap(this.userRepository.checkNick({
                nickName: nickName
              }));

            case 4:
              user = _context4.sent;
              return _context4.abrupt("return", user);

            case 8:
              _context4.prev = 8;
              _context4.t0 = _context4["catch"](1);
              throw new Error(_context4.t0);

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this, [[1, 8]]);
    }
  }, {
    key: "SignIn",
    value: function SignIn(token) {
      var _this$jwt$verify, userId, user;

      return regeneratorRuntime.async(function SignIn$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;

              if (!(token === guest || "")) {
                _context5.next = 5;
                break;
              }

              return _context5.abrupt("return");

            case 5:
              _this$jwt$verify = this.jwt.verify(token, SALT), userId = _this$jwt$verify.userId;
              _context5.next = 8;
              return regeneratorRuntime.awrap(this.userRepository.getInfo(userId));

            case 8:
              user = _context5.sent;
              return _context5.abrupt("return", user);

            case 10:
              _context5.next = 15;
              break;

            case 12:
              _context5.prev = 12;
              _context5.t0 = _context5["catch"](0);
              throw new Error(_context5.t0);

            case 15:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this, [[0, 12]]);
    }
  }, {
    key: "SignUpdate",
    value: function SignUpdate(payload) {
      var address, updateUser;
      return regeneratorRuntime.async(function SignUpdate$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              address = payload.address1 + " " + payload.address2;
              payload.address = address;
              _context6.prev = 2;
              _context6.next = 5;
              return regeneratorRuntime.awrap(this.userRepository.updateInfo(payload));

            case 5:
              updateUser = _context6.sent;
              return _context6.abrupt("return", updateUser);

            case 9:
              _context6.prev = 9;
              _context6.t0 = _context6["catch"](2);
              throw new Error(_context6.t0);

            case 12:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this, [[2, 9]]);
    }
  }, {
    key: "FindSearch",
    value: function FindSearch(_ref5) {
      var search, result;
      return regeneratorRuntime.async(function FindSearch$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              search = _ref5.search;
              _context7.prev = 1;
              _context7.next = 4;
              return regeneratorRuntime.awrap(this.userRepository.findSearch({
                search: search
              }));

            case 4:
              result = _context7.sent;
              return _context7.abrupt("return", result);

            case 8:
              _context7.prev = 8;
              _context7.t0 = _context7["catch"](1);
              throw new Error(_context7.t0);

            case 11:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this, [[1, 8]]);
    } // 내가 쓴 글

  }, {
    key: "FindWriting",
    value: function FindWriting(_ref6) {
      var userId, page, result, response, findMain, myLength, writeCd, myWriteMainCd, mainCdValue, writeCdarray;
      return regeneratorRuntime.async(function FindWriting$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              userId = _ref6.userId, page = _ref6.page;
              _context8.prev = 1;
              _context8.next = 4;
              return regeneratorRuntime.awrap(this.userRepository.findWriting({
                userId: userId,
                page: page
              }));

            case 4:
              result = _context8.sent;
              response = result.response, findMain = result.findMain;
              myLength = response.length;
              findMain = this.objDateTime(findMain);
              writeCd = [];
              myWriteMainCd = response.map(function (x) {
                var myCdValue = x.cateCd.slice(0, 4);
                writeCd.push(myCdValue);
                var writeCdresult = writeCd.filter(function (value, index) {
                  return writeCd.indexOf(value) === index;
                });
                return writeCdresult;
              });
              mainCdValue = findMain.map(function (x) {
                var myCdValue = x.cateCd.slice(0, 4);

                switch (myCdValue) {
                  case "0001":
                    x.mainCd = "notice";
                    break;

                  case "0002":
                    x.mainCd = "community";
                    break;

                  case "0003":
                    x.mainCd = "qna";
                    break;
                }

                return x;
              });
              writeCdarray = myWriteMainCd.length ? myWriteMainCd.pop() : [];

              if (writeCdarray.length) {
                writeCdarray.forEach(function (x, i, arr) {
                  switch (x) {
                    case "0001":
                      arr[i] = "notice";
                      break;

                    case "0002":
                      arr[i] = "community";
                      break;

                    case "0003":
                      arr[i] = "qna";
                      break;
                  }
                });
              }

              return _context8.abrupt("return", {
                myLength: myLength,
                findMain: mainCdValue,
                writeCdarray: writeCdarray,
                boardData: response
              });

            case 16:
              _context8.prev = 16;
              _context8.t0 = _context8["catch"](1);
              throw new Error(_context8.t0);

            case 19:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this, [[1, 16]]);
    } // 내가 좋아요 한 글, 댓글 단 글

  }, {
    key: "FindReaction",
    value: function FindReaction(_ref7) {
      var userId, result;
      return regeneratorRuntime.async(function FindReaction$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              userId = _ref7.userId;
              _context9.prev = 1;
              _context9.next = 4;
              return regeneratorRuntime.awrap(this.userRepository.findReaction({
                userId: userId
              }));

            case 4:
              result = _context9.sent;
              result.myBoardResponse = this.objDateTime(result.myBoardResponse);
              result.myLikeResponse = this.objDateTime(result.myLikeResponse);
              result.myCommentResponse = this.objDateTime(result.myCommentResponse);
              return _context9.abrupt("return", result);

            case 11:
              _context9.prev = 11;
              _context9.t0 = _context9["catch"](1);
              throw new Error(_context9.t0);

            case 14:
            case "end":
              return _context9.stop();
          }
        }
      }, null, this, [[1, 11]]);
    } // 내가 쓴 글 분류

  }]);

  return UserService;
}();

module.exports = UserService;