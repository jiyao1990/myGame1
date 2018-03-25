var g_director = null;
var g_sex = null;
var g_douNum = 9999999;
var g_preScene = null;
var g_unreadMail = 7;
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
}

function randomNum(minNum,maxNum){ 
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
} 