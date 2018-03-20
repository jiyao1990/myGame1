var g_director = null;
var g_sex = null;
var g_douNum = 9999999;
var g_preScene = null;
var g_unreadMail = 7;
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