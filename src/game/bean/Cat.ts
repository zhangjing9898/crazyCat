// 状态
enum CatStatus {
    // 有路走
    AVAILABLE = 0,
    // 无路可走
    UNAVAILABLE = 1
}

// 猫猫走的路径
class RunPath extends Point{

}

class SearchResult {

}

// 猫
class Cat extends egret.Sprite {

    // 猫猫的动画效果
    private catMovieClip = {
        normal: GameUtil.createMovieClipByName('cat_normal'),
        loser: GameUtil.createMovieClipByName('cat_loser')
    }
    // 猫猫的status
    private status: CatStatus
    // 猫猫在array中的下标
    private index: Point
    // 猫咪所在的格子
    private gridNode: GridNode
    // 猫猫的大小
    private size: number
    // 格子背景
    private bg: egret.MovieClip
    // TODO: 不明白其意思
    // 点击事件监听
    private playListener: PlayListener

    public constructor(playListener: PlayListener) {
        super()
        this.playListener = playListener
        // 将instance 添加到stage上
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
    }

    private onAddToStage(event: egret.Event){
        
    }

    private init() {
        this.bg = new egret.MovieClip()
        console.log('cat.ts中的bg', this.bg)
        this.addChild(this.bg)

    }

    private setStatus(status: CatStatus) {
        if (this.status === status) {
            return
        }
        this.status = status

    }

    private changBg() {
        switch(this.status) {
            case CatStatus.AVAILABLE:
                this.bg.movieClipData
            break
            case CatStatus.UNAVAILABLE:

            break
        }
    }
}