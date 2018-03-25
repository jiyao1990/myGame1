var SignInLayer = cc.Layer.extend({

    _uiNode:{
        bg:null,
        left:null,
        top:null,
        bottom:null,
        right:null,
        center:null,
    },

    ctor:function() {
        this._super();
        cc.associateWithNative( this, cc.Layer );
    },

    init:function () {
        cc.log("签到");
        this._super();

        // var title = cc.LabelTTF.create("签到", "Arial", 80);
        // this.addChild(title);
        // title.setPosition(this.getContentSize().width / 2 , this.getContentSize().height / 2);

        // var back_spNormal = cc.Sprite.create("res/scenes/mainScene/back.png");
        // var back_spSelected = cc.Sprite.create("res/scenes/mainScene/back_.png");
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

        var bgSp = cc.Sprite.create("res/scenes/signInScene/bg.png");
        bgSp.setPosition(this._uiNode.bg.getContentSize().width / 2 , this._uiNode.bg.getContentSize().height / 2);
        this._uiNode.bg.addChild(bgSp);

        for (var i = 30; i >= 0; i--) {

            

            var item = cc.Sprite.create(g_itemData[randomNum(0,15)].path);
            bgSp.addChild(item);
            item.setPosition(145 + i % 8 * (121), bgSp.getContentSize().height - 220 - Math.floor(i/8) * (121));
            var hRatio = (121 - 20) / item.getContentSize().height;
            var wRatio = (121 - 20) / item.getContentSize().width;
            var scale = hRatio > wRatio ? wRatio : hRatio;
            item.setScale(scale);

            var label = cc.LabelAtlas.create((i + 1).toString(), "res/scenes/signInScene/num.png", 30, 29, '0');
            bgSp.addChild(label);
            label.setAnchorPoint(0, 1);
            label.setPosition(100 + i % 8 * (121), bgSp.getContentSize().height - 175 - Math.floor(i/8) * (121));

        }


        this._uiNode.left = AutoFitNode.create(scaleMode.FitIn);
        this.addChild(this._uiNode.left);
        this._uiNode.left.setContentSize(320, 120);
        this._uiNode.left.setAnchorPoint(0, 1);
        this._uiNode.left.setPosition(0, this.getContentSize().height);

        var buy_spNormal = cc.Sprite.create("res/scenes/signInScene/btn_buy.png");
        var buy_spSelected = cc.Sprite.create("res/scenes/signInScene/btn_buy_.png");
        var buy_item = cc.MenuItemSprite.create(buy_spNormal, buy_spSelected,  function() {

        }, this);
        buy_item.setAnchorPoint(0, 0);
        buy_item.setPosition(0, 0);

        var leftMenu = cc.Menu.create(buy_item);
        leftMenu.setPosition(0, 0);
        this._uiNode.left.addChild(leftMenu);


        this._uiNode.bottom = AutoFitNode.create(scaleMode.FitIn);
        this.addChild(this._uiNode.bottom);
        this._uiNode.bottom.setContentSize(160, 160);
        this._uiNode.bottom.setAnchorPoint(0, 0);
        this._uiNode.bottom.setPosition(0, 0);

        var back_spNormal = cc.Sprite.create("res/scenes/mainScene/back.png");
        var back_spSelected = cc.Sprite.create("res/scenes/mainScene/back_.png");
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
        this._uiNode.top.setContentSize(default_winSize.width, 160);
        this._uiNode.top.setAnchorPoint(0.5, 1);
        this._uiNode.top.setPosition(this.getContentSize().width / 2, this.getContentSize().height);

        var topBg = cc.Sprite.create("res/scenes/mainScene/top.png");
        this._uiNode.top.addChild(topBg);
        topBg.setAnchorPoint(0.5, 1);
        topBg.setPosition(this._uiNode.top.getContentSize().width / 2, this._uiNode.top.getContentSize().height);

        var title = cc.Sprite.create("res/scenes/signInScene/title.png");
        topBg.addChild(title);
        title.setPosition(topBg.getContentSize().width / 2, topBg.getContentSize().height / 2);


        this._uiNode.right = AutoFitNode.create(scaleMode.FitIn);
        this.addChild(this._uiNode.right);
        this._uiNode.right.setContentSize(320, 120);
        this._uiNode.right.setAnchorPoint(1, 0);
        this._uiNode.right.setPosition(this.getContentSize().width, 0);


        var btn_buqianNormal = cc.Sprite.create("res/scenes/signInScene/btn_buqian.png");

        var ttf_douNum0 = cc.LabelTTF.create("999", "Arial", 40);
        ttf_douNum0.setAnchorPoint(0.5, 0);
        ttf_douNum0.setColor(cc.c3b(0, 0, 0));
        btn_buqianNormal.addChild(ttf_douNum0);
        ttf_douNum0.setPosition(235, 35);

        var btn_buqianSelected = cc.Sprite.create("res/scenes/signInScene/btn_buqian_.png");
        var ttf_douNum1 = cc.LabelTTF.create("999", "Arial", 40);
        ttf_douNum1.setAnchorPoint(0.5, 0);
        ttf_douNum1.setColor(cc.c3b(0, 0, 0));
        btn_buqianSelected.addChild(ttf_douNum1);
        ttf_douNum1.setPosition(235, 35);


        var btn_buqianItem = cc.MenuItemSprite.create(btn_buqianNormal, btn_buqianSelected,  function() {

            this._gift_close.runAction(cc.Sequence.create(cc.FadeOut.create(0.5), cc.Hide.create()));
            this._gift_open.runAction(cc.Sequence.create(cc.DelayTime.create(0.5), cc.Show.create(), cc.FadeIn.create(0.5), 
                cc.CallFunc.create(
                    function(){

                    },
                    this)));

        }, this);
        btn_buqianItem.setAnchorPoint(0, 0);
        btn_buqianItem.setPosition(0, 0);

        var rightMenu = cc.Menu.create(btn_buqianItem);
        rightMenu.setPosition(0, 0);
        this._uiNode.right.addChild(rightMenu);


        var text_tips = cc.Sprite.create("res/scenes/signInScene/text_tips.png");
        text_tips.setScale(fitScaleIn);
        text_tips.setAnchorPoint(0.5, 0);
        text_tips.setPosition(this.getContentSize().width / 2, 20);
        this.addChild(text_tips);

        var text_time = cc.Sprite.create("res/scenes/signInScene/text_time.png");
        text_time.setScale(fitScaleIn);
        text_time.setAnchorPoint(1, 1);
        text_time.setPosition(this.getContentSize().width - 20, this.getContentSize().height - 20);
        this.addChild(text_time);

    },
});

var SignInScene = cc.Scene.extend({
    ctor:function() {
        this._super();
        cc.associateWithNative( this, cc.Scene );
    },

    onEnter:function () {
        this._super();
        var layer = new SignInLayer();
        this.addChild(layer);
        layer.init();
    }
});