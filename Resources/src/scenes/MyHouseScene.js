var CustomTableViewCell = cc.TableViewCell.extend({
    draw:function (ctx) {
        this._super(ctx);
    }
});

var myHousePathRoot = "res/scenes/myHouseScene/";

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
    _zbNow:[],
    _zbSelectType:0,
    _zbSelectIdx:0,
    _zbIsCanMove:false,
    _leftTable:null,
    _bottomTable:[],
    _clickParticle:null,

    ctor:function() {
        this._super();
        cc.associateWithNative( this, cc.Layer );
        this.setTouchEnabled(true);
        this.setTouchMode(cc.TOUCH_ONE_BY_ONE);
        // this.setSwallowTouches(true);
    },

    onEnter:function () {
        
        this._super();
        cc.registerTargetedDelegate(0, true, this);
    },

    onExit:function () {
        cc.log("小屋 exit")
        
        this._super();
        cc.unregisterTouchDelegate(this);
    },

    init:function () {
        cc.log("我的小屋");
        //////////////////////////////
        // 1. super init first
        this._super();
        //初始ui
        this.createUINode();
        //装扮ui
        this.parseZBInfo();
        this.createZbNode();

        if (g_sex == null) {
            var dialog = new Dialog();
            dialog.init(DialogType.sex);
            this.addChild(dialog);
        }

        this._clickParticle = cc.ParticleSystem.create(g_res.plist.click);
        this.addChild(this._clickParticle);
        this._clickParticle.stopSystem();
        return true;
    },

    onLeftBtnCallback:function(sender){
        // g_preScene = MyHouseScene;
        g_ScenesQ.push(MyHouseScene);
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
            this.initZBPage();

        }else if (sender.getTag() == 2) {
            var newScene = new JackpotScene();
            g_director.replaceScene(newScene);
        }else if (sender.getTag() == 3) {
            var newScene = new ShopScene();
            g_director.replaceScene(newScene);
        }
    },

    initZBPage:function(){
        this._zbNow = g_zbNowInfo.concat();
        for (var i = this._zbNow.length - 1; i >= 0; i--) {
            var type = Math.floor(this._zbNow[i].tag / 1000);
            if (type != 4 && type != 5 && type != 9) {
                this._zbSps.push(this.bg.getChildByTag(this._zbNow[i].tag));
            }
            
        }

        this._leftTable.reloadData();
        for (var i = 0; i < g_res.img.sce_myh_left_btn.length; i++) {
            this._bottomTable[i].reloadData()
            this._bottomTable[i].setVisible(false);
        }
        this._bottomTable[this._zbSelectType].setVisible(true);
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
        var touchPoint = touch.getLocation();
        this._clickParticle.resetSystem();
        this._clickParticle.setPosition(touchPoint);
        if (!this._isZhuangBan) {
            if (!this._isShowUI) {
              this.onLasuoBtnCallback();
            }
        }

        var indexs = [];

        for (var i = this._zbSps.length - 1; i >= 0; i--) {
            if (this.containsTouchLocation(this._zbSps[i], touch)) {
                cc.log("i2:" + i);
                indexs.push(i);

            }
        }

        if (indexs.length == 1) {
            this._zbSelectIdx = indexs[0];
            this._zbIsCanMove = true;
            if (this._zbSps[this._zbSelectIdx].getZOrder() < 10) {
                this._zbSps[this._zbSelectIdx].setZOrder(this._zbSps[this._zbSelectIdx].getZOrder() * 10);
            }
        }else if (indexs.length > 1){
            for (var i = indexs.length - 1; i >= 1; i--) {
                if (this._zbSps[indexs[i]].getZOrder() > this._zbSps[indexs[i - 1]].getZOrder()) {
                    this._zbSelectIdx = indexs[i];
                }else{
                    this._zbSelectIdx = indexs[i - 1];
                }
                this._zbIsCanMove = true;
            }
            if (this._zbSps[this._zbSelectIdx].getZOrder() < 10) {
                this._zbSps[this._zbSelectIdx].setZOrder(this._zbSps[this._zbSelectIdx].getZOrder() * 10);
            }
        }

        for (var i = this._zbSps.length - 1; i >= 0; i--) {
            if (i != this._zbSelectIdx) {
                if (this._zbSps[i].getZOrder() > 10) {
                    this._zbSps[i].setZOrder(this._zbSps[i].getZOrder() / 10);
                }
                
            }
        }
        
        
        return true;
    },

    onTouchMoved:function (touch, event){
        var preTouchPoint = touch.getPreviousLocation();
        var touchPoint = touch.getLocation();
        this._clickParticle.setPosition(touchPoint);
        var offset = cc.p(touchPoint.x - preTouchPoint.x, touchPoint.y - preTouchPoint.y);
        if (this._zbSps[this._zbSelectIdx] && this._zbIsCanMove) {
            var worldPos = this.bg.convertToWorldSpace(this._zbSps[this._zbSelectIdx].getPosition());
            var pos = cc.p(worldPos.x + offset.x, worldPos.y + offset.y);
            this._zbSps[this._zbSelectIdx].setPosition(this.bg.convertToNodeSpace(pos));
        }
        
    },

    onTouchEnded:function (touch, event){
        this._zbIsCanMove = false;
        this._clickParticle.stopSystem();

        for (var i = this._zbSps.length - 1; i >= 0; i--) {
            if (this._zbSps[i].getZOrder() > 10) {
                this._zbSps[i].setZOrder(this._zbSps[i].getZOrder() / 10);
            }
        }

        for (var i = this._zbNow.length - 1; i >= 0; i--) {
            if (this._zbSps[this._zbSelectIdx] && this._zbNow[i].tag == this._zbSps[this._zbSelectIdx].getTag()) {
                this._zbNow[i].pos = this._zbSps[this._zbSelectIdx].getPosition();
                this._zbNow[i].zoder = this._zbSps[this._zbSelectIdx].getZOrder();
                this._zbNow[i].anchor = this._zbSps[this._zbSelectIdx].getAnchorPoint();
            }
        }
    },

    createUINode: function (){
        this.bg = AutoFitNode.create(scaleMode.FitOut);
        this.addChild(this.bg);
        this.bg.setContentSize(default_winSize.width, default_winSize.height);
        this.bg.setAnchorPoint(0.5, 0.5);
        this.bg.setPosition(this.getContentSize().width / 2, this.getContentSize().height / 2);

        var bgSp = cc.Sprite.create(g_res.img.gen_bg);
        bgSp.setPosition(this.bg.getContentSize().width / 2 , this.bg.getContentSize().height / 2);
        this.bg.addChild(bgSp);

        g_zbRoom(this.bg);

        this._uiNode.left = AutoFitNode.create(scaleMode.FitIn);
        this.addChild(this._uiNode.left);
        this._uiNode.left.setContentSize(170, default_winSize.height);
        this._uiNode.left.setAnchorPoint(0, 1);
        this._uiNode.left.setPosition(0, this.getContentSize().height);

        var leftMenu = cc.Menu.create();
        for (var i = 0; i < g_res.img.sce_myh_left.length; i++) {
            var spNormal = cc.Sprite.create(g_res.img.sce_myh_left[i]);
            var spSelected = cc.Sprite.create(g_res.img.sce_myh_left_[i]);
            var item = cc.MenuItemSprite.create(spNormal, spSelected,  this.onLeftBtnCallback, this);
            item.setTag(i);
            leftMenu.addChild(item);
            item.setPosition(this._uiNode.left.getContentSize().width / 2, this._uiNode.left.getContentSize().height - (item.getContentSize().height / 2 + i * (item.getContentSize().height - 5)));
        }
        this._uiNode.left.addChild(leftMenu);
        leftMenu.setPosition(0,0);

        var back_spNormal = cc.Sprite.create(g_res.img.gen_back);
        var back_spSelected = cc.Sprite.create(g_res.img.gen_back_);
        var back_item = cc.MenuItemSprite.create(back_spNormal, back_spSelected,  this.onBackBtnCallback, this);
        leftMenu.addChild(back_item);
        back_item.setAnchorPoint(0, 0);
        back_item.setPosition(0, 0);


        this._uiNode.top = AutoFitNode.create(scaleMode.FitIn);
        this.addChild(this._uiNode.top);
        this._uiNode.top.setContentSize(default_winSize.width, 160);
        this._uiNode.top.setAnchorPoint(0.5, 1);
        this._uiNode.top.setPosition(this.getContentSize().width / 2, this.getContentSize().height);

        var topBg = cc.Sprite.create(g_res.img.gen_dou_bg);
        this._uiNode.top.addChild(topBg);
        topBg.setAnchorPoint(0.5, 1);
        topBg.setPosition(this._uiNode.top.getContentSize().width / 2, this._uiNode.top.getContentSize().height);

        var dou = cc.Sprite.create(g_res.img.gen_dou);
        topBg.addChild(dou);
        dou.setPosition(95, 65);

        this._douNumLabel = cc.LabelTTF.create(g_douNum, "Arial", 40);
        topBg.addChild(this._douNumLabel);
        this._douNumLabel.setPosition(278, 65);


        this._uiNode.right = AutoFitNode.create(scaleMode.FitIn);
        this.addChild(this._uiNode.right);
        this._uiNode.right.setContentSize(290, 280);
        this._uiNode.right.setAnchorPoint(1, 1);
        this._uiNode.right.setPosition(this.getContentSize().width, this.getContentSize().height);

        var rightMenu = cc.Menu.create();

        var hide_spNormal = cc.Sprite.create(g_res.img.gen_hide);
        var hide_spSelected = cc.Sprite.create(g_res.img.gen_hide_);
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
        this._zbNode.left.setContentSize(234 * fitScaleIn, 596 * fitScaleIn);
        this._zbNode.left.setAnchorPoint(0, 1);
        this._zbNode.left.setPosition(0, this.getContentSize().height);

        var left_bg_0 = cc.Sprite.create(g_res.img.sce_myh_left_bg_0);
        this._zbNode.left.addChild(left_bg_0);
        left_bg_0.setAnchorPoint(0, 1);
        left_bg_0.setPosition(0, this._zbNode.left.getContentSize().height);
        left_bg_0.setScale(fitScaleIn);


        var left_bg_1 = cc.Sprite.create(g_res.img.sce_myh_left_bg_1);
        left_bg_0.addChild(left_bg_1);
        left_bg_1.setPosition(18, 40);
        left_bg_1.setAnchorPoint(0, 0);
        left_bg_1.setZOrder(-1);

        this._leftTable = cc.TableView.create(this, cc.size(210, 506));
        this._leftTable.setTag(100);
        this._leftTable.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        // this._leftTable.setPosition(16.5, 22.5);
        this._leftTable.setPosition(-4.5 * fitScaleIn, 0 * fitScaleIn); 
        this._leftTable.setDelegate(this);
        this._leftTable.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        left_bg_1.addChild(this._leftTable);
        this._leftTable.reloadData();


        this._zbNode.bottom = AutoFitNode.create(scaleMode.FitIn);
        this.addChild(this._zbNode.bottom);
        this._zbNode.bottom.setContentSize(default_winSize.width, 175);
        this._zbNode.bottom.setAnchorPoint(0.5, 0);
        this._zbNode.bottom.setPosition(this.getContentSize().width / 2, 0);

        var bottom_bg = cc.Sprite.create(g_res.img.sce_myh_bottom_bg);
        this._zbNode.bottom.addChild(bottom_bg);
        bottom_bg.setPosition(this._zbNode.bottom.getContentSize().width / 2, 0);
        bottom_bg.setAnchorPoint(0.5, 0);
        bottom_bg.setZOrder(-1);

        for (var i = 0; i < g_res.img.sce_myh_left_btn.length; i++) {
            this._bottomTable[i] = cc.TableView.create(this, cc.size(800, 140));
            this._bottomTable[i].setTag(1000 + i);
            this._bottomTable[i].setDirection(cc.SCROLLVIEW_DIRECTION_HORIZONTAL);
            this._bottomTable[i].setPosition(28, 23);
            this._bottomTable[i].setDelegate(this);
            // this._bottomTable.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
            bottom_bg.addChild(this._bottomTable[i]);
            this._bottomTable[i].reloadData()
            this._bottomTable[i].setVisible(false);
        }
        this._bottomTable[this._zbSelectType].setVisible(true);
        
        
        var bottomMenu = cc.Menu.create();
        for (var i = 0; i < 2; i++) {
            
            if (i == 1) {
                var spNormal = cc.Sprite.create(g_res.img.gen_back);
                var spSelected = cc.Sprite.create(g_res.img.gen_back_);
                var item = cc.MenuItemSprite.create(spNormal, spSelected,  this.onSaveOrBackBtnCallback, this);
                item.setTag(i);
                bottomMenu.addChild(item);
                item.setAnchorPoint(0, 0);
                item.setPosition(0, 0);
            }else{
                var spNormal = cc.Sprite.create(g_res.img.sce_myh_ok);
                var spSelected = cc.Sprite.create(g_res.img.sce_myh_ok_);
                var item = cc.MenuItemSprite.create(spNormal, spSelected,  this.onSaveOrBackBtnCallback, this);
                item.setTag(i);
                bottomMenu.addChild(item);
                item.setAnchorPoint(1, 0);
                item.setPosition(this._zbNode.bottom.getContentSize().width, 0);
            }
            
        }
        this._zbNode.bottom.addChild(bottomMenu);
        bottomMenu.setPosition(0,0);

        for (var key in this._zbNode){
            if (this._zbNode[key]) {
                this._zbNode[key].setVisible(false);
            }
            
        }
    },
    onFenLeiBtnCallback:function(sender){

    },

    onSaveOrBackBtnCallback:function(sender){
        cc.log("sender.getTag()" + sender.getTag());
        if (sender.getTag() == 0) {
            //保存
            cc.log("保存");
            for (var i = this._zbNow.length - 1; i >= 0; i--) {
                this.bg.getChildByTag(this._zbNow[i].tag).removeFromParent();
            }
            g_zbNowInfo = this._zbNow.concat();
            this._zbNow = [];
            this._zbSps = [];
            this._zbSelectType = 0;
            this._zbSelectIdx = 0;
            this._zbIsCanMove = false;

            g_zbRoom(this.bg);

        }else if (sender.getTag() == 1) {
            //返回
            cc.log("返回" + g_zbNowInfo.length);
            for (var i = this._zbNow.length - 1; i >= 0; i--) {
                this.bg.getChildByTag(this._zbNow[i].tag).removeFromParent();
            }
            this._zbNow = [];
            this._zbSps = [];
            this._zbSelectType = 0;
            this._zbSelectIdx = 0;
            this._zbIsCanMove = false;

            g_zbRoom(this.bg);

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
            if (table.cellAtIndex(this._zbSelectType + 1)) {
                table.cellAtIndex(this._zbSelectType + 1).getChildByTag(100).setVisible(true);
                table.cellAtIndex(this._zbSelectType + 1).getChildByTag(101).setVisible(false);
            }
            this._zbSelectType = cell.getIdx() - 1;
            cell.getChildByTag(100).setVisible(false);
            cell.getChildByTag(101).setVisible(true);
            this._bottomTable[this._zbSelectType].setVisible(true);
            this._bottomTable[this._zbSelectType].reloadData();
        }else if (table.getTag() >= 1000){
            var type = table.getTag() - 1000;
            var tag = type * 1000 + cell.getIdx();
            if (!this.bg.getChildByTag(tag)) {
                var sprite = cc.Sprite.create(myHousePathRoot + this._zbData[type][cell.getIdx()]);
                if (type == 4) {
                    this.bg.addChild(sprite);
                    sprite.setAnchorPoint(0.5, 1);
                    sprite.setPosition(cc.p(this.bg.getContentSize().width / 2, 721));
                    sprite.setTag(tag);
                    sprite.setZOrder(1);
                }
                else if (type == 5) {
                    this.bg.addChild(sprite);
                    sprite.setAnchorPoint(0.5, 0);
                    sprite.setPosition(cc.p(this.bg.getContentSize().width / 2, 0));
                    sprite.setTag(tag);
                    sprite.setZOrder(2);
                }else if (type == 9) {
                    this.bg.addChild(sprite);
                    sprite.setAnchorPoint(0.5, 1);
                    sprite.setPosition(cc.p(this.bg.getContentSize().width / 2, this.bg.getContentSize().height));
                    sprite.setTag(tag);
                    sprite.setZOrder(3);
                }else{
                    sprite.setPosition(cc.p(this.bg.getContentSize().width / 2, this.bg.getContentSize().height / 2));
                    this._zbSps.push(sprite);
                    this.bg.addChild(sprite);
                    sprite.setTag(tag);
                    if (type == 0 || type == 2 || type == 3 || type == 7) {
                        sprite.setZOrder(4);
                    }else if(type == 6 || type == 8){
                        sprite.setZOrder(5);
                    }else if(type == 1 || type == 10){
                        sprite.setZOrder(6);
                    }
                }
                var obj = {};
                obj.path = myHousePathRoot + this._zbData[type][cell.getIdx()];
                obj.tag = tag;
                obj.anchor = sprite.getAnchorPoint();
                obj.zoder = sprite.getZOrder();
                obj.pos = sprite.getPosition();
                this._zbNow.push(obj);
            }
            
        }
    },

    tableCellSizeForIndex:function (table, idx){
        if (table.getTag() == 100) {
            return cc.size(210, 100);
        }else if(table.getTag() >= 1000){
            return cc.size(200, 140);
        }
        return cc.size(0, 0);
    },

    tableCellAtIndex:function (table, idx) {
        var cell = table.cellAtIndex(idx);
        
        if (table.getTag() == 100) {
            if (!cell) {
                if (idx == 0) {
                    cell = new CustomTableViewCell();
                }else{
                    idx = idx - 1;
                    cell = new CustomTableViewCell();
                    var sprite = cc.Sprite.create(g_res.img.sce_myh_left_btn[idx]);
                    sprite.setAnchorPoint(0, 0);
                    sprite.setPosition(0, 0);
                    cell.addChild(sprite);
                    sprite.setTag(100);

                    var sprite2 = cc.Sprite.create(g_res.img.sce_myh_left_btn_[idx]);
                    sprite2.setAnchorPoint(0, 0);
                    sprite2.setPosition(0, 0);
                    cell.addChild(sprite2);
                    sprite2.setTag(101);

                    if (idx == this._zbSelectType) {
                        sprite.setVisible(false);
                        sprite2.setVisible(true);
                    }else{
                        sprite.setVisible(true);
                        sprite2.setVisible(false);
                    }
                }
                
            }
        }else if(table.getTag() >= 1000){
            if (!cell) {

                var type = table.getTag() - 1000;
                cell = new CustomTableViewCell();
                var sprite = cc.Sprite.create(myHousePathRoot + this._zbData[type][idx]);
                sprite.setAnchorPoint(0.5, 0.5);
                sprite.setPosition(85, 70);
                var hRatio = 125 / sprite.getContentSize().height;
                var wRatio = 175 / sprite.getContentSize().width;
                var scale = hRatio > wRatio ? wRatio : hRatio;

                sprite.setScale(scale);
                cell.addChild(sprite);
            }
        }

        return cell;
        
    },

    numberOfCellsInTableView:function (table) {
        if (table.getTag() == 100) {
            return 12;
        }else if(table.getTag() >= 1000){
            var type = table.getTag() - 1000;
            if (this._zbData[type]) {
                return this._zbData[type].length;
            }
        }
        return 0;
    },

    parseZBInfo:function (){
        this._zbData = [];
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