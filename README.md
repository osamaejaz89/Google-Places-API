
# Places Search with Map Integration


A React Native application that allows users to search for places and view them on an interactive map, with location history functionality.

# Features

📍 Current location detection and display

🔍 Place search functionality

🗺️ Interactive map with location markers

⏳ Search history persistence

📱 Responsive design for mobile devices

🚀 Optimized performance

# Prerequisites
Node.js (v14 or later)

npm or yarn

React Native development environment setup

Android Studio/Xcode for emulator testing

Google Maps API key (for production)


## Installation

Clone the repository:


```bash
  git clone https://github.com/osamaejaz89/Google-Places-API.git
  cd Google-Places-API
```

Install Dependencies:


```bash
  npm install 
  or 
  yarn install
```

For iOS:


```bash
cd ios && pod install & cd ..
```

## Configuration

- Create a .env file in the root directory:

```bash
GOOGLE_API_KEY=your_api_key_here
```

For Android

- Add your Google Maps API key to android/app/src/main/AndroidManifest.xml:


```bash
<meta-data
  android:name="com.google.android.geo.API_KEY"
  android:value="${GOOGLE_API_KEY}"/>
```

For iOS

- Add your API key to AppDelegate.mm:

```bash
#import <GoogleMaps/GoogleMaps.h>

// In didFinishLaunchingWithOptions:
[GMSServices provideAPIKey:@"${GOOGLE_API_KEY}"];
```
## Running The App

### Android

```bash
npx react-native run-android
```

### iOS

```bash
npx react-native run-ios
```
     
## Dependencies

- `react-native-maps`: For map functionality

- `react-native-geolocation-service`: For location services

- `@react-native-community/geolocation`: Location permission handling

- `react-redux`: State management

- `react-native-vector-icons`: For UI icons



## Support

For support, email osamaejaz89@gmail.com.


## Authors

- [@osamaejaz89](https://www.linkedin.com/in/osamaejaz89/)


## Acknowledgements

 - [React Native community](https://github.com/react-native-community)
 - [Goolge Maps Platform](https://mapsplatform.google.com/)
 - [Redux Toolkit](https://redux-toolkit.js.org/)

