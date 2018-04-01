var EmailLayer = cc.Layer.extend({

    _clickParticle:null,
    _uiNode:{
        bg:null,
        bottom:null,
        top:null,
        center:null,
    },
    _mailData:[
    {title:"title1", content:"111111111111111111111111111111111", state:0/* 0 未读 1已读未领取 2已读已领取*/},
    {title:"title2", content:"222222222222222222222222222222222222", state:0/* 0 未读 1已读未领取 2已读已领取*/},
    {title:"title3", content:"3333333333333333333333333333333333333333", state:0/* 0 未读 1已读未领取 2已读已领取*/},
    {title:"title4", content:"44444444444444444444444444444444", state:0/* 0 未读 1已读未领取 2已读已领取*/},
    {title:"title5", content:"55555555555555555555555", state:0/* 0 未读 1已读未领取 2已读已领取*/},
    {title:"title6", content:"66666666666666666666666666", state:0/* 0 未读 1已读未领取 2已读已领取*/},
    {title:"title7", content:"77777777777777777777777777777", state:0/* 0 未读 1已读未领取 2已读已领取*/},
    {title:"title8", content:"888888888888888888888888888888888888888888888888888888888888888888888", state:0/* 0 未读 1已读未领取 2已读已领取*/},
    {title:"title9", content:"9999999999999999999999999999999999999999999999999", state:0/* 0 未读 1已读未领取 2已读已领取*/},
    ],
    _right_scroll:[],


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
        cc.log("邮箱");
        this._super();

        // var title = cc.LabelTTF.create("邮箱", "Arial", 80);
        // this.addChild(title);
        // title.setPosition(this.getContentSize().width / 2 , this.getContentSize().height / 2);

        // var back_spNormal = cc.Sprite.create(g_res.img.gen_back);
        // var back_spSelected = cc.Sprite.create(g_res.img.gen_back_);
        // var back_item = cc.MenuItemSprite.create(back_spNormal, back_spSelected,  function() {
        //     // g_director.replaceScene(new g_preScene());
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

        var bgSp = cc.Sprite.create(g_res.img.sce_mail_bg);
        bgSp.setPosition(this._uiNode.bg.getContentSize().width / 2 , this._uiNode.bg.getContentSize().height / 2);
        this._uiNode.bg.addChild(bgSp);

        this._uiNode.center = AutoFitNode.create(scaleMode.FitIn);
        this.addChild(this._uiNode.center);
        this._uiNode.center.setContentSize(940, 577);
        this._uiNode.center.setAnchorPoint(0.5, 0.5);
        this._uiNode.center.setPosition(this.getContentSize().width / 2, this.getContentSize().height / 2 - 20);

        var left_bg_0 = cc.Sprite.create(g_res.img.sce_mail_left_bg_0);
        left_bg_0.setAnchorPoint(0, 0);
        this._uiNode.center.addChild(left_bg_0);

        var left_bg_1 = cc.Sprite.create(g_res.img.sce_mail_left_bg_1);
        left_bg_1.setAnchorPoint(0.5, 0.5);
        left_bg_0.addChild(left_bg_1);
        left_bg_1.setPosition(left_bg_0.getContentSize().width / 2, left_bg_0.getContentSize().height / 2);

        var left_model = cc.Sprite.create(g_res.img.sce_mail_mail_bg_1);
        var contentLayer = cc.Layer.create();
        contentLayer.setContentSize(left_bg_1.getContentSize().width, (left_model.getContentSize().height + 5) * this._mailData.length + 20);
        var mailMenu = cc.Menu.create();
        mailMenu.setPosition(0,0);
        contentLayer.addChild(mailMenu);
        for (var i = this._mailData.length - 1; i >= 0; i--) {

            var item;
            if (this._mailData[i].state == 1 || this._mailData[i].state == 2) {
                item = cc.MenuItemImage.create(g_res.img.sce_mail_mail_bg_0, g_res.img.sce_mail_mail_bg_0, function(sender){
                    var tag = sender.getTag();
                    for (var i = this._right_scroll.length - 1; i >= 0; i--) {
                        this._right_scroll[i].setVisible(false);
                    }
                    this._right_scroll[tag].setVisible(true);
            }, this);
            }else {
                item = cc.MenuItemImage.create(g_res.img.sce_mail_mail_bg_1, g_res.img.sce_mail_mail_bg_1, function(sender){
                    var tag = sender.getTag();
                    sender.setNormalSpriteFrame(cc.SpriteFrame.create(g_res.img.sce_mail_mail_bg_0, cc.rect(0,0,231,77)));
                    sender.setSelectedSpriteFrame(cc.SpriteFrame.create(g_res.img.sce_mail_mail_bg_0, cc.rect(0,0,231,77)));

                    var title = cc.LabelTTF.create(this._mailData[tag].title, "Arial", 40);
                    title.setColor(cc.c3b(0,0,0));
                    sender.addChild(title);
                    title.setPosition(sender.getContentSize().width / 2, sender.getContentSize().height / 2);

                    for (var i = this._right_scroll.length - 1; i >= 0; i--) {
                        this._right_scroll[i].setVisible(false);
                    }
                    this._right_scroll[tag].setVisible(true);
                }, this);
            }

            mailMenu.addChild(item);
            item.setAnchorPoint(0.5, 0.5);
            item.setPosition(contentLayer.getContentSize().width / 2, contentLayer.getContentSize().height - 10 - (left_model.getContentSize().height / 2 + (left_model.getContentSize().height + 5) * i));
            item.setTag(i);

            var title = cc.LabelTTF.create(this._mailData[i].title, "Arial", 40);
            title.setColor(cc.c3b(0,0,0));
            item.addChild(title);
            title.setPosition(item.getContentSize().width / 2, item.getContentSize().height / 2);
        }

        var scrollView = cc.ScrollView.create(left_bg_1.getContentSize(), contentLayer);
        scrollView.setBounceable(true);
        scrollView.setTouchEnabled(true);
        scrollView.setDirection(ccs.ScrollViewDir.vertical);
        left_bg_1.addChild(scrollView);
        scrollView.setTouchPriority(cc.MENU_HANDLER_PRIORITY - 1);
        scrollView.setContentOffset(cc.p(0, scrollView.getViewSize().height - contentLayer.getContentSize().height));

        var right_bg = cc.Sprite.create(g_res.img.sce_mail_right_bg);
        right_bg.setAnchorPoint(1, 0);
        this._uiNode.center.addChild(right_bg);
        right_bg.setPosition(this._uiNode.center.getContentSize().width, 0);

        for (var i = this._mailData.length - 1; i >= 0; i--) {
            var title = cc.LabelTTF.create(this._mailData[i].title, "Arial", 45);
            title.setColor(cc.c3b(0,0,0));
            var content = cc.LabelTTF.create(this._mailData[i].content, "Arial", 38, cc.size(540, 0), cc.TEXT_ALIGNMENT_LEFT);
            content.setColor(cc.c3b(0,0,0));
            var _contentLayer = cc.Layer.create();
            _contentLayer.setContentSize(540, title.getContentSize().height + 5 + content.getContentSize().height);
            _contentLayer.addChild(title);
            title.setAnchorPoint(0.5, 1);
            title.setPosition(_contentLayer.getContentSize().width / 2, _contentLayer.getContentSize().height);
            _contentLayer.addChild(content);
            content.setAnchorPoint(0.5, 1);
            content.setPosition(_contentLayer.getContentSize().width / 2, _contentLayer.getContentSize().height - title.getContentSize().height - 5);

            var scrollView = cc.ScrollView.create(cc.size(540, 375), _contentLayer);
            scrollView.setBounceable(true);
            scrollView.setTouchEnabled(true);
            scrollView.setDirection(ccs.ScrollViewDir.vertical);
            right_bg.addChild(scrollView);
            // scrollView.setTouchPriority(cc.MENU_HANDLER_PRIORITY - 1);
            scrollView.setContentOffset(cc.p(0, scrollView.getViewSize().height - _contentLayer.getContentSize().height));
            scrollView.setPosition(40, 180);
            scrollView.setVisible(false);
            this._right_scroll[i] = scrollView;
        }
        var getMenu = cc.Menu.create();
        getMenu.setPosition(0,0);
        right_bg.addChild(getMenu);

        btn_del = cc.MenuItemImage.create(g_res.img.sce_mail_btn_del, g_res.img.sce_mail_btn_del_, function(sender){

        }, this);
        getMenu.addChild(btn_del);
        btn_del.setPosition(200, 0);

        btn_get = cc.MenuItemImage.create(g_res.img.sce_mail_btn_get, g_res.img.sce_mail_btn_get_, function(sender){

        }, this);
        getMenu.addChild(btn_get);
        btn_get.setPosition(right_bg.getContentSize().width - 200, 0);





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

        var title = cc.Sprite.create(g_res.img.sce_mail_title);
        topBg.addChild(title);
        title.setPosition(topBg.getContentSize().width / 2, topBg.getContentSize().height / 2 + 5);

        this._clickParticle = cc.ParticleSystem.create(g_res.plist.click);
        this.addChild(this._clickParticle);
        this._clickParticle.stopSystem();
    },

    onTouchBegan: function (touch, event) {
        cc.log("邮箱:touch");
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

var EmailScene = cc.Scene.extend({
    ctor:function() {
        this._super();
        cc.associateWithNative( this, cc.Scene );
    },

    onEnter:function () {
        this._super();
        var layer = new EmailLayer();
        this.addChild(layer);
        layer.init();
    }
});