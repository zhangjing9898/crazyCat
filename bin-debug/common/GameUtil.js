// 工具类
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameUtil = (function () {
    function GameUtil() {
    }
    // 获取舞台高度
    // ts中用: number 对函数的input和output进行了约束
    GameUtil.getStageHeight = function () {
        return egret.MainContext.instance.stage.stageHeight;
    };
    // 获取舞台宽度
    GameUtil.getStageWidth = function () {
        return egret.MainContext.instance.stage.stageWidth;
    };
    // 根据name关键字创建bitmap对象，name属性请参考resources/resource.json配置文件的内容
    GameUtil.createBitmapByName = function (name, type) {
        if (type === void 0) { type = 'png'; }
        // Bitmap 类表示用于显示位图图片的显示对象
        var result = new egret.Bitmap();
        // texture是Texture纹理类的纹理对象，通过getRes("纹理名字")方法来获取要加载的纹理资源，然后赋值给位图对象
        var texture = egret.Texture = RES.getRes(name + '_' + type);
        result.texture = texture;
        return result;
    };
    // 根据name关键字创建一个MovieClip对象
    // MovieClip又称之为”影片剪辑”，是Egret中提供的一种动画解决方案。我们通常会将MovieClip简写为 MC 。 实际上一个 MC 所实现的功能就是播放序列帧动画
    GameUtil.createMovieClipByName = function (name) {
        var data_stay = RES.getRes(name + "_json");
        console.log(data_stay);
        var texture_stay = RES.getRes(name + "_png");
        var mcFactory_stay = new egret.MovieClipDataFactory(data_stay, texture_stay);
        return new egret.MovieClip(mcFactory_stay.generateMovieClipData(name));
    };
    // 按钮
    GameUtil.bitmapToBtn = function (bitmap, callback) {
        bitmap.touchEnabled = true;
        // 监听触摸事件
        bitmap.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            // 缩放
            bitmap.scaleX = 0.95;
            bitmap.scaleY = 0.95;
        }, this);
        bitmap.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            reset();
            callback && callback();
        }, this);
        bitmap.addEventListener(egret.TouchEvent.TOUCH_CANCEL, reset, this);
        bitmap.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, reset, this);
        bitmap.addEventListener(egret.TouchEvent.TOUCH_END, reset, this);
        function reset() {
            // TODO:
            bitmap.scaleX = 1;
            bitmap.scaleY = 1;
        }
    };
    return GameUtil;
}());
__reflect(GameUtil.prototype, "GameUtil");
