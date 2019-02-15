var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// 场景控制类
var SceneController = (function () {
    function SceneController() {
        this.startScene = new StartScene();
        this.playScene = new PlayScene();
        // this.endScene = new EndScene();
    }
    Object.defineProperty(SceneController, "instance", {
        get: function () {
            if (!this.sceneController) {
                this.sceneController = new SceneController();
            }
            return this.sceneController;
        },
        enumerable: true,
        configurable: true
    });
    // 设置存放游戏场景的容器
    SceneController.prototype.setStage = function (stage) {
        this._stage = stage;
    };
    // 初始化
    SceneController.initGame = function () {
        var stage = this.instance._stage;
        if (this.instance.playScene.parent) {
            // 如果有游戏场景，先移除
            stage.removeChild(this.instance.playScene);
            this.instance.playScene = new PlayScene();
        }
        // if (this.instance.endScene.parent) {
        //     // 如果有结束场景，移除掉
        //     stage.removeChild(this.instance.endScene)
        //     // TODO:
        // }
        // 添加开始场景
        stage.addChild(this.instance.startScene);
    };
    // 显示游戏场景
    SceneController.showPlayScene = function () {
        var stage = this.instance._stage;
        if (this.instance.startScene.parent) {
            stage.removeChild(this.instance.startScene);
            this.instance.startScene = new StartScene;
        }
        if (this.instance.playScene.parent) {
            stage.removeChild(this.instance.playScene);
            this.instance.playScene = new PlayScene();
        }
        var level = n.GameData.level;
        // 保护
        // 关卡超过已有的，那就直接用最后一关（也就是到了后面难度都是几乎一样的），避免数组越界
        if (level >= n.GameData.levelData.length) {
            level = n.GameData.levelData.length - 1;
        }
        // 设置关卡对应的数据
        n.GameData.barrierNumber = n.GameData.levelData[level].barrierNumber;
        n.GameData.row = n.GameData.levelData[level].row;
        n.GameData.col = n.GameData.levelData[level].col;
        // 重置游戏步数
        n.GameData.step = 0;
        n.GameData.overType = OverType.NULL;
        console.log('进入showPlayScene');
        stage.addChild(this.instance.playScene);
    };
    // 开始游戏时 显示关卡
    SceneController.showLevelTip = function () {
        var level = n.GameData.level + 1;
        var stage = this.instance._stage;
        // 背景容器
        var bg = new egret.DisplayObjectContainer();
        bg.width = GameUtil.getStageWidth();
        bg.height = GameUtil.getStageHeight();
        bg.x = 0;
        bg.y = 0;
        stage.addChild(bg);
        // 背景蒙层
        // 用于显示矢量图
        var shp = new egret.Shape();
        shp.graphics.beginFill(0x000000, 0.8);
        shp.graphics.drawRect(0, 0, GameUtil.getStageWidth(), GameUtil.getStageHeight());
        shp.graphics.endFill();
        shp.touchEnabled = true;
        bg.addChild(shp);
        var info = new egret.TextField();
        info.bold = true;
        info.textColor = 0xffffff;
        info.strokeColor = 0x000000;
        info.stroke = 2;
        info.size = 60;
        info.text = "\u7B2C" + level + "\u5173";
        info.x = (GameUtil.getStageWidth() - info.width) / 2;
        info.y = (GameUtil.getStageHeight() - info.height) / 2;
        bg.addChild(info);
        // tween为缓动动画类
        egret.Tween.get(info).wait(500).to({
            y: 10,
            alpha: 0
        }, 1000, egret.Ease.backInOut)
            .call(function () {
            stage.removeChild(bg);
        });
        egret.Tween.get(shp).wait(500).to({
            alpha: 0
        }, 1000, egret.Ease.sineIn);
    };
    return SceneController;
}());
__reflect(SceneController.prototype, "SceneController");
