/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org

 http://www.cocos2d-x.org


 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

// boot code needed for cocos2d + JS bindings.
// Not needed by cocos2d-html5

require("jsb.js");

var appFiles = [
    'src/resource.js',
    'src/myApp.js',
    'src/utils/constant.js',
    'src/utils/Globals.js',
    'src/utils/AutoFitNode.js',

    'src/scenes/EmailScene.js',
    'src/scenes/JackpotScene.js',
    'src/scenes/MainScene.js',
    'src/scenes/MyCenterScene.js',
    'src/scenes/MyHouseScene.js',
    'src/scenes/ParentsScene.js',
    'src/scenes/QianQiScene.js',
    'src/scenes/QianQi2Scene.js',
    'src/scenes/QianQi3Scene.js',
    'src/scenes/ShopScene.js',
    'src/scenes/SignInScene.js',
    'src/scenes/SiWeiScene.js',
    'src/scenes/TanJiuScene.js',
    'src/scenes/TanJiu2Scene.js',
    

    'src/dialog/Dialog.js'
];

cc.dumpConfig();

for( var i=0; i < appFiles.length; i++) {
    require( appFiles[i] );
}

g_director = cc.Director.getInstance();
g_director.setDisplayStats(true);

// set FPS. the default value is 1.0/60 if you don't call this
g_director.setAnimationInterval(1.0 / 60);

// create a scene. it's an autorelease object
var myScene = new MainScene();

// run
g_director.runWithScene(myScene);

