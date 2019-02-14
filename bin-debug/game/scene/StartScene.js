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
        cat.x = (GameUtil.getStageWidth() - cat.width) / 2;
        cat.y = (GameUtil.getStageHeight() - cat.height) / 2 + 100;
        var startBtn = GameUtil.createBitmapByName('btn_start');
        this.addChild(startBtn);
        startBtn.x = (GameUtil.getStageWidth() - startBtn.width) / 2;
        startBtn.y = cat.y + cat.height;
        // 按钮添加缩放效果
        GameUtil.bitmapToBtn(startBtn, function () {
            console.log('开始游戏');
        });
    };
    return StartScene;
}(BaseScene));
__reflect(StartScene.prototype, "StartScene");
