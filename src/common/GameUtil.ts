// 工具类

class GameUtil {
    // 获取舞台高度
    // ts中用: number 对函数的input和output进行了约束
    public static getStageHeight(): number {
        return egret.MainContext.instance.stage.stageHeight
    }
    // 获取舞台宽度
    public static getStageWidth(): number {
        return egret.MainContext.instance.stage.stageWidth
    }
    // 根据name关键字创建bitmap对象，name属性请参考resources/resource.json配置文件的内容
    public static createBitmapByName(name: string, type: string='png') {
        // Bitmap 类表示用于显示位图图片的显示对象
        let result = new egret.Bitmap()
        // texture是Texture纹理类的纹理对象，通过getRes("纹理名字")方法来获取要加载的纹理资源，然后赋值给位图对象
        let texture = egret.Texture = RES.getRes(name + '_' + type)
        result.texture = texture
        return result
    }
    // 根据name关键字创建一个MovieClip对象
    // MovieClip又称之为”影片剪辑”，是Egret中提供的一种动画解决方案。我们通常会将MovieClip简写为 MC 。 实际上一个 MC 所实现的功能就是播放序列帧动画
    public static createMovieClipByName(name: string): egret.MovieClip {
        let data_stay: any = RES.getRes(name + "_json")
        console.log(data_stay)
        let texture_stay: egret.Texture = RES.getRes(name + "_png")
        let mcFactory_stay: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data_stay, texture_stay)
        return new egret.MovieClip(mcFactory_stay.generateMovieClipData(name))
    }

}