import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('ultraZenMode.toggle', () => {
        const config = vscode.workspace.getConfiguration();
        const zenModeActive = config.get('zenMode.fullScreen');

        if (!zenModeActive) {
            vscode.commands.executeCommand('workbench.action.toggleZenMode');
            config.update('zenMode.hideTabs', true, vscode.ConfigurationTarget.Global);
            config.update('zenMode.hideStatusBar', true, vscode.ConfigurationTarget.Global);
            config.update('zenMode.hideActivityBar', true, vscode.ConfigurationTarget.Global);
            config.update('zenMode.centerLayout', false, vscode.ConfigurationTarget.Global);
            config.update('window.zoomLevel', 0, vscode.ConfigurationTarget.Global);
            config.update('editor.minimap.enabled', false, vscode.ConfigurationTarget.Global);
            config.update('workbench.editor.enablePreview', false, vscode.ConfigurationTarget.Global);
            config.update('workbench.editor.tabCloseButton', 'off', vscode.ConfigurationTarget.Global);
            config.update('workbench.activityBar.visible', false, vscode.ConfigurationTarget.Global);
            config.update('workbench.statusBar.visible', false, vscode.ConfigurationTarget.Global);
            config.update('editor.renderLineHighlight', 'none', vscode.ConfigurationTarget.Global);
            config.update('editor.wordWrap', 'on', vscode.ConfigurationTarget.Global);
            config.update('editor.scrollBeyondLastLine', false, vscode.ConfigurationTarget.Global);
        } else {
            vscode.commands.executeCommand('workbench.action.toggleZenMode');
            vscode.commands.executeCommand('workbench.action.toggleFullScreen');
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
