var JackpotLayer = cc.Layer.extend({

    _uiNode:{
        bg:null,
        left:null,
        top:null,
        bottom:null,
        center:null,
    },

    _gift_close:null,
    _gift_open:null,


    ctor:function() {
        this._super();
        cc.associateWithNative( this, cc.Layer );
    },

    init:function () {
        cc.log("神秘奖池");
        this._super();

        // var title = cc.LabelTTF.create("神秘奖池", "Arial", 80);
        // this.addChild(title);
        // title.setPosition(this.getContentSize().width / 2 , this.getContentSize().height / 2);

        // var back_spNormal = cc.Sprite.create("res/scenes/mainScene/back.png");
        // var back_spSelected = cc.Sprite.create("res/scenes/mainScene/back_.png");
        // var back_item = cc.MenuItemSprite.create(back_spNormal, back_spSelected,  function() {
        //     g_director.replaceScene(new g_preScene());
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

        var bgSp = cc.Sprite.create("res/scenes/jackpotScene/bg.png");
        bgSp.setPosition(this._uiNode.bg.getContentSize().width / 2 , this._uiNode.bg.getContentSize().height / 2);
        this._uiNode.bg.addChild(bgSp);

        var bgSp1 = cc.Sprite.create("res/scenes/jackpotScene/bg_0.png");
        bgSp1.setAnchorPoint(0.5, 1);
        bgSp1.setPosition(this._uiNode.bg.getContentSize().width / 2 , this._uiNode.bg.getContentSize().height - 40);
        this._uiNode.bg.addChild(bgSp1);

        this._uiNode.left = AutoFitNode.create(scaleMode.FitIn);
        this.addChild(this._uiNode.left);
        this._uiNode.left.setContentSize(160, 340);
        this._uiNode.left.setAnchorPoint(0, 0);
        this._uiNode.left.setPosition(0, 0);

        var back_spNormal = cc.Sprite.create("res/scenes/mainScene/back.png");
        var back_spSelected = cc.Sprite.create("res/scenes/mainScene/back_.png");
        var back_item = cc.MenuItemSprite.create(back_spNormal, back_spSelected,  function() {
            g_director.replaceScene(new (g_ScenesQ.pop())());
        }, this);
        back_item.setAnchorPoint(0, 0);
        back_item.setPosition(0, 0);

        var myCenter_spNormal = cc.Sprite.create("res/scenes/myHouseScene/left_0.png");
        var myCenter_spSelected = cc.Sprite.create("res/scenes/myHouseScene/left_0_.png");
        var myCenter_item = cc.MenuItemSprite.create(myCenter_spNormal, myCenter_spSelected,  function() {
            // g_preScene = JackpotScene;
            g_ScenesQ.push(JackpotScene);
            var newScene = new MyCenterScene();
            g_director.replaceScene(newScene);
        }, this);
        myCenter_item.setAnchorPoint(0, 0);
        myCenter_item.setPosition(0, back_item.getContentSize().height + 20);

        var leftMenu = cc.Menu.create(back_item, myCenter_item);
        leftMenu.setPosition(0, 0);
        this._uiNode.left.addChild(leftMenu);

        this._uiNode.center = AutoFitNode.create(scaleMode.FitIn);
        this.addChild(this._uiNode.center);
        this._uiNode.center.setContentSize(794, 622);
        this._uiNode.center.setAnchorPoint(0.5, 0.5);
        this._uiNode.center.setPosition(this.getContentSize().width / 2, this.getContentSize().height / 2);

        var bg_1 = cc.Sprite.create("res/scenes/jackpotScene/bg_1.png");
        bg_1.setAnchorPoint(0.5, 0.5);
        bg_1.setPosition(this._uiNode.center.getContentSize().width / 2 , this._uiNode.center.getContentSize().height / 2);
        this._uiNode.center.addChild(bg_1);

        this._gift_close = cc.Sprite.create("res/scenes/jackpotScene/gift_close.png");
        this._gift_close.setAnchorPoint(0.5, 0.5);
        this._gift_close.setPosition(bg_1.getContentSize().width / 2 , bg_1.getContentSize().height / 2);
        bg_1.addChild(this._gift_close);

        this._gift_open = cc.Sprite.create("res/scenes/jackpotScene/gift_open.png");
        this._gift_open.setAnchorPoint(0.5, 0.5);
        this._gift_open.setPosition(bg_1.getContentSize().width / 2 , bg_1.getContentSize().height / 2);
        bg_1.addChild(this._gift_open);
        this._gift_open.setVisible(false);


        this._uiNode.bottom = AutoFitNode.create(scaleMode.FitIn);
        this.addChild(this._uiNode.bottom);
        this._uiNode.bottom.setContentSize(630, 170);
        this._uiNode.bottom.setAnchorPoint(0.5, 0);
        this._uiNode.bottom.setPosition(this.getContentSize().width / 2, 0);

        var btn_getNormal = cc.Sprite.create("res/scenes/jackpotScene/btn_get.png");

        var ttf_douNum0 = cc.LabelTTF.create("10", "Arial", 40);
        ttf_douNum0.setAnchorPoint(0.5, 0);
        ttf_douNum0.setColor(cc.c3b(251, 101, 32));
        btn_getNormal.addChild(ttf_douNum0);
        ttf_douNum0.setPosition(140, 35);

        var btn_getSelected = cc.Sprite.create("res/scenes/jackpotScene/btn_get_.png");
        var ttf_douNum1 = cc.LabelTTF.create("10", "Arial", 40);
        ttf_douNum1.setAnchorPoint(0.5, 0);
        ttf_douNum1.setColor(cc.c3b(251, 101, 32));
        btn_getSelected.addChild(ttf_douNum1);
        ttf_douNum1.setPosition(140, 35);


        var btn_getItem = cc.MenuItemSprite.create(btn_getNormal, btn_getSelected,  function() {

            this._gift_close.runAction(cc.Sequence.create(cc.FadeOut.create(0.5), cc.Hide.create()));
            this._gift_open.runAction(cc.Sequence.create(cc.DelayTime.create(0.5), cc.Show.create(), cc.FadeIn.create(0.5), 
                cc.CallFunc.create(
                    function(){
                        var dialog = new Dialog();
                        cc.log("randomNum(0,15): " + randomNum(0,15));
                        dialog.init(DialogType.getItem, randomNum(0,15));
                        this.addChild(dialog);

                        this._gift_close.setOpacity(255);
                        this._gift_close.setVisible(true);

                        this._gift_open.setOpacity(255);
                        this._gift_open.setVisible(false);
                    },
                    this)));

        }, this);
        btn_getItem.setAnchorPoint(0, 0);
        btn_getItem.setPosition(0, 0);

        var btn_get10Normal = cc.Sprite.create("res/scenes/jackpotScene/btn_get10.png");
        var ttf10_douNum0 = cc.LabelTTF.create("95", "Arial", 40);
        ttf10_douNum0.setAnchorPoint(0.5, 0);
        ttf10_douNum0.setColor(cc.c3b(251, 101, 32));
        btn_get10Normal.addChild(ttf10_douNum0);
        ttf10_douNum0.setPosition(140, 35);

        var btn_get10Selected = cc.Sprite.create("res/scenes/jackpotScene/btn_get10_.png");
        var ttf10_douNum1 = cc.LabelTTF.create("95", "Arial", 40);
        ttf10_douNum1.setAnchorPoint(0.5, 0);
        ttf10_douNum1.setColor(cc.c3b(251, 101, 32));
        btn_get10Selected.addChild(ttf10_douNum1);
        ttf10_douNum1.setPosition(140, 35);

        var btn_get10Item = cc.MenuItemSprite.create(btn_get10Normal, btn_get10Selected,  function() {
            this._gift_close.runAction(cc.Sequence.create(cc.FadeOut.create(0.5), cc.Hide.create()));
            this._gift_open.runAction(cc.Sequence.create(cc.DelayTime.create(0.5), cc.Show.create(), cc.FadeIn.create(0.5), 
                cc.CallFunc.create(
                    function(){
                        var dialog = new Dialog();
                        // cc.log("randomNum(0,15): " + randomNum(0,15));
                        var data = [];
                        for (var i = 0; i < 10; i++) {
                            var type = randomNum(0,15);
                            data.push(type);
                            for (var j = 0; j < data.length - 1; j++) {
                                if (data[j] == type) {
                                    cc.log("type:" + type + " data.length:" + data.length);
                                    data.pop();
                                    i --;
                                }
                            }
                        }
                        cc.log("data.length:" + data.length);
                        dialog.init(DialogType.getItem10, data);
                        this.addChild(dialog);

                        this._gift_close.setOpacity(255);
                        this._gift_close.setVisible(true);

                        this._gift_open.setOpacity(255);
                        this._gift_open.setVisible(false);
                    },
                    this)));
        }, this);
        btn_get10Item.setAnchorPoint(1, 0);
        btn_get10Item.setPosition(this._uiNode.bottom.getContentSize().width, 0);

        var bottomMenu = cc.Menu.create(btn_getItem, btn_get10Item);
        bottomMenu.setPosition(0, 0);
        this._uiNode.bottom.addChild(bottomMenu);


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

        this._douNumLabel = cc.LabelTTF.create(g_douNum, "Arial", 40);
        topBg.addChild(this._douNumLabel);
        this._douNumLabel.setPosition(278, 65);
    },
});

var JackpotScene = cc.Scene.extend({
    ctor:function() {
        this._super();
        cc.associateWithNative( this, cc.Scene );
    },

    onEnter:function () {
        this._super();
        var layer = new JackpotLayer();
        this.addChild(layer);
        layer.init();
    }
});