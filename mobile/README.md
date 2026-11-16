# AGILE-PMIS mobile application

The mobile client will be built with Expo / React Native and will consume the same authenticated HTTPS API as the web application.

For the first mobile milestone, create the Expo app in this folder after the web/API foundation is running:

```bash
npx create-expo-app@latest . --template
```

Choose a TypeScript Expo template. The next implementation step will add secure token storage, offline SQLite queues, field visit forms, GPS capture, evidence-photo uploads and background synchronization.

Do not store beneficiary sensitive information in unencrypted local storage. Offline data must be minimized, protected and automatically purged according to the approved retention policy.
