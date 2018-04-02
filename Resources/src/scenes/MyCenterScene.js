var MyCenterLayer = cc.Layer.extend({

    _clickParticle:null,
    _uiNode:{
        bg:null,
        bottom:null,
        top:null,
        center:null,
    },
    left_item:[],
    left_nodes:[],
    info_nodes:[],
    tanjiu_nodes:[],
    qianqi_nodes:[],
    info_items:[],
    tanjiu_items:[],
    qianqi_items:[],

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
        cc.log("个人中心");
        this._super();

        // var title = cc.LabelTTF.create("个人中心", "Arial", 80);
        // this.addChild(title);
        // title.setPosition(this.getContentSize().width / 2 , this.getContentSize().height / 2);

        // var back_spNormal = cc.Sprite.create(g_res.img.gen_back);
        // var back_spSelected = cc.Sprite.create(g_res.img.gen_back_);
        // var back_item = cc.MenuItemSprite.create(back_spNormal, back_spSelected,  function() {
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

        var bgSp = cc.Sprite.create(g_res.img.sce_myc_bg);
        bgSp.setPosition(this._uiNode.bg.getContentSize().width / 2 , this._uiNode.bg.getContentSize().height / 2);
        this._uiNode.bg.addChild(bgSp);


        this._uiNode.center = AutoFitNode.create(scaleMode.FitIn);
        this.addChild(this._uiNode.center);
        this._uiNode.center.setContentSize(937, 570);
        this._uiNode.center.setAnchorPoint(0.5, 0.5);
        this._uiNode.center.setPosition(this.getContentSize().width / 2 + 80, this.getContentSize().height / 2 - 80);

        var box = cc.Sprite.create(g_res.img.sce_myc_center_bg);
        box.setPosition(this._uiNode.center.getContentSize().width / 2, this._uiNode.center.getContentSize().height / 2);
        this._uiNode.center.addChild(box);

        var leftMenu = cc.Menu.create();
        leftMenu.setPosition(0,0);
        leftMenu.setZOrder(100);
        this._uiNode.center.addChild(leftMenu);
        for (var i = g_res.img.sce_myc_left.length - 1; i >= 0; i--) {
            var spNormal = cc.Sprite.create(g_res.img.sce_myc_left[i]);
            var spSelected = cc.Sprite.create(g_res.img.sce_myc_left_[i]);
            var spDisabled = cc.Sprite.create(g_res.img.sce_myc_left_[i]);
            var item = cc.MenuItemSprite.create(spNormal, spSelected, spDisabled, this.onLeftBtnCallback, this);
            item.setTag(i);
            leftMenu.addChild(item);
            item.setAnchorPoint(0.5, 1);
            item.setPosition(0, this._uiNode.center.getContentSize().height - (30 + i * (item.getContentSize().height + 20)));
            this.left_item[i] = item;
            if (i == 0) {
                item.setEnabled(false);
            }

            // var node = cc.Node.create();
            // node.setContentSize(box.getContentSize());
            // box.addChild(node);

            var sp = cc.Sprite.create(g_res.img.sce_myc_center_bg);
            sp.setPosition(this._uiNode.center.getContentSize().width / 2, this._uiNode.center.getContentSize().height / 2);
            this._uiNode.center.addChild(sp);
            if (i != 0) {
                sp.setVisible(false);
            }

            this.left_nodes[i] = sp;
        }


        //info
        var infoMenu = cc.Menu.create();
        infoMenu.setPosition(0,0);
        infoMenu.setZOrder(-1);
        this.left_nodes[0].addChild(infoMenu);
        var info_temp = ["主页", "信息", "物品", "好友"];
        for (var i = g_res.img.sce_myc_info_top.length - 1; i >= 0; i--) {
            var node = cc.Node.create();
            node.setContentSize(868, 500);
            this.left_nodes[0].addChild(node);
            node.setPosition(36, 35);

            // var name = cc.LabelTTF.create(info_temp[i], "Arial", 40);
            // name.setAnchorPoint(0.5, 0.5);
            // name.setColor(cc.c3b(255, 0, 0));
            // node.addChild(name);
            // name.setPosition(node.getContentSize().width / 2, node.getContentSize().height / 2);
            this.createInfoNode(i, node);

            if (i != 0) {
                node.setVisible(false);
            }

            var spNormal = cc.Sprite.create(g_res.img.sce_myc_info_top[i]);
            var spSelected = cc.Sprite.create(g_res.img.sce_myc_info_top_[i]);
            var spDisabled = cc.Sprite.create(g_res.img.sce_myc_info_top_[i]);
            spDisabled.setPosition(0, 15);
            var item = cc.MenuItemSprite.create(spNormal, spSelected, spDisabled, this.onInfoBtnCallback, this);
            item.setTag(i);
            infoMenu.addChild(item);
            item.setAnchorPoint(0, 0.7);
            item.setPosition(115 + i * item.getContentSize().width + 10, this.left_nodes[0].getContentSize().height);
            if (i == 0) {
                item.setEnabled(false);
            }
            this.info_items[i] = item;
            this.info_nodes[i] = node;
        }

        //tanjiu
        var tanjiuMenu = cc.Menu.create();
        tanjiuMenu.setPosition(0,0);
        tanjiuMenu.setZOrder(-1);
        this.left_nodes[1].addChild(tanjiuMenu);
        var tanjiu_temp = ["我的称号", "答题记录", "订正错题", "礼物兑换", "我的成绩单"];
        for (var i = g_res.img.sce_myc_tanjiu_top.length - 1; i >= 0; i--) {
            var node = cc.Node.create();
            node.setContentSize(868, 500);
            this.left_nodes[1].addChild(node);
            node.setPosition(36, 35);
            // var name = cc.LabelTTF.create(tanjiu_temp[i], "Arial", 40);
            // name.setAnchorPoint(0.5, 0.5);
            // name.setColor(cc.c3b(255, 0, 0));
            // node.addChild(name);
            // name.setPosition(node.getContentSize().width / 2, node.getContentSize().height / 2);
            if (i != 0) {
                node.setVisible(false);
            }
            this.createTempNode(1,i,node);

            var spNormal = cc.Sprite.create(g_res.img.sce_myc_tanjiu_top[i]);
            var spSelected = cc.Sprite.create(g_res.img.sce_myc_tanjiu_top_[i]);
            var spDisabled = cc.Sprite.create(g_res.img.sce_myc_tanjiu_top_[i]);
            spDisabled.setPosition(0, 15);
            var item = cc.MenuItemSprite.create(spNormal, spSelected, spDisabled, this.onTanjiuBtnCallback, this);
            item.setTag(i);
            tanjiuMenu.addChild(item);
            item.setAnchorPoint(0, 0.7);
            item.setPosition(48 + i * 158, this.left_nodes[1].getContentSize().height);
            if (i == 0) {
                item.setEnabled(false);
            }
            this.tanjiu_items[i] = item;
            this.tanjiu_nodes[i] = node;
        }

        //qianqi
        var qianqiMenu = cc.Menu.create();
        qianqiMenu.setPosition(0,0);
        qianqiMenu.setZOrder(-1);
        this.left_nodes[2].addChild(qianqiMenu);
        var qianqi_temp = ["我看过的"];
        for (var i = g_res.img.sce_myc_qianqi_top.length - 1; i >= 0; i--) {
            var node = cc.Node.create();
            node.setContentSize(868, 500);
            this.left_nodes[2].addChild(node);
            node.setPosition(36, 35);
            // var name = cc.LabelTTF.create(qianqi_temp[i], "Arial", 40);
            // name.setAnchorPoint(0.5, 0.5);
            // name.setColor(cc.c3b(255, 0, 0));
            // node.addChild(name);
            // name.setPosition(node.getContentSize().width / 2, node.getContentSize().height / 2);
            if (i != 0) {
                node.setVisible(false);
            }
            this.createTempNode(2,i,node);

            var spNormal = cc.Sprite.create(g_res.img.sce_myc_qianqi_top[i]);
            var spSelected = cc.Sprite.create(g_res.img.sce_myc_qianqi_top_[i]);
            var spDisabled = cc.Sprite.create(g_res.img.sce_myc_qianqi_top_[i]);
            spDisabled.setPosition(0, 15);
            var item = cc.MenuItemSprite.create(spNormal, spSelected, spDisabled, this.onQianqiBtnCallback, this);
            item.setTag(i);
            qianqiMenu.addChild(item);
            item.setAnchorPoint(0, 0.7);
            item.setPosition(115 + i * 158, this.left_nodes[2].getContentSize().height);
            if (i == 0) {
                item.setEnabled(false);
            }
            this.qianqi_items[i] = item;
            this.qianqi_nodes[i] = node;
        }

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

        var title = cc.Sprite.create(g_res.img.sce_myc_title);
        topBg.addChild(title);
        title.setPosition(topBg.getContentSize().width / 2, topBg.getContentSize().height / 2 + 5);


        this._clickParticle = cc.ParticleSystem.create(g_res.plist.click);
        this.addChild(this._clickParticle);
        this._clickParticle.stopSystem();
    },

    onTouchBegan: function (touch, event) {
        cc.log("个人中心:touch");
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

    onLeftBtnCallback:function(sender){
        var tag = sender.getTag();
        for (var i = this.left_item.length - 1; i >= 0; i--) {
            this.left_item[i].setEnabled(true);
        }
        this.left_item[tag].setEnabled(false);

        for (var i = this.left_nodes.length - 1; i >= 0; i--) {
            this.left_nodes[i].setVisible(false);
        }
        this.left_nodes[tag].setVisible(true);
    },


    onInfoBtnCallback:function(sender){
        var tag = sender.getTag();
        for (var i = this.info_items.length - 1; i >= 0; i--) {
            this.info_items[i].setEnabled(true);
        }
        this.info_items[tag].setEnabled(false);

        for (var i = this.info_nodes.length - 1; i >= 0; i--) {
            this.info_nodes[i].setVisible(false);
        }
        this.info_nodes[tag].setVisible(true);
    },

    onTanjiuBtnCallback:function(sender){
        var tag = sender.getTag();
        for (var i = this.tanjiu_items.length - 1; i >= 0; i--) {
            this.tanjiu_items[i].setEnabled(true);
        }
        this.tanjiu_items[tag].setEnabled(false);

        for (var i = this.tanjiu_nodes.length - 1; i >= 0; i--) {
            this.tanjiu_nodes[i].setVisible(false);
        }
        this.tanjiu_nodes[tag].setVisible(true);
    },

    onQianqiBtnCallback:function(sender){
        var tag = sender.getTag();
        for (var i = this.qianqi_items.length - 1; i >= 0; i--) {
            this.qianqi_items[i].setEnabled(true);
        }
        this.qianqi_items[tag].setEnabled(false);

        for (var i = this.qianqi_nodes.length - 1; i >= 0; i--) {
            this.qianqi_nodes[i].setVisible(false);
        }
        this.qianqi_nodes[tag].setVisible(true);
    },

    createInfoNode:function(idx, node){
        switch (idx) {
            case 0:
            {
                var boy = cc.Sprite.create(g_res.img.sce_myc_info_top_0_boy);
                node.addChild(boy);
                boy.setAnchorPoint(0,0);
                boy.setPosition(145,22);

                var vip = cc.Sprite.create(g_res.img.sce_myc_info_top_0_vip);
                node.addChild(vip);
                vip.setAnchorPoint(0.5,0);
                vip.setPosition(145 + boy.getContentSize().width / 2 - 25, 22 + boy.getContentSize().height);

                var pao = cc.Sprite.create(g_res.img.sce_myc_info_top_0_pao);
                node.addChild(pao);
                pao.setAnchorPoint(0,0);
                pao.setPosition(358, 88);

                var ttf = cc.LabelTTF.create(g_res.txt.vip, "Arial", 55, cc.size(360, 0), cc.TEXT_ALIGNMENT_LEFT);
                ttf.setColor(cc.c3b(255, 102, 51));
                pao.addChild(ttf);
                ttf.setAnchorPoint(0,0);
                ttf.setPosition(78, 110);
                
            }
                break;
            case 1:
            {
                var sex = 0;
                if (g_sex) {
                    sex = 1;
                }
                var head = cc.Sprite.create(g_res.img.sce_myc_info_top_1_head[sex]);
                head.setAnchorPoint(0,0);
                node.addChild(head);
                head.setPosition(175, 246);
                for (var i = 0; i < 3; i++) {
                    var infobg = cc.Sprite.create(g_res.img.sce_myc_info_top_1_info_bg);
                    node.addChild(infobg);
                    infobg.setAnchorPoint(0, 0);
                    infobg.setPosition(165, 28 + (infobg.getContentSize().height) * i);

                    switch (i) {
                        case 0:
                        {
                            var ttf = cc.LabelTTF.create("年龄：" + g_age + "岁", "Arial", 35);
                            ttf.setColor(cc.c3b(0,0,0));
                            infobg.addChild(ttf);
                            ttf.setPosition(infobg.getContentSize().width/2, infobg.getContentSize().height/2);
                        }
                            // statements_1
                            break;
                        case 1:
                        {
                            var sex = "女";
                            if (g_sex) {
                                sex = "男";
                            }
                            var ttf = cc.LabelTTF.create("性别：" + sex, "Arial", 35);
                            ttf.setColor(cc.c3b(0,0,0));
                            infobg.addChild(ttf);
                            ttf.setPosition(infobg.getContentSize().width/2, infobg.getContentSize().height/2);
                        }
                            // statements_1
                            break;
                        case 2:
                        {
                            var ttf = cc.LabelTTF.create(g_name, "Arial", 35);
                            ttf.setColor(cc.c3b(0,0,0));
                            infobg.addChild(ttf);
                            ttf.setPosition(infobg.getContentSize().width/2, infobg.getContentSize().height/2);
                        }
                            // statements_1
                            break;
                    }
                }
                var doubg = cc.Sprite.create(g_res.img.sce_myc_info_top_1_dou_bg);
                node.addChild(doubg);
                doubg.setAnchorPoint(0,0);
                doubg.setPosition(431, 391);

                var dou = cc.Sprite.create(g_res.img.gen_dou);
                doubg.addChild(dou);
                dou.setPosition(40, 40);

                douLabel = cc.LabelTTF.create(g_douNum, "Arial", 60);
                doubg.addChild(douLabel);
                douLabel.setAnchorPoint(0,0);
                douLabel.setPosition(118, 10);

                var menu = cc.Menu.create();
                menu.setPosition(0,0);
                node.addChild(menu);
                for (var i = g_res.img.sce_myc_info_top_1_btn.length - 1; i >= 0; i--) {
                    var item = cc.MenuItemImage.create(g_res.img.sce_myc_info_top_1_btn[i], g_res.img.sce_myc_info_top_1_btn_[i],
                        function(sender){
                            var dialog = new Dialog();
                            dialog.init(DialogType.temp);
                            this.addChild(dialog);
                        }, this);
                    item.setTag(i);
                    menu.addChild(item);
                    item.setAnchorPoint(0,1);
                    item.setPosition(540, node.getContentSize().height - 126 - (item.getContentSize().height) * i);
                }
            }
                break;
            case 2:
            {
                var left_bg = cc.Sprite.create(g_res.img.sce_myc_info_top_2_left_bg);
                left_bg.setAnchorPoint(0,0);
                node.addChild(left_bg);
                left_bg.setPosition(128,6);

                var menu = cc.Menu.create();
                menu.setPosition(0,0);
                left_bg.addChild(menu);
                // menu.setZOrder(-1);
                for (var i = g_res.img.sce_myc_info_top_2_btn.length - 1; i >= 0; i--) {
                    var item = cc.MenuItemImage.create(g_res.img.sce_myc_info_top_2_btn[i], g_res.img.sce_myc_info_top_2_btn[i],g_res.img.sce_myc_info_top_2_btn_[i],
                        function(sender){
                            var tag = sender.getTag();
                            if (tag == 0) {
                                sender.getParent().getChildByTag(1).setEnabled(true);
                                sender.getParent().getParent().getChildByTag(1).setVisible(false);
                            }else {
                                sender.getParent().getChildByTag(0).setEnabled(true);
                                sender.getParent().getParent().getChildByTag(0).setVisible(false);
                            }
                            sender.setEnabled(false);
                            sender.getParent().getParent().getChildByTag(tag).setVisible(true);
                        }, this);
                    item.setTag(i);
                    menu.addChild(item);
                    item.setAnchorPoint(0,0);
                    item.setPosition(-5 + (item.getContentSize().width - 10) * i, left_bg.getContentSize().height - 22);
                    if (i == 0) {
                        item.setEnabled(false);
                    }

                    var _node = cc.Node.create();
                    _node.setContentSize(380, 422);
                    left_bg.addChild(_node);
                    _node.setPosition(5,10);
                    _node.setTag(i);

                    var _menu = cc.Menu.create();
                    _menu.setPosition(0,0);
                    _node.addChild(_menu);
                    _menu.setZOrder(100);
                    for (var j = 0; j < 9; j++) {
                        var item_bg = cc.Sprite.create(g_res.img.sce_myc_info_top_2_item_bg);
                        _node.addChild(item_bg);
                        item_bg.setAnchorPoint(0, 1);
                        item_bg.setPosition(10 + (item_bg.getContentSize().width) * (j % 3), _node.getContentSize().height - 15 - (item_bg.getContentSize().height + 10) * Math.floor(j / 3));

                        if (i == 0 && g_bagData.item[j]) {
                            var _item = cc.MenuItemImage.create(g_res.img.item[g_bagData.item[j].id], g_res.img.item[g_bagData.item[j].id],
                            function(sender){
                                var tag = sender.getTag()
                                cc.log("item tag:" + tag);
                                sender.getParent().getParent().getParent().getParent().getChildByTag(101).getChildByTag(101).setString(g_bagData.item[tag].name);
                                sender.getParent().getParent().getParent().getParent().getChildByTag(101).getChildByTag(102).setString(g_bagData.item[tag].intro);
                                sender.getParent().getParent().getParent().getParent().getChildByTag(101).getChildByTag(103).setString(g_bagData.item[tag].sell);
                            }, this);
                            _menu.addChild(_item);
                            _item.setAnchorPoint(0.5, 0.5);
                            _item.setTag(j);
                            _item.setPosition(item_bg.getPositionX() + item_bg.getContentSize().width / 2,
                                item_bg.getPositionY() - item_bg.getContentSize().height / 2);
                            var hRatio = 90 / _item.getContentSize().height;
                            var wRatio = 90 / _item.getContentSize().width;
                            var scale = hRatio > wRatio ? wRatio : hRatio;
                            _item.setScale(scale);


                            var countttf_ = cc.LabelTTF.create("X" + g_bagData.item[j].count, "Arial", 30);
                            item_bg.addChild(countttf_);
                            countttf_.setColor(cc.c3b(0,0,0));
                            countttf_.setPosition(item_bg.getContentSize().width / 2 + 1, 10 - 1);
                            countttf_.enableStroke(cc.c3b(0,0,0), 5);

                            var countttf = cc.LabelTTF.create("X" + g_bagData.item[j].count, "Arial", 30);
                            item_bg.addChild(countttf);
                            countttf.setPosition(item_bg.getContentSize().width / 2, 10);
            
                        }else if(i == 1 && g_bagData.zb[j]){
                            var _item = cc.MenuItemImage.create(g_itemData[g_bagData.zb[j].id].path, g_itemData[g_bagData.zb[j].id].path,
                            function(sender){
                                var tag = sender.getTag()
                                cc.log("zb tag:" + tag);
                                sender.getParent().getParent().getParent().getParent().getChildByTag(101).getChildByTag(101).setString(g_bagData.zb[tag].name);
                                sender.getParent().getParent().getParent().getParent().getChildByTag(101).getChildByTag(102).setString(g_bagData.zb[tag].intro);
                                sender.getParent().getParent().getParent().getParent().getChildByTag(101).getChildByTag(103).setString(g_bagData.zb[tag].sell);
                            }, this);
                            _menu.addChild(_item);
                            _item.setAnchorPoint(0.5, 0.5);
                            _item.setTag(j);
                            _item.setPosition(item_bg.getPositionX() + item_bg.getContentSize().width / 2,
                                item_bg.getPositionY() - item_bg.getContentSize().height / 2);
                            var hRatio = 90 / _item.getContentSize().height;
                            var wRatio = 90 / _item.getContentSize().width;
                            var scale = hRatio > wRatio ? wRatio : hRatio;
                            _item.setScale(scale);

                            var countttf_ = cc.LabelTTF.create("X" + g_bagData.zb[j].count, "Arial", 30);
                            item_bg.addChild(countttf_);
                            countttf_.setColor(cc.c3b(0,0,0));
                            countttf_.setPosition(item_bg.getContentSize().width / 2 + 1, 10 - 1);
                            countttf_.enableStroke(cc.c3b(0,0,0), 5);

                            var countttf = cc.LabelTTF.create("X" + g_bagData.zb[j].count, "Arial", 30);
                            item_bg.addChild(countttf);
                            countttf.setPosition(item_bg.getContentSize().width / 2, 10);
                            countttf.enableShadow(cc.size(1,1), 1, 2);
                        }
                        
                    }

                    if (i == 1) {
                        _node.setVisible(false);
                    }
                }

                var right_bg = cc.Sprite.create(g_res.img.sce_myc_info_top_2_right_bg);
                node.addChild(right_bg);
                right_bg.setAnchorPoint(0,0);
                right_bg.setPosition(600, -5);
                right_bg.setTag(101);

                var name = cc.LabelTTF.create(g_bagData.item[0].name, "Arial", 25);
                name.setColor(cc.c3b(0,0,0));
                name.setAnchorPoint(0.5, 0.5);
                name.setPosition(right_bg.getContentSize().width / 2, right_bg.getContentSize().height - 85);
                right_bg.addChild(name);
                name.setTag(101);

                var intro = cc.LabelTTF.create(g_bagData.item[0].intro, "Arial", 25, cc.size(180, 0), cc.TEXT_ALIGNMENT_LEFT);
                intro.setColor(cc.c3b(0,0,0));
                intro.setAnchorPoint(0.5, 1);
                intro.setPosition(right_bg.getContentSize().width / 2, right_bg.getContentSize().height - 136);
                right_bg.addChild(intro);
                intro.setTag(102);

                var price = cc.LabelTTF.create(g_bagData.item[0].sell, "Arial", 35);
                price.setAnchorPoint(0.5, 0.5);
                price.setPosition(108, 78);
                right_bg.addChild(price);
                price.setTag(103);

                var sellMenu = cc.Menu.create();
                sellMenu.setPosition(0,0);
                right_bg.addChild(sellMenu);

                var sellItem = cc.MenuItemImage.create(g_res.img.sce_myc_info_top_2_sell, g_res.img.sce_myc_info_top_2_sell_, function(sender){
                    var dialog = new Dialog();
                    dialog.init(DialogType.temp);
                    this.addChild(dialog);
                }, this);
                sellMenu.addChild(sellItem);
                sellItem.setPosition(right_bg.getContentSize().width / 2, 0);

            }
                break;
            case 3:
            {
                this.createTempNode(0,3,node);
            }
                break;
        }
    },

    createTempNode:function(idx1, idx2, node){
        if (idx1 == 0) {
            var item = cc.MenuItemImage.create(g_res.img.sce_myc_info_top_3_temp[0], g_res.img.sce_myc_info_top_3_temp[0], function(sender){
                var dialog = new Dialog();
                dialog.init(DialogType.temp);
                this.addChild(dialog);
            }, this);
            item.setTag(0);
            var menu = cc.Menu.create(item);
            menu.setPosition(0,0);
            node.addChild(menu);
            item.setAnchorPoint(1, 1);
            item.setPosition(node.getContentSize().width, node.getContentSize().height);
        }else if(idx1 == 1){

            switch (idx2) {
                case 0:
                {
                    var item = cc.MenuItemImage.create(g_res.img.sce_myc_qianqi_top_0_temp[0], g_res.img.sce_myc_qianqi_top_0_temp[0], function(sender){
                        var tag = item.getTag()
                        if (tag < g_res.img.sce_myc_qianqi_top_0_temp.length - 1) {
                            tag ++;
                        }else {
                            tag = 0;
                        }
                        item.setNormalImage(cc.Sprite.create(g_res.img.sce_myc_qianqi_top_0_temp[tag]));
                        item.setSelectedImage(cc.Sprite.create(g_res.img.sce_myc_qianqi_top_0_temp[tag]));
                        item.setTag(tag);
                    }, this);
                    item.setTag(0);
                    var menu = cc.Menu.create(item);
                    menu.setPosition(0,0);
                    node.addChild(menu);
                    item.setAnchorPoint(1, 1);
                    item.setPosition(node.getContentSize().width, node.getContentSize().height);
                }
                    // statements_1
                    break;
                case 1:
                {
                    var item = cc.MenuItemImage.create(g_res.img.sce_myc_qianqi_top_1_temp[0], g_res.img.sce_myc_qianqi_top_1_temp[0], function(sender){
                        var tag = item.getTag()
                        if (tag < g_res.img.sce_myc_qianqi_top_1_temp.length - 1) {
                            tag ++;
                        }else {
                            tag = 0;
                        }
                        cc.log("tag:" + tag);
                        item.setNormalImage(cc.Sprite.create(g_res.img.sce_myc_qianqi_top_1_temp[tag]));
                        item.setSelectedImage(cc.Sprite.create(g_res.img.sce_myc_qianqi_top_1_temp[tag]));
                        item.setTag(tag);
                    }, this);
                    item.setTag(0);
                    var menu = cc.Menu.create(item);
                    menu.setPosition(0,0);
                    node.addChild(menu);
                    item.setAnchorPoint(1, 1);
                    item.setPosition(node.getContentSize().width, node.getContentSize().height);
                }
                    // statements_1
                    break;
                case 2:
                {
                    var item = cc.MenuItemImage.create(g_res.img.sce_myc_qianqi_top_2_temp[0], g_res.img.sce_myc_qianqi_top_2_temp[0], function(sender){
                        var tag = item.getTag()
                        if (tag < g_res.img.sce_myc_qianqi_top_2_temp.length - 1) {
                            tag ++;
                        }else {
                            tag = 0;
                        }
                        item.setNormalImage(cc.Sprite.create(g_res.img.sce_myc_qianqi_top_2_temp[tag]));
                        item.setSelectedImage(cc.Sprite.create(g_res.img.sce_myc_qianqi_top_2_temp[tag]));
                        item.setTag(tag);
                    }, this);
                    item.setTag(0);
                    var menu = cc.Menu.create(item);
                    menu.setPosition(0,0);
                    node.addChild(menu);
                    item.setAnchorPoint(1, 1);
                    item.setPosition(node.getContentSize().width, node.getContentSize().height);
                }
                    // statements_1
                    break;
                case 3:
                {
                    var item = cc.MenuItemImage.create(g_res.img.sce_myc_qianqi_top_3_temp[0], g_res.img.sce_myc_qianqi_top_3_temp[0], function(sender){
                        var dialog = new Dialog();
                        dialog.init(DialogType.temp);
                        this.addChild(dialog);
                    }, this);
                    item.setTag(0);
                    var menu = cc.Menu.create(item);
                    menu.setPosition(0,0);
                    node.addChild(menu);
                    item.setAnchorPoint(1, 1);
                    item.setPosition(node.getContentSize().width, node.getContentSize().height);
                }
                    // statements_1
                    break;
                case 4:
                {
                    var item = cc.MenuItemImage.create(g_res.img.sce_myc_qianqi_top_4_temp[0], g_res.img.sce_myc_qianqi_top_4_temp[0], function(sender){
                        var tag = item.getTag()
                        if (tag < g_res.img.sce_myc_qianqi_top_4_temp.length - 1) {
                            tag ++;
                        }else {
                            tag = 0;
                        }
                        item.setNormalImage(cc.Sprite.create(g_res.img.sce_myc_qianqi_top_4_temp[tag]));
                        item.setSelectedImage(cc.Sprite.create(g_res.img.sce_myc_qianqi_top_4_temp[tag]));
                        item.setTag(tag);
                    }, this);
                    item.setTag(0);
                    var menu = cc.Menu.create(item);
                    menu.setPosition(0,0);
                    node.addChild(menu);
                    item.setAnchorPoint(1, 1);
                    item.setPosition(node.getContentSize().width, node.getContentSize().height);
                }
                    // statements_1
                    break;
            }
            
        }else{
            var item = cc.MenuItemImage.create(g_res.img.sce_myc_tanjiu_temp[0], g_res.img.sce_myc_tanjiu_temp[0], function(sender){
                g_ScenesQ.push(MyCenterScene);
                var newScene = new QianQi3Scene();
                g_director.replaceScene(newScene);
            }, this);
            item.setTag(0);
            var menu = cc.Menu.create(item);
            menu.setPosition(0,0);
            node.addChild(menu);
            item.setAnchorPoint(1, 1);
            item.setPosition(node.getContentSize().width, node.getContentSize().height);
        }
    },
});

var MyCenterScene = cc.Scene.extend({
    ctor:function() {
        this._super();
        cc.associateWithNative( this, cc.Scene );
    },

    onEnter:function () {
        this._super();
        var layer = new MyCenterLayer();
        this.addChild(layer);
        layer.init();
    }
});