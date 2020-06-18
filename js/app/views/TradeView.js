'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TradeView = function (_View) {
    _inherits(TradeView, _View);

    function TradeView(element) {
        _classCallCheck(this, TradeView);

        return _possibleConstructorReturn(this, (TradeView.__proto__ || Object.getPrototypeOf(TradeView)).call(this, element));
    }

    _createClass(TradeView, [{
        key: 'renderTemplate',
        value: function renderTemplate(tradeList) {
            return '\n            <table class="table table-striped table-bordered">\n                <thead>\n                    <tr>\n                        <th scope="col">DATA</th>\n                        <th scope="col">QUANTIDADE</th>\n                        <th scope="col">VALOR</th>\n                        <th scope="col">VOLUME</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    ' + tradeList.list.map(function (item) {
                return '\n                            <tr>\n                                <td>' + DateHelper.dateToString(item.date) + '</td>\n                                <td>' + item.quantity + '</td>\n                                <td>' + item.value + '</td>\n                                <td>' + item.volume + '</td>\n                            </tr>\n                        ';
            }).join('') + '\n                </tbody>\n                <tfoot>\n                    <td colspan="3"></td>\n                    <td>' + tradeList.list.reduce(function (current, next) {
                return current + next.volume;
            }, 0) + '</td>                    \n                </tfoot>\n            </table>\n        ';
        }
    }]);

    return TradeView;
}(View);
//# sourceMappingURL=TradeView.js.map