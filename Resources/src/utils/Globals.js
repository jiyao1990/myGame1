var g_director = null;
var g_sex = null;
var g_douNum = 999999;
var g_preScene = null;
var g_unreadMail = 7;
var g_name = "用户昵称";
var g_age = 12;
var g_ScenesQ = [];
var g_zbInfo = [
	[
		{"type":0, "idx":0, "isLock":false},
		{"type":1, "idx":0, "isLock":false},
		{"type":1, "idx":1, "isLock":false},
		{"type":2, "idx":0, "isLock":false},
		{"type":3, "idx":0, "isLock":false},
		{"type":4, "idx":0, "isLock":false},
		{"type":5, "idx":0, "isLock":false},
		{"type":6, "idx":0, "isLock":false},
		{"type":7, "idx":0, "isLock":false},
		{"type":8, "idx":0, "isLock":false},
		{"type":8, "idx":1, "isLock":false},
		{"type":8, "idx":2, "isLock":false},
		{"type":8, "idx":3, "isLock":false},
		{"type":8, "idx":4, "isLock":false},
		{"type":8, "idx":5, "isLock":false},
		{"type":9, "idx":0, "isLock":false},
	],
];
var g_zbNowInfo = [
	//{path:'', pos:[], zoder:0},
];

var g_itemData = [
	{id:0, path:"res/scenes/myHouseScene/zb_0/0_0.png"},
	{id:1, path:"res/scenes/myHouseScene/zb_0/1_0.png"},
	{id:2, path:"res/scenes/myHouseScene/zb_0/1_1.png"},
	{id:3, path:"res/scenes/myHouseScene/zb_0/2_0.png"},
	{id:4, path:"res/scenes/myHouseScene/zb_0/3_0.png"},
	{id:5, path:"res/scenes/myHouseScene/zb_0/4_0.png"},
	{id:6, path:"res/scenes/myHouseScene/zb_0/5_0.png"},
	{id:7, path:"res/scenes/myHouseScene/zb_0/6_0.png"},
	{id:8, path:"res/scenes/myHouseScene/zb_0/7_0.png"},
	{id:9, path:"res/scenes/myHouseScene/zb_0/8_0.png"},
	{id:10, path:"res/scenes/myHouseScene/zb_0/8_1.png"},
	{id:11, path:"res/scenes/myHouseScene/zb_0/8_2.png"},
	{id:12, path:"res/scenes/myHouseScene/zb_0/8_3.png"},
	{id:13, path:"res/scenes/myHouseScene/zb_0/8_4.png"},
	{id:14, path:"res/scenes/myHouseScene/zb_0/8_5.png"},
	{id:15, path:"res/scenes/myHouseScene/zb_0/9_0.png"},
];

var g_bagData = {
	item : [
		{id:0, name:"道具1", intro:"道具1介绍道具1介绍道具1介绍道具1介绍道具1介绍", count:999, sell:100},
		{id:1, name:"道具2", intro:"道具1介绍道具1介绍道具1介绍道具1介绍道具1介绍", count:555, sell:200},
		{id:2, name:"道具3", intro:"道具1介绍道具1介绍道具1介绍道具1介绍道具1介绍", count:333, sell:300},
	],
	zb : [
		{id:3, name:"装饰1", intro:"装饰1介绍装饰1介绍装饰1介绍装饰1介绍装饰1介绍", count:1, sell:1000},
		{id:6, name:"装饰2", intro:"装饰2介绍装饰2介绍装饰2介绍装饰2介绍装饰2介绍", count:1, sell:2000},
		{id:8, name:"装饰3", intro:"装饰3介绍装饰3介绍装饰3介绍装饰3介绍装饰3介绍", count:1, sell:3000},
	],
} 

var g_zbRoom = function(parent){
	cc.log("装扮：" + g_zbNowInfo.length);
	if (g_zbNowInfo.length > 0) {
		for (var i = g_zbNowInfo.length - 1; i >= 0; i--) {
			var sp = cc.Sprite.create(g_zbNowInfo[i].path);
			parent.addChild(sp);
			sp.setTag(g_zbNowInfo[i].tag);
			sp.setPosition(g_zbNowInfo[i].pos);
			sp.setZOrder(g_zbNowInfo[i].zoder);
			sp.setAnchorPoint(g_zbNowInfo[i].anchor);
		}
	}
};

var randomNum = function (minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
            default: 
                return 0; 
            break; 
    } 
};

var g_date = new Date();