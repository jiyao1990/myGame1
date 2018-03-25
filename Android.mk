LOCAL_PATH := $(call my-dir)

include $(CLEAR_VARS)
LOCAL_MODULE := cocos2djs_shared

LOCAL_MODULE_FILENAME := libcocos2djs

LOCAL_SRC_FILES := hellojavascript/main.cpp \
                   ../../Classes/AppDelegate.cpp \
                   ../../Classes/framework/L2DBaseModel.cpp \
                   ../../Classes/framework/L2DExpressionMotion.cpp \
                   ../../Classes/framework/L2DEyeBlink.cpp \
                   ../../Classes/framework/L2DMatrix44.cpp \
                   ../../Classes/framework/L2DModelMatrix.cpp \
                   ../../Classes/framework/L2DMotionManager.cpp \
                   ../../Classes/framework/L2DPhysics.cpp \
                   ../../Classes/framework/L2DPose.cpp \
                   ../../Classes/framework/L2DTargetPoint.cpp \
                   ../../Classes/framework/L2DTextureDesc.cpp \
                   ../../Classes/framework/L2DViewMatrix.cpp \
                   ../../Classes/framework/Live2DFramework.cpp \
                   ../../Classes/SampleLive2DSprite.cpp \
                   ../../Classes/jsb_live2d.cpp \
                   ../../Classes/LAppLive2DManager.cpp \
                   ../../Classes/LAppModel.cpp \
                   ../../Classes/LAppTextureDesc.cpp \
                   ../../Classes/LAppView.cpp \
                   ../../Classes/PlatformManager.cpp \
                   ../../Classes/TouchManager.cpp


LOCAL_C_INCLUDES := $(LOCAL_PATH)/../../Classes \
					$(LOCAL_PATH)/../../Classes/framework

LOCAL_WHOLE_STATIC_LIBRARIES := cocos2dx_static
LOCAL_WHOLE_STATIC_LIBRARIES += cocosdenshion_static
LOCAL_WHOLE_STATIC_LIBRARIES += chipmunk_static
LOCAL_WHOLE_STATIC_LIBRARIES += spidermonkey_static
LOCAL_WHOLE_STATIC_LIBRARIES += scriptingcore-spidermonkey
LOCAL_WHOLE_STATIC_LIBRARIES += liblive2d

LOCAL_EXPORT_CFLAGS := -DCOCOS2D_DEBUG=2 -DCOCOS2D_JAVASCRIPT

LOCAL_CPPFLAGS := -DL2D_TARGET_ANDROID_ES2

include $(BUILD_SHARED_LIBRARY)

$(call import-module,cocos2dx)
$(call import-module,CocosDenshion/android)
$(call import-module,external/chipmunk)
$(call import-module,external/live2d)
$(call import-module,scripting/javascript/spidermonkey-android)
$(call import-module,scripting/javascript/bindings)

