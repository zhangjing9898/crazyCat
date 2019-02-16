declare interface PlayListener {
    // 返回能否走
    canRun(): boolean
    // 用户走
    playerRun(nextStep: Point): void
    // 猫走
    catRun(searchResult: SearchResult): void
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
    
    private cat: Cat
    private catRunning: boolean
    private sound: egret.Sound  

    protected initView() {
        this.sound = RES.getRes('go_mp3')
        this.catRunning = false
        this.createGridNode()
        this.createBarrier(n.GameData.barrierNumber)
        this.createCat()
        this.x = (GameUtil.getStageWidth() - this.width) / 2
        this.y = GameUtil.getStageHeight() / 2.5
        
        SceneController.showLevelTip()
    }
    // 初始化格子
    private createGridNode() {
        // any表示数组中允许出现任何类型
       n.GameData.gridNodeList = new Array<Array<any>>(n.GameData.row)
        // 根据屏幕宽度 定义列数和格子边距
        let gridNodeSize = GameUtil.getStageWidth() / (n.GameData.row + 1) - n.GameData.gridMargin
        for (let i = 0; i < n.GameData.row; ++i ) {
            n.GameData.gridNodeList[i] = new Array<GridNode>(n.GameData.col)
            // 偶数行缩进 半个node size
            let indent = (i % 2) * (gridNodeSize / 2)
            for (let j = 0; j < n.GameData.col; ++j) {
                // i,j 数组下标 x,y 舞台上的坐标
                let x = indent + j * (gridNodeSize + n.GameData.gridMargin)
                let y = i * gridNodeSize
                n.GameData.gridNodeList[i][j] = new GridNode(new Point(i,j), new Point(x, y), gridNodeSize, this)
                n.GameData.gridNodeList[i][j].setStatus(GridNodeStatus.AVAILABLE)
                // 添加到游戏场景中
                this.addChild(n.GameData.gridNodeList[i][j])
            }
        }
    }

    private createBarrier(num: number) {
        while(num) {
            let i = Math.floor(Math.random() * 100 % n.GameData.row)
            let j = Math.floor(Math.random() * 100 % n.GameData.col)
            let gridNode = n.GameData.gridNodeList[i][j]
            // 填上障碍
            if(i !== Math.floor(n.GameData.row / 2) && j !== Math.floor(n.GameData.col / 2) && gridNode.getStatus() === GridNodeStatus.AVAILABLE) {
                gridNode.setStatus(GridNodeStatus.UNAVAILABLE)
                num-- 
            }
        }
    }

    private createCat() {
        let i = Math.floor(n.GameData.row / 2)
        let j = Math.floor(n.GameData.col / 2)
        this.cat = new Cat(this)
        this.addChild(this.cat)
        this.cat.move(new Point(i, j))
    }

    public catRun(searchResult: SearchResult) {
        if (!searchResult.hasPath) {
            // 被包围了，切换状态
            this.cat.setStatus(CatStatus.UNAVAILABLE)
        }
        let nextStep = searchResult.nextStep
        // 下一步和当前所在位置一样，说明无路可走，玩家win
        if (nextStep.equal(this.cat.getIndex())) {

        }
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
        this.cat.run()
    }
    public canRun() {
        return !this.catRunning
    }

    // 游戏结束
    public gameOver(type: OverType) {
        n.GameData.overType = type
        
    }
}