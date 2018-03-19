var QianQiLayer = cc.Layer.extend({
    ctor:function() {
        this._super();
        cc.associateWithNative( this, cc.Layer );
    },

    init:function () {
        cc.log("千奇百怪");
        this._super();

        var title = cc.LabelTTF.create("千奇百怪", "Arial", 80);
        this.addChild(title);
        title.setPosition(this.getContentSize().width / 2 , this.getContentSize().height / 2);

        var back_spNormal = cc.Sprite.create("res/scenes/mainScene/back.png");
        var back_spSelected = cc.Sprite.create("res/scenes/mainScene/back_.png");
        var back_item = cc.MenuItemSprite.create(back_spNormal, back_spSelected,  function() {
            g_director.replaceScene(new g_preScene());
        }, this);
        var leftMenu = cc.Menu.create(back_item);
        leftMenu.setPosition(0, 0);
        back_item.setAnchorPoint(0, 0);
        back_item.setPosition(0, 0);
        this.addChild(leftMenu);
    },
});

var QianQiScene = cc.Scene.extend({
    ctor:function() {
        this._super();
        cc.associateWithNative( this, cc.Scene );
    },

    onEnter:function () {
        this._super();
        var layer = new QianQiLayer();
        this.addChild(layer);
        layer.init();
    }
});