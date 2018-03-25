/**
 *
 *  You can modify and use this source freely
 *  only for the development of application related Live2D.
 *
 *  (c) Live2D Inc. All rights reserved.
 */
#pragma once


//Live2D framework
#include "L2DMatrix44.h"
#include "L2DTargetPoint.h"
#include "L2DViewMatrix.h"
#include "cocos2d.h"
#include "TouchManager.h"

class LAppLive2DManager;

class LAppView :public cocos2d::CCSprite ,public cocos2d::CCTouchDelegate
{    
public:
    static LAppView* create();
    
	LAppView(){}
	~LAppView(){}
	virtual void onEnter();
	virtual void onExit();
	virtual void draw();
	
	void ccTouchesBegan(cocos2d::CCSet *touches, cocos2d::CCEvent *event);
    void ccTouchesMoved(cocos2d::CCSet *touches, cocos2d::CCEvent *event);
    void ccTouchesEnded(cocos2d::CCSet *touches, cocos2d::CCEvent *event);
	
	void updateViewMatrix(float dx ,float dy ,float cx ,float cy ,float scale);
	float transformViewX(float deviceX);
	float transformViewY(float deviceY);
	float transformScreenX(float deviceX);
	float transformScreenY(float deviceY);
private:
	TouchManager* touchMgr;
	live2d::framework::L2DMatrix44* deviceToScreen;
    live2d::framework::L2DViewMatrix* viewMatrix;
};
