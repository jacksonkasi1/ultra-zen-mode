# Ultra Zen Mode

A custom Ultra Zen Mode for maximizing the code view in Visual Studio Code. This extension provides a distraction-free coding environment by toggling various UI elements.

## Features

- Toggle Ultra Zen Mode with a single keybinding
- Hides tabs, status bar, activity bar, and other UI elements
- Enables full-screen mode and maximizes the code view
- Customizable settings to fit your preferences

## Installation

1. Open Visual Studio Code.
2. Go to the Extensions view by clicking the Extensions icon in the Activity Bar or by pressing `Ctrl+Shift+X`.
3. Search for "Ultra Zen Mode".
4. Click "Install" to install the extension.

Alternatively, you can install the extension from the VSCode marketplace.

## Usage

1. Press `Ctrl+Shift+Alt+Z` to toggle Ultra Zen Mode.
2. The extension will hide unnecessary UI elements and maximize the code view.
3. Press `Ctrl+Shift+Alt+Z` again to revert to the normal view.

## Configuration

You can customize the behavior of Ultra Zen Mode by modifying the settings in your `settings.json` file.

```json
{
  "zenMode.fullScreen": true,
  "zenMode.hideTabs": true,
  "zenMode.hideStatusBar": true,
  "zenMode.hideActivityBar": true,
  "zenMode.centerLayout": false,
  "window.zoomLevel": 0,
  "editor.minimap.enabled": false,
  "workbench.editor.enablePreview": false,
  "workbench.editor.tabCloseButton": "off",
  "workbench.activityBar.visible": false,
  "workbench.statusBar.visible": false,
  "editor.renderLineHighlight": "none",
  "editor.wordWrap": "on",
  "editor.scrollBeyondLastLine": false
}
```

## Development

### Prerequisites

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)
- [Yeoman](http://yeoman.io)
- [VSCode Extension Generator](https://github.com/microsoft/vscode-generator-code)

### Setup

1. Clone the repository:

```bash
git clone https://github.com/jacksonkasi1/ultra-zen-mode.git
cd ultra-zen-mode
```

2. Install dependencies:

```bash
pnpm install
```

3. Open the project in VSCode:

```bash
code .
```

4. Build the extension:

```bash
pnpm run compile
```

5. Test the extension:

Press `F5` to open a new VSCode window with your extension loaded.

### Packaging

1. Clean up and package the extension:

```bash
vsce package
```

2. Follow the instructions provided by the VSCode documentation to publish your extension.

## Donate

If you like my work and would like to support me, please consider donating via [Ko-fi](https://ko-fi.com/jacksonkasi). Your support is greatly appreciated!😊

[![ko-fi](https://github.com/jacksonkasi1/ultra-zen-mode/raw/main/assets/SupportMe_red@2x.png)](https://ko-fi.com/jacksonkasi)

## License

MIT
