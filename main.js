/* ============================================================================
   BIOEVOLUTION — Electron main process
   ----------------------------------------------------------------------------
   Thin desktop shell around the single-file game (index.html). The renderer is
   the game itself; we keep Node out of it (contextIsolation on, nodeIntegration
   off) since the game is pure browser JS and stores progress in localStorage.
   ============================================================================ */
'use strict';

const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');

const isDev = !app.isPackaged;
let win = null;

function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    backgroundColor: '#03070a',          // matches the petri-dish void; no white flash on load
    title: 'BIOEVOLUTION',
    show: false,
    autoHideMenuBar: true,               // hide the menu bar (toggle with Alt)
    icon: path.join(__dirname, 'build', 'icon.png'),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      backgroundThrottling: false,       // keep the game loop running at full speed
    },
  });

  win.loadFile(path.join(__dirname, 'index.html'));

  // Show only once painted to avoid a flash of empty window.
  win.once('ready-to-show', () => win.show());

  // External links (if any are ever added) open in the user's browser, not in-app.
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:/.test(url)) { shell.openExternal(url); return { action: 'deny' }; }
    return { action: 'allow' };
  });

  win.on('closed', () => { win = null; });
}

/* Minimal menu: fullscreen, reload, devtools (dev only), quit. */
function buildMenu() {
  const template = [
    {
      label: 'Game',
      submenu: [
        { label: 'Toggle Fullscreen', accelerator: 'F11', click: () => win && win.setFullScreen(!win.isFullScreen()) },
        { label: 'Reload', accelerator: 'CmdOrCtrl+R', click: () => win && win.reload() },
        ...(isDev ? [{ label: 'DevTools', accelerator: 'F12', click: () => win && win.webContents.toggleDevTools() }] : []),
        { type: 'separator' },
        { role: 'quit' },
      ],
    },
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

// Single-instance: focus the existing window instead of opening a second one.
if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on('second-instance', () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });

  app.whenReady().then(() => {
    buildMenu();
    createWindow();
    app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
  });

  app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
}
