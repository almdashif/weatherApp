# React Native Weather App Assessment 🚀

#### Welcome to your new React Native project! Follow the steps below to set up, build, and run your app smoothly.

🛠 Prerequisites

Ensure you have the following installed before proceeding:


#### Node.js: Minimum version 18 

#### Java Development Kit (JDK): Minimum version 17 

#### Android Studio: Required for Android development 

#### Xcode (Mac only): Required for iOS development


React Native CLI: Install globally using:
```js
npm install -g react-native-cli
```
📞 Installation

Clone this repository and install dependencies:

# Clone the repository
git clone https://github.com/almdashif/weatherApp/tree/main
cd weatherApp

# 🌍 Environment Setup

Create a `.env` file in the project root and add your Visual Crossing Weather API Key:

WEATHER_API_KEY=your_api_key_here

```js
🔹 Get your API key from Visual Crossing and replace your_api_key_here.
```

# Install dependencies
```js
npm install  # or yarn install
```

🚀 Running the App

1️⃣ Start Metro (JavaScript bundler for React Native)

```js
npm start  # or yarn start
```

2️⃣ Run the app on Android

npx react-native run-android

3️⃣ Run the app on iOS (Mac only)

# Install CocoaPods (if not installed)
```js
bundle install

bundle exec pod install --project-directory=ios
```

# Run the iOS app
```js
npx react-native run-ios
```

🔄 Reloading the App

Android: Press R twice or open the Dev Menu

Cmd + M (macOS)

Ctrl + M (Windows/Linux)

iOS: Press R in the iOS Simulator

❌ Troubleshooting

🚀 Metro Bundler Issues

### If Metro fails to start, try clearing the cache:
```js
npx react-native start --reset-cache
```

📱 Android Issues

#### Ensure your emulator/device is connected:

```js
adb devices
```

🍏 iOS Build Issues

#### Make sure Xcode and CocoaPods are installed properly.

