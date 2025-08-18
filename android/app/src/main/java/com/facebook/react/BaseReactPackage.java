package com.facebook.react;

import com.facebook.react.bridge.ModuleSpec;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.model.ReactModuleInfoProvider;
import com.facebook.react.uimanager.ViewManager;

import java.util.List;

/**
 * Minimal compatibility stub for BaseReactPackage to satisfy third-party modules during compilation.
 * This is intentionally small and only exists to unblock builds when the real RN core classes
 * are not available on the classpath. Remove once the proper RN Android artifacts provide
 * these symbols.
 */
public abstract class BaseReactPackage {
  public BaseReactPackage() {
  }

  public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
    return null;
  }

  public List<String> getViewManagerNames(ReactApplicationContext reactContext) {
    return null;
  }

  public List<ModuleSpec> getViewManagers(ReactApplicationContext reactContext) {
    return null;
  }

  public ModuleSpec createViewManager(ReactApplicationContext reactContext, String viewManagerName) {
    return null;
  }

  public NativeModule getModule(String name, ReactApplicationContext reactContext) {
    return null;
  }

  public ReactModuleInfoProvider getReactModuleInfoProvider() {
    return null;
  }
}
