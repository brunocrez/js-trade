'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DateHelper = function () {
    function DateHelper() {
        _classCallCheck(this, DateHelper);

        throw new Error('Date Helper cannot be instantiated!');
    }

    _createClass(DateHelper, null, [{
        key: 'stringToDate',
        value: function stringToDate(text) {
            if (!/\d{4}-\d{2}-\d{2}/.test(text)) {
                throw new Error('Correct pattern is yyyy-MM-dd!');
            }

            return new Date(text.split('-'));
        }
    }, {
        key: 'dateToString',
        value: function dateToString(date) {
            return DateHelper.addZero(date.getDate()) + '/' + DateHelper.addZero(date.getMonth() + 1) + '/' + date.getFullYear();
        }
    }, {
        key: 'addZero',
        value: function addZero(n) {
            return n < 10 ? '0' + n : n;
        }
    }]);

    return DateHelper;
}();
//# sourceMappingURL=DateHelper.js.map