var TanJiuLayer = cc.Layer.extend({

    _clickParticle:null,

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

        var title = cc.LabelTTF.create("探究力大挑战", "Arial", 80);
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

        this._clickParticle = cc.ParticleSystem.create("res/particle/click.plist");
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