# BIOEVOLUTION

An educational microbial **survivors roguelite** — survive the swarm, evolve your cell, and trigger Apex mutations. The entire game is a single self-contained `index.html` (Canvas2D, no dependencies), and it's also packaged as a desktop app via Electron.

## Play in a browser
Just open **`index.html`** in any modern browser — double-click it, or drag it into a tab. Progress saves to that browser's local storage. Use the **💾 Save · Backup & Transfer** menu to copy a save code between devices.

## Controls
- **Move:** WASD / Arrow keys / hold mouse / touch joystick
- **Weapons fire automatically.** Pause: **Esc** · Reroll level-up: **R** · Toggle minimap: **M**

## Desktop app (.exe)

### Easiest: let GitHub build it for you (no tools needed)
This repo includes a CI workflow that builds the Windows app automatically.
1. Push to GitHub (or open the **Actions** tab) — the **Build desktop app** workflow runs on `windows-latest`.
2. Open the latest run and download the **BIOEVOLUTION-windows** artifact. It contains:
   - `BIOEVOLUTION-Setup-1.0.0.exe` — the installer
   - `BIOEVOLUTION-Portable-1.0.0.exe` — a single-file portable exe (no install)
3. To cut a downloadable **Release**, push a tag: `git tag v1.0.0 && git push --tags`. The `.exe` files get attached to the release.

### Build it locally
Requires [Node.js](https://nodejs.org) 18+.
```bash
npm install        # installs Electron + electron-builder
npm start          # run the app in dev
npm run dist:win   # build the Windows installer + portable .exe  -> dist/
npm run dist:linux # build a Linux AppImage
npm run dist:mac   # build a macOS .dmg (must run on macOS)
```
Build output lands in `dist/`. (Building a Windows `.exe` from macOS/Linux needs Wine; building on Windows — or via the CI above — needs nothing extra.)

## Project layout
| File | Purpose |
|------|---------|
| `index.html` | The whole game (markup, styles, and engine in one file) |
| `main.js` | Electron main process — opens a window and loads `index.html` |
| `package.json` | App metadata + `electron-builder` packaging config |
| `build/icon.png` | App icon (electron-builder converts to `.ico` for Windows) |
| `.github/workflows/build-desktop.yml` | CI that builds the Windows `.exe` |

`node_modules/` and `dist/` are generated and git-ignored.
