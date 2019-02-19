class EndScene extends BaseScene {
    protected initView() {
        // background mask
        let shp: egret.Shape = new egret.Shape()
        shp.graphics.beginFill(0x000000, 0.8)
        shp.graphics.drawRect(0, 0, GameUtil.getStageWidth(), GameUtil.getStageHeight())
        shp.graphics.endFill()
        shp.touchEnabled = true
        this.addChild(shp)

        switch(n.GameData.overType) {
            case OverType.PLAYER:
                console.log('玩家赢')
                this.initPlayerWin()
                break
            case OverType.CAT:
                console.log('猫猫赢')
                this.initCatWin()
                break
        }
    }

    // 玩家赢 pop-up
    private initPlayerWin() {
        let bg: egret.Bitmap = GameUtil.createBitmapByName('end_tip_success')
        this.addChild(bg)
        bg.x = (GameUtil.getStageWidth() - bg.width) / 2
        bg.y = (GameUtil.getStageHeight() - bg.height) / 2

        let info: egret.TextField = new egret.TextField()
        info.bold = true
        info.textColor = 0xffffff
        info.strokeColor = 0x000000
        info.stroke = 2
        info.text = `您花了${n.GameData.step}步抓住了神经猫`
        info.x = (bg.width - info.width) / 2 + bg.x
        info.y = (bg.height - info.height) / 2 + bg.y + 50
        console.log('endScene initPlayerWin中info的x和y', info.x, info.y)
        this.addChild(info)

        // play music
        let sound: egret.Sound = RES.getRes('success_mp3')
        sound.play(0, 1)

        // 下一关button
        let nextBtn: egret.Bitmap = GameUtil.createBitmapByName('btn_next')
        this.addChild(nextBtn)
        nextBtn.x = (GameUtil.getStageWidth() - nextBtn.width) / 2
        nextBtn.y = bg.y + bg.height
        GameUtil.bitmapToBtn(nextBtn, ()=> {
            console.log('进入下一关')
            n.GameData.level++
            SceneController.showEndScene()
        })
    }

    // 猫猫赢 pop-up
    private initCatWin() {
        let bg: egret.Bitmap = GameUtil.createBitmapByName('end_tip_fail')
        this.addChild(bg)
        bg.x = (GameUtil.getStageWidth() - bg.width) / 2
        bg.y = (GameUtil.getStageHeight() - bg.height) / 2

        let info: egret.TextField = new egret.TextField()
        info.bold = true
        info.textColor = 0xffffff
        info.strokeColor = 0x000000
        info.stroke = 2
        info.lineSpacing = 10
        info.text = `您坚持了${n.GameData.level}关\n还是让神经猫逃跑了！！！`
        // (bg.width - info.width) / 2 保证其居中 再加上bg的横坐标
        info.x = (bg.width - info.width) / 2 + bg.x
        info.y = (bg.height - info.height) / 2 + bg.y + 50
        this.addChild(info)

        let sound: egret.Sound = RES.getRes('fail_mp3')
        sound.play(0, 1)

        let backBtn: egret.Bitmap = GameUtil.createBitmapByName('btn_back')
        this.addChild(backBtn)
        backBtn.x = (GameUtil.getStageWidth() - backBtn.width) / 2 -backBtn.width / 2
        backBtn.y = bg.y + bg.height

        GameUtil.bitmapToBtn(backBtn, ()=> {
            console.log('返回首页')
            n.GameData.level = 0 
            SceneController.initGame()
        })

        let replayBtn: egret.Bitmap = GameUtil.createBitmapByName('btn_replay')
        this.addChild(replayBtn)
        replayBtn.x = (GameUtil.getStageWidth() - replayBtn.width) / 2 + replayBtn.width / 2
        replayBtn.y = bg.y + bg.height
        GameUtil.bitmapToBtn(replayBtn, ()=> {
            console.log('重新开始')
            n.GameData.level = 0
            SceneController.showPlayScene()
        })
    }
}