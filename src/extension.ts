import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let isUltraZenMode = false;

    const config = vscode.workspace.getConfiguration('ultraZenMode');

    let viewUltraZenMode = vscode.commands.registerCommand('ultraZenMode.view', () => {
        applyUltraZenMode(config);
        isUltraZenMode = true;
    });

    let toggleUltraZenMode = vscode.commands.registerCommand('ultraZenMode.toggle', () => {
        if (isUltraZenMode) {
            // Revert to normal mode
            vscode.commands.executeCommand('workbench.action.toggleZenMode');
            vscode.commands.executeCommand('workbench.action.toggleFullScreen');
            isUltraZenMode = false;
        } else {
            // Activate Ultra Zen Mode
            applyUltraZenMode(config);
            isUltraZenMode = true;
        }
    });

    let configureUltraZenMode = vscode.commands.registerCommand('ultraZenMode.configure', () => {
        vscode.commands.executeCommand('workbench.action.openSettings', 'Ultra Zen Mode');
    });

    context.subscriptions.push(viewUltraZenMode);
    context.subscriptions.push(toggleUltraZenMode);
    context.subscriptions.push(configureUltraZenMode);
}

function applyUltraZenMode(config: vscode.WorkspaceConfiguration) {
    if (config.get('fullScreen')) {
        vscode.commands.executeCommand('workbench.action.toggleFullScreen');
    }
    vscode.commands.executeCommand('workbench.action.toggleZenMode');
    vscode.workspace.getConfiguration().update('zenMode.hideTabs', config.get('hideTabs'), vscode.ConfigurationTarget.Global);
    vscode.workspace.getConfiguration().update('zenMode.hideStatusBar', config.get('hideStatusBar'), vscode.ConfigurationTarget.Global);
    vscode.workspace.getConfiguration().update('zenMode.hideActivityBar', config.get('hideActivityBar'), vscode.ConfigurationTarget.Global);
    vscode.workspace.getConfiguration().update('zenMode.centerLayout', config.get('centerLayout'), vscode.ConfigurationTarget.Global);
    vscode.workspace.getConfiguration().update('window.zoomLevel', config.get('zoomLevel'), vscode.ConfigurationTarget.Global);
    vscode.workspace.getConfiguration().update('editor.minimap.enabled', config.get('minimapEnabled'), vscode.ConfigurationTarget.Global);
    vscode.workspace.getConfiguration().update('workbench.editor.enablePreview', config.get('enablePreview'), vscode.ConfigurationTarget.Global);
    vscode.workspace.getConfiguration().update('workbench.editor.tabCloseButton', config.get('tabCloseButton'), vscode.ConfigurationTarget.Global);
    vscode.workspace.getConfiguration().update('workbench.activityBar.visible', config.get('activityBarVisible'), vscode.ConfigurationTarget.Global);
    vscode.workspace.getConfiguration().update('workbench.statusBar.visible', config.get('statusBarVisible'), vscode.ConfigurationTarget.Global);
    vscode.workspace.getConfiguration().update('editor.renderLineHighlight', config.get('renderLineHighlight'), vscode.ConfigurationTarget.Global);
    vscode.workspace.getConfiguration().update('editor.wordWrap', config.get('wordWrap'), vscode.ConfigurationTarget.Global);
    vscode.workspace.getConfiguration().update('editor.scrollBeyondLastLine', config.get('scrollBeyondLastLine'), vscode.ConfigurationTarget.Global);

    // Apply center layout margin
    const layoutMargin = config.get('layoutMargin');
    vscode.workspace.getConfiguration().update('zenMode.leftMargin', layoutMargin, vscode.ConfigurationTarget.Global);
    vscode.workspace.getConfiguration().update('zenMode.rightMargin', layoutMargin, vscode.ConfigurationTarget.Global);

    // Show or hide Git status
    vscode.workspace.getConfiguration('git').update('enabled', config.get('showGitStatus'), vscode.ConfigurationTarget.Global);

    // Show or hide file path
    vscode.workspace.getConfiguration('breadcrumbs').update('enabled', config.get('showFilePath'), vscode.ConfigurationTarget.Global);
}

export function deactivate() {}
