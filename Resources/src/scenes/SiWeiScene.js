var SiWeiLayer = cc.Layer.extend({

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
        cc.log("思维游戏");
        this._super();

        var title = cc.LabelTTF.create("思维游戏", "Arial", 80);
        this.addChild(title);
        title.setPosition(this.getContentSize().width / 2 , this.getContentSize().height / 2);

        var back_spNormal = cc.Sprite.create(g_res.img.gen_back);
        var back_spSelected = cc.Sprite.create(g_res.img.gen_back_);
        var back_item = cc.MenuItemSprite.create(back_spNormal, back_spSelected,  function() {
            g_director.replaceScene(new (g_ScenesQ.pop())());
        }, this);
        var leftMenu = cc.Menu.create(back_item);
        leftMenu.setPosition(0, 0);
        back_item.setAnchorPoint(0, 0);
        back_item.setPosition(0, 0);
        this.addChild(leftMenu);

        this._clickParticle = cc.ParticleSystem.create(g_res.plist.click);
        this.addChild(this._clickParticle);
        this._clickParticle.stopSystem();
    },

    onTouchBegan: function (touch, event) {
        cc.log("思维游戏:touch");
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

var SiWeiScene = cc.Scene.extend({
    ctor:function() {
        this._super();
        cc.associateWithNative( this, cc.Scene );
    },

    onEnter:function () {
        this._super();
        var layer = new SiWeiLayer();
        this.addChild(layer);
        layer.init();
    }
});