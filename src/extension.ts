import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let isUltraZenMode = false;

    let disposable = vscode.commands.registerCommand('ultraZenMode.toggle', () => {
        if (isUltraZenMode) {
            // Revert to normal mode
            vscode.commands.executeCommand('workbench.action.toggleZenMode');
            vscode.commands.executeCommand('workbench.action.toggleFullScreen');
            vscode.commands.executeCommand('workbench.action.closeEditorsInGroup');
            isUltraZenMode = false;
        } else {
            // Activate Ultra Zen Mode
            vscode.commands.executeCommand('workbench.action.toggleZenMode');
            vscode.commands.executeCommand('workbench.action.toggleFullScreen');
            vscode.workspace.getConfiguration().update('zenMode.hideTabs', true, vscode.ConfigurationTarget.Global);
            vscode.workspace.getConfiguration().update('zenMode.hideStatusBar', true, vscode.ConfigurationTarget.Global);
            vscode.workspace.getConfiguration().update('zenMode.hideActivityBar', true, vscode.ConfigurationTarget.Global);
            vscode.workspace.getConfiguration().update('zenMode.centerLayout', false, vscode.ConfigurationTarget.Global);
            vscode.workspace.getConfiguration().update('window.zoomLevel', 0, vscode.ConfigurationTarget.Global);
            vscode.workspace.getConfiguration().update('editor.minimap.enabled', false, vscode.ConfigurationTarget.Global);
            vscode.workspace.getConfiguration().update('workbench.editor.enablePreview', false, vscode.ConfigurationTarget.Global);
            vscode.workspace.getConfiguration().update('workbench.editor.tabCloseButton', 'off', vscode.ConfigurationTarget.Global);
            vscode.workspace.getConfiguration().update('workbench.activityBar.visible', false, vscode.ConfigurationTarget.Global);
            vscode.workspace.getConfiguration().update('workbench.statusBar.visible', false, vscode.ConfigurationTarget.Global);
            vscode.workspace.getConfiguration().update('editor.renderLineHighlight', 'none', vscode.ConfigurationTarget.Global);
            vscode.workspace.getConfiguration().update('editor.wordWrap', 'on', vscode.ConfigurationTarget.Global);
            vscode.workspace.getConfiguration().update('editor.scrollBeyondLastLine', false, vscode.ConfigurationTarget.Global);
            isUltraZenMode = true;
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
