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
// 状态
var CatStatus;
(function (CatStatus) {
    // 有路走
    CatStatus[CatStatus["AVAILABLE"] = 0] = "AVAILABLE";
    // 无路可走
    CatStatus[CatStatus["UNAVAILABLE"] = 1] = "UNAVAILABLE";
})(CatStatus || (CatStatus = {}));
// 猫猫走的路径
var RunPath = (function (_super) {
    __extends(RunPath, _super);
    function RunPath() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RunPath;
}(Point));
__reflect(RunPath.prototype, "RunPath");
var SearchResult = (function () {
    function SearchResult() {
    }
    return SearchResult;
}());
__reflect(SearchResult.prototype, "SearchResult");
// 猫
var Cat = (function (_super) {
    __extends(Cat, _super);
    function Cat(playListener) {
        var _this = _super.call(this) || this;
        // 猫猫的动画效果
        _this.catMovieClip = {
            normal: GameUtil.createMovieClipByName('cat_normal'),
            loser: GameUtil.createMovieClipByName('cat_loser')
        };
        _this.playListener = playListener;
        // 将instance 添加到stage上
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Cat.prototype.onAddToStage = function (event) {
    };
    Cat.prototype.init = function () {
        this.bg = new egret.MovieClip();
        console.log('cat.ts中的bg', this.bg);
        this.addChild(this.bg);
    };
    Cat.prototype.setStatus = function (status) {
        if (this.status === status) {
            return;
        }
        this.status = status;
    };
    Cat.prototype.changBg = function () {
        switch (this.status) {
            case CatStatus.AVAILABLE:
                this.bg.movieClipData;
                break;
            case CatStatus.UNAVAILABLE:
                break;
        }
    };
    return Cat;
}(egret.Sprite));
__reflect(Cat.prototype, "Cat");
