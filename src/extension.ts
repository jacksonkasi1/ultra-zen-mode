import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let isUltraZenMode = false;

  const config = vscode.workspace.getConfiguration("ultraZenMode");

  let viewUltraZenMode = vscode.commands.registerCommand(
    "ultraZenMode.view",
    () => {
      applyUltraZenMode(config);
      isUltraZenMode = true;
    }
  );

  let toggleUltraZenMode = vscode.commands.registerCommand(
    "ultraZenMode.toggle",
    () => {
      if (isUltraZenMode) {
        revertUltraZenMode();
        isUltraZenMode = false;
      } else {
        applyUltraZenMode(config);
        isUltraZenMode = true;
      }
    }
  );

  let configureUltraZenMode = vscode.commands.registerCommand(
    "ultraZenMode.configure",
    () => {
      vscode.commands.executeCommand(
        "workbench.action.openSettings",
        "Ultra Zen Mode"
      );
    }
  );

  let defaultAppearance = vscode.commands.registerCommand('ultraZenMode.default', () => {
    resetToDefaultAppearance();
  });

  let resetDefaultZenMode = vscode.commands.registerCommand('ultraZenMode.resetZenMode', () => {
    revertUltraZenMode();
    applyUltraZenMode(config);
  });

  context.subscriptions.push(viewUltraZenMode);
  context.subscriptions.push(toggleUltraZenMode);
  context.subscriptions.push(configureUltraZenMode);
  context.subscriptions.push(defaultAppearance);
  context.subscriptions.push(resetDefaultZenMode);

  vscode.workspace.onDidChangeConfiguration((e) => {
    if (e.affectsConfiguration("ultraZenMode")) {
      if (isUltraZenMode) {
        applyUltraZenMode(config);
      }
    }
  });
}

function applyUltraZenMode(config: vscode.WorkspaceConfiguration) {
  if (config.get("fullScreen")) {
    vscode.commands.executeCommand("workbench.action.toggleFullScreen");
  }
  vscode.commands.executeCommand("workbench.action.toggleZenMode");
  vscode.workspace
    .getConfiguration()
    .update(
      "zenMode.hideTabs",
      config.get("hideTabs"),
      vscode.ConfigurationTarget.Global
    );
  vscode.workspace
    .getConfiguration()
    .update(
      "zenMode.hideStatusBar",
      config.get("hideStatusBar"),
      vscode.ConfigurationTarget.Global
    );
  vscode.workspace
    .getConfiguration()
    .update(
      "zenMode.hideActivityBar",
      config.get("hideActivityBar"),
      vscode.ConfigurationTarget.Global
    );
  vscode.workspace
    .getConfiguration()
    .update(
      "zenMode.centerLayout",
      config.get("centerLayout"),
      vscode.ConfigurationTarget.Global
    );
  vscode.workspace
    .getConfiguration()
    .update(
      "window.zoomLevel",
      config.get("zoomLevel"),
      vscode.ConfigurationTarget.Global
    );
  vscode.workspace
    .getConfiguration()
    .update(
      "editor.minimap.enabled",
      config.get("minimapEnabled"),
      vscode.ConfigurationTarget.Global
    );
  vscode.workspace
    .getConfiguration()
    .update(
      "workbench.editor.enablePreview",
      config.get("enablePreview"),
      vscode.ConfigurationTarget.Global
    );
  vscode.workspace
    .getConfiguration()
    .update(
      "workbench.editor.tabCloseButton",
      config.get("tabCloseButton"),
      vscode.ConfigurationTarget.Global
    );
  vscode.workspace
    .getConfiguration()
    .update(
      "workbench.activityBar.visible",
      config.get("activityBarVisible"),
      vscode.ConfigurationTarget.Global
    );
  vscode.workspace
    .getConfiguration()
    .update(
      "workbench.statusBar.visible",
      config.get("statusBarVisible"),
      vscode.ConfigurationTarget.Global
    );
  vscode.workspace
    .getConfiguration()
    .update(
      "editor.renderLineHighlight",
      config.get("renderLineHighlight"),
      vscode.ConfigurationTarget.Global
    );
  vscode.workspace
    .getConfiguration()
    .update(
      "editor.wordWrap",
      config.get("wordWrap"),
      vscode.ConfigurationTarget.Global
    );
  vscode.workspace
    .getConfiguration()
    .update(
      "editor.scrollBeyondLastLine",
      config.get("scrollBeyondLastLine"),
      vscode.ConfigurationTarget.Global
    );

  const layoutMargin = config.get("layoutMargin");
  vscode.workspace
    .getConfiguration()
    .update(
      "zenMode.leftMargin",
      layoutMargin,
      vscode.ConfigurationTarget.Global
    );
  vscode.workspace
    .getConfiguration()
    .update(
      "zenMode.rightMargin",
      layoutMargin,
      vscode.ConfigurationTarget.Global
    );

  vscode.commands.executeCommand(
    "gitlens.toggleZenMode",
    config.get("showGitStatus")
  );
  vscode.workspace
    .getConfiguration("breadcrumbs")
    .update(
      "enabled",
      config.get("showBreadcrumbs"),
      vscode.ConfigurationTarget.Global
    );

  const showTabs = config.get("showTabs");
  if (showTabs === "multi") {
    vscode.workspace
      .getConfiguration()
      .update(
        "workbench.editor.showTabs",
        true,
        vscode.ConfigurationTarget.Global
      );
    vscode.workspace
      .getConfiguration()
      .update(
        "workbench.editor.enablePreview",
        false,
        vscode.ConfigurationTarget.Global
      );
    vscode.workspace
      .getConfiguration()
      .update(
        "workbench.editor.enablePreviewFromQuickOpen",
        false,
        vscode.ConfigurationTarget.Global
      );
  } else if (showTabs === "single") {
    vscode.workspace
      .getConfiguration()
      .update(
        "workbench.editor.showTabs",
        true,
        vscode.ConfigurationTarget.Global
      );
    vscode.workspace
      .getConfiguration()
      .update(
        "workbench.editor.enablePreview",
        true,
        vscode.ConfigurationTarget.Global
      );
    vscode.workspace
      .getConfiguration()
      .update(
        "workbench.editor.enablePreviewFromQuickOpen",
        true,
        vscode.ConfigurationTarget.Global
      );
  } else {
    vscode.workspace
      .getConfiguration()
      .update(
        "workbench.editor.showTabs",
        false,
        vscode.ConfigurationTarget.Global
      );
  }
}

function revertUltraZenMode() {
  vscode.commands.executeCommand("workbench.action.toggleZenMode");
  const originalConfig = getOriginalConfig();
  Object.keys(originalConfig).forEach((key) => {
    vscode.workspace
      .getConfiguration()
      .update(
        key,
        originalConfig[key as keyof typeof originalConfig],
        vscode.ConfigurationTarget.Global
      );
  });
}

function getOriginalConfig() {
  return {
    "zenMode.hideTabs": false,
    "zenMode.hideStatusBar": false,
    "zenMode.hideActivityBar": false,
    "zenMode.centerLayout": false,
    "window.zoomLevel": 0,
    "editor.minimap.enabled": true,
    "workbench.editor.enablePreview": true,
    "workbench.editor.tabCloseButton": "right",
    "workbench.activityBar.visible": true,
    "workbench.statusBar.visible": true,
    "editor.renderLineHighlight": "all",
    "editor.wordWrap": "on",
    "editor.scrollBeyondLastLine": true,
    "zenMode.leftMargin": 0,
    "zenMode.rightMargin": 0,
    "workbench.editor.showTabs": "multi",
  };
}

function resetToDefaultAppearance() {
  const defaultConfig = getOriginalConfig();
  Object.keys(defaultConfig).forEach((key) => {
    vscode.workspace
      .getConfiguration()
      .update(
        key,
        defaultConfig[key as keyof typeof defaultConfig],
        vscode.ConfigurationTarget.Global
      );
  });
}

export function deactivate() {}
