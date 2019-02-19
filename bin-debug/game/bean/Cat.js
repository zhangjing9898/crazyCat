var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
// 状态
var CatStatus;
(function (CatStatus) {
    // 有路走
    CatStatus[CatStatus["AVAILABLE"] = 0] = "AVAILABLE";
    // 无路可走
    CatStatus[CatStatus["UNAVAILABLE"] = 1] = "UNAVAILABLE";
})(CatStatus || (CatStatus = {}));
// 猫猫走的路径
var RunPath = (function (_super) {
    __extends(RunPath, _super);
    function RunPath() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.step = 0;
        return _this;
    }
    RunPath.prototype.copy = function () {
        var n = new RunPath(this.x, this.y);
        n.step = this.step;
        n.firstStep = this.firstStep.copy();
        return n;
    };
    return RunPath;
}(Point));
__reflect(RunPath.prototype, "RunPath");
var SearchResult = (function () {
    function SearchResult() {
        // 是否可以走出去
        this.hasPath = true;
    }
    return SearchResult;
}());
__reflect(SearchResult.prototype, "SearchResult");
// 猫
var Cat = (function (_super) {
    __extends(Cat, _super);
    function Cat(playListener) {
        var _this = _super.call(this) || this;
        // 猫猫的动画效果
        _this.catMovieClip = {
            normal: GameUtil.createMovieClipByName('cat_normal'),
            loser: GameUtil.createMovieClipByName('cat_loser')
        };
        _this.playListener = playListener;
        // 将instance 添加到stage上
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Cat.prototype.run = function () {
        this.playListener && this.playListener.catRun(this.search());
    };
    // 返回值 nextStep
    Cat.prototype.search = function () {
        // 记录每个格子走到的最小步数
        var temp = new Array(n.GameData.row);
        // 初始化每个格子的步数记录 set = 最大值
        for (var i = 0; i < n.GameData.row; ++i) {
            temp[i] = new Array(n.GameData.col);
            for (var j = 0; j < n.GameData.col; ++j) {
                // Number.MAX_VALUE 返回Javascript中的最大数：
                temp[i][j] = Number.MAX_VALUE;
            }
        }
        // 取第一步 可走的位置
        var firstStepList = this.getFirstStep();
        var list = new Array();
        // 存放到路径列表
        firstStepList.forEach(function (item) {
            temp[item.x][item.y] = 1;
            list.push(item.copy());
        });
        // 上面的list：return一个array 每个值是point对象 有step和可走的路的下标 eg：(3,4)
        // 初始化 最小步数为最大值
        var minStep = Number.MAX_VALUE;
        // 存放路径集合
        var result = new Array();
        while (list.length) {
            // 取出第一个
            var current = list.shift();
            // exception处理 猫到边界
            if () {
            }
            // 获取当前位置的可走方向（因为单双行缩进不一样导致数组下标不一样，所以需要根据行数获取可走方向）
            var dir = this.getDir(current.x);
            for (var i = 0; i < dir.length; ++i) {
                var t = new RunPath(current.x, current.y);
                t.x += dir[i][0];
                t.y += dir[i][1];
                t.step = current.step + 1;
                // exception 越界
                if () {
                }
                // 有猫或者障碍物
                if () {
                    continue;
                }
                if (temp[t.x][t.y] > t.step) {
                    temp[t.x][t.y] = t.step;
                    t.firstStep = current.firstStep.copy();
                    list.push(t);
                }
            }
        }
        var nextResult = new SearchResult();
        if (minStep === Number.MAX_VALUE) {
            // 无路可走 切换状态
            this.setStatus(CatStatus.UNAVAILABLE);
            nextResult.hasPath = false;
        }
        if (result.length === 0) {
            // 没有路可以走出去，那就向四周随机走一格
            firstStepList.forEach(function (item) {
                result.push(item.firstStep);
            });
        }
        if (result.length > 0) {
            var list_1 = this.sortList(result);
            // 从所有结果中 随机选一个 避免出现走固定路线
            var index = Math.floor(Math.random() * list_1.length);
            nextResult.nextStep = list_1[index];
        }
        else {
            // 也就是result.length < 0 也就是没路可走 就走当前坐标 也就是初始化 基本不会出现这种情况
            nextResult.nextStep = this.index;
        }
        return nextResult;
    };
    // 排序找出 可走路径最多的格子
    Cat.prototype.sortList = function (list) {
        var sort = new Array();
        list.forEach(function (item) {
            // Key为next step的坐标
            var key = item.x + '-' + item.y;
            var index = -1;
            for (var i = 0; i < sort.length; ++i) {
                if (sort[i].key === key) {
                    index = i;
                    break;
                }
            }
            if (index > -1) {
                // count + 1
                sort[index].count++;
            }
            else {
                sort.push({
                    key: key,
                    value: item,
                    count: 1
                });
            }
        });
        // 从多到少排序，数量多的就是走这一步之后有更多的路径方向可以走
        // eg: sort=['3-4',{x:3,y:4},3],['1-4',{x:1,y:4},2] ...
        sort.sort(function (a, b) {
            return b.count - a.count;
        });
        var result = new Array();
        sort.forEach(function (item) {
            // 找到排行第一 也就是 count最多的
            if (item.count === sort[0].count) {
                result.push(new Point(item.value.x, item.value.y));
            }
        });
        return result;
    };
    Cat.prototype.onAddToStage = function (event) {
        this.init();
    };
    Cat.prototype.init = function () {
        this.bg = new egret.MovieClip();
        console.log('cat.ts中的bg', this.bg);
        this.addChild(this.bg);
        // 猫猫可走
        this.setStatus(CatStatus.AVAILABLE);
    };
    // 猫猫获取第一步
    Cat.prototype.getFirstStep = function () {
        var firstStepList = new Array();
        var dir = this.getDir(this.index.x);
        for (var i = 0; i < dir.length; ++i) {
            // dir[i][0] x轴
            var x = this.index.x + dir[i][0];
            // dir[i][1] y轴
            var y = this.index.y + dir[i][1];
            // 越界 结束本次循环 进入下一个循环
            if (x < 0 || y < 0 || x >= n.GameData.row || y >= n.GameData.col) {
                continue;
            }
            // 不可走 结束本次循环 进入下一个循环
            if (n.GameData.gridNodeList[x][y].getStatus() !== GridNodeStatus.AVAILABLE) {
                continue;
            }
            var runPath = new RunPath(x, y);
            runPath.step = 1;
            runPath.firstStep = new Point(x, y);
            firstStepList.push(runPath);
        }
        // return 一个数组 可走的所有方向的差值 下标值 eg(0, -1)
        return firstStepList;
    };
    Cat.prototype.getDir = function (col) {
        var t = col % 2;
        var dir = [
            [0, -1],
            [0, 1],
            [-1, t - 1],
            [-1, t * 1],
            [1, t - 1],
            [1, t * 1]
        ];
        return dir;
    };
    Cat.prototype.setStatus = function (status) {
        if (this.status === status) {
            return;
        }
        this.status = status;
        this.changBg();
    };
    // 获得目前猫的位置
    Cat.prototype.getIndex = function () {
        return this.index;
    };
    Cat.prototype.changBg = function () {
        switch (this.status) {
            // 新版movieClip分为
            // movieClipData 存储动画数据
            // movieClipDataFactory data+texture纹理
            case CatStatus.AVAILABLE:
                this.bg.movieClipData = this.catMovieClip.normal.movieClipData;
                this.bg.play(-1);
                break;
            case CatStatus.UNAVAILABLE:
                this.bg.movieClipData = this.catMovieClip.loser.movieClipData;
                this.bg.play(-1);
                break;
        }
    };
    Cat.prototype.move = function (nextStep) {
        if (nextStep === void 0) { nextStep = this.index; }
        if (!nextStep.equal(this.index)) {
            if (this.gridNode) {
                this.gridNode.setStatus(GridNodeStatus.AVAILABLE);
            }
            this.gridNode = n.GameData.gridNodeList[nextStep.x][nextStep.y];
            this.gridNode.setStatus(GridNodeStatus.CAT);
            this.index = nextStep;
            // 传入的nextStep的x和y是格子数 需要加边距等
            this.x = this.gridNode.x + (this.gridNode.width - this.bg.width) / 2;
            console.log('cat move', this.gridNode.x, this.gridNode.width, this.bg.width);
            this.y = this.gridNode.y - this.bg.height + this.gridNode.height / 2;
        }
    };
    return Cat;
}(egret.Sprite));
__reflect(Cat.prototype, "Cat");
