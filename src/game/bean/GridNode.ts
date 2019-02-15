enum GridNodeStatus {
    // 空格子，可以走
    AVAILABLE = 0,
    // 有障碍物，不可以走
    UNAVAILABLE = 1,
    // 有猫，不可以走
    CAT = 2
}
// 格子节点
// sprite 类是基本显示列表构造块：一个可包含子项的显示列表节点
class GridNode extends egret.Sprite {
    private gridBg = {
        white: GameUtil.createBitmapByName('grid_white'),
        yellow: GameUtil.createBitmapByName('grid_yellow')
    }

    // 格子的状态
    private status: GridNodeStatus
    // 格子数组中的下标
    private index: Point 
    // 格子的坐标
    private pos: Point
    // 格子的大小
    private size: number
    // 格子的背景
    private bg: egret.Bitmap = new egret.Bitmap()
    // 点击事件监听
    private playListener: PlayListener

    public constructor(index: Point,pos: Point,size: number, playListener: PlayListener) {
        super()
        this.index = index
        this.size = size
        this.bg.width = size
        this.bg.height = size
        this.pos = pos
        this.playListener = playListener
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
    } 

    public setStatus(status: GridNodeStatus) {
        this.status = status
        this.changeBg()
    }

    public getStatus(): GridNodeStatus {
        return this.status
    }

    private onAddToStage(event: egret.Event) {
        this.init()
    }

    private init() {
        this.touchEnabled = true
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
        this.addChild(this.bg)
        this.x = this.pos.x
        this.y = this.pos.y

    }

    private touch() {
        // 没有监听事件
        if(!this.playListener) {
            return
        }
        // 猫咪还在思考 阻止点击
        if (!this.playListener.canRun()){
            return
        }

        // 格子不能点击
        if (this.status !== GridNodeStatus.AVAILABLE) {
            return
        }
        // touch set barrier
        this.setStatus(GridNodeStatus.UNAVAILABLE);
        
        
    }

    private changeBg() {
        switch(this.status) {
            // 空格子，可以run，白色bg
            case GridNodeStatus.AVAILABLE:
                this.bg.texture = this.gridBg.white.texture
            break;
            // 有障碍物，不可以走，黄色背景
            case GridNodeStatus.UNAVAILABLE:
                this.bg.texture = this.gridBg.yellow.texture
            break;
            // 有猫，不可以走，白色背景
            case GridNodeStatus.CAT:
                this.bg.texture = this.gridBg.white.texture
            break;
        }
    }
}