var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var GridNodeStatus;
(function (GridNodeStatus) {
    // 空格子，可以走
    GridNodeStatus[GridNodeStatus["AVAILABLE"] = 0] = "AVAILABLE";
    // 有障碍物，不可以走
    GridNodeStatus[GridNodeStatus["UNAVAILABLE"] = 1] = "UNAVAILABLE";
    // 有猫，不可以走
    GridNodeStatus[GridNodeStatus["CAT"] = 2] = "CAT";
})(GridNodeStatus || (GridNodeStatus = {}));
// 格子节点
// sprite 类是基本显示列表构造块：一个可包含子项的显示列表节点
var GridNode = (function (_super) {
    __extends(GridNode, _super);
    function GridNode(index, pos, size, playListener) {
        var _this = _super.call(this) || this;
        _this.gridBg = {
            white: GameUtil.createBitmapByName('grid_white'),
            yellow: GameUtil.createBitmapByName('grid_yellow')
        };
        // 格子的背景
        _this.bg = new egret.Bitmap();
        _this.index = index;
        _this.size = size;
        _this.bg.width = size;
        _this.bg.height = size;
        _this.pos = pos;
        _this.playListener = playListener;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    GridNode.prototype.onAddToStage = function (event) {
    };
    GridNode.prototype.init = function () {
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
    };
    GridNode.prototype.touch = function () {
        // 没有监听事件
        if (!this.playListener) {
            return;
        }
        // 猫咪还在思考 阻止点击
        if (!this.playListener.canRun()) {
            return;
        }
        // 格子不能点击
        if (this.status !== GridNodeStatus.AVAILABLE) {
            return;
        }
    };
    return GridNode;
}(egret.Sprite));
__reflect(GridNode.prototype, "GridNode");
