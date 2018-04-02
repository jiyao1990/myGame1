var TanJiuLayer = cc.Layer.extend({

    _clickParticle:null,
    _uiNode:{
        bg:null,
        bottom:null,
        top:null,
        center:null,
    },
    _month_state:[
        1,//未全对
        2,//已答题
        0,//开放
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        3,//未开放
    ],

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
        cc.log("探究力大挑战");
        this._super();

        this._uiNode.bg = AutoFitNode.create(scaleMode.FitOut);
        this.addChild(this._uiNode.bg);
        this._uiNode.bg.setContentSize(default_winSize.width, default_winSize.height);
        this._uiNode.bg.setAnchorPoint(0.5, 0.5);
        this._uiNode.bg.setPosition(this.getContentSize().width / 2, this.getContentSize().height / 2);

        var bgSp = cc.Sprite.create(g_res.img.sce_tan_bg);
        bgSp.setPosition(this._uiNode.bg.getContentSize().width / 2 , this._uiNode.bg.getContentSize().height / 2);
        this._uiNode.bg.addChild(bgSp);



        this._uiNode.center = AutoFitNode.create(scaleMode.FitIn);
        this.addChild(this._uiNode.center);
        this._uiNode.center.setContentSize(default_winSize.width, 560);
        this._uiNode.center.setAnchorPoint(0.5, 0);
        this._uiNode.center.setPosition(this.getContentSize().width / 2, 0);

        var role = cc.Sprite.create(g_res.img.gen_role[g_date.getMonth()]);
        this._uiNode.center.addChild(role);
        role.setAnchorPoint(0, 0.5);
        role.setPosition(0, this._uiNode.center.getContentSize().height / 2);
        role.setScale(1.5);

        var centerMenu = cc.Menu.create();
        centerMenu.setPosition(0,0);
        this._uiNode.center.addChild(centerMenu);
        for (var i = 11; i >= 0; i--) {
            cc.log("this._month_state[i]: " + this._month_state[i]);
            var spNormal = cc.Sprite.create(g_res.img.sce_tan_item[this._month_state[i]]);
            var spSelected;
            if (this._month_state[i] == 0) {
                spSelected = cc.Sprite.create(g_res.img.sce_tan_item_);
            }else {
                spSelected = cc.Sprite.create(g_res.img.sce_tan_item[this._month_state[i]]);
            }
            var item = cc.MenuItemSprite.create(spNormal, spSelected, this.onCenterBtnCallback, this);
            item.setTag(i);
            centerMenu.addChild(item);
            item.setAnchorPoint(0, 1);
            item.setPosition(340 + i % 4 * (item.getContentSize().width + 30), this._uiNode.center.getContentSize().height - 20 - Math.floor(i/4) * (item.getContentSize().height + 10));

            var ttf = cc.LabelTTF.create(i + 1, "Arial", 40);
            if (this._month_state[i] == 0) {
                ttf.setColor(cc.c3b(225, 61, 9));
            }else if(this._month_state[i] == 1){
                ttf.setColor(cc.c3b(0, 140, 186));
            }else if(this._month_state[i] == 2){
                ttf.setColor(cc.c3b(0, 140, 76));
            }else if(this._month_state[i] == 3){
                ttf.setColor(cc.c3b(101, 97, 96));
            }
            item.addChild(ttf);
            ttf.setPosition(82, 48);
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

        var title = cc.Sprite.create(g_res.img.sce_tan_title);
        topBg.addChild(title);
        title.setPosition(topBg.getContentSize().width / 2, topBg.getContentSize().height / 2 + 5);

        var ch_bg = cc.Sprite.create(g_res.img.sce_tan_ch_bg);
        this._uiNode.top.addChild(ch_bg);
        ch_bg.setAnchorPoint(0.5, 1);
        ch_bg.setPosition(this._uiNode.top.getContentSize().width / 2, -10);

        var ttf_ch_0 = cc.LabelTTF.create("我现在的称号:", "Arial", 39);
        ttf_ch_0.setAnchorPoint(0, 0.5);
        ttf_ch_0.setColor(cc.c3b(0, 0, 0));
        ch_bg.addChild(ttf_ch_0);
        ttf_ch_0.setPosition(10, ch_bg.getContentSize().height / 2);

        var ttf_ch_1 = cc.LabelTTF.create("探究小粉丝", "Arial", 39);
        ttf_ch_1.setAnchorPoint(0, 0.5);
        ttf_ch_1.setColor(cc.c3b(255, 255, 0));
        ch_bg.addChild(ttf_ch_1);
        ttf_ch_1.setPosition(ttf_ch_0.getContentSize().width + 15, ch_bg.getContentSize().height / 2);

        var earth = cc.Sprite.create(g_res.img.sce_tan_earth);
        ch_bg.addChild(earth);
        earth.setAnchorPoint(1, 0.5);
        earth.setPosition(-5, ch_bg.getContentSize().height / 2);
        






        this._clickParticle = cc.ParticleSystem.create(g_res.plist.click);
        this.addChild(this._clickParticle);
        this._clickParticle.stopSystem();
    },

    onTouchBegan: function (touch, event) {
        cc.log("探究力:touch");
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

    onCenterBtnCallback:function (sender) {
        g_ScenesQ.push(TanJiuScene);
        var newScene = new TanJiu2Scene();
        g_director.replaceScene(newScene);
    }
});

var TanJiuScene = cc.Scene.extend({
    ctor:function() {
        this._super();
        cc.associateWithNative( this, cc.Scene );
    },

    onEnter:function () {
        this._super();
        var layer = new TanJiuLayer();
        this.addChild(layer);
        layer.init();
    }
});