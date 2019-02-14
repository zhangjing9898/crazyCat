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
var OverType;
(function (OverType) {
    // 无
    OverType[OverType["NULL"] = -1] = "NULL";
    // 用户win
    OverType[OverType["PLAYER"] = 0] = "PLAYER";
    // 猫猫赢
    OverType[OverType["CAT"] = 1] = "CAT";
})(OverType || (OverType = {}));
var PlayScene = (function (_super) {
    __extends(PlayScene, _super);
    function PlayScene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlayScene.prototype.initView = function () {
        this.sound = RES.getRes('go_mp3');
        // TODO:
        this.x = (GameUtil.getStageWidth() - this.width);
        this.y = GameUtil.getStageHeight() / 2.5;
        // TODO:
    };
    PlayScene.prototype.catRun = function () {
        // TODO:
    };
    PlayScene.prototype.gameOver = function () {
    };
    PlayScene.prototype.playerRun = function () {
    };
    PlayScene.prototype.canRun = function () {
        // TODO:
        return true;
    };
    return PlayScene;
}(BaseScene));
__reflect(PlayScene.prototype, "PlayScene", ["PlayListener"]);
