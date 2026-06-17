# BIOEVOLUTION — Android (Capacitor)

The whole game is the single self-contained `../index.html`. This folder is a thin
[Capacitor](https://capacitorjs.com) shell that loads it in an Android WebView and
produces an installable `.apk`. Nothing game-related lives here — `www/` and the
generated `android/` project are build artifacts (git-ignored), regenerated from
`../index.html` and `../build/icon.png` every build.

## Automated build (CI)

`.github/workflows/build-android.yml` builds the APK on every push and attaches
`BIOEVOLUTION-1.0.0.apk` to the **v1.0.0** GitHub Release (next to the desktop
builds). You can also trigger it manually from the Actions tab, or download it
from a run's Artifacts.

## Local build

Requires Node 20, JDK 17, and the Android SDK.

```bash
cd mobile
npm install
npm run stage     # copy ../index.html -> www/ and ../build/icon.png -> assets/
npm run icons     # generate Android icons from assets/icon.png (optional)
npm run add       # first time: scaffold the android/ Gradle project (later: npm run sync)
npm run apk       # ./gradlew assembleDebug
# -> android/app/build/outputs/apk/debug/app-debug.apk
```

Whenever `../index.html` changes, re-run `npm run stage && npm run sync` before
rebuilding so the WebView picks up the new game.

App id: `com.plutoniansurvivors.bioevolution` · output is a debug-signed APK
(installable by sideload; enable "Install unknown apps" on the device).
