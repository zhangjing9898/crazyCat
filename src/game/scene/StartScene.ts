class StartScene extends BaseScene {
    // protected和private类似，但是，protected成员在派生类中可以访问
    protected initView() {
        let cat: egret.Bitmap = GameUtil.createBitmapByName('cat_start_bg');
        this.addChild(cat);

        cat.x = (GameUtil.getStageWidth() - cat.width) / 2;
        cat.y = (GameUtil.getStageHeight() - cat.height) / 2 + 100;

        let startBtn: egret.Bitmap = GameUtil.createBitmapByName('btn_start');
        this.addChild(startBtn);
        startBtn.x = (GameUtil.getStageWidth() - startBtn.width) / 2;
        startBtn.y = cat.y + cat.height
        // 按钮添加缩放效果
        // TODO:
    }
}