var MainLayer = cc.Layer.extend({
    _uiNode:{
        bg:null,
        left:null,
        top:null,
        bottom:null,
        right:null,

    },
    _douNumLabel:null,
    _isShowUI:true,
    _isUIMoving:false,
    _hideBtn:null,
    _clickParticle:null,
    _live2dSp:null,

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
        cc.log("首页");
        //////////////////////////////
        // 1. super init first
        this._super();

        // this._uiNode.bg = AutoFitNode.create(scaleMode.FitOut);
        // this.addChild(this._uiNode.bg);
        // this._uiNode.bg.setPosition(this.getContentSize().width / 2, this.getContentSize().height / 2);

        // var bgSp = cc.Sprite.create(g_res.img.gen_bg);
        // this._uiNode.bg.addChild(bgSp);

        this._uiNode.bg = AutoFitNode.create(scaleMode.FitOut);
        this.addChild(this._uiNode.bg);
        this._uiNode.bg.setContentSize(default_winSize.width, default_winSize.height);
        this._uiNode.bg.setAnchorPoint(0.5, 0.5);
        this._uiNode.bg.setPosition(this.getContentSize().width / 2, this.getContentSize().height / 2);
        cc.log("width:" + this.getContentSize().width + "   height:" + this.getContentSize().height);

        var bgSp = cc.Sprite.create(g_res.img.gen_bg);
        bgSp.setPosition(this._uiNode.bg.getContentSize().width / 2 , this._uiNode.bg.getContentSize().height / 2);
        this._uiNode.bg.addChild(bgSp);

        g_zbRoom(this._uiNode.bg);

        // var live2dsp = cc.Sprite.createLive2D();
        this._live2dSp = LAppView.create();
        this.addChild(this._live2dSp);

        this._uiNode.left = AutoFitNode.create(scaleMode.FitIn);
        this.addChild(this._uiNode.left);
        this._uiNode.left.setContentSize(170, default_winSize.height);
        this._uiNode.left.setAnchorPoint(0, 1);
        this._uiNode.left.setPosition(0, this.getContentSize().height);

        var leftMenu = cc.Menu.create();
        for (var i = 0; i < g_res.img.sce_mai_left.length; i++) {
            var spNormal = cc.Sprite.create(g_res.img.sce_mai_left[i]);
            var spSelected = cc.Sprite.create(g_res.img.sce_mai_left_[i]);
            var item = cc.MenuItemSprite.create(spNormal, spSelected,  this.onLeftBtnCallback, this);
            item.setTag(i);
            leftMenu.addChild(item);
            item.setPosition(this._uiNode.left.getContentSize().width / 2, this._uiNode.left.getContentSize().height - (item.getContentSize().height / 2 + 10 + i * (item.getContentSize().height + 10)));
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

        this._uiNode.bottom = AutoFitNode.create(scaleMode.FitIn);
        this.addChild(this._uiNode.bottom);
        this._uiNode.bottom.setContentSize(default_winSize.width, 160);
        this._uiNode.bottom.setAnchorPoint(0.5, 0);
        this._uiNode.bottom.setPosition(this.getContentSize().width / 2, 0);

        var bottomMenu = cc.Menu.create();

        

        for (var i = 0; i < 4; i++) {
            var spNormal = cc.Sprite.create(g_res.img.sce_mai_bottom[i]);
            var spSelected = cc.Sprite.create(g_res.img.sce_mai_bottom_[i]);
            var item = cc.MenuItemSprite.create(spNormal, spSelected,  this.onBottomBtnCallback, this);
            item.setTag(i);
            bottomMenu.addChild(item);
            item.setAnchorPoint(0.5, 0);
            var length = this._uiNode.bottom.getContentSize().width - back_item.getContentSize().width;

            item.setPosition(back_item.getContentSize().width + length / 8 + (length / 4) * i, 0);

            if (i == 2) {
                var bottom_2_0 = cc.Sprite.create(g_res.img.sce_mai_bottom_2_0);
                item.addChild(bottom_2_0);
                bottom_2_0.setAnchorPoint(0,0);
                bottom_2_0.setPosition(45, 75);

                var bottom_2_1 = cc.Sprite.create(g_res.img.sce_mai_bottom_2_1);
                item.addChild(bottom_2_1);
                bottom_2_1.setAnchorPoint(0,0);
                bottom_2_1.setPosition(120, 75);
                bottom_2_1.runAction(cc.RepeatForever.create(cc.Sequence.create(cc.MoveBy.create(0.3, cc.p(0, 10)), cc.MoveBy.create(0.3, cc.p(-10, 0)), cc.MoveBy.create(0.3, cc.p(0, -10)), cc.MoveBy.create(0.3, cc.p(10, 0)) )));
            }
        }
        this._uiNode.bottom.addChild(bottomMenu);
        bottomMenu.setPosition(0,0);


        this._uiNode.right = AutoFitNode.create(scaleMode.FitIn);
        this.addChild(this._uiNode.right);
        this._uiNode.right.setContentSize(290, 610);
        this._uiNode.right.setAnchorPoint(1, 1);
        this._uiNode.right.setPosition(this.getContentSize().width, this.getContentSize().height);

        var rightMenu = cc.Menu.create();


        var hide_spNormal = cc.Sprite.create(g_res.img.gen_hide);
        var hide_spSelected = cc.Sprite.create(g_res.img.gen_hide_);
        this._hideBtn = cc.MenuItemSprite.create(hide_spNormal, hide_spSelected,  this.onLasuoBtnCallback, this);
        rightMenu.addChild(this._hideBtn);
        this._hideBtn.setAnchorPoint(1, 0);
        this._hideBtn.setPosition(this._uiNode.right.getContentSize().width - 10, 0);
        // var lasuo_spNormal = cc.Sprite.create("res/scenes/mainScene/lasuo.png");
        // lasuo_spNormal.setPosition(0, 20);
        // var lasuo_spSelected = cc.Sprite.create("res/scenes/mainScene/lasuo.png");
        // var lasuo_item = cc.MenuItemSprite.create(lasuo_spNormal, lasuo_spSelected,  this.onLasuoBtnCallback, this);
        // rightMenu.addChild(lasuo_item);
        // lasuo_item.setAnchorPoint(1, 1);
        // lasuo_item.setPosition(this._uiNode.right.getContentSize().width - lasuo_item.getContentSize().width, this._uiNode.right.getContentSize().height);

        var email_spNormal = cc.Sprite.create(g_res.img.sce_mai_email);
        var email_spSelected = cc.Sprite.create(g_res.img.sce_mai_email_);
        var email_item = cc.MenuItemSprite.create(email_spNormal, email_spSelected,  this.onEmailBtnCallback, this);
        rightMenu.addChild(email_item);
        email_item.setAnchorPoint(1, 1);
        email_item.setPosition(this._uiNode.right.getContentSize().width - 20, this._uiNode.right.getContentSize().height);

        var redDot = cc.Sprite.create(g_res.img.sce_mai_red_dot);
        email_item.addChild(redDot);
        redDot.setPosition(email_item.getContentSize().width - 20, email_item.getContentSize().height - 20);
        redDot.setScale(0.7);
        var mailTTF = cc.LabelTTF.create(g_unreadMail, "Arial", 40);
        redDot.addChild(mailTTF);
        mailTTF.setPosition(redDot.getContentSize().width / 2, redDot.getContentSize().height / 2);
        if (g_unreadMail <= 0) {
            redDot.setVisible(false);
        }

        var parent_spNormal = cc.Sprite.create(g_res.img.sce_mai_parent);
        var parent_spSelected = cc.Sprite.create(g_res.img.sce_mai_parent_);
        var parent_item = cc.MenuItemSprite.create(parent_spNormal, parent_spSelected,  this.onParentBtnCallback, this);
        rightMenu.addChild(parent_item);
        parent_item.setAnchorPoint(1, 1);
        parent_item.setPosition(this._uiNode.right.getContentSize().width - email_item.getContentSize().width - 20, this._uiNode.right.getContentSize().height - 5);

        this._uiNode.right.addChild(rightMenu);
        rightMenu.setPosition(0,0);

        this._clickParticle = cc.ParticleSystem.create(g_res.plist.click);
        this.addChild(this._clickParticle);
        this._clickParticle.stopSystem();

        return true;
    },

    onLeftBtnCallback:function(sender){
        // g_preScene = MainScene;
        g_ScenesQ.push(MainScene);
        if (sender.getTag() == 0) {
            var newScene = new MyCenterScene();
            g_director.replaceScene(newScene);
        }else if (sender.getTag() == 1) {
            var newScene = new SignInScene();
            g_director.replaceScene(newScene);
        }else if (sender.getTag() == 2) {
            var newScene = new JackpotScene();
            g_director.replaceScene(newScene);
        }
    },

    onBottomBtnCallback:function(sender){
        if (!this._isShowUI) {
            return;
        }
        cc.log("bottom btn tag:" + sender.getTag());
        // g_preScene = MainScene;
        g_ScenesQ.push(MainScene);
        if (sender.getTag() == 0) {
            var newScene = new MyHouseScene();
            g_director.replaceScene(newScene);
        }else if (sender.getTag() == 1) {
            var newScene = new QianQiScene();
            g_director.replaceScene(newScene);
        }else if (sender.getTag() == 2) {
            var newScene = new TanJiuScene();
            g_director.replaceScene(newScene);
        }else if (sender.getTag() == 3) {
            var newScene = new SiWeiScene();
            g_director.replaceScene(newScene);
        }
    },

    onBackBtnCallback:function(sender){

    },

    onTouchBegan: function (touch, event) {
        cc.log("主页:touch");
        var touchPoint = touch.getLocation();
        this._clickParticle.resetSystem();
        this._clickParticle.setPosition(touchPoint);

        this._live2dSp.touchBegan(touch.getLocationInView());

        if (!this._isShowUI) {
            this.onLasuoBtnCallback();
        }
        return true;
    },

    onTouchMoved:function (touch, event){
        cc.log("主页:onTouchMoved");
        var touchPoint = touch.getLocation();
        this._clickParticle.setPosition(touchPoint);

        this._live2dSp.touchMoved(touch.getLocationInView());
    },

    onTouchEnded:function (touch, event){
        cc.log("主页:onTouchEnded");
        this._clickParticle.stopSystem();

        this._live2dSp.touchEnded(touch.getLocationInView());
    },

    onLasuoBtnCallback:function(){
        if (this._isUIMoving) {
            return;
        }
        this._isUIMoving = true;
        this._isShowUI = !this._isShowUI;
        if (!this._isShowUI) {
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
                    var action = cc.Sequence.create(cc.MoveTo.create(0.3, cc.p(this.getContentSize().width / 2, this.getContentSize().height)), cc.CallFunc.create(function(){this._isUIMoving = false; this._hideBtn.setVisible(true);}, this));
                    this._uiNode[key].runAction(action);
                }
            }else if(key == "right")
            {
                if (!this._isShowUI)
                {
                    var action = cc.Sequence.create(cc.MoveTo.create(0.3, cc.p(this.getContentSize().width, this.getContentSize().height + this._uiNode[key].getContentSize().height / 2 * this._uiNode[key].getScale())), cc.CallFunc.create(function(){this._isUIMoving = false;}, this));
                    this._uiNode[key].runAction(action);
                }else 
                {
                    var action = cc.Sequence.create(cc.MoveTo.create(0.3, cc.p(this.getContentSize().width, this.getContentSize().height)), cc.CallFunc.create(function(){this._isUIMoving = false; this._hideBtn.setVisible(true);}, this));
                    this._uiNode[key].runAction(action);
                }
                
            }else if(key == "bottom")
            {
                if (!this._isShowUI)
                {
                    var action = cc.Sequence.create(cc.MoveTo.create(0.3, cc.p(this.getContentSize().width / 2, -this._uiNode[key].getContentSize().height / 2 * this._uiNode[key].getScale())), cc.CallFunc.create(function(){this._isUIMoving = false;}, this));
                    this._uiNode[key].runAction(action);
                }else 
                {
                    var action = cc.Sequence.create(cc.MoveTo.create(0.3, cc.p(this.getContentSize().width / 2, 0)), cc.CallFunc.create(function(){this._isUIMoving = false; this._hideBtn.setVisible(true);}, this));
                    this._uiNode[key].runAction(action);
                }
                
            }else if(key == "left")
            {
                if (!this._isShowUI)
                {
                    var action = cc.Sequence.create(cc.MoveTo.create(0.3, cc.p(-this._uiNode[key].getContentSize().width * this._uiNode[key].getScale(), this.getContentSize().height)), cc.CallFunc.create(function(){this._isUIMoving = false;}, this));
                    this._uiNode[key].runAction(action);
                }else 
                {
                    var action = cc.Sequence.create(cc.MoveTo.create(0.3, cc.p(0, this.getContentSize().height)), cc.CallFunc.create(function(){this._isUIMoving = false; this._hideBtn.setVisible(true);}, this));
                    this._uiNode[key].runAction(action);
                }
                
            }

        }
    },

    onEmailBtnCallback:function(){
        var newScene = new EmailScene();
        // g_preScene = MainScene;
        g_ScenesQ.push(MainScene);
        g_director.replaceScene(newScene);
    },

    onParentBtnCallback:function(){
        var newScene = new ParentsScene();
        // g_preScene = MainScene;
        g_ScenesQ.push(MainScene);
        g_director.replaceScene(newScene);
    },


});

var MainScene = cc.Scene.extend({
    ctor:function() {
        this._super();
        cc.associateWithNative( this, cc.Scene );
    },

    onEnter:function () {
        this._super();
        var layer = new MainLayer();
        this.addChild(layer);
        layer.init();
    }
});