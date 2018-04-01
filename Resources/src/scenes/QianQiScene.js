var QianQiLayer = cc.Layer.extend({

    _clickParticle:null,
    _uiNode:{
        bg:null,
        top:null,
        center:null,
        left:null,
        right:null,

    },
    _tuijianitems:[],

    ctor:function() {
        this._super();
        cc.associateWithNative( this, cc.Layer );
        this.setTouchEnabled(true);
        this.setTouchMode(cc.TOUCH_ONE_BY_ONE);
    },

    onEnter:function () {
        
        this._super();
        cc.registerTargetedDelegate(0, true, this);
    },

    onExit:function () {
        
        this._super();
        cc.unregisterTouchDelegate(this);
    },

    init:function () {
        cc.log("千奇百怪");
        this._super();

        // var title = cc.LabelTTF.create("千奇百怪", "Arial", 80);
        // this.addChild(title);
        // title.setPosition(this.getContentSize().width / 2 , this.getContentSize().height / 2);

        // var back_spNormal = cc.Sprite.create(g_res.img.gen_back);
        // var back_spSelected = cc.Sprite.create(g_res.img.gen_back_);
        // var back_item = cc.MenuItemSprite.create(back_spNormal, back_spSelected,  function() {
        //     g_director.replaceScene(new (g_ScenesQ.pop())());
        // }, this);
        // var leftMenu = cc.Menu.create(back_item);
        // leftMenu.setPosition(0, 0);
        // back_item.setAnchorPoint(0, 0);
        // back_item.setPosition(0, 0);
        // this.addChild(leftMenu);
        this._uiNode.bg = AutoFitNode.create(scaleMode.FitOut);
        this.addChild(this._uiNode.bg);
        this._uiNode.bg.setContentSize(default_winSize.width, default_winSize.height);
        this._uiNode.bg.setAnchorPoint(0.5, 0.5);
        this._uiNode.bg.setPosition(this.getContentSize().width / 2, this.getContentSize().height / 2);
        cc.log("width:" + this.getContentSize().width + "   height:" + this.getContentSize().height);

        var bgSp = cc.Sprite.create(g_res.img.sce_jac_bg);
        bgSp.setPosition(this._uiNode.bg.getContentSize().width / 2 , this._uiNode.bg.getContentSize().height / 2);
        this._uiNode.bg.addChild(bgSp);

        this._uiNode.center = AutoFitNode.create(scaleMode.FitIn);
        this.addChild(this._uiNode.center);
        this._uiNode.center.setContentSize(1136, 768);
        this._uiNode.center.setAnchorPoint(0.5, 0.5);
        this._uiNode.center.setPosition(this.getContentSize().width / 2, this.getContentSize().height / 2);

        var qianQiSp = cc.Sprite.create(g_res.img.sce_qia_bg);
        qianQiSp.setPosition(this._uiNode.center.getContentSize().width / 2 , this._uiNode.center.getContentSize().height / 2);
        this._uiNode.center.addChild(qianQiSp);


        // var node = cc.Node.create()
        // qianQiSp.addChild(node);
        // node.setContentSize(1040, 555);
        // node.setAnchorPoint(0, 0);
        // node.setPosition(57, 74);

        var btn_menu = cc.Menu.create();
        btn_menu.setPosition(0,0);
        qianQiSp.addChild(btn_menu);
        for (var i = g_res.img.sce_qia_btn.length - 1; i >= 0; i--) {

            var item = cc.MenuItemImage.create(g_res.img.sce_qia_btn[i], g_res.img.sce_qia_btn_[i], function(sender){

            }, this);
            item.setTag(i);
            item.setAnchorPoint(0, 1);
            item.setPosition(57, qianQiSp.getContentSize().height - (item.getContentSize().height + 10) * i - 135)
            btn_menu.addChild(item);

            
        }

        var box = cc.Sprite.create(g_res.img.sce_qia_box);
        box.setAnchorPoint(0,0);
        qianQiSp.addChild(box);
        box.setPosition(277, 72);

        var right_bg = cc.Sprite.create(g_res.img.sce_qia_right_bg);
        right_bg.setAnchorPoint(0,0);
        qianQiSp.addChild(right_bg);
        right_bg.setPosition(805, 88);

        var tuijianMenu = cc.Menu.create();
        tuijianMenu.setPosition(0,0);
        right_bg.addChild(tuijianMenu);
        tuijianMenu.setZOrder(-1);
        for (var i = g_res.img.sce_qia_top.length - 1; i >= 0; i--) {
            var spNormal = cc.Sprite.create(g_res.img.sce_qia_top[i]);
            var spSelected = cc.Sprite.create(g_res.img.sce_qia_top[i]);
            var spDisabled = cc.Sprite.create(g_res.img.sce_qia_top_[i]);
            var item = cc.MenuItemSprite.create(spNormal, spSelected, spDisabled, function(sender){
                tag = sender.getTag();
                for (var i = this._tuijianitems.length - 1; i >= 0; i--) {
                    this._tuijianitems[i].setEnabled(true);
                }
                this._tuijianitems[tag].setEnabled(false);
            }, this);
            item.setTag(i);
            tuijianMenu.addChild(item);
            item.setAnchorPoint(0, 0);
            item.setPosition(i * (item.getContentSize().width + 5), right_bg.getContentSize().height - 10);
            this._tuijianitems[i] = item;
            if (i == 0) {
                item.setEnabled(false);
            }
        }

        this._uiNode.left = AutoFitNode.create(scaleMode.FitIn);
        this.addChild(this._uiNode.left);
        this._uiNode.left.setContentSize(160, 160);
        this._uiNode.left.setAnchorPoint(0, 1);
        this._uiNode.left.setPosition(0, this.getContentSize().height);

        var myCenter_spNormal = cc.Sprite.create(g_res.img.gen_personal);
        var myCenter_spSelected = cc.Sprite.create(g_res.img.gen_personal_);
        var myCenter_item = cc.MenuItemSprite.create(myCenter_spNormal, myCenter_spSelected,  function() {
            // g_preScene = JackpotScene;
            g_ScenesQ.push(QianQiScene);
            var newScene = new MyCenterScene();
            g_director.replaceScene(newScene);
        }, this);
        myCenter_item.setAnchorPoint(0, 0);
        myCenter_item.setPosition(0, 0);

        var leftMenu = cc.Menu.create(myCenter_item);
        leftMenu.setPosition(0, 0);
        this._uiNode.left.addChild(leftMenu);

        this._uiNode.right = AutoFitNode.create(scaleMode.FitIn);
        this.addChild(this._uiNode.right);
        this._uiNode.right.setContentSize(160, 160);
        this._uiNode.right.setAnchorPoint(1, 1);
        this._uiNode.right.setPosition(this.getContentSize().width, this.getContentSize().height);

        var search_spNormal = cc.Sprite.create(g_res.img.sce_qia_search);
        var search_spSelected = cc.Sprite.create(g_res.img.sce_qia_search_);
        var search_item = cc.MenuItemSprite.create(search_spNormal, search_spSelected,  function() {

        }, this);
        search_item.setAnchorPoint(0, 0);
        search_item.setPosition(0, 0);

        var rightMenu = cc.Menu.create(search_item);
        rightMenu.setPosition(0, 0);
        this._uiNode.right.addChild(rightMenu);

        var search_bg = cc.Sprite.create(g_res.img.sce_qia_search_bg);
        this._uiNode.right.addChild(search_bg);
        search_bg.setAnchorPoint(1, 1);
        search_bg.setPosition(- 10, this._uiNode.right.getContentSize().height);

        this._uiNode.bottom = AutoFitNode.create(scaleMode.FitIn);
        this.addChild(this._uiNode.bottom);
        this._uiNode.bottom.setContentSize(160, 160);
        this._uiNode.bottom.setAnchorPoint(0, 0);
        this._uiNode.bottom.setPosition(0, 0);

        var back_spNormal = cc.Sprite.create(g_res.img.gen_back);
        var back_spSelected = cc.Sprite.create(g_res.img.gen_back_);
        var back_item = cc.MenuItemSprite.create(back_spNormal, back_spSelected,  function() {
            g_director.replaceScene(new (g_ScenesQ.pop())());
        }, this);
        back_item.setAnchorPoint(0, 0);
        back_item.setPosition(0, 0);

        var bottomMenu = cc.Menu.create(back_item);
        bottomMenu.setPosition(0, 0);
        this._uiNode.bottom.addChild(bottomMenu);

        this._clickParticle = cc.ParticleSystem.create(g_res.plist.click);
        this.addChild(this._clickParticle);
        this._clickParticle.stopSystem();
    },

    onTouchBegan: function (touch, event) {
        cc.log("签到:touch");
        var touchPoint = touch.getLocation();
        this._clickParticle.resetSystem();
        this._clickParticle.setPosition(touchPoint);
        return true;
    },

    onTouchMoved:function (touch, event){
        var touchPoint = touch.getLocation();
        this._clickParticle.setPosition(touchPoint);
    },

    onTouchEnded:function (touch, event){
        this._clickParticle.stopSystem();
    },
});

var QianQiScene = cc.Scene.extend({
    ctor:function() {
        this._super();
        cc.associateWithNative( this, cc.Scene );
    },

    onEnter:function () {
        this._super();
        var layer = new QianQiLayer();
        this.addChild(layer);
        layer.init();
    }
});