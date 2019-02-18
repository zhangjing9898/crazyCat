// 状态
enum CatStatus {
    // 有路走
    AVAILABLE = 0,
    // 无路可走
    UNAVAILABLE = 1
}

// 猫猫走的路径
class RunPath extends Point{
    public step: number = 0
    public firstStep: Point

    public copy(): RunPath {
        let n = new RunPath(this.x, this.y)
        n.step = this.step
        n.firstStep = this.firstStep.copy()
        return n 
    }
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
    // 点击事件监听
    private playListener: PlayListener

    public constructor(playListener: PlayListener) {
        super()
        this.playListener = playListener
        // 将instance 添加到stage上
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
    }

    public run() {
        this.playListener && this.playListener.catRun(this.search())
    }
    // 返回值 nextStep
    private search(): SearchResult {
        // 记录每个格子走到的最小步数
        let temp: Array<Array<number>> = new Array(n.GameData.row)
        // 初始化每个格子的步数记录 set = 最大值
        for (let i = 0; i < n.GameData.row; ++i) {
            temp[i] = new Array<number>(n.GameData.col)
            for (let j = 0; j < n.GameData.col; ++j) {
                // Number.MAX_VALUE 返回Javascript中的最大数：
                temp[i][j] = Number.MAX_VALUE
            }
        }

        // 获取第一步可走的位置
        let firstStepList
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

    // 猫猫获取第一步
    private getFirstStep(): Array<RunPath> {
        let firstStepList = new Array<RunPath>()

        let dir = this.getDir(this.index.x)

        for (let i = 0;i < dir.length; ++i) {
            // dir[i][0] x轴
            let x = this.index.x + dir[i][0]
            // dir[i][1] y轴
            let y = this.index.y + dir[i][1]

            // 越界 结束本次循环 进入下一个循环
            if (x < 0 || y < 0 || x >= n.GameData.row || y >= n.GameData.col) {
                continue
            }

            // 不可走 结束本次循环 进入下一个循环
            if (n.GameData.gridNodeList[x][y].getStatus() !== GridNodeStatus.AVAILABLE) {
                continue
            }

            let runPath: RunPath = new RunPath(x, y)
            runPath.step = 1
            runPath.firstStep = new Point(x, y)
            firstStepList.push(runPath)
        }
        return firstStepList
        
    }

    private getDir(col) {
        let t = col % 2
        let dir: number[][] = [
            [0,-1],
            [0,1],
            [-1, t - 1],
            [-1, t * 1],
            [1, t - 1],
            [1, t * 1]
        ]
        return dir
    }

    public setStatus(status: CatStatus) {
        if (this.status === status) {
            return
        }
        this.status = status
        this.changBg()
    }

    // 获得目前猫的位置
    public getIndex(): Point {
        return this.index
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

    public move(nextStep: Point = this.index) {
        if (!nextStep.equal(this.index)) {
            if (this.gridNode) {
                this.gridNode.setStatus(GridNodeStatus.AVAILABLE)
            }
            this.gridNode = n.GameData.gridNodeList[nextStep.x][nextStep.y]
            this.gridNode.setStatus(GridNodeStatus.CAT)
            this.index = nextStep
            // 传入的nextStep的x和y是格子数 需要加边距等
            this.x = this.gridNode.x + (this.gridNode.width - this.bg.width) / 2
            console.log('cat move',this.gridNode.x, this.gridNode.width, this.bg.width)
            this.y = this.gridNode.y - this.bg.height + this.gridNode.height / 2
        }
    }
}