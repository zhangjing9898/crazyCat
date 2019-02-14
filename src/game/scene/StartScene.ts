class StartScene extends BaseScene {
    // protected和private类似，但是，protected成员在派生类中可以访问
    protected initView() {
        let cat: egret.Bitmap = GameUtil.createBitmapByName('cat_start_bg');
        this.addChild(cat);
    }
}