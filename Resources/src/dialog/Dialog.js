var DialogType = {
    sex : 1,
    getItem : 2,
    getItem10 : 3,
    shop_0 : 4,
    shop_1 : 5,

    temp : 999,
};

var Dialog = cc.LayerColor.extend({
	_boy:null,
	_girl:null,
	_sex:true,
    _data:null,
    _type:null,
	init: function (dialogType, data) {
        this._data = data;
        this._type = dialogType;
        if (this._super(cc.c4b(0, 0, 0, 150))) {
            
            switch(dialogType){
                case DialogType.sex:
                    this.createSexNode();
                break;

                case DialogType.getItem:
                    this.createGetItemNode();
                break;

                case DialogType.getItem10:
                    this.createGetItem10Node();
                break;

                case DialogType.shop_0:
                    this.createShop_0Node();
                break;

                case DialogType.shop_1:
                    this.createShop_1Node();
                break;

                case DialogType.temp:
                    this.createTemp();
                break;;
                
            }

            return true;
        }
        return false;
    },

    createSexNode: function() {
        var _rootNode = AutoFitNode.create(scaleMode.FitOut);
        this.addChild(_rootNode);
        _rootNode.setPosition(this.getContentSize().width / 2, this.getContentSize().height / 2-20);

        var bg = cc.Sprite.create(g_res.img.dia_bg);
        _rootNode.addChild(bg);

        var title = cc.Sprite.create(g_res.img.dia_sex_dialog_tip);
        bg.addChild(title);
        title.setAnchorPoint(0.5, 1);
        title.setPosition(bg.getContentSize().width / 2, bg.getContentSize().height - 18);
        // this._boy = cc.Sprite.create("res/dialog/dialog_head0.png");
        this._boy = cc.MenuItemImage.create(g_res.img.dia_sex_dialog_head0, g_res.img.dia_sex_dialog_head0, 
            function(){
                this._sex = true;
                this._boy.setScale(1.1);
                this._girl.setScale(1);
        }, this);
        this._boy.setAnchorPoint(1, 0.5);
        this._boy.setPosition(bg.getContentSize().width / 2 - 30, bg.getContentSize().height / 2);
        this._boy.setScale(1.1);

        this._girl = cc.MenuItemImage.create(g_res.img.dia_sex_dialog_head1, g_res.img.dia_sex_dialog_head1, 
            function(){
                this._sex = false;
                this._boy.setScale(1);
                this._girl.setScale(1.1);
        }, this);
        this._girl.setAnchorPoint(0, 0.5);
        this._girl.setPosition(bg.getContentSize().width / 2 + 30, bg.getContentSize().height / 2);

        var ok = cc.MenuItemImage.create(g_res.img.dia_btn_ok, g_res.img.dia_btn_ok, 
            function (){
                g_sex = this._sex;
                this.removeFromParent();
            },
            this);
        ok.setPosition(bg.getContentSize().width / 2 , 0);

        var menu = cc.Menu.create(this._boy, this._girl, ok);
        bg.addChild(menu);
        menu.setPosition(0,0);
    },

    createGetItemNode: function(){
        var _rootNode = AutoFitNode.create(scaleMode.FitOut);
        this.addChild(_rootNode);
        _rootNode.setPosition(this.getContentSize().width / 2, this.getContentSize().height / 2-20);

        var bg = cc.Sprite.create(g_res.img.dia_getitem_get_bg);
        _rootNode.addChild(bg);
        bg.runAction(cc.RepeatForever.create(cc.Sequence.create(cc.FadeTo.create(0.5, 150), cc.FadeTo.create(0.5, 255))));
    
        var sprite = cc.Sprite.create(g_itemData[this._data].path);
        sprite.setAnchorPoint(0.5, 0.5);
        sprite.setPosition(_rootNode.getContentSize().width / 2, _rootNode.getContentSize().height / 2);
        var hRatio = 200 / sprite.getContentSize().height;
        var wRatio = 200 / sprite.getContentSize().width;
        var scale = hRatio > wRatio ? wRatio : hRatio;

        sprite.setScale(scale);
        _rootNode.addChild(sprite);
    },

    createGetItem10Node: function(){
        var _rootNode = AutoFitNode.create(scaleMode.FitOut);
        this.addChild(_rootNode);
        _rootNode.setPosition(this.getContentSize().width / 2, this.getContentSize().height / 2-20);

        var bg = cc.Sprite.create(g_res.img.dia_getitem10_get10_bg);
        _rootNode.addChild(bg);
        bg.setPosition(_rootNode.getContentSize().width / 2, _rootNode.getContentSize().height / 2);
        for (var i = this._data.length - 1; i >= 0; i--) {
            var item_bg = cc.Sprite.create(g_res.img.dia_getitem10_get_item_bg);
            bg.addChild(item_bg);
            item_bg.setAnchorPoint(0, 1);
            item_bg.setPosition(75 + i % 5 * (item_bg.getContentSize().width + 40), bg.getContentSize().height - 100 - Math.floor(i/5) * (item_bg.getContentSize().height + 45));

            var item = cc.Sprite.create(g_itemData[this._data[i]].path);
            item_bg.addChild(item);
            item.setPosition(item_bg.getContentSize().width / 2 , item_bg.getContentSize().height / 2);
            var hRatio = (item_bg.getContentSize().height - 20) / item.getContentSize().height;
            var wRatio = (item_bg.getContentSize().width - 20) / item.getContentSize().width;
            var scale = hRatio > wRatio ? wRatio : hRatio;
            item.setScale(scale);
        }
    },

    createShop_0Node: function(){
        var _rootNode = AutoFitNode.create(scaleMode.FitIn);
        this.addChild(_rootNode);
        _rootNode.setPosition(this.getContentSize().width / 2, this.getContentSize().height / 2-20);

        var bg = cc.Sprite.create(g_res.img.dia_shop_0_bg);
        _rootNode.addChild(bg);
        bg.setPosition(_rootNode.getContentSize().width / 2, _rootNode.getContentSize().height / 2);

        var title = cc.LabelTTF.create(this._data.name, "Arial", 25);
        title.setAnchorPoint(0.5, 0.5);
        bg.addChild(title);
        title.setPosition(bg.getContentSize().width / 2 , bg.getContentSize().height - 49);

        var price = cc.LabelTTF.create(this._data.price, "Arial", 35);
        price.setAnchorPoint(0.5, 0.5);
        bg.addChild(price);
        price.setPosition(bg.getContentSize().width / 2 , 335);

        var sp = cc.Sprite.create(g_itemData[this._data.id].path);
        bg.addChild(sp);
        var hRatio = 200 / sp.getContentSize().height;
        var wRatio = 200 / sp.getContentSize().width;
        var scale = hRatio > wRatio ? wRatio : hRatio;
        sp.setScale(scale);
        sp.setPosition(bg.getContentSize().width / 2, 483);

        // intro
        var intro = cc.LabelTTF.create(this._data.intro, "Arial", 25, cc.size(360, 0), cc.TEXT_ALIGNMENT_LEFT);
        intro.setAnchorPoint(0.5, 1);
        intro.setColor(cc.c3b(0,0,0));
        bg.addChild(intro);
        intro.setPosition(bg.getContentSize().width / 2 , 235);


        var close = cc.MenuItemImage.create(g_res.img.dia_shop_0_close, g_res.img.dia_shop_0_close_, function(){
            this.removeFromParent();
        }, this);
        close.setPosition(bg.getContentSize().width - 50, bg.getContentSize().height - 50);

        var buy = cc.MenuItemImage.create(g_res.img.dia_shop_0_buy, g_res.img.dia_shop_0_buy_, function(){
            var dialog = new Dialog();
            dialog.init(DialogType.shop_1, this._data.price);
            this.getParent().addChild(dialog);
            this.removeFromParent();
        }, this);
        buy.setPosition(bg.getContentSize().width / 2, 20);

        var menu = cc.Menu.create(close, buy);
        menu.setPosition(0,0);
        bg.addChild(menu);
    },

    createShop_1Node: function(){
        var _rootNode = AutoFitNode.create(scaleMode.FitOut);
        this.addChild(_rootNode);
        _rootNode.setPosition(this.getContentSize().width / 2, this.getContentSize().height / 2-20);

        var bg = cc.Sprite.create(g_res.img.dia_bg);
        _rootNode.addChild(bg);

        var content = cc.Sprite.create(g_res.img.dia_shop_1_content);
        bg.addChild(content);
        content.setPosition(bg.getContentSize().width / 2, bg.getContentSize().height / 2);

        var price = cc.LabelTTF.create(this._data, "Arial", 35);
        price.setAnchorPoint(0.5, 0.5);
        content.addChild(price);
        price.setPosition(content.getContentSize().width / 2 , 120);

        var giveup = cc.MenuItemImage.create(g_res.img.dia_shop_1_btn_giveup, g_res.img.dia_shop_1_btn_giveup_, function(){
            this.removeFromParent();
        }, this);
        giveup.setPosition(bg.getContentSize().width - 250, 20);

        var buy = cc.MenuItemImage.create(g_res.img.dia_shop_1_btn_buy, g_res.img.dia_shop_1_btn_buy_, function(){
            this.removeFromParent();
        }, this);
        buy.setPosition(250, 20);

        var menu = cc.Menu.create(giveup, buy);
        menu.setPosition(0,0);
        bg.addChild(menu);
    },

    createTemp: function(){
        var _rootNode = AutoFitNode.create(scaleMode.FitOut);
        this.addChild(_rootNode);
        _rootNode.setPosition(this.getContentSize().width / 2, this.getContentSize().height / 2-20);

        var bg = cc.Sprite.create(g_res.img.dia_bg);
        _rootNode.addChild(bg);

        var ttf = cc.LabelTTF.create(g_res.txt.stop, "Arial", 40);
        bg.addChild(ttf);
        ttf.setPosition(bg.getContentSize().width / 2, bg.getContentSize().height / 2);
    },

    onEnter: function () {
    	this._super();
    	this.setParentMenuDisable(this.getParent());
    	this.setTouchEnabled(true);
    	this.setTouchMode(cc.TOUCH_ONE_BY_ONE);
    },

    onExit: function() {
    	this._super();
    	this.setParentMenuEnabled(this.getParent());
    },

    onTouchBegan: function (touch, event) {
    	cc.log("touch");
        if (this._type == DialogType.getItem || this._type == DialogType.getItem10 || this._type == DialogType.temp) {
            this.removeFromParent();
        }
    	return true;
    },

    setParentMenuDisable: function (root) {
    	if (root == this) {
    		return;
    	}else if (root instanceof cc.Menu) {
    		root.setEnabled(false);
    	}else if(root instanceof cc.Node){
    		var children = root.getChildren();
    		if (children.length == 0) {
    			return;
    		}
    	}else{
    		return;
    	};
    	
    	for (var i = 0; i < root.getChildren().length; i ++) {
    		var child = root.getChildren()[i];
    		this.setParentMenuDisable(child);
    	};
    },

    setParentMenuEnabled: function (root) {
    	if (root == this) {
    		return;
    	}else if (root instanceof cc.Menu) {
    		root.setEnabled(true);
    	}else if(root instanceof cc.Node){
    		var children = root.getChildren();
    		if (children.length == 0) {
    			return;
    		}
    	}else{
    		return;
    	};
    	
    	for (var i = 0; i < root.getChildren().length; i ++) {
    		var child = root.getChildren()[i];
    		this.setParentMenuEnabled(child);
    	};
    },
});