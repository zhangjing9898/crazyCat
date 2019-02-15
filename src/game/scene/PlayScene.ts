declare interface PlayListener {
    // 返回能否走
    canRun(): boolean
    // 用户走完
    playerRun(): void
    // 猫走完
    catRun(): void
    // 哪个赢 0：user 1：cat
    gameOver(type: number): void
}

enum OverType {
    // 无
    NULL = -1,
    // 用户win
    PLAYER = 0,
    // 猫猫赢
    CAT = 1
}

class PlayScene extends BaseScene implements PlayListener {
    private catRunning: boolean
    private sound: egret.Sound  

    protected initView() {
        this.sound = RES.getRes('go_mp3')
        this.catRunning = false
        this.x = (GameUtil.getStageWidth() - this.width)
        this.y = GameUtil.getStageHeight() / 2.5
        
        SceneController.showLevelTip()
    }
    // 初始化格子
    private createGridNode() {
        n.GameData.
    }

    public catRun() {
        // TODO:
    }

    public gameOver() {

    }

    public playerRun(index: Point) {
        // sound 播放音频 play有2个params
        // startTime 默认0 声音开始播放的位置
        // loops 播放次数 <=0 为无限播放 >0 按照对应值为播放次数
        this.sound.play(0, 1)
        n.GameData.step++
        this.catRunning = true
        
    }
    public canRun() {
        // TODO:
        return true
    }
}