'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, Message;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export('Message', Message = function () {
                function Message() {
                    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

                    _classCallCheck(this, Message);

                    this._message = message;
                }

                _createClass(Message, [{
                    key: 'message',
                    get: function get() {
                        return this._message;
                    },
                    set: function set(message) {
                        this._message = message;
                    }
                }]);

                return Message;
            }());

            _export('Message', Message);
        }
    };
});
//# sourceMappingURL=Message.js.map