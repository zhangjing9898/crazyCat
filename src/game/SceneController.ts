// 场景控制类
class SceneController {
    // 场景容器
    private _stage: egret.DisplayObjectContainer;

    // 开始场景
    private startScene: StartScene
    // 游戏场景
    // private playScene: PlayScene;
    // 结束场景
    // private endScene: EndScene;

    public static sceneController: SceneController

    public static get instance() {
        if (!this.sceneController) {
            this.sceneController = new SceneController()
        }
        return this.sceneController
    }

    public constructor() {
        this.startScene = new StartScene();
        // this.playScene = new PlayScene();
        // this.endScene = new EndScene();
    }

    // 设置存放游戏场景的容器
    public setStage(stage: egret.DisplayObjectContainer) {
        this._stage = stage;
    }

    // 初始化
    public static initGame() {
        let stage: egret.DisplayObjectContainer = this.instance._stage
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
        stage.addChild(this.instance.startScene)
    }
}