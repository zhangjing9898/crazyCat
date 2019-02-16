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
                break
            case OverType.CAT:
                console.log('猫猫赢')
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
        
    }
}