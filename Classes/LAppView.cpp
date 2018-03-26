/**
 *
 *  You can modify and use this source freely
 *  only for the development of application related Live2D.
 *
 *  (c) Live2D Inc. All rights reserved.
 */
#include "LAppView.h"

//Live2D Application
#include "LAppLive2DManager.h"
#include "LAppDefine.h"


using namespace live2d;
using namespace live2d::framework;
USING_NS_CC;

void LAppView::onEnter()
{
	CCSprite::onEnter();

	
	touchMgr=new TouchManager();

	
	deviceToScreen=new L2DMatrix44();

	
	viewMatrix=new L2DViewMatrix();

	CCSize size=CCDirector::sharedDirector()->getWinSize();

	float width=size.width;
	float height=size.height;
	float ratio=(float)height/width;
	float left = VIEW_LOGICAL_LEFT;
	float right = VIEW_LOGICAL_RIGHT;
	float bottom = -ratio;
	float top = ratio;

	viewMatrix->setScreenRect(left,right,bottom,top);


	float screenW=abs(left-right);
	deviceToScreen->multTranslate(-width/2.0f,-height/2.0f );
	deviceToScreen->multScale( screenW/width , -screenW/width );

	
	viewMatrix->setMaxScale( VIEW_MAX_SCALE );
	viewMatrix->setMinScale( VIEW_MIN_SCALE );

	
	viewMatrix->setMaxScreenRect(
								 VIEW_LOGICAL_MAX_LEFT,
								 VIEW_LOGICAL_MAX_RIGHT,
								 VIEW_LOGICAL_MAX_BOTTOM,
								 VIEW_LOGICAL_MAX_TOP
								 );


//    CCTouchDispatcher* dispatcher=CCDirector::sharedDirector()->getTouchDispatcher();
//
//    dispatcher->addStandardDelegate(this, 0);
}


void LAppView::onExit()
{
	CCSprite::onExit();

	delete touchMgr;
	delete deviceToScreen;
	delete viewMatrix;

	CCTouchDispatcher* dispatcher=CCDirector::sharedDirector()->getTouchDispatcher();

	dispatcher->removeDelegate(this);
}


void LAppView::draw()
{
	LAppLive2DManager* Live2DMgr=LAppLive2DManager::getInstance();
	Live2DMgr->onUpdate();

}


void LAppView::mTouchBegan(cocos2d::CCPoint pos) {

    CCPoint pt =  pos;
    if(LAppDefine::DEBUG_TOUCH_LOG)CCLog( "touchesBegan x:%.0f y:%.0f",pt.x,pt.y);
    touchMgr->touchesBegan(pt.x,pt.y);
}

void LAppView::mTouchMoved(cocos2d::CCPoint pos) {
    
	float screenX=this->transformScreenX(touchMgr->getX());
	float screenY=this->transformScreenY(touchMgr->getY());
	float viewX=this->transformViewX(touchMgr->getX());
	float viewY=this->transformViewY(touchMgr->getY());


    CCPoint pt =  pos;

    if(LAppDefine::DEBUG_TOUCH_LOG)CCLog( "touchesMoved device{x:%.0f y:%.0f} screen{x:%.2f y:%.2f} view{x:%.2f y:%.2f}",pt.x,pt.y,screenX,screenY,viewX,viewY);
    touchMgr->touchesMoved(pt.x,pt.y);
	LAppLive2DManager* live2DMgr=LAppLive2DManager::getInstance();
	live2DMgr->onDrag(viewX, viewY);
}

void LAppView::mTouchEnded(cocos2d::CCPoint pos) {
    
    LAppLive2DManager* live2DMgr=LAppLive2DManager::getInstance();
	live2DMgr->onDrag(0, 0);

    float x = deviceToScreen->transformX( touchMgr->getX() );
    float y = deviceToScreen->transformY( touchMgr->getY() );
    if (LAppDefine::DEBUG_LOG) CCLog( "touchesEnded x:%.2f y:%.2f",x,y);
    live2DMgr->onTap(x,y);
}


void LAppView::updateViewMatrix(float dx ,float dy ,float cx ,float cy ,float scale)
{
	bool isMaxScale=viewMatrix->isMaxScale();
	bool isMinScale=viewMatrix->isMinScale();

	LAppLive2DManager* live2DMgr=LAppLive2DManager::getInstance();

	
	viewMatrix->adjustScale(cx, cy, scale);

	
	viewMatrix->adjustTranslate(dx, dy) ;

	live2DMgr->setViewMatrix(viewMatrix);

	
	if( ! isMaxScale)
	{
		if(viewMatrix->isMaxScale())
		{
//			delegate->maxScaleEvent();
		}
	}
	
	if( ! isMinScale)
	{
		if(viewMatrix->isMinScale())
		{
//			delegate->minScaleEvent();
		}
	}

}


float LAppView::transformViewX(float deviceX)
{
	float screenX = deviceToScreen->transformX( deviceX );
	return  viewMatrix->invertTransformX(screenX);
}


float LAppView::transformViewY(float deviceY)
{
	float screenY = deviceToScreen->transformY( deviceY );
	return  viewMatrix->invertTransformY(screenY);
}


float LAppView::transformScreenX(float deviceX)
{
	return  deviceToScreen->transformX( deviceX );
}


float LAppView::transformScreenY(float deviceY)
{
	return  deviceToScreen->transformY( deviceY );
}

LAppView* LAppView::create()
{
    LAppView *pSprite = new LAppView();
    if (pSprite && pSprite->init())
    {
        pSprite->autorelease();
        return pSprite;
    }
    CC_SAFE_DELETE(pSprite);
    return NULL;
}
