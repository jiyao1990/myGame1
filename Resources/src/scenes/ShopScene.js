var ShopLayer = cc.Layer.extend({

    _uiNode:{
        bg:null,
        top:null,
        center:null,

    },
    _douNumLabel:null,

    ctor:function() {
        this._super();
        cc.associateWithNative( this, cc.Layer );
    },

    init:function () {
        cc.log("道具商店");
        this._super();

        this._uiNode.bg = AutoFitNode.create(scaleMode.FitOut);
        this.addChild(this._uiNode.bg);
        this._uiNode.bg.setPosition(this.getContentSize().width / 2, this.getContentSize().height / 2);

        var bgSp = cc.Sprite.create("res/scenes/mainScene/bg.png");
        this._uiNode.bg.addChild(bgSp);

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

        this._uiNode.bottom = AutoFitNode.create(scaleMode.FitIn);
        this.addChild(this._uiNode.bottom);
        this._uiNode.bottom.setContentSize(default_winSize.width, 160);
        this._uiNode.bottom.setAnchorPoint(0.5, 0);
        this._uiNode.bottom.setPosition(this.getContentSize().width / 2, 0);

        this._uiNode.center = AutoFitNode.create(scaleMode.FitIn);
        this.addChild(this._uiNode.center);
        this._uiNode.center.setContentSize(802, 461);
        this._uiNode.center.setAnchorPoint(0.5, 0.5);
        this._uiNode.center.setPosition(this.getContentSize().width / 2, this.getContentSize().height / 2);

        var centerBg = cc.Sprite.create("res/dialog/dialog_bg.png");
        this._uiNode.center.addChild(centerBg);
        centerBg.setPosition(this._uiNode.center.getContentSize().width / 2, this._uiNode.center.getContentSize().height / 2);


        var title = cc.LabelTTF.create("道具商店", "Arial", 80);
        this.addChild(title);
        title.setPosition(this.getContentSize().width / 2 , this.getContentSize().height / 2);

        var back_spNormal = cc.Sprite.create("res/scenes/mainScene/back.png");
        var back_spSelected = cc.Sprite.create("res/scenes/mainScene/back_.png");
        var back_item = cc.MenuItemSprite.create(back_spNormal, back_spSelected,  function() {
            g_director.replaceScene(new (g_ScenesQ.pop())());
        }, this);
        var leftMenu = cc.Menu.create(back_item);
        leftMenu.setPosition(0, 0);
        back_item.setAnchorPoint(0, 0);
        back_item.setPosition(0, 0);
        this.addChild(leftMenu);
    },
});

var ShopScene = cc.Scene.extend({
    ctor:function() {
        this._super();
        cc.associateWithNative( this, cc.Scene );
    },

    onEnter:function () {
        this._super();
        var layer = new ShopLayer();
        this.addChild(layer);
        layer.init();
    }
});