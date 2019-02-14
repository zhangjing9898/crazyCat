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
var StartScene = (function (_super) {
    __extends(StartScene, _super);
    function StartScene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // protected和private类似，但是，protected成员在派生类中可以访问
    StartScene.prototype.initView = function () {
        var cat = GameUtil.createBitmapByName('cat_start_bg');
        this.addChild(cat);
    };
    return StartScene;
}(BaseScene));
__reflect(StartScene.prototype, "StartScene");
