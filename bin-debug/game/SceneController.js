var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// 场景控制类
var SceneController = (function () {
    function SceneController() {
        this.startScene = new StartScene();
        // this.playScene = new PlayScene();
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
        // if (this.instance.playScene.parent) {
        //     // 如果有游戏场景，先移除
        //     stage.removeChild(this.instance.playScene)
        //     // TODO:
        // }
        // if (this.instance.endScene.parent) {
        //     // 如果有结束场景，移除掉
        //     stage.removeChild(this.instance.endScene)
        //     // TODO:
        // }
        // 添加开始场景
        stage.addChild(this.instance.startScene);
    };
    return SceneController;
}());
__reflect(SceneController.prototype, "SceneController");
