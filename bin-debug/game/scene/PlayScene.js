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
        this.catRunning = false;
        this.createGridNode();
        this.createBarrier(n.GameData.barrierNumber);
        this.createCat();
        this.x = (GameUtil.getStageWidth() - this.width) / 2;
        this.y = GameUtil.getStageHeight() / 2.5;
        SceneController.showLevelTip();
    };
    // 初始化格子
    PlayScene.prototype.createGridNode = function () {
        // any表示数组中允许出现任何类型
        n.GameData.gridNodeList = new Array(n.GameData.row);
        // 根据屏幕宽度 定义列数和格子边距
        var gridNodeSize = GameUtil.getStageWidth() / (n.GameData.row + 1) - n.GameData.gridMargin;
        for (var i = 0; i < n.GameData.row; ++i) {
            n.GameData.gridNodeList[i] = new Array(n.GameData.col);
            // 偶数行缩进 半个node size
            var indent = (i % 2) * (gridNodeSize / 2);
            for (var j = 0; j < n.GameData.col; ++j) {
                // i,j 数组下标 x,y 舞台上的坐标
                var x = indent + j * (gridNodeSize + n.GameData.gridMargin);
                var y = i * gridNodeSize;
                n.GameData.gridNodeList[i][j] = new GridNode(new Point(i, j), new Point(x, y), gridNodeSize, this);
                n.GameData.gridNodeList[i][j].setStatus(GridNodeStatus.AVAILABLE);
                // 添加到游戏场景中
                this.addChild(n.GameData.gridNodeList[i][j]);
            }
        }
    };
    PlayScene.prototype.createBarrier = function (num) {
        while (num) {
            var i = Math.floor(Math.random() * 100 % n.GameData.row);
            var j = Math.floor(Math.random() * 100 % n.GameData.col);
            var gridNode = n.GameData.gridNodeList[i][j];
            // 填上障碍
            if (i !== Math.floor(n.GameData.row / 2) && j !== Math.floor(n.GameData.col / 2) && gridNode.getStatus() === GridNodeStatus.AVAILABLE) {
                gridNode.setStatus(GridNodeStatus.UNAVAILABLE);
                num--;
            }
        }
    };
    PlayScene.prototype.createCat = function () {
        var i = Math.floor(n.GameData.row / 2);
        var j = Math.floor(n.GameData.col / 2);
        this.cat = new Cat(this);
        this.addChild(this.cat);
        this.cat.move(new Point(i, j));
    };
    PlayScene.prototype.catRun = function (searchResult) {
        if (!searchResult.hasPath) {
            // 被包围了，切换状态
            this.cat.setStatus(CatStatus.UNAVAILABLE);
        }
        var nextStep = searchResult.nextStep;
        // 下一步和当前所在位置一样，说明无路可走，玩家win
        if (nextStep.equal(this.cat.getIndex())) {
        }
    };
    PlayScene.prototype.playerRun = function (index) {
        // sound 播放音频 play有2个params
        // startTime 默认0 声音开始播放的位置
        // loops 播放次数 <=0 为无限播放 >0 按照对应值为播放次数
        this.sound.play(0, 1);
        n.GameData.step++;
        this.catRunning = true;
        this.cat.run();
    };
    PlayScene.prototype.canRun = function () {
        return !this.catRunning;
    };
    // 游戏结束
    PlayScene.prototype.gameOver = function (type) {
        n.GameData.overType = type;
        SceneController.showEndScene();
    };
    return PlayScene;
}(BaseScene));
__reflect(PlayScene.prototype, "PlayScene", ["PlayListener"]);
