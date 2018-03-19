var Dialog = cc.LayerColor.extend({
	_boy:null,
	_girl:null,
	_sex:true,
	init: function () {
        if (this._super(cc.c4b(0, 0, 0, 150))) {
        	var _rootNode = AutoFitNode.create(scaleMode.FitOut);
       		this.addChild(_rootNode);
        	_rootNode.setPosition(this.getContentSize().width / 2, this.getContentSize().height / 2-20);

        	var bg = cc.Sprite.create("res/dialog/dialog_bg.png");
        	_rootNode.addChild(bg);

        	var title = cc.Sprite.create("res/dialog/dialog_tip.png");
        	bg.addChild(title);
        	title.setAnchorPoint(0.5, 1);
        	title.setPosition(bg.getContentSize().width / 2, bg.getContentSize().height - 18);
        	// this._boy = cc.Sprite.create("res/dialog/dialog_head0.png");
        	this._boy = cc.MenuItemImage.create("res/dialog/dialog_head0.png", "res/dialog/dialog_head0.png", 
        		function(){
        			this._sex = true;
        			this._boy.setScale(1.1);
        			this._girl.setScale(1);
        	}, this);
        	this._boy.setAnchorPoint(1, 0.5);
        	this._boy.setPosition(bg.getContentSize().width / 2 - 30, bg.getContentSize().height / 2);
        	this._boy.setScale(1.1);

        	this._girl = cc.MenuItemImage.create("res/dialog/dialog_head1.png", "res/dialog/dialog_head1.png", 
        		function(){
        			this._sex = false;
        			this._boy.setScale(1);
        			this._girl.setScale(1.1);
        	}, this);
        	this._girl.setAnchorPoint(0, 0.5);
        	this._girl.setPosition(bg.getContentSize().width / 2 + 30, bg.getContentSize().height / 2);

        	var ok = cc.MenuItemImage.create("res/dialog/btn_ok.png", "res/dialog/btn_ok.png", 
        		function (){
        			g_sex = this._sex;
        			this.removeFromParent();
        		},
        		this);
        	ok.setPosition(bg.getContentSize().width / 2 , 0);

        	var menu = cc.Menu.create(this._boy, this._girl, ok);
        	bg.addChild(menu);
        	menu.setPosition(0,0);

            return true;
        }

        


		

        return false;
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
    	return true;
    },

    setParentMenuDisable: function (root) {
    	if (root == this) {
    		return;
    	}else if (root instanceof cc.MenuItem) {
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
    	}else if (root instanceof cc.MenuItem) {
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