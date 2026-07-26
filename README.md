# 🧬 Mutagenic Survivors

An educational **microbial survivors roguelite**. Pilot a single cell through a rising tide of viruses, bacteria, toxic spores and a macrophage boss — survive, level up, evolve your organelles, and trigger screen-clearing **Apex Mutations**. Or start as a lone human cell and **mitotically divide into a fighting colony** in the new **Cellular Swarm** mode. Every weapon, organelle and enemy is rooted in real cell biology, with the science explained in an in-game codex.

The game ships as an **installable app** — a **Windows `.exe`** (Electron) and an **Android `.apk`** (Capacitor), both built by CI. Under the hood the engine is a single Canvas2D `index.html` with zero runtime dependencies, drawing a hand-painted sprite set from `assets/`; the installers bundle both into a native shell.

---

## ▶ Install & play

Grab the latest build from the **[v1.3.0 Release](../../releases/tag/v1.3.0)**:

| Platform | Download |
|---|---|
| **Windows** (installer) | `MutagenicSurvivors-Setup-1.3.0.exe` |
| **Windows** (portable, no install) | `MutagenicSurvivors-Portable-1.3.0.exe` |
| **Android** | `MutagenicSurvivors-1.3.0.apk` — sideload; enable "Install unknown apps" |

Progress saves locally. Use **💾 Save · Backup & Transfer** in the menu to move a save code between devices.

## 🎮 Controls

| | |
|---|---|
| Move | `W A S D` / Arrows / hold mouse / touch joystick |
| Weapons | fire automatically |
| Pause (full stats & arsenal) | `Esc` |
| Quick stats peek | `Tab` |
| Reroll level-up | `R` · Minimap: `M` · **Cycle music track: `N`** |
| Controller | left stick / D-pad move · `A` select · `B` back · `X` reroll · `LB` stats · `Start` pause |

---

## ✨ Features

**Roguelite core**
- **9 playable cell lines**, each with a signature weapon, stat profile and unique trait (glass-cannon predator, indestructible tardigrade, slime-trail Physarum, reflecting Radiolarian, colonial Volvox…). Unlocked by hitting milestones.
- **Three modes:** 20-minute Timed (build to the boss), endless Survival, and the mitosis-driven **Cellular Swarm** (below).
- A time-ramped **director** drives 9 themed enemy waves, recurring **Amoeboid** mini-bosses, and the three-phase **Macrophage Sentinel** boss.

**☣️ Cellular Swarm mode — become the colony**
- Start the run as **one human cell**. Hunt down glowing **Glucose** nodes (literal C₆H₁₂O₆ — the substrate of cellular respiration) to fill the **Mitosis Bar**.
- Bar full → the cell **divides**: the game pauses and you pick a weapon or passive trait for the new daughter cells, then the colony fights on as a swarm — a lead cell plus up to 25 followers holding formation, hunting enemies, and ramming them down.
- Lose the lead cell and the healthiest follower is **promoted** to take over — the run only ends when the very last cell is gone.
- **Free Radicals** (toxic ROS motes — rare, unavoidable, non-magnetizing) sting on contact and fill a second **Mutagen Meter**. Full meter forces a **Mutagenic Event**: choose one of 7 drastic mutations, each a massive buff *and* a severe curse, applied colony-wide — **Malignant Hypertrophy** (+45% damage/size, −30% speed), **Hyper-Metabolism** (mitosis 45% faster, bleed HP unless fed), **Permeable Membrane** (+100% pickup radius, −25% defense), **Oncogenic Frenzy**, **Toxin Venting**, **Calcified Shell**, **Lethal Telomerase**.
- The invasion **escalates in three acts**: **The Breach** (swarming, fragile **Influenza Virions**) → **Bacterial Colonization** (durable **E. coli** that actively devour Glucose off the ground, forcing you to out-forage them) → **Full-Scale War** (armored **Toxoplasma Parasites** and elite **Rogue Cancer Cells** that bud off new Influenza as they advance). The Macrophage is an ally here, not a boss.

**Achievement-gated armory (tier = unlock order)**
- **Everything starts locked** and is earned by playing. An item's tier is its place in the unlock ladder: **D unlocks first** (trivial goals) → **S unlocks last** (the hard ones). The Bio-Codex shows each lock's exact goal, sorted as a progression.
- **10 active weapons** — Cilia Whips, Acidic Vacuoles, Mitosis Clones, Spore Burst, Phage Darts, Flagellar Tail Strike, Trichocyst Volley, Cytoplasmic Field, **Evo Darts** (self-evolving venom darts) and the **Mucilage Aura** (crowd-control slow field).
- **6 organelles** (passives) and a deck of freely-stacking **Adaptations** (regen, armor, crit, speed, **dodge**, **luck**…).
- **Apex Mutations:** take a base weapon to Lv8 with its paired organelle to evolve it (buzz-saw Vortex Cilia, screen-washing Caustic Flood, autonomous Swarm, infectious Fungal Plague, mind-controlling Retrovirus, slipstream Wake).
- **Run Mutations** from objectives — build-defining choices like crit lifesteal, low-HP **execute**, escalating luck, and "deal more damage while standing still."

**Loot & progression**
- **Biomatter XP** in colour-coded richness tiers that merge on the ground to cut clutter; **Luck** biases every roll.
- **Micro-boost pads** you channel mid-fight, **loot chests** (Common→Legendary) with a reward cinematic, and a persistent **Genome Lab** of meta-upgrades.
- **Bio-Codex** (the science behind every entity) and a **Dev Asset Inspector** (live tables for enemies, weapons, organelles, apex, hazards, boosts, mutations, formulas — and the soundtrack).

**Soundtrack**
- **12 procedurally-generated chiptune tracks** (distinct keys, tempos and drum grooves), synthesized live by a built-in Web Audio engine.
- **🎵 Soundtrack jukebox on the title screen** and a **Music tab in the pause menu**: tap to play and **pin** a track for every run, or **Shuffle** for a fresh one each run. Press `N` in-run to cycle. Boss fights hot-swap to **Apex Bloom** and restore your track on victory.

---

## 🖥 Desktop build (`.exe`)

CI (`.github/workflows/build-desktop.yml`) builds it automatically on every push and attaches the `.exe` files to the v1.3.0 Release. To build locally (needs [Node.js](https://nodejs.org) 18+):

```bash
npm install        # Electron + electron-builder
npm start          # run in dev
npm run dist:win   # Windows installer + portable .exe  -> dist/
npm run dist:linux # Linux AppImage   ·   npm run dist:mac (on macOS)
```

## 📱 Android build (`.apk`)

CI (`.github/workflows/build-android.yml`) wraps the game in a Capacitor WebView shell and builds an installable `.apk`, attaching it to the same Release. See **[`mobile/README.md`](mobile/README.md)** for the local build (needs Node 20, JDK 17, Android SDK):

```bash
cd mobile
npm install
npm run stage && npm run icons && npm run add && npm run apk
# -> android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 🗂 Project layout

| Path | Purpose |
|------|---------|
| `index.html` | **The whole game** — markup, styles and engine in one file |
| `assets/` | Hand-painted sprite set (enemies, player, pickups, FX, UI) loaded at runtime |
| `main.js` | Electron main process (opens a window, loads `index.html`) |
| `package.json` | App metadata + `electron-builder` packaging config |
| `build/icon.png` | 1024² app icon (reused for Windows `.ico` and Android launcher icons) |
| `mobile/` | Capacitor Android shell (`www/` + generated `android/` are git-ignored, rebuilt from `index.html` + `assets/`) |
| `.github/workflows/build-desktop.yml` | CI → Windows `.exe` |
| `.github/workflows/build-android.yml` | CI → Android `.apk` |

`node_modules/`, `dist/`, and the generated `mobile/android` + `mobile/www/` are git-ignored — CI and local builds regenerate them.

### 🎨 Artwork

Sprites live in `assets/` and are loaded by the `ART` layer at boot. Every sprite
is still generated procedurally by `buildSprites()` first, so the artwork is a
progressive enhancement: the game runs from the first frame and falls back to the
generated look if a file is missing. To swap in new art, drop a replacement PNG at
the same path — no code change needed.

---

*Educational survivors prototype · Canvas2D · all biology facts are real.*
