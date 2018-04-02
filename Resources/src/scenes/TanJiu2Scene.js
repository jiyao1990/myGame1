var TanJiu2Layer = cc.Layer.extend({

    _clickParticle:null,
    _uiNode:{
        bg:null,

    },
    _bgSp:null,

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
        cc.log("千奇百怪2");
        this._super();

        this._uiNode.bg = AutoFitNode.create(scaleMode.FitFull);
        this.addChild(this._uiNode.bg);
        this._uiNode.bg.setContentSize(default_winSize.width, default_winSize.height);
        this._uiNode.bg.setAnchorPoint(0.5, 0.5);
        this._uiNode.bg.setPosition(this.getContentSize().width / 2, this.getContentSize().height / 2);

        var bgSp = cc.Sprite.create(g_res.img.sce_tan_temp[0]);
        bgSp.setPosition(this._uiNode.bg.getContentSize().width / 2 , this._uiNode.bg.getContentSize().height / 2);
        this._uiNode.bg.addChild(bgSp);
        bgSp.setTag(0);
        this._bgSp = bgSp;

        var back_spNormal = cc.Sprite.create(g_res.img.gen_back);
        var back_spSelected = cc.Sprite.create(g_res.img.gen_back_);
        var back_item = cc.MenuItemSprite.create(back_spNormal, back_spSelected,  function() {
            g_director.replaceScene(new (g_ScenesQ.pop())());
        }, this);
        back_item.setAnchorPoint(0, 0);
        back_item.setPosition(0, -10);


        var confirm_spNormal = cc.Sprite.create(g_res.img.gen_confirm);
        var confirm_spSelected = cc.Sprite.create(g_res.img.gen_confirm_);
        var confirm_item = cc.MenuItemSprite.create(confirm_spNormal, confirm_spSelected,  function() {
            var tag = this._bgSp.getTag();
            if (tag == 0) {
                tag = 1;
            }else {
                tag = 0;
            }
            this._bgSp.init(g_res.img.sce_tan_temp[tag]);
            this._bgSp.setPosition(this._uiNode.bg.getContentSize().width / 2 , this._uiNode.bg.getContentSize().height / 2);
            this._bgSp.setTag(tag);
        }, this);
        confirm_item.setAnchorPoint(1, 0);
        confirm_item.setPosition(bgSp.getContentSize().width, -10);

        var menu = cc.Menu.create(back_item, confirm_item);
        menu.setPosition(0, 0);
        bgSp.addChild(menu);


        this._clickParticle = cc.ParticleSystem.create(g_res.plist.click);
        this.addChild(this._clickParticle);
        this._clickParticle.stopSystem();
    },

    onTouchBegan: function (touch, event) {
        cc.log("千奇百怪2:touch");
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

var TanJiu2Scene = cc.Scene.extend({
    ctor:function() {
        this._super();
        cc.associateWithNative( this, cc.Scene );
    },

    onEnter:function () {
        this._super();
        var layer = new TanJiu2Layer();
        this.addChild(layer);
        layer.init();
    }
});