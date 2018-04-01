var ShopLayer = cc.Layer.extend({

    _uiNode:{
        bg:null,
        top:null,
        center:null,

    },
    _douNumLabel:null,
    _clickParticle:null,
    _shop_data:[
        {id:0, name:"商品1", intro:"商品1说明 商品1说明 商品1说明 商品1说明 商品1说明", price:1000, isLock:false},
        {id:1, name:"商品2", intro:"商品2说明 商品2说明 商品2说明 商品2说明 商品2说明", price:1234, isLock:false},
        {id:2, name:"商品3", intro:"商品3说明 商品3说明 商品3说明 商品3说明 商品3说明", price:3456, isLock:false},
        {id:3, name:"商品4", intro:"商品4说明 商品4说明 商品4说明 商品4说明 商品4说明", price:2346, isLock:false},
        {id:4, name:"商品5", intro:"商品5说明 商品5说明 商品5说明 商品5说明 商品5说明", price:7564, isLock:false},
        {id:5, name:"商品6", intro:"商品6说明 商品6说明 商品6说明 商品6说明 商品6说明", price:2345, isLock:false},
        {id:6, name:"商品7", intro:"商品7说明 商品7说明 商品7说明 商品7说明 商品7说明", price:1234, isLock:false},
        {id:7, name:"商品8", intro:"商品8说明 商品8说明 商品8说明 商品8说明 商品8说明", price:7654, isLock:false},
        {id:8, name:"商品9", intro:"商品9说明 商品9说明 商品9说明 商品9说明 商品9说明", price:2543, isLock:false},
        {id:9, name:"商品10", intro:"商品10说明 商品10说明 商品10说明 商品10说明 商品10说明", price:3654, isLock:false},
        {id:10, name:"商品11", intro:"商品11说明 商品11说明 商品11说明 商品11说明 商品11说明", price:1234, isLock:false},
        {id:11, name:"商品12", intro:"商品12说明 商品12说明 商品12说明 商品12说明 商品12说明", price:6356, isLock:false},
    ],
    _shop_node:null,
    _shop_scroll:null,

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
        cc.log("道具商店");
        this._super();

        this._uiNode.bg = AutoFitNode.create(scaleMode.FitOut);
        this.addChild(this._uiNode.bg);
        this._uiNode.bg.setContentSize(default_winSize.width, default_winSize.height);
        this._uiNode.bg.setAnchorPoint(0.5, 0.5);
        this._uiNode.bg.setPosition(this.getContentSize().width / 2, this.getContentSize().height / 2);
        cc.log("width:" + this.getContentSize().width + "   height:" + this.getContentSize().height);

        var bgSp = cc.Sprite.create(g_res.img.sce_myc_bg);
        bgSp.setPosition(this._uiNode.bg.getContentSize().width / 2 , this._uiNode.bg.getContentSize().height / 2);
        this._uiNode.bg.addChild(bgSp);


        this._uiNode.center = AutoFitNode.create(scaleMode.FitIn);
        this.addChild(this._uiNode.center);
        this._uiNode.center.setContentSize(1136, 768);
        this._uiNode.center.setAnchorPoint(0.5, 0.5);
        this._uiNode.center.setPosition(this.getContentSize().width / 2, this.getContentSize().height / 2);

        var shopSp = cc.Sprite.create(g_res.img.sce_sho_bg);
        shopSp.setPosition(this._uiNode.center.getContentSize().width / 2 , this._uiNode.center.getContentSize().height / 2);
        this._uiNode.center.addChild(shopSp);

        //880 460
        this._shop_node = cc.Node.create();
        this._shop_node.setContentSize(890, 460);
        shopSp.addChild(this._shop_node);
        this._shop_node.setPosition(115,95);

        //147 210
        var model = cc.Node.create();
        model.setContentSize(165,210);

        var contentLayer = cc.Layer.create();
        contentLayer.setContentSize(this._shop_node.getContentSize().width, Math.ceil(this._shop_data.length/4) * (model.getContentSize().height + 45) - 45);
        
        for (var i = this._shop_data.length - 1; i >= 0; i--) {
            var node = cc.Node.create();
            node.setContentSize(165,210);
            contentLayer.addChild(node);
            node.setAnchorPoint(0, 1);
            node.setPosition((node.getContentSize().width + 80) * (i % 4), contentLayer.getContentSize().height - Math.floor(i / 4) * (node.getContentSize().height + 45));

            // var title_bg = cc.Sprite.create(g_res.img.sce_sho_item_bg);
            // node.addChild(title_bg);
            // title_bg.setPosition(node.getContentSize().width / 2, node.getContentSize().height / 2);

            var item = cc.MenuItemImage.create(g_res.img.sce_sho_item_bg, g_res.img.sce_sho_item_bg, function(sender){
                var tag = sender.getTag();
                var dialog = new Dialog();
                dialog.init(DialogType.shop_0, this._shop_data[tag]);
                this.addChild(dialog);
            }, this);
            item.setTag(i);
            item.setPosition(node.getContentSize().width / 2, node.getContentSize().height / 2)
            var menu = cc.Menu.create(item);
            menu.setPosition(0,0);
            node.addChild(menu);

            var title = cc.LabelTTF.create(this._shop_data[i].name, "Arial", 25);
            title.setAnchorPoint(0.5, 0.5);
            item.addChild(title);
            title.setPosition(item.getContentSize().width / 2 , item.getContentSize().height - 22);

            var price = cc.LabelTTF.create(this._shop_data[i].price, "Arial", 25);
            price.setAnchorPoint(0.5, 0.5);
            item.addChild(price);
            price.setPosition(item.getContentSize().width / 2 , 26);


            var sp = cc.Sprite.create(g_itemData[i].path);
            node.addChild(sp);
            var hRatio = 124 / sp.getContentSize().height;
            var wRatio = (node.getContentSize().width - 20) / sp.getContentSize().width;
            var scale = hRatio > wRatio ? wRatio : hRatio;
            sp.setScale(scale);
            sp.setPosition(node.getContentSize().width / 2, node.getContentSize().height / 2);


        }

        var scrollView = cc.ScrollView.create(this._shop_node.getContentSize(), contentLayer);
        // scrollView.setBounceable(true);
        scrollView.setTouchEnabled(false);
        scrollView.setDirection(ccs.ScrollViewDir.vertical);
        this._shop_node.addChild(scrollView);
        scrollView.setContentOffset(cc.p(0, scrollView.getViewSize().height - contentLayer.getContentSize().height));
        this._shop_scroll = scrollView;


        var rightMenu = cc.Menu.create();
        rightMenu.setPosition(0,0);
        shopSp.addChild(rightMenu);

        var up = cc.MenuItemImage.create(g_res.img.sce_sho_up, g_res.img.sce_sho_up, function(sender){
            sender.getParent().setEnabled(false);
            this._shop_scroll.setContentOffsetInDuration(cc.p(0, -255), 0.5);
            sender.runAction(cc.Sequence.create(cc.DelayTime.create(0.5), cc.CallFunc.create(function(){
                sender.getParent().setEnabled(true);
            }, this)));
        }, this);
        rightMenu.addChild(up);
        up.setAnchorPoint(0, 0);
        up.setPosition(this._shop_node.getPositionX() + this._shop_node.getContentSize().width, 422);

        var down = cc.MenuItemImage.create(g_res.img.sce_sho_down, g_res.img.sce_sho_down, function(sender){
            sender.getParent().setEnabled(false);
            this._shop_scroll.setContentOffsetInDuration(cc.p(0, 255), 0.5);
            sender.runAction(cc.Sequence.create(cc.DelayTime.create(0.5), cc.CallFunc.create(function(){
                sender.getParent().setEnabled(true);
            }, this)));
        }, this);
        rightMenu.addChild(down);
        down.setAnchorPoint(0, 0);
        down.setPosition(this._shop_node.getPositionX() + this._shop_node.getContentSize().width, 170);


        this._uiNode.top = AutoFitNode.create(scaleMode.FitIn);
        this.addChild(this._uiNode.top);
        this._uiNode.top.setContentSize(default_winSize.width, 107);
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

        var title = cc.Sprite.create(g_res.img.sce_sho_title);
        this._uiNode.top.addChild(title);
        title.setAnchorPoint(0.5, 1);
        title.setPosition(this._uiNode.top.getContentSize().width / 2, 20);


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

        this._clickParticle = cc.ParticleSystem.create(g_res.plist.click);
        this.addChild(this._clickParticle);
        this._clickParticle.stopSystem();
    },

    onTouchBegan: function (touch, event) {
        cc.log("商店:touch");
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