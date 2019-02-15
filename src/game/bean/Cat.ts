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
    // 下一步
    public nextStep: Point 
    // 是否可以走出去
    public hasPath: boolean = true
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

    public run() {
        // this.playListener && this.playListener.catRun(this.search)
    }

    private search(): SearchResult {
        let nextResult: SearchResult = new SearchResult()
        nextResult.hasPath = false
        return nextResult
    }

    private onAddToStage(event: egret.Event){
        this.init()
    }

    private init() {
        this.bg = new egret.MovieClip()
        console.log('cat.ts中的bg', this.bg)
        this.addChild(this.bg)
        // 猫猫可走
        this.setStatus(CatStatus.AVAILABLE)
    }

    private setStatus(status: CatStatus) {
        if (this.status === status) {
            return
        }
        this.status = status
        this.changBg()
    }

    private changBg() {
        switch(this.status) {
            // 新版movieClip分为
            // movieClipData 存储动画数据
            // movieClipDataFactory data+texture纹理
            case CatStatus.AVAILABLE:
                this.bg.movieClipData = this.catMovieClip.normal.movieClipData
                this.bg.play(-1)
                break
            case CatStatus.UNAVAILABLE:
                this.bg.movieClipData = this.catMovieClip.loser.movieClipData
                this.bg.play(-1)
                break
        }
    }
}