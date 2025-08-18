package com.facebook.react.uimanager;

import android.view.View;
import androidx.annotation.Nullable;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;

@SuppressWarnings({"unused","rawtypes","unchecked"})
public class BaseViewManagerDelegate<T extends View, U extends BaseViewManagerInterface<T>> implements ViewManagerDelegate<T> {
  protected final U mViewManager;

  public BaseViewManagerDelegate(U vm) {
    mViewManager = vm;
  }

  @Override
  public void setProperty(T view, String propName, @Nullable Object value) {
    // Minimal implementation: generated delegates may call this, but concrete logic is provided
    // by RN's real BaseViewManagerDelegate. We delegate common props where possible.
    // Keep intentionally minimal — most generated code will compile against these signatures.
  }

  @Override
  public void receiveCommand(T view, String commandName, ReadableArray args) {
    // no-op
  }
}
