//
//  jsb_live2d.cpp
//  MyGame
//
//  Created by Jiyao on 2018/3/14.
//

#include "jsb_live2d.hpp"
#include "ScriptingCore.h"
#include "cocos2d_specifics.hpp"
#include "js_manual_conversions.h"
#include "js_bindings_chipmunk_auto_classes.h"
#include "LAppView.h"

JSClass  *js_cocos2dx_Live2DSprite_class;
JSObject *js_cocos2dx_Live2DSprite_prototype;

void js_cocos2dx_Live2DSprite_finalize(JSFreeOp *fop, JSObject *obj) {
    CCLOG("jsbindings: finalizing JS object %p (Live2DSprite)", obj);
}

JSBool js_cocos2dx_extension_Live2DSprite_constructor(JSContext *cx, uint32_t argc, jsval *vp)
{
    jsval *argv = JS_ARGV(cx, vp);
    
    if (argc == 1 || argc == 2)
    {
        
        std::string url;
        
        do {
            JSBool ok = jsval_to_std_string(cx, argv[0], &url);
            JSB_PRECONDITION2( ok, cx, JS_FALSE, "Error processing arguments");
        } while (0);
        
        JSObject *obj = JS_NewObject(cx, js_cocos2dx_Live2DSprite_class, js_cocos2dx_Live2DSprite_prototype, NULL);
        
        
        LAppView* cobj = new LAppView();
        
        // link the native object with the javascript object
        js_proxy_t *p = jsb_new_proxy(cobj, obj);
        JS_AddNamedObjectRoot(cx, &p->obj, "LAppView");
        
        JS_SET_RVAL(cx, vp, OBJECT_TO_JSVAL(obj));
        return JS_TRUE;
    }
    
    JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 0);
    return JS_FALSE;
}


JSBool js_cocos2dx_Live2DSprite_create(JSContext *cx, uint32_t argc, jsval *vp)
{
    jsval *argv = JS_ARGV(cx, vp);
    JSBool ok = JS_TRUE;
    do {
        if (argc == 0) {
            LAppView* ret = LAppView::create();
            jsval jsret;
            do {
                if (ret) {
                    js_proxy_t *proxy = js_get_or_create_proxy<cocos2d::CCSprite>(cx, ret);
                    jsret = OBJECT_TO_JSVAL(proxy->obj);
                } else {
                    jsret = JSVAL_NULL;
                }
            } while (0);
            JS_SET_RVAL(cx, vp, jsret);
            return JS_TRUE;
        }
    } while (0);
    JS_ReportError(cx, "wrong number of arguments");
    return JS_FALSE;
}

void register_jsb_Live2DSprite(JSContext *cx, JSObject *global) {
    
    js_cocos2dx_Live2DSprite_class = (JSClass *)calloc(1, sizeof(JSClass));
    js_cocos2dx_Live2DSprite_class->name = "LAppView";
    js_cocos2dx_Live2DSprite_class->addProperty = JS_PropertyStub;
    js_cocos2dx_Live2DSprite_class->delProperty = JS_PropertyStub;
    js_cocos2dx_Live2DSprite_class->getProperty = JS_PropertyStub;
    js_cocos2dx_Live2DSprite_class->setProperty = JS_StrictPropertyStub;
    js_cocos2dx_Live2DSprite_class->enumerate = JS_EnumerateStub;
    js_cocos2dx_Live2DSprite_class->resolve = JS_ResolveStub;
    js_cocos2dx_Live2DSprite_class->convert = JS_ConvertStub;
    js_cocos2dx_Live2DSprite_class->finalize = js_cocos2dx_Live2DSprite_finalize;
    js_cocos2dx_Live2DSprite_class->flags = JSCLASS_HAS_RESERVED_SLOTS(2);
    
    static JSFunctionSpec funcs[] = {
        JS_FS_END
    };
    
    static JSFunctionSpec st_funcs[] = {
        JS_FN("create",js_cocos2dx_Live2DSprite_create, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FS_END
    };
    
    js_cocos2dx_Live2DSprite_prototype = JS_InitClass(
                                                   cx, global,
                                                   NULL,
                                                   js_cocos2dx_Live2DSprite_class,
                                                   js_cocos2dx_extension_Live2DSprite_constructor, 0, // constructor
                                                   NULL,
                                                   funcs,
                                                   NULL, // no static properties
                                                   st_funcs);
    
    JSObject* jsclassObj = JSVAL_TO_OBJECT(anonEvaluate(cx, global, "(function () { return LAppView; })()"));
    
    // make the class enumerable in the registered namespace
    JSBool found;
    JS_SetPropertyAttributes(cx, global, "Live2DSprite", JSPROP_ENUMERATE | JSPROP_READONLY, &found);
}
