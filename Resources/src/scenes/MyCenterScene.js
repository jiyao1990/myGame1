var MyCenterLayer = cc.Layer.extend({

    _clickParticle:null,
    _uiNode:{
        bg:null,
        bottom:null,
        top:null,
        center:null,
    },
    left_item:[],
    left_nodes:[],
    info_nodes:[],
    tanjiu_nodes:[],
    qianqi_nodes:[],
    info_items:[],
    tanjiu_items:[],
    qianqi_items:[],

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
        cc.log("个人中心");
        this._super();

        // var title = cc.LabelTTF.create("个人中心", "Arial", 80);
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

        var bgSp = cc.Sprite.create(g_res.img.sce_myc_bg);
        bgSp.setPosition(this._uiNode.bg.getContentSize().width / 2 , this._uiNode.bg.getContentSize().height / 2);
        this._uiNode.bg.addChild(bgSp);


        this._uiNode.center = AutoFitNode.create(scaleMode.FitIn);
        this.addChild(this._uiNode.center);
        this._uiNode.center.setContentSize(937, 570);
        this._uiNode.center.setAnchorPoint(0.5, 0.5);
        this._uiNode.center.setPosition(this.getContentSize().width / 2 + 80, this.getContentSize().height / 2 - 80);

        var box = cc.Sprite.create(g_res.img.sce_myc_center_bg);
        box.setPosition(this._uiNode.center.getContentSize().width / 2, this._uiNode.center.getContentSize().height / 2);
        this._uiNode.center.addChild(box);

        var leftMenu = cc.Menu.create();
        leftMenu.setPosition(0,0);
        leftMenu.setZOrder(100);
        this._uiNode.center.addChild(leftMenu);
        for (var i = g_res.img.sce_myc_left.length - 1; i >= 0; i--) {
            var spNormal = cc.Sprite.create(g_res.img.sce_myc_left[i]);
            var spSelected = cc.Sprite.create(g_res.img.sce_myc_left_[i]);
            var spDisabled = cc.Sprite.create(g_res.img.sce_myc_left_[i]);
            var item = cc.MenuItemSprite.create(spNormal, spSelected, spDisabled, this.onLeftBtnCallback, this);
            item.setTag(i);
            leftMenu.addChild(item);
            item.setAnchorPoint(0.5, 1);
            item.setPosition(0, this._uiNode.center.getContentSize().height - (30 + i * (item.getContentSize().height + 20)));
            this.left_item[i] = item;
            if (i == 0) {
                item.setEnabled(false);
            }

            // var node = cc.Node.create();
            // node.setContentSize(box.getContentSize());
            // box.addChild(node);

            var sp = cc.Sprite.create(g_res.img.sce_myc_center_bg);
            sp.setPosition(this._uiNode.center.getContentSize().width / 2, this._uiNode.center.getContentSize().height / 2);
            this._uiNode.center.addChild(sp);
            if (i != 0) {
                sp.setVisible(false);
            }

            this.left_nodes[i] = sp;
        }


        //info
        var infoMenu = cc.Menu.create();
        infoMenu.setPosition(0,0);
        infoMenu.setZOrder(-1);
        this.left_nodes[0].addChild(infoMenu);
        var info_temp = ["主页", "信息", "物品", "好友"];
        for (var i = g_res.img.sce_myc_info_top.length - 1; i >= 0; i--) {
            var node = cc.Node.create();
            node.setContentSize(755, 485);
            this.left_nodes[0].addChild(node);
            node.setPosition(140, 45);
            var name = cc.LabelTTF.create(info_temp[i], "Arial", 40);
            name.setAnchorPoint(0.5, 0.5);
            name.setColor(cc.c3b(255, 0, 0));
            node.addChild(name);
            name.setPosition(node.getContentSize().width / 2, node.getContentSize().height / 2);
            if (i != 0) {
                node.setVisible(false);
            }

            var spNormal = cc.Sprite.create(g_res.img.sce_myc_info_top[i]);
            var spSelected = cc.Sprite.create(g_res.img.sce_myc_info_top_[i]);
            var spDisabled = cc.Sprite.create(g_res.img.sce_myc_info_top_[i]);
            spDisabled.setPosition(0, 15);
            var item = cc.MenuItemSprite.create(spNormal, spSelected, spDisabled, this.onInfoBtnCallback, this);
            item.setTag(i);
            infoMenu.addChild(item);
            item.setAnchorPoint(0, 0.7);
            item.setPosition(115 + i * item.getContentSize().width + 10, this.left_nodes[0].getContentSize().height);
            if (i == 0) {
                item.setEnabled(false);
            }
            this.info_items[i] = item;
            this.info_nodes[i] = node;
        }

        //tanjiu
        var tanjiuMenu = cc.Menu.create();
        tanjiuMenu.setPosition(0,0);
        tanjiuMenu.setZOrder(-1);
        this.left_nodes[1].addChild(tanjiuMenu);
        var tanjiu_temp = ["我的称号", "答题记录", "订正错题", "礼物兑换", "我的成绩单"];
        for (var i = g_res.img.sce_myc_tanjiu_top.length - 1; i >= 0; i--) {
            var node = cc.Node.create();
            node.setContentSize(755, 485);
            this.left_nodes[1].addChild(node);
            node.setPosition(140, 45);
            var name = cc.LabelTTF.create(tanjiu_temp[i], "Arial", 40);
            name.setAnchorPoint(0.5, 0.5);
            name.setColor(cc.c3b(255, 0, 0));
            node.addChild(name);
            name.setPosition(node.getContentSize().width / 2, node.getContentSize().height / 2);
            if (i != 0) {
                node.setVisible(false);
            }

            var spNormal = cc.Sprite.create(g_res.img.sce_myc_tanjiu_top[i]);
            var spSelected = cc.Sprite.create(g_res.img.sce_myc_tanjiu_top_[i]);
            var spDisabled = cc.Sprite.create(g_res.img.sce_myc_tanjiu_top_[i]);
            spDisabled.setPosition(0, 15);
            var item = cc.MenuItemSprite.create(spNormal, spSelected, spDisabled, this.onTanjiuBtnCallback, this);
            item.setTag(i);
            tanjiuMenu.addChild(item);
            item.setAnchorPoint(0, 0.7);
            item.setPosition(48 + i * 158, this.left_nodes[1].getContentSize().height);
            if (i == 0) {
                item.setEnabled(false);
            }
            this.tanjiu_items[i] = item;
            this.tanjiu_nodes[i] = node;
        }

        //qianqi
        var qianqiMenu = cc.Menu.create();
        qianqiMenu.setPosition(0,0);
        qianqiMenu.setZOrder(-1);
        this.left_nodes[2].addChild(qianqiMenu);
        var qianqi_temp = ["我看过的"];
        for (var i = g_res.img.sce_myc_qianqi_top.length - 1; i >= 0; i--) {
            var node = cc.Node.create();
            node.setContentSize(755, 485);
            this.left_nodes[2].addChild(node);
            node.setPosition(140, 45);
            var name = cc.LabelTTF.create(qianqi_temp[i], "Arial", 40);
            name.setAnchorPoint(0.5, 0.5);
            name.setColor(cc.c3b(255, 0, 0));
            node.addChild(name);
            name.setPosition(node.getContentSize().width / 2, node.getContentSize().height / 2);
            if (i != 0) {
                node.setVisible(false);
            }

            var spNormal = cc.Sprite.create(g_res.img.sce_myc_qianqi_top[i]);
            var spSelected = cc.Sprite.create(g_res.img.sce_myc_qianqi_top_[i]);
            var spDisabled = cc.Sprite.create(g_res.img.sce_myc_qianqi_top_[i]);
            spDisabled.setPosition(0, 15);
            var item = cc.MenuItemSprite.create(spNormal, spSelected, spDisabled, this.onQianqiBtnCallback, this);
            item.setTag(i);
            qianqiMenu.addChild(item);
            item.setAnchorPoint(0, 0.7);
            item.setPosition(115 + i * 158, this.left_nodes[2].getContentSize().height);
            if (i == 0) {
                item.setEnabled(false);
            }
            this.qianqi_items[i] = item;
            this.qianqi_nodes[i] = node;
        }

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


        this._uiNode.top = AutoFitNode.create(scaleMode.FitIn);
        this.addChild(this._uiNode.top);
        this._uiNode.top.setContentSize(default_winSize.width, 107);
        this._uiNode.top.setAnchorPoint(0.5, 1);
        this._uiNode.top.setPosition(this.getContentSize().width / 2, this.getContentSize().height);

        var topBg = cc.Sprite.create(g_res.img.gen_title_bg);
        this._uiNode.top.addChild(topBg);
        topBg.setAnchorPoint(0.5, 1);
        topBg.setPosition(this._uiNode.top.getContentSize().width / 2, this._uiNode.top.getContentSize().height);

        var title = cc.Sprite.create(g_res.img.sce_myc_title);
        topBg.addChild(title);
        title.setPosition(topBg.getContentSize().width / 2, topBg.getContentSize().height / 2 + 5);


        this._clickParticle = cc.ParticleSystem.create(g_res.plist.click);
        this.addChild(this._clickParticle);
        this._clickParticle.stopSystem();
    },

    onTouchBegan: function (touch, event) {
        cc.log("个人中心:touch");
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

    onLeftBtnCallback:function(sender){
        var tag = sender.getTag();
        for (var i = this.left_item.length - 1; i >= 0; i--) {
            this.left_item[i].setEnabled(true);
        }
        this.left_item[tag].setEnabled(false);

        for (var i = this.left_nodes.length - 1; i >= 0; i--) {
            this.left_nodes[i].setVisible(false);
        }
        this.left_nodes[tag].setVisible(true);
    },


    onInfoBtnCallback:function(sender){
        var tag = sender.getTag();
        for (var i = this.info_items.length - 1; i >= 0; i--) {
            this.info_items[i].setEnabled(true);
        }
        this.info_items[tag].setEnabled(false);

        for (var i = this.info_nodes.length - 1; i >= 0; i--) {
            this.info_nodes[i].setVisible(false);
        }
        this.info_nodes[tag].setVisible(true);
    },

    onTanjiuBtnCallback:function(sender){
        var tag = sender.getTag();
        for (var i = this.tanjiu_items.length - 1; i >= 0; i--) {
            this.tanjiu_items[i].setEnabled(true);
        }
        this.tanjiu_items[tag].setEnabled(false);

        for (var i = this.tanjiu_nodes.length - 1; i >= 0; i--) {
            this.tanjiu_nodes[i].setVisible(false);
        }
        this.tanjiu_nodes[tag].setVisible(true);
    },

    onQianqiBtnCallback:function(sender){
        var tag = sender.getTag();
        for (var i = this.qianqi_items.length - 1; i >= 0; i--) {
            this.qianqi_items[i].setEnabled(true);
        }
        this.qianqi_items[tag].setEnabled(false);

        for (var i = this.qianqi_nodes.length - 1; i >= 0; i--) {
            this.qianqi_nodes[i].setVisible(false);
        }
        this.qianqi_nodes[tag].setVisible(true);
    },
});

var MyCenterScene = cc.Scene.extend({
    ctor:function() {
        this._super();
        cc.associateWithNative( this, cc.Scene );
    },

    onEnter:function () {
        this._super();
        var layer = new MyCenterLayer();
        this.addChild(layer);
        layer.init();
    }
});