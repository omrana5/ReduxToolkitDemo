case "$ENV" in
    "prod")
        echo "Switching to PROD environment."
        yes | cp -rf "firebase/prod/google-services.json" android/app
        yes | cp -rf "firebase/prod/GoogleService-Info.plist" ios
        # yes | cp -rf ".env.prod" ".env"
        node src/utils/encryption/encryption.ts .env.prod && sleep 2
        # eslint --fix src/utils/encryption/Config.ts
    ;;
    "uat")
        echo "Switching to UAT environment."
        yes | cp -rf "firebase/uat/google-services.json" android/app
        yes | cp -rf "firebase/uat/GoogleService-Info.plist" ios
        # yes | cp -rf ".env.dev" ".env"
        node src/utils/encryption/encryption.ts .env.uat && sleep 2
        # eslint --fix src/utils/encryption/Config.ts
    ;;
    "dev")
        echo "Switching to DEV environment."
        # yes | cp -rf "firebase/dev/google-services.json" android/app
        # yes | cp -rf "firebase/dev/GoogleService-Info.plist" ios
        # yes | cp -rf ".env.dev" ".env"
        node src/utils/encryption/encryption.ts .env.dev && sleep 2
        # eslint --fix src/utils/encryption/Config.ts
    ;;
esac