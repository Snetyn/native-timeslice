<#
Runs the Android Gradle build inside the repository Docker image while mounting
the Android SDK and Gradle cache from F: (or custom paths) so C: is not used.

Usage examples:
  # Build image (if missing) and run a debug assemble
  .\scripts\run-android-docker.ps1 -BuildImage

  # Run with custom SDK/gradle-cache locations
  .\scripts\run-android-docker.ps1 -SdkPath 'F:\Android\sdk' -GradleCache 'F:\timeslice-gradle-cache'

Requirements:
 - Docker Desktop installed and running (WSL2 backend recommended)
 - Write access to the paths you specify
#>

param(
    [string]$SdkPath = 'F:\Android\sdk',
    [string]$GradleCache = 'F:\timeslice-gradle-cache',
    [string]$ImageName = 'timeslice-android-builder',
    [string]$JdkPath = 'F:\Program Files\jdk17',
    [switch]$BuildImage
)

function New-DirectoryIfNotExists {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory=$true, Position=0)]
        [string]$Path
    )

    if (-not (Test-Path -Path $Path)) {
        Write-Host "Creating directory: $Path"
        New-Item -ItemType Directory -Path $Path -Force | Out-Null
    }
}

if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Error "Docker not found in PATH. Install Docker Desktop and ensure it's running."
    exit 1
}

$repo = (Get-Location).Path

# If a JDK path was provided, set JAVA_HOME for this session so tools pick it up
if ($JdkPath) {
    if (Test-Path -Path $JdkPath) {
        Write-Host "Setting JAVA_HOME to: $JdkPath"
        $env:JAVA_HOME = $JdkPath
        # Prepend the JDK bin to the session PATH so java/javac are available
        $env:Path = "$JdkPath\bin;" + $env:Path
    }
    else {
        Write-Warning "Provided JDK path does not exist: $JdkPath"
    }
}

# Ensure SDK and cache directories exist on F:\ (or provided path)
New-DirectoryIfNotExists $SdkPath
New-DirectoryIfNotExists $GradleCache

if ($BuildImage -or -not (docker images -q $ImageName)) {
    Write-Host "Building Docker image '$ImageName' (this may download ~1GB of SDK tooling) ..."
    docker build -t $ImageName .
    if ($LASTEXITCODE -ne 0) { Write-Error 'Docker build failed.'; exit $LASTEXITCODE }
}

Write-Host "Running Gradle assembleDebug inside container. SDK mounted from: $SdkPath"

$dockerCmd = @(
    'run','--rm',
    '-v', "${repo}:/workspace",
    '-v', "${SdkPath}:/sdk",
    '-v', "${GradleCache}:/root/.gradle",
    '-e', 'ANDROID_SDK_ROOT=/sdk',
    '-w', '/workspace',
    $ImageName,
    './gradlew','assembleDebug','--no-daemon','--stacktrace'
)

Write-Host "Executing: docker $($dockerCmd -join ' ')"
docker @dockerCmd
if ($LASTEXITCODE -ne 0) { Write-Error 'Gradle build failed inside container.'; exit $LASTEXITCODE }

Write-Host 'Build finished. APK (if successful) will be in: android/app/build/outputs/apk/debug/'
