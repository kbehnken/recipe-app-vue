# Recipe Box - Vue App

## Description

- This front-end web application lets users view, print, add, and update recipes. It was built using Vue. To run it, you will need to install the back-end server application available at https://github.com/kbehnken/recipe-api-mongodb.

## Getting Started

1. Perform the installation steps at https://github.com/kbehnken/recipe-api-mongodb. Make a note of the protocol, host, and port you choose.
2. Clone this repository with: `git clone https://github.com/kbehnken/recipe-app-vue`.
3. Navigate to the root of the project directory. Type `npm i`.
4. Create a .env file in the root of the project directory, and add the settings you chose in step 1:
```
VUE_APP_API_PROTOCOL = http://
VUE_APP_API_PORT = 3030
VUE_APP_API_SERVER = 192.168.1.1
```
5. Type `npm run serve` in the root of the project directory.
6. To login, use a web browser to navigate to port 8080 on your host.