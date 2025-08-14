# Minimal Docker image to run Android Gradle builds for this repo
FROM ubuntu:22.04
ENV DEBIAN_FRONTEND=noninteractive

# Install prerequisites (OpenJDK 17, node, curl, unzip)
RUN apt-get update && apt-get install -y --no-install-recommends \
  openjdk-17-jdk wget unzip curl git nodejs npm ca-certificates gnupg2 && \
  rm -rf /var/lib/apt/lists/*

ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
ENV ANDROID_SDK_ROOT=/sdk
ENV PATH=${ANDROID_SDK_ROOT}/cmdline-tools/latest/bin:${ANDROID_SDK_ROOT}/platform-tools:${PATH}

# Install Android command line tools
RUN mkdir -p ${ANDROID_SDK_ROOT}/cmdline-tools
WORKDIR /tmp
RUN wget -q https://dl.google.com/android/repository/commandlinetools-linux-9477386_latest.zip -O cmdline.zip \
  && unzip -q cmdline.zip -d /tmp/cmdline-tools-tmp \
  && mkdir -p ${ANDROID_SDK_ROOT}/cmdline-tools/latest \
  && mv /tmp/cmdline-tools-tmp/cmdline-tools/* ${ANDROID_SDK_ROOT}/cmdline-tools/latest/ \
  && rm -rf /tmp/cmdline.zip /tmp/cmdline-tools-tmp

# Accept licenses and install required SDK components
RUN yes | sdkmanager --sdk_root=${ANDROID_SDK_ROOT} --licenses || true
RUN sdkmanager --sdk_root=${ANDROID_SDK_ROOT} "platform-tools" "platforms;android-35" "build-tools;34.0.0" "cmake;3.22.1" "ndk;25.1.8937393"

# Add entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

WORKDIR /workspace
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["./gradlew","assembleDebug","--no-daemon","--stacktrace"]
