var getListPath = function(pre, rear, count)
{
    var list = [];
    for (var i = 0; i < count; i++) {
        list[i] = pre + i + rear;
    }
    return list;
};

var g_res = {
    //image
    img : {
        gen_miss_img : "res/general/miss_img.png",
    	gen_back : "res/general/back.png",
    	gen_back_ : "res/general/back_.png",
        gen_personal : "res/general/personal.png",
        gen_personal_ : "res/general/personal_.png",
        gen_dou_bg : "res/general/dou_bg.png",
        gen_dou : "res/general/dou.png",
        gen_bg : "res/general/bg.png",
        gen_hide : "res/general/hide.png",
        gen_hide_ : "res/general/hide_.png",
        gen_title_bg : "res/general/title_bg.png",
        gen_role : getListPath("res/general/role/", ".png", 13),

        dia_bg : "res/dialog/dialog_bg.png",
        dia_btn_ok : "res/dialog/btn_ok.png",
        dia_sex_dialog_tip : "res/dialog/sex/dialog_tip.png",
        dia_sex_dialog_head0 : "res/dialog/sex/dialog_head0.png",
        dia_sex_dialog_head1 : "res/dialog/sex/dialog_head1.png",
        dia_getitem_get_bg : "res/dialog/getitem/get_bg.png",
        dia_getitem10_get10_bg : "res/dialog/getitem10/get10_bg.png",
        dia_getitem10_get_item_bg : "res/dialog/getitem10/get_item_bg.png",
        dia_shop_0_bg : "res/dialog/shop_0/bg.png",
        dia_shop_0_buy_ : "res/dialog/shop_0/buy_.png",
        dia_shop_0_buy : "res/dialog/shop_0/buy.png",
        dia_shop_0_close_ : "res/dialog/shop_0/close_.png",
        dia_shop_0_close : "res/dialog/shop_0/close.png",
        dia_shop_1_content : "res/dialog/shop_1/content.png",
        dia_shop_1_btn_buy_ : "res/dialog/shop_1/btn_buy_.png",
        dia_shop_1_btn_buy : "res/dialog/shop_1/btn_buy.png",
        dia_shop_1_btn_giveup_ : "res/dialog/shop_1/btn_giveup_.png",
        dia_shop_1_btn_giveup : "res/dialog/shop_1/btn_giveup.png",


        sce_jac_bg : "res/scenes/jackpotScene/bg.png",
        sce_jac_bg_0 : "res/scenes/jackpotScene/bg_0.png",
        sce_jac_bg_1 : "res/scenes/jackpotScene/bg_1.png",
        sce_jac_gift_close : "res/scenes/jackpotScene/gift_close.png",
        sce_jac_gift_open : "res/scenes/jackpotScene/gift_open.png",
        sce_jac_btn_get : "res/scenes/jackpotScene/btn_get.png",
        sce_jac_btn_get_ : "res/scenes/jackpotScene/btn_get_.png",
        sce_jac_btn_get10 : "res/scenes/jackpotScene/btn_get10.png",
        sce_jac_btn_get10_ : "res/scenes/jackpotScene/btn_get10_.png",

        sce_mai_left : getListPath("res/scenes/mainScene/left_", ".png", 3),
        sce_mai_left_ : getListPath("res/scenes/mainScene/left_", "_.png", 3),
        sce_mai_bottom : getListPath("res/scenes/mainScene/bottom_", ".png", 4),
        sce_mai_bottom_ : getListPath("res/scenes/mainScene/bottom_", "_.png", 4),
        sce_mai_bottom_2_0 : "res/scenes/mainScene/bottom_2_0.png",
        sce_mai_bottom_2_1 : "res/scenes/mainScene/bottom_2_1.png",
        sce_mai_email : "res/scenes/mainScene/email.png",
        sce_mai_email_ : "res/scenes/mainScene/email_.png",
        sce_mai_red_dot : "res/scenes/mainScene/red_dot.png",
        sce_mai_parent : "res/scenes/mainScene/parent.png",
        sce_mai_parent_ : "res/scenes/mainScene/parent_.png",

        sce_myh_left : getListPath("res/scenes/myHouseScene/left_", ".png", 4),
        sce_myh_left_ : getListPath("res/scenes/myHouseScene/left_", "_.png", 4),
        sce_myh_left_bg_0 : "res/scenes/myHouseScene/left_bg_0.png",
        sce_myh_left_bg_1 : "res/scenes/myHouseScene/left_bg_1.png",
        sce_myh_bottom_bg : "res/scenes/myHouseScene/bottom_bg.png",
        sce_myh_ok : "res/scenes/myHouseScene/ok.png",
        sce_myh_ok_ : "res/scenes/myHouseScene/ok_.png",
        sce_myh_left_btn : getListPath("res/scenes/myHouseScene/left_btn_", ".png", 11),
        sce_myh_left_btn_ : getListPath("res/scenes/myHouseScene/left_btn_", "_.png", 11),

        sce_sig_bg : "res/scenes/signInScene/bg.png",
        sce_sig_box : "res/scenes/signInScene/box.png",
        sce_sig_item_bg : "res/scenes/signInScene/item_bg.png",
        sce_sig_num : "res/scenes/signInScene/num.png",
        sce_sig_btn_buy : "res/scenes/signInScene/btn_buy.png",
        sce_sig_btn_buy_ : "res/scenes/signInScene/btn_buy_.png",
        sce_sig_title : "res/scenes/signInScene/title.png",
        sce_sig_btn_buqian : "res/scenes/signInScene/btn_buqian.png",
        sce_sig_btn_buqian_ : "res/scenes/signInScene/btn_buqian_.png",
        sce_sig_text_tips : "res/scenes/signInScene/text_tips.png",
        sce_sig_text_time : "res/scenes/signInScene/text_time.png",
        
        sce_myc_bg : "res/scenes/myCenterScene/bg.png",
        sce_myc_center_bg : "res/scenes/myCenterScene/center_bg.png",
        sce_myc_title : "res/scenes/myCenterScene/title.png",
        sce_myc_left : getListPath("res/scenes/myCenterScene/left_", ".png", 3),
        sce_myc_left_ : getListPath("res/scenes/myCenterScene/left_", "_.png", 3),
        sce_myc_info_top : getListPath("res/scenes/myCenterScene/info/top_", "_.png", 4),
        sce_myc_info_top_ : getListPath("res/scenes/myCenterScene/info/top_", "_.png", 4),
        sce_myc_tanjiu_top : getListPath("res/scenes/myCenterScene/tanjiu/top_", ".png", 5),
        sce_myc_tanjiu_top_ : getListPath("res/scenes/myCenterScene/tanjiu/top_", "_.png", 5),
        sce_myc_qianqi_top : getListPath("res/scenes/myCenterScene/qianqi/top_", ".png", 1),
        sce_myc_qianqi_top_ : getListPath("res/scenes/myCenterScene/qianqi/top_", "_.png", 1),
        
        sce_tan_bg : "res/scenes/tanJiuScene/bg.png",
        sce_tan_title : "res/scenes/tanJiuScene/title.png",
        sce_tan_earth : "res/scenes/tanJiuScene/earth.png",
        sce_tan_ch_bg : "res/scenes/tanJiuScene/ch_bg.png",
        sce_tan_item : getListPath("res/scenes/tanJiuScene/item_", ".png", 4),
        sce_tan_item_ : "res/scenes/tanJiuScene/item_0_.png",

        sce_mail_bg : "res/scenes/mailScene/bg.png",
        sce_mail_btn_del_ : "res/scenes/mailScene/btn_del_.png",
        sce_mail_btn_del : "res/scenes/mailScene/btn_del.png",
        sce_mail_btn_get_ : "res/scenes/mailScene/btn_get_.png",
        sce_mail_btn_get : "res/scenes/mailScene/btn_get.png",
        sce_mail_left_bg_0 : "res/scenes/mailScene/left_bg_0.png",
        sce_mail_left_bg_1 : "res/scenes/mailScene/left_bg_1.png",
        sce_mail_mail_bg_0 : "res/scenes/mailScene/mail_bg_0.png",
        sce_mail_mail_bg_1 : "res/scenes/mailScene/mail_bg_1.png",
        sce_mail_right_bg : "res/scenes/mailScene/right_bg.png",
        sce_mail_title : "res/scenes/mailScene/title.png",

        sce_sho_bg : "res/scenes/shopScene/bg.png",
        sce_sho_title : "res/scenes/shopScene/title.png",
        sce_sho_item_bg: "res/scenes/shopScene/item_bg.png",
        sce_sho_up: "res/scenes/shopScene/up.png",
        sce_sho_down: "res/scenes/shopScene/down.png",

        sce_qia_bg:"res/scenes/qianQiScene/bg.png",
        sce_qia_box:"res/scenes/qianQiScene/box.png",
        sce_qia_btn:getListPath("res/scenes/qianQiScene/btn_", ".png", 5),
        sce_qia_btn_:getListPath("res/scenes/qianQiScene/btn_", "_.png", 5),
        sce_qia_dot_:"res/scenes/qianQiScene/dot_.png",
        sce_qia_dot:"res/scenes/qianQiScene/dot.png",
        sce_qia_item_bg_:"res/scenes/qianQiScene/item_bg_.png",
        sce_qia_item_bg:"res/scenes/qianQiScene/item_bg.png",
        sce_qia_search_:"res/scenes/qianQiScene/search_.png",
        sce_qia_search:"res/scenes/qianQiScene/search.png",
        sce_qia_search_bg:"res/scenes/qianQiScene/search_bg.png",
        sce_qia_slider_bar:"res/scenes/qianQiScene/slider_bar.png",
        sce_qia_slider_contrl:"res/scenes/qianQiScene/slider_contrl.png",
        sce_qia_right_bg:"res/scenes/qianQiScene/right_bg.png",
        sce_qia_top:getListPath("res/scenes/qianQiScene/top_", ".png", 2),
        sce_qia_top_:getListPath("res/scenes/qianQiScene/top_", "_.png", 2),
    },
    //plist
    plist : {
        click : "res/particle/click.plist",
    },
    //fnt

    //tmx

    //bgm

    //effect
    
    //txt
    txt : {

    },
};

var getMissImg = function(size)
{
    var sp = cc.Sprite.create(g_res.img.gen_miss_img);
    if (size) {
        sp.setScaleX(size.width / sp.getContentSize().width);
        sp.setScaleY(size.height / sp.getContentSize().height);
    }

    return sp;
}
