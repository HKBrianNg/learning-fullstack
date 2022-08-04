# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


React Appliction

React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.

Build encapsulated components that manage their own state, then compose them to make complex UIs.

https://reactjs.org/


a) Initialize react app

1. open Visual Code Editor (VC)
2. open a terminal in VC
3. in VC terminal, create a app folder and then cd to it.
4. npx create-react-app .

Package.json -
"@testing-library/jest-dom": "^5.16.4",
"@testing-library/react": "^13.3.0",
"@testing-library/user-event": "^13.5.0",
"react": "^18.2.0",
"react-dom": "^18.2.0",
"react-scripts": "5.0.1",
"web-vitals": "^2.1.4"


b)  React Router:

https://reactrouter.com/

1. Subscribing and manipulating the history stack
2. Matching the URL to your routes
3. Rendering a nested UI from the route matches  

Package :

npm install react-router-dom@6

 "react-router-dom": "^6.3.0",

c) Material UI 

https://mui.com/
https://emotion.sh/docs/introduction

It is a library of React UI components that implements Google's Material Design.
Material UI is comprehensive in that it comes packaged with default styles, and is optimized to work with Emotion (or styled-components). Emotion supports all popular browsers, including Internet Explorer 11.

Package :

npm install @mui/material @emotion/react @emotion/styled

"@emotion/react": "^11.9.3",
"@emotion/styled": "^11.9.3",
"@mui/material": "^5.9.0",

npm install @mui/icons-material

 "@mui/icons-material": "^5.8.4",

d) Theme
Explore the default theme object:
https://mui.com/material-ui/customization/default-theme/

write sample code to create theme

import * as React from 'react';
import { red } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
  },
});

global css setting

https://mui.com/material-ui/guides/interoperability/#global-css

function App() {
  return <ThemeProvider theme={theme}>...</ThemeProvider>;
}


e) Font
Material is a design system created by Google to help teams build high-quality digital experiences for Android, iOS, Flutter, and the web.
https://material.io/design/introduction#principles
https://material.io/design/typography/the-type-system.html#type-scale

https://www.oxxostudio.tw/articles/201809/css-font-size.html


You can install it by typing the below command in your terminal:
npm install @fontsource/roboto

"@fontsource/roboto": "^4.5.7",


f) react video player
Play youtube video.

npm install react-player

 "react-player": "^2.10.1",