cd /d f:\TIMESLICE\timeslice-native
# Ensure you're logged into Expo (follow prompts)
npx eas login
# Build dev client (this will take several minutes)
npx eas build --platform android --profile development
# After build completes, download/install the generated APK on the emulator or device