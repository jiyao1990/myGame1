var CustomTableViewCell = cc.TableViewCell.extend({
    draw:function (ctx) {
        this._super(ctx);
    }
});

var ZBName = [
    '墙面装饰', '天花板装饰', '门', '窗户', '墙纸', '地面', '室内装饰1', '室内装饰2', '室内装饰3', '天花板', '套装效果'
];

var MyHouseLayer = cc.Layer.extend({

    bg:null,
    _uiNode:{
        left:null,
        top:null,
        right:null,

    },
    _isZhuangBan:false,
    _zbNode:{
        top:null,
        left:null,
        bottom:null,
    },
    _douNumLabel:null,
    _isShowUI:true,
    _isUIMoving:false,
    _hideBtn:null,
    _zbData:[],
    _zbSps:[],
    _zbSelectType:0,
    _zbSelectIdx:0,
    _zbIsCanMove:false,
    _bottomTable:[],

    ctor:function() {
        this._super();
        cc.associateWithNative( this, cc.Layer );
        this.setTouchEnabled(true);
        this.setTouchMode(cc.TOUCH_ONE_BY_ONE);
        // this.setSwallowTouches(true);
    },

    init:function () {
        cc.log("我的小屋");
        //////////////////////////////
        // 1. super init first
        this._super();
        this.parseZBInfo();
        //初始ui
        this.createUINode();
        //装扮ui
        this.createZbNode();

        if (g_sex == null) {
            var dialog = new Dialog();
            dialog.init();
            this.addChild(dialog);
        }
        return true;
    },

    onLeftBtnCallback:function(sender){
        g_preScene = MyHouseScene;
        if (sender.getTag() == 0) {
            var newScene = new MyCenterScene();
            g_director.replaceScene(newScene);
        }else if (sender.getTag() == 1) {
            // var newScene = new SignInScene();
            // g_director.pushScene(newScene);
            // 布置房间
            this._isZhuangBan = true;
            for (var key in this._uiNode){
                if (this._uiNode[key]) {
                   this._uiNode[key].setVisible(false);
                }
            
            }
            for (var key in this._zbNode){
                if (this._zbNode[key]) {
                   this._zbNode[key].setVisible(true);
                }
            
            }
        }else if (sender.getTag() == 2) {
            var newScene = new JackpotScene();
            g_director.replaceScene(newScene);
        }else if (sender.getTag() == 3) {
            var newScene = new ShopScene();
            g_director.replaceScene(newScene);
        }
    },

    onBackBtnCallback:function(sender){
        var newScene = new MainScene();
        g_director.replaceScene(newScene);
    },

    onLasuoBtnCallback:function(sender){
        if (this._isUIMoving) {
            return;
        }
        this._isUIMoving = true;
        this._isShowUI = !this._isShowUI;
        if (this._isShowUI) {
            this._hideBtn.setVisible(true);
        }else{
            this._hideBtn.setVisible(false);
        }
        for(var key in this._uiNode)
        {
            if (key == "top") 
            {
                if (!this._isShowUI)
                {
                    var action = cc.Sequence.create(cc.MoveTo.create(0.3, cc.p(this.getContentSize().width / 2, this.getContentSize().height + this._uiNode[key].getContentSize().height * this._uiNode[key].getScale())), cc.CallFunc.create(function(){this._isUIMoving = false;}, this));
                    this._uiNode[key].runAction(action);
                }else 
                {
                    var action = cc.Sequence.create(cc.MoveTo.create(0.3, cc.p(this.getContentSize().width / 2, this.getContentSize().height)), cc.CallFunc.create(function(){this._isUIMoving = false;}, this));
                    this._uiNode[key].runAction(action);
                }
            }else if(key == "right")
            {
                // if (!this._isShowUI)
                // {
                //     this._uiNode[key].runAction(cc.MoveTo.create(0.3, cc.p(this.getContentSize().width, this.getContentSize().height + this._uiNode[key].getContentSize().height / 2 * this._uiNode[key].getScale())));
                // }else 
                // {
                //     this._uiNode[key].runAction(cc.MoveTo.create(0.3, cc.p(this.getContentSize().width, this.getContentSize().height)));
                // }
                
            }else if(key == "left")
            {
                if (!this._isShowUI)
                {
                    var action = cc.Sequence.create(cc.MoveTo.create(0.3, cc.p(-this._uiNode[key].getContentSize().width * this._uiNode[key].getScale(), this.getContentSize().height)), cc.CallFunc.create(function(){this._isUIMoving = false;}, this));
                    this._uiNode[key].runAction(action);
                }else 
                {
                    var action = cc.Sequence.create(cc.MoveTo.create(0.3, cc.p(0, this.getContentSize().height)), cc.CallFunc.create(function(){this._isUIMoving = false;}, this));
                    this._uiNode[key].runAction(action);
                }
                
            }

        }
    },

    containsTouchLocation:function (sp, touch){
        var getPoint = touch.getLocation();
        getPoint = this.bg.convertToNodeSpace(getPoint);
        var myRect = sp.getBoundingBox();
        return cc.rectContainsPoint(myRect, getPoint);
    },

    onTouchBegan: function (touch, event) {
        cc.log("我的小屋:touch");
        if (!this._isZhuangBan) {
            if (!this._isShowUI) {
              this.onLasuoBtnCallback();
            }
        }

        var indexs = [];

        for (var i = this._zbSps.length - 1; i >= 0; i--) {
            if (this.containsTouchLocation(this._zbSps[i], touch)) {
                cc.log("i:" + i);
                indexs.push(i);

            }
        }

        cc.log("indexs.length:" + indexs.length);
        if (indexs.length == 1) {
            this._zbSelectIdx = indexs[0];
            cc.log("indexs.length:" + indexs.length);
            this._zbIsCanMove = true;
            this._zbSps[this._zbSelectIdx].setZOrder(100);
        }else{
            for (var i = indexs.length - 1; i >= 1; i--) {
                if (this._zbSps[indexs[i]].getZOrder() > this._zbSps[indexs[i - 1]].getZOrder()) {
                    this._zbSelectIdx = indexs[i];
                }else{
                    this._zbSelectIdx = indexs[i - 1];
                }
                this._zbIsCanMove = true;
            }
            this._zbSps[this._zbSelectIdx].setZOrder(100);
        }

        for (var i = this._zbSps.length - 1; i >= 0; i--) {
            if (i != this._zbSelectIdx) {
                this._zbSps[i].setZOrder(10);
            }
        }
        
        
        return true;
    },

    onTouchMoved:function (touch, event){
        var preTouchPoint = touch.getPreviousLocation();
        var touchPoint = touch.getLocation();
        var offset = cc.p(touchPoint.x - preTouchPoint.x, touchPoint.y - preTouchPoint.y);
        if (this._zbSps[this._zbSelectIdx] && this._zbIsCanMove) {
            var worldPos = this.bg.convertToWorldSpace(this._zbSps[this._zbSelectIdx].getPosition());
            var pos = cc.p(worldPos.x + offset.x, worldPos.y + offset.y);
            this._zbSps[this._zbSelectIdx].setPosition(this.bg.convertToNodeSpace(pos));
        }
        
    },

    onTouchEnded:function (touch, event){
        this._zbIsCanMove = false;
    },

    createUINode: function (){
        this.bg = AutoFitNode.create(scaleMode.FitOut);
        this.addChild(this.bg);
        this.bg.setContentSize(default_winSize.width, default_winSize.height);
        this.bg.setAnchorPoint(0.5, 0.5);
        this.bg.setPosition(this.getContentSize().width / 2, this.getContentSize().height / 2);
        cc.log("width:" + this.getContentSize().width + "   height:" + this.getContentSize().height);

        var bgSp = cc.Sprite.create("res/scenes/mainScene/bg.png");
        bgSp.setPosition(this.bg.getContentSize().width / 2 , this.bg.getContentSize().height / 2);
        this.bg.addChild(bgSp);


        this._uiNode.left = AutoFitNode.create(scaleMode.FitIn);
        this.addChild(this._uiNode.left);
        this._uiNode.left.setContentSize(170, default_winSize.height);
        this._uiNode.left.setAnchorPoint(0, 1);
        this._uiNode.left.setPosition(0, this.getContentSize().height);

        var leftMenu = cc.Menu.create();
        for (var i = 0; i < 4; i++) {
            var spNormal = cc.Sprite.create("res/scenes/myHouseScene/left_"+i+".png");
            var spSelected = cc.Sprite.create("res/scenes/myHouseScene/left_"+i+"_.png");
            var item = cc.MenuItemSprite.create(spNormal, spSelected,  this.onLeftBtnCallback, this);
            item.setTag(i);
            leftMenu.addChild(item);
            item.setPosition(this._uiNode.left.getContentSize().width / 2, this._uiNode.left.getContentSize().height - (item.getContentSize().height / 2 + i * (item.getContentSize().height - 5)));
        }
        this._uiNode.left.addChild(leftMenu);
        leftMenu.setPosition(0,0);

        var back_spNormal = cc.Sprite.create("res/scenes/mainScene/back.png");
        var back_spSelected = cc.Sprite.create("res/scenes/mainScene/back_.png");
        var back_item = cc.MenuItemSprite.create(back_spNormal, back_spSelected,  this.onBackBtnCallback, this);
        leftMenu.addChild(back_item);
        back_item.setAnchorPoint(0, 0);
        back_item.setPosition(0, 0);


        this._uiNode.top = AutoFitNode.create(scaleMode.FitIn);
        this.addChild(this._uiNode.top);
        this._uiNode.top.setContentSize(default_winSize.width, 160);
        this._uiNode.top.setAnchorPoint(0.5, 1);
        this._uiNode.top.setPosition(this.getContentSize().width / 2, this.getContentSize().height);

        var topBg = cc.Sprite.create("res/scenes/mainScene/top.png");
        this._uiNode.top.addChild(topBg);
        topBg.setAnchorPoint(0.5, 1);
        topBg.setPosition(this._uiNode.top.getContentSize().width / 2, this._uiNode.top.getContentSize().height);

        var dou = cc.Sprite.create("res/scenes/mainScene/dou.png");
        topBg.addChild(dou);
        dou.setPosition(95, 65);

        this._douNumLabel = cc.LabelTTF.create(g_douNum, "Arial", 32);
        topBg.addChild(this._douNumLabel);
        this._douNumLabel.setPosition(278, 65);


        this._uiNode.right = AutoFitNode.create(scaleMode.FitIn);
        this.addChild(this._uiNode.right);
        this._uiNode.right.setContentSize(290, 280);
        this._uiNode.right.setAnchorPoint(1, 1);
        this._uiNode.right.setPosition(this.getContentSize().width, this.getContentSize().height);

        var rightMenu = cc.Menu.create();

        var hide_spNormal = cc.Sprite.create("res/scenes/mainScene/hide.png");
        var hide_spSelected = cc.Sprite.create("res/scenes/mainScene/hide_.png");
        this._hideBtn = cc.MenuItemSprite.create(hide_spNormal, hide_spSelected,  this.onLasuoBtnCallback, this);
        rightMenu.addChild(this._hideBtn);
        this._hideBtn.setAnchorPoint(1, 1);
        this._hideBtn.setPosition(this._uiNode.right.getContentSize().width - 10, this._uiNode.right.getContentSize().height);

        // var lasuo_spNormal = cc.Sprite.create("res/scenes/mainScene/lasuo.png");
        // lasuo_spNormal.setPosition(0, 20);
        // var lasuo_spSelected = cc.Sprite.create("res/scenes/mainScene/lasuo.png");
        // var lasuo_item = cc.MenuItemSprite.create(lasuo_spNormal, lasuo_spSelected,  this.onLasuoBtnCallback, this);
        // rightMenu.addChild(lasuo_item);
        // lasuo_item.setAnchorPoint(1, 1);
        // lasuo_item.setPosition(this._uiNode.right.getContentSize().width - lasuo_item.getContentSize().width, this._uiNode.right.getContentSize().height);

        this._uiNode.right.addChild(rightMenu);
        rightMenu.setPosition(0,0);
    },
    createZbNode: function (){
        this._zbNode.left = cc.Node.create();
        this.addChild(this._zbNode.left);
        this._zbNode.left.setContentSize(180, 595);
        this._zbNode.left.setAnchorPoint(0, 1);
        this._zbNode.left.setPosition(0, this.getContentSize().height);

        var tableView = cc.TableView.create(this, cc.size(150, 500));
        tableView.setTag(100);
        tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        tableView.setPosition(15, 22.5);
        tableView.setDelegate(this);
        tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        this._zbNode.left.addChild(tableView);
        tableView.setScale(fitScaleIn);
        tableView.reloadData();


        this._zbNode.bottom = AutoFitNode.create(scaleMode.FitIn);
        this.addChild(this._zbNode.bottom);
        this._zbNode.bottom.setContentSize(840, 175);
        this._zbNode.bottom.setAnchorPoint(0.5, 0);
        this._zbNode.bottom.setPosition(this.getContentSize().width / 2, 0);

        for (var i = 0; i < ZBName.length; i++) {
            this._bottomTable[i] = cc.TableView.create(this, cc.size(790, 145));
            this._bottomTable[i].setTag(1000 + i);
            this._bottomTable[i].setDirection(cc.SCROLLVIEW_DIRECTION_HORIZONTAL);
            this._bottomTable[i].setPosition(25, 15);
            this._bottomTable[i].setDelegate(this);
            // this._bottomTable.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
            this._zbNode.bottom.addChild(this._bottomTable[i]);
            this._bottomTable[i].reloadData()
            this._bottomTable[i].setVisible(false);
        }
        this._bottomTable[this._zbSelectType].setVisible(true);
        
        

        // this._zbNode.top = AutoFitNode.create(scaleMode.FitIn);
        // this.addChild(this._zbNode.top);
        // this._zbNode.top.setContentSize(default_winSize.width, default_winSize.height / 4);
        // this._zbNode.top.setAnchorPoint(0, 1);
        // this._zbNode.top.setPosition(0, this.getContentSize().height);
        // var topMenu = cc.Menu.create();
        // for (var i = 0; i < 2; i++) {
        //     var spNormal = cc.Sprite.create("res/scenes/myHouseScene/left_2.png");
        //     var spSelected = cc.Sprite.create("res/scenes/myHouseScene/left_2_.png");
        //     var item = cc.MenuItemSprite.create(spNormal, spSelected,  this.onSaveOrBackBtnCallback, this);
        //     item.setTag(i);
        //     topMenu.addChild(item);
        //     item.setAnchorPoint(0, 0.5);
        //     item.setPosition(10 + i * item.getContentSize().width, this._zbNode.top.getContentSize().height / 2);
        // }
        // this._zbNode.top.addChild(topMenu);
        // topMenu.setPosition(0,0);

        for (var key in this._zbNode){
            if (this._zbNode[key]) {
                this._zbNode[key].setVisible(false);
            }
            
        }
    },
    onFenLeiBtnCallback:function(sender){

    },

    onSaveOrBackBtnCallback:function(sender){
        if (sender.getTag() == 0) {
            //保存
        }else if (sender.getTag() == 1) {
            //返回
        }
        this._isZhuangBan = false;
        for (var key in this._uiNode){
                if (this._uiNode[key]) {
                   this._uiNode[key].setVisible(true);
                }
            
            }
            for (var key in this._zbNode){
                if (this._zbNode[key]) {
                   this._zbNode[key].setVisible(false);
                }
            
        }
    },

    scrollViewDidScroll:function (view) {
        // cc.log("scrollViewDidScroll");
    },

    scrollViewDidZoom:function (view){
        // cc.log("scrollViewDidZoom");
    },

    tableCellTouched:function (table, cell) {
        if (table.getTag() == 100) {
            this._bottomTable[this._zbSelectType].setVisible(false);
            this._zbSelectType = cell.getIdx();
            this._bottomTable[this._zbSelectType].setVisible(true);
            this._bottomTable[this._zbSelectType].reloadData();
        }else if (table.getTag() >= 1000){
            var type = table.getTag() - 1000;
            var tag = type * 1000 + cell.getIdx();
            if (!this.bg.getChildByTag(tag)) {
                if (type == 4) {
                    var sprite = cc.Sprite.create("res/scenes/myHouseScene/" + this._zbData[type][cell.getIdx()]);
                    this.bg.addChild(sprite);
                    sprite.setAnchorPoint(0.5, 1);
                    sprite.setPosition(cc.p(this.bg.getContentSize().width / 2, 721));
                    sprite.setTag(tag);
                }
                else if (type == 5) {
                    var sprite = cc.Sprite.create("res/scenes/myHouseScene/" + this._zbData[type][cell.getIdx()]);
                    this.bg.addChild(sprite);
                    sprite.setAnchorPoint(0.5, 0);
                    sprite.setPosition(cc.p(this.bg.getContentSize().width / 2, 0));
                    sprite.setTag(tag);
                }else if (type == 9) {
                    var sprite = cc.Sprite.create("res/scenes/myHouseScene/" + this._zbData[type][cell.getIdx()]);
                    this.bg.addChild(sprite);
                    sprite.setAnchorPoint(0.5, 1);
                    sprite.setPosition(cc.p(this.bg.getContentSize().width / 2, this.bg.getContentSize().height));
                    sprite.setTag(tag);
                }else{
                    var sprite = cc.Sprite.create("res/scenes/myHouseScene/" + this._zbData[type][cell.getIdx()]);
                    sprite.setPosition(cc.p(this.bg.getContentSize().width / 2, this.bg.getContentSize().height / 2));
                    this._zbSps.push(sprite);
                    this.bg.addChild(sprite);
                    sprite.setTag(tag);
                }
                
            }
            
        }
    },

    tableCellSizeForIndex:function (table, idx){
        if (table.getTag() == 100) {
            return cc.size(85, 150);
        }else if(table.getTag() >= 1000){
            return cc.size(190, 140);
        }
        return cc.size(0, 0);
    },

    tableCellAtIndex:function (table, idx) {
        var cell = table.dequeueCell();
        
        if (table.getTag() == 100) {
            var strValue = ZBName[idx];
            var label;
            if (!cell) {
                cell = new CustomTableViewCell();
                var sprite = cc.Sprite.create("res/scenes/myHouseScene/left_1.png");
                sprite.setAnchorPoint(0, 0);
                sprite.setPosition(0, 0);
                cell.addChild(sprite);

                label = cc.LabelTTF.create(strValue, "Helvetica", 30.0);
                label.setPosition(sprite.getContentSize().width / 2, sprite.getContentSize().height / 2);
                label.setColor(cc.c3b(0,0,0));
                label.setAnchorPoint(0.5, 0.5);
                label.setTag(123);
                cell.addChild(label);
            } else {
                label = cell.getChildByTag(123);
                label.setString(strValue);
            }

        }else if(table.getTag() >= 1000){
            if (!cell) {

                var type = table.getTag() - 1000;
                cell = new CustomTableViewCell();
                var sprite = cc.Sprite.create("res/scenes/myHouseScene/" + this._zbData[type][idx]);
                sprite.setAnchorPoint(0.5, 0.5);
                sprite.setPosition(85, 70);
                var hRatio = 140 / sprite.getContentSize().height;
                var wRatio = 190 / sprite.getContentSize().width;
                var scale = hRatio > wRatio ? wRatio : hRatio;

                sprite.setScale(scale);
                cell.addChild(sprite);
                
                
                
            }
        }

        return cell;
        
    },

    numberOfCellsInTableView:function (table) {
        if (table.getTag() == 100) {
            return 11;
        }else if(table.getTag() >= 1000){
            var type = table.getTag() - 1000;
            if (this._zbData[type]) {
                return this._zbData[type].length;
            }
        }
        return 0;
    },

    parseZBInfo:function (){
        for (var i = 0; i < g_zbInfo.length; i++) {
            for (var j = 0; j < g_zbInfo[i].length; j++) {
                if (this._zbData[g_zbInfo[i][j].type] == null)
                {
                    this._zbData[g_zbInfo[i][j].type] = [];
                    this._zbData[g_zbInfo[i][j].type].push("zb_" + i + "/" + g_zbInfo[i][j].type + "_" + g_zbInfo[i][j].idx + ".png");
                }else{
                    this._zbData[g_zbInfo[i][j].type].push("zb_" + i + "/" + g_zbInfo[i][j].type + "_" + g_zbInfo[i][j].idx + ".png");
                }
            }
        };
    },
});

var MyHouseScene = cc.Scene.extend({
    ctor:function() {
        this._super();
        cc.associateWithNative( this, cc.Scene );
    },

    onEnter:function () {
        this._super();
        var layer = new MyHouseLayer();
        this.addChild(layer);
        layer.init();
    }
});