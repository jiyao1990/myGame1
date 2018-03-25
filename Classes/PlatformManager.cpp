/**
 *  You can modify and use this source freely
 *  only for the development of application related Live2D.
 *
 *  (c) Live2D Inc. All rights reserved.
 */
#include "PlatformManager.h"
#include "cocos2d.h"

#include "Live2DModelOpenGL.h"
#include "util/UtDebug.h"
#include "LAppTextureDesc.h"

PlatformManager::PlatformManager(void)
{
}


PlatformManager::~PlatformManager(void)
{
}


unsigned char* PlatformManager::loadBytes(const char* path,size_t* size)
{
	unsigned char* buf = cocos2d::CCFileUtils::sharedFileUtils()->getFileData(path,"rb",(unsigned long*) size);
	return buf;
}

void PlatformManager::releaseBytes(void* data)
{
	delete[] (unsigned char*)data;
}

live2d::ALive2DModel* PlatformManager::loadLive2DModel(const char* path)
{
	size_t size;
	unsigned char* buf = loadBytes(path,&size);
	
	//Create Live2D Model Instance
	live2d::ALive2DModel* live2DModel = live2d::Live2DModelOpenGL::loadModel(buf,(int)size);
    return live2DModel;
}

live2d::framework::L2DTextureDesc* PlatformManager::loadTexture(live2d::ALive2DModel* model, int no, const char* path)
{
	cocos2d::CCTexture2D *texture = new cocos2d::CCTexture2D();
	cocos2d::CCImage *img = new cocos2d::CCImage();

	img->initWithImageFile(path);
	texture->initWithImage(img);

	int glTexNo = texture->getName() ;
	texture->generateMipmap();
	cocos2d::ccTexParams texParams = { GL_LINEAR_MIPMAP_LINEAR, GL_LINEAR_MIPMAP_LINEAR, GL_CLAMP_TO_EDGE, GL_CLAMP_TO_EDGE };
	texture->setTexParameters(&texParams);

	((live2d::Live2DModelOpenGL*)model)->setTexture( no , glTexNo ) ;


	LAppTextureDesc* textureDesc=new LAppTextureDesc(texture);

	return textureDesc;
}

void PlatformManager::log(const char* txt)
{
	live2d::UtDebug::print(txt);
}
