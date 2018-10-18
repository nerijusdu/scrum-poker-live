## Running localy
### Prerequisites
- Setup [React-Native](https://facebook.github.io/react-native/docs/getting-started.html)
- Install [Docker](https://www.docker.com/get-started)
### Setting up API
If testing on android device, run api in Docker:
```
$ cd api/Api
$ docker-compose up --build
```
This will run api in a docker container on localhost:8080.
### Starting app
```
$ adb devices
$ adb reverse tcp:8080 tcp:8080
$ react-native run-android
```
### Troubleshooting
If app can't connect to api try changing `apiUrl` in `src/config.js` to your local ip address for example `http://192.168.0.12:8080`.
