// 场景控制类
class SceneController {
    // 场景容器
    private _stage: egret.DisplayObjectContainer;

    // 开始场景
    private startScene: StartScene
    // 游戏场景
    private playScene: PlayScene;
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
        this.playScene = new PlayScene();
        // this.endScene = new EndScene();
    }

    // 设置存放游戏场景的容器
    public setStage(stage: egret.DisplayObjectContainer) {
        this._stage = stage;
    }

    // 初始化
    public static initGame() {
        let stage: egret.DisplayObjectContainer = this.instance._stage
        if (this.instance.playScene.parent) {
            // 如果有游戏场景，先移除
            stage.removeChild(this.instance.playScene)
            this.instance.playScene = new PlayScene()
        }
        // if (this.instance.endScene.parent) {
        //     // 如果有结束场景，移除掉
        //     stage.removeChild(this.instance.endScene)
        //     // TODO:
        // }
        // 添加开始场景
        stage.addChild(this.instance.startScene)
    }

    // 显示游戏场景
    public static showPlayScene() {
        let stage: egret.DisplayObjectContainer = this.instance._stage
        if (this.instance.startScene.parent) {
            stage.removeChild(this.instance.startScene)
            this.instance.startScene = new StartScene
        }
        if(this.instance.playScene.parent) {
            stage.removeChild(this.instance.playScene)
            this.instance.playScene = new PlayScene()
        }

        stage.addChild(this.instance.startScene)
    }

    // 开始游戏时 显示关卡
    public static showLevelTip() {
        let level: number = n.GameData.level + 1
        let stage: egret.DisplayObjectContainer = this.instance._stage
        // 背景容器
        let bg: egret.DisplayObjectContainer = new egret.DisplayObjectContainer()
        bg.width = GameUtil.getStageWidth()
        bg.height = GameUtil.getStageHeight()
        bg.x = 0
        bg.y = 0
        stage.addChild(bg)

        // 背景蒙层
        // 用于显示矢量图
        let shp: egret.Shape = new egret.Shape()
        shp.graphics.beginFill(0x000000, 0.8)
        shp.graphics.drawRect(0, 0, GameUtil.getStageWidth(), GameUtil.getStageHeight())
        shp.graphics.endFill()
        shp.touchEnabled = true
        bg.addChild(shp)

        let info: egret.TextField = new egret.TextField()
        info.bold = true
        info.textColor = 0xffffff
        info.strokeColor = 0x000000
        info.stroke = 2
        info.size = 60
        info.text = `第${level}关`
        info.x = (GameUtil.getStageWidth() - info.width)
        info.y = (GameUtil.getStageHeight() - info.height)
        bg.addChild(info)

        // tween为缓动动画类
        egret.Tween.get(info).wait(500).to({
            y: 10,
            alpha: 0
        }, 1000, egret.Ease.backInOut)
        .call(()=>{
            stage.removeChild(bg)
        })

        egret.Tween.get(shp).wait(500).to({
            alpha: 0
        }, 1000, egret.Ease.sineIn)
    }
}