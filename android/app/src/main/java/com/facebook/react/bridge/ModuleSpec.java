package com.facebook.react.bridge;

import java.util.concurrent.Callable;

/**
 * Minimal stub for ModuleSpec used by gesture-handler package.
 */
public class ModuleSpec {
  public Callable<?> provider;

  public static ModuleSpec viewManagerSpec(Callable<?> provider) {
    ModuleSpec s = new ModuleSpec();
    s.provider = provider;
    return s;
  }
}
