var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// namespace就好比一个简单的js的全局对象
var n;
(function (n) {
    var GameData = (function () {
        function GameData() {
        }
        return GameData;
    }());
    n.GameData = GameData;
    __reflect(GameData.prototype, "n.GameData");
})(n || (n = {}));
