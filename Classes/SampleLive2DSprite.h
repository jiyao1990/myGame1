/**
 *  SampleLive2DSprite.h
 *  sampleCocos2dx
 */

#ifndef __sampleCocos2dx__SampleLive2DSprite__
#define __sampleCocos2dx__SampleLive2DSprite__

#include "sprite_nodes/CCSprite.h"
#include <vector>
#include "Live2DModelOpenGL.h"

class SampleLive2DSprite :public cocos2d::CCSprite {
	
	live2d::Live2DModelOpenGL* live2DModel ;
	std::vector<cocos2d::CCTexture2D*> textures ;
	
public:
    static SampleLive2DSprite* create();
	SampleLive2DSprite();
	~SampleLive2DSprite();
	virtual void draw();
};

#endif /* defined(__sampleCocos2dx__SampleLive2DSprite__) */
