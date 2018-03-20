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

    ctor:function() {
        this._super();
        cc.associateWithNative( this, cc.Layer );
        this.setTouchEnabled(true);
        this.setTouchMode(cc.TOUCH_ONE_BY_ONE);
    },

    init:function () {
        cc.log("首页");
        //////////////////////////////
        // 1. super init first
        this._super();

        // this._uiNode.bg = AutoFitNode.create(scaleMode.FitOut);
        // this.addChild(this._uiNode.bg);
        // this._uiNode.bg.setPosition(this.getContentSize().width / 2, this.getContentSize().height / 2);

        // var bgSp = cc.Sprite.create("res/scenes/mainScene/bg.png");
        // this._uiNode.bg.addChild(bgSp);

        this._uiNode.bg = AutoFitNode.create(scaleMode.FitOut);
        this.addChild(this._uiNode.bg);
        this._uiNode.bg.setContentSize(default_winSize.width, default_winSize.height);
        this._uiNode.bg.setAnchorPoint(0.5, 0.5);
        this._uiNode.bg.setPosition(this.getContentSize().width / 2, this.getContentSize().height / 2);
        cc.log("width:" + this.getContentSize().width + "   height:" + this.getContentSize().height);

        var bgSp = cc.Sprite.create("res/scenes/mainScene/bg.png");
        bgSp.setPosition(this._uiNode.bg.getContentSize().width / 2 , this._uiNode.bg.getContentSize().height / 2);
        this._uiNode.bg.addChild(bgSp);

        g_zbRoom(this._uiNode.bg);

        // var live2dsp = cc.Sprite.createLive2D();
        var live2dsp = Live2DSprite.create();
        this.addChild(live2dsp);

        this._uiNode.left = AutoFitNode.create(scaleMode.FitIn);
        this.addChild(this._uiNode.left);
        this._uiNode.left.setContentSize(170, default_winSize.height);
        this._uiNode.left.setAnchorPoint(0, 1);
        this._uiNode.left.setPosition(0, this.getContentSize().height);

        var leftMenu = cc.Menu.create();
        for (var i = 0; i < 3; i++) {
            var spNormal = cc.Sprite.create("res/scenes/mainScene/left_"+i+".png");
            var spSelected = cc.Sprite.create("res/scenes/mainScene/left_"+i+"_.png");
            var item = cc.MenuItemSprite.create(spNormal, spSelected,  this.onLeftBtnCallback, this);
            item.setTag(i);
            leftMenu.addChild(item);
            item.setPosition(this._uiNode.left.getContentSize().width / 2, this._uiNode.left.getContentSize().height - (item.getContentSize().height / 2 + 10 + i * (item.getContentSize().height + 10)));
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
            var spNormal = cc.Sprite.create("res/scenes/mainScene/bottom_"+i+".png");
            var spSelected = cc.Sprite.create("res/scenes/mainScene/bottom_"+i+"_.png");
            var item = cc.MenuItemSprite.create(spNormal, spSelected,  this.onBottomBtnCallback, this);
            item.setTag(i);
            bottomMenu.addChild(item);
            item.setAnchorPoint(0.5, 0);
            var length = this._uiNode.bottom.getContentSize().width - back_item.getContentSize().width;

            item.setPosition(back_item.getContentSize().width + length / 8 + (length / 4) * i, 0);
        }
        this._uiNode.bottom.addChild(bottomMenu);
        bottomMenu.setPosition(0,0);


        this._uiNode.right = AutoFitNode.create(scaleMode.FitIn);
        this.addChild(this._uiNode.right);
        this._uiNode.right.setContentSize(290, 610);
        this._uiNode.right.setAnchorPoint(1, 1);
        this._uiNode.right.setPosition(this.getContentSize().width, this.getContentSize().height);

        var rightMenu = cc.Menu.create();


        var hide_spNormal = cc.Sprite.create("res/scenes/mainScene/hide.png");
        var hide_spSelected = cc.Sprite.create("res/scenes/mainScene/hide_.png");
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

        var email_spNormal = cc.Sprite.create("res/scenes/mainScene/email.png");
        var email_spSelected = cc.Sprite.create("res/scenes/mainScene/email_.png");
        var email_item = cc.MenuItemSprite.create(email_spNormal, email_spSelected,  this.onEmailBtnCallback, this);
        rightMenu.addChild(email_item);
        email_item.setAnchorPoint(1, 1);
        email_item.setPosition(this._uiNode.right.getContentSize().width - 20, this._uiNode.right.getContentSize().height);

        var redDot = cc.Sprite.create("res/scenes/mainScene/red_dot.png");
        email_item.addChild(redDot);
        redDot.setPosition(email_item.getContentSize().width - 20, email_item.getContentSize().height - 20);
        redDot.setScale(0.7);
        var mailTTF = cc.LabelTTF.create(g_unreadMail, "Arial", 40);
        redDot.addChild(mailTTF);
        mailTTF.setPosition(redDot.getContentSize().width / 2, redDot.getContentSize().height / 2);
        if (g_unreadMail <= 0) {
            redDot.setVisible(false);
        }

        var parent_spNormal = cc.Sprite.create("res/scenes/mainScene/parent.png");
        var parent_spSelected = cc.Sprite.create("res/scenes/mainScene/parent_.png");
        var parent_item = cc.MenuItemSprite.create(parent_spNormal, parent_spSelected,  this.onParentBtnCallback, this);
        rightMenu.addChild(parent_item);
        parent_item.setAnchorPoint(1, 1);
        parent_item.setPosition(this._uiNode.right.getContentSize().width - email_item.getContentSize().width - 20, this._uiNode.right.getContentSize().height - 5);

        this._uiNode.right.addChild(rightMenu);
        rightMenu.setPosition(0,0);


        return true;
    },

    onLeftBtnCallback:function(sender){
        g_preScene = MainScene;
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
        g_preScene = MainScene;
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
        cc.log("123456778");
        if (!this._isShowUI) {
            this.onLasuoBtnCallback();
        }
        
        return true;
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
        g_preScene = MainScene;
        g_director.replaceScene(newScene);
    },

    onParentBtnCallback:function(){
        var newScene = new ParentsScene();
        g_preScene = MainScene;
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