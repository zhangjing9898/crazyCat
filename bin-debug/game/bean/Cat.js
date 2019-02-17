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
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.step = 0;
        return _this;
    }
    RunPath.prototype.copy = function () {
        var n = new RunPath(this.x, this.y);
        n.step = this.step;
        n.firstStep = this.firstStep.copy();
        return n;
    };
    return RunPath;
}(Point));
__reflect(RunPath.prototype, "RunPath");
var SearchResult = (function () {
    function SearchResult() {
        // 是否可以走出去
        this.hasPath = true;
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
    Cat.prototype.run = function () {
        this.playListener && this.playListener.catRun(this.search);
    };
    Cat.prototype.search = function () {
        var nextResult = new SearchResult();
        nextResult.hasPath = false;
        return nextResult;
    };
    Cat.prototype.onAddToStage = function (event) {
        this.init();
    };
    Cat.prototype.init = function () {
        this.bg = new egret.MovieClip();
        console.log('cat.ts中的bg', this.bg);
        this.addChild(this.bg);
        // 猫猫可走
        this.setStatus(CatStatus.AVAILABLE);
    };
    Cat.prototype.setStatus = function (status) {
        if (this.status === status) {
            return;
        }
        this.status = status;
        this.changBg();
    };
    // 获得目前猫的位置
    Cat.prototype.getIndex = function () {
        return this.index;
    };
    Cat.prototype.changBg = function () {
        switch (this.status) {
            // 新版movieClip分为
            // movieClipData 存储动画数据
            // movieClipDataFactory data+texture纹理
            case CatStatus.AVAILABLE:
                this.bg.movieClipData = this.catMovieClip.normal.movieClipData;
                this.bg.play(-1);
                break;
            case CatStatus.UNAVAILABLE:
                this.bg.movieClipData = this.catMovieClip.loser.movieClipData;
                this.bg.play(-1);
                break;
        }
    };
    Cat.prototype.move = function (nextStep) {
        if (nextStep === void 0) { nextStep = this.index; }
        if (!nextStep.equal(this.index)) {
            if (this.gridNode) {
                this.gridNode.setStatus(GridNodeStatus.AVAILABLE);
            }
            this.gridNode = n.GameData.gridNodeList[nextStep.x][nextStep.y];
            this.gridNode.setStatus(GridNodeStatus.CAT);
            this.index = nextStep;
            // 传入的nextStep的x和y是格子数 需要加边距等
            this.x = this.gridNode.x + (this.gridNode.width - this.bg.width) / 2;
            console.log('cat move', this.gridNode.x, this.gridNode.width, this.bg.width);
            this.y = this.gridNode.y - this.bg.height + this.gridNode.height / 2;
        }
    };
    return Cat;
}(egret.Sprite));
__reflect(Cat.prototype, "Cat");
