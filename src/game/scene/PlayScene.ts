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
   
    private sound: egret.Sound  

    protected initView() {
        this.sound = RES.getRes('go_mp3')
        // TODO:
        this.x = (GameUtil.getStageWidth() - this.width)
        this.y = GameUtil.getStageHeight() / 2.5
        // TODO:
    }

    public catRun() {
        // TODO:
    }

    public gameOver() {

    }

    public playerRun() {

    }
    public canRun() {
        // TODO:
        return true
    }
}