// base scene 之后的场景都会继承该类
class BaseScene extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initView, this);
    }

    protected initView() {}
}