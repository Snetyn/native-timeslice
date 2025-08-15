# Local Docker Android builder

This repository includes a Dockerfile that builds a container with JDK 17 and the Android SDK (platform 35, build-tools 34) installed so you can run Gradle builds without installing Java/Android SDK on your host.

Build the image:

```bash
# from repository root
docker build -t timeslice-android-builder .
```

Run the build (mount the repo into the container):

```bash
# from repository root (Linux/macOS)
docker run --rm -v "$(pwd)":/workspace -w /workspace timeslice-android-builder ./gradlew assembleDebug --no-daemon --stacktrace
```

On Windows (PowerShell):

```powershell
$pwd = (Get-Location).Path
docker run --rm -v "${pwd}:/workspace" -w /workspace timeslice-android-builder ./gradlew assembleDebug --no-daemon --stacktrace
```

Notes:
- The first image build downloads ~1GB of Android SDK components. Subsequent runs reuse the image.
- The container runs Gradle inside and writes build outputs into your mounted workspace (including `android/app/build/outputs/...`), so you can inspect APKs locally.

Note: touched to trigger CI run on 2025-08-14 UTC.
