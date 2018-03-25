var scaleMode = {
	FitOut:1,
	FitIn:2
}

var fitScaleIn;
var fitScaleOut;

var AutoFitNode = cc.Node.extend({
	ctor:function(mode){
		this._super();
		this.init();
		var winSize = g_director.getWinSize();
		cc.log(default_winSize);
		var hRatio = winSize.height / default_winSize.height;
		var wRatio = winSize.width / default_winSize.width;
		fitScaleIn = hRatio > wRatio ? wRatio : hRatio;
		fitScaleOut = hRatio < wRatio ? wRatio : hRatio;
		if (mode == 1) {
			this.setScale(fitScaleOut);
		}else{
			this.setScale(fitScaleIn);
		}
	},
});

AutoFitNode.create = function (mode) {
	var node = new AutoFitNode(mode);
	return node;
};