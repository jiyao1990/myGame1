	

#include "SampleLive2DSprite.h"
#include "CCDirector.h"
#include "util/UtSystem.h"

#include "graphics/DrawProfileCocos2D.h"
#include "platform/CCFileUtils.h"
#include "platform/CCImage.h"

using namespace live2d;
using namespace cocos2d;

SampleLive2DSprite::SampleLive2DSprite()
{
	//Live2D Sample
	const char* MODEL = "res/live2d/haru.moc" ;
	const char* TEXTURES[] ={
		"res/live2d/texture_00.png" ,
		"res/live2d/texture_01.png" ,
		"res/live2d/texture_02.png" ,
		NULL
	} ;
	unsigned char* buf;
	unsigned long bufSize;
	buf = CCFileUtils::sharedFileUtils()->getFileData(MODEL,"rb", &bufSize);
	
	live2DModel = Live2DModelOpenGL::loadModel( buf,bufSize ) ;
	
	for( int i = 0 ; TEXTURES[i] != NULL ; i++ ){
		CCTexture2D *texture = new CCTexture2D();
		CCImage *img = new CCImage();

		img->initWithImageFile(TEXTURES[i]);
		texture->initWithImage(img);

		int glTexNo = texture->getName() ;
		texture->generateMipmap();
		ccTexParams texParams = { GL_LINEAR_MIPMAP_LINEAR, GL_LINEAR_MIPMAP_LINEAR, GL_CLAMP_TO_EDGE, GL_CLAMP_TO_EDGE };
		texture->setTexParameters(&texParams);
		live2DModel->setTexture( i , glTexNo ) ;
		textures.push_back( texture ) ;
	}
	
	
	float w = CCDirector::sharedDirector()->getWinSize().width;
	float h = CCDirector::sharedDirector()->getWinSize().height;
	float scx = 2.0 / live2DModel->getCanvasWidth() ;
	float scy = -2.0 / live2DModel->getCanvasWidth() * (w/h);
	float x = -1 ;
	float y = 1 ;
	float matrix []= {
		scx , 0 , 0 , 0 ,
		0 , scy ,0 , 0 ,
		0 , 0 , 1 , 0 ,
		x , y , 0 , 1
	} ;
	live2DModel->setMatrix(matrix) ;
}

SampleLive2DSprite::~SampleLive2DSprite()
{
	delete live2DModel;
	
	for (int i=0; i<textures.size(); i++)
	{
		delete textures[i];
	}
}

void SampleLive2DSprite::draw()
{
	
	double t = (UtSystem::getUserTimeMSec()/1000.0) * 2 * M_PI  ;
	double cycle=3.0;
	double value=sin( t/cycle );
	live2DModel->setParamFloat( "PARAM_ANGLE_X" , (float) (30 * value) ) ;



	
	
	
	
	
	live2d::DrawProfileCocos2D::preDraw();
	
	live2DModel->update() ;
	live2DModel->draw() ;
	
	live2d::DrawProfileCocos2D::postDraw() ;
}

SampleLive2DSprite* SampleLive2DSprite::create()
{
    SampleLive2DSprite *pSprite = new SampleLive2DSprite();
    if (pSprite && pSprite->init())
    {
        pSprite->autorelease();
        return pSprite;
    }
    CC_SAFE_DELETE(pSprite);
    return NULL;
}
