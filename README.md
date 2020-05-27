# GitHub Search
Created by Samuel Reichert

## Setup
This project was made using Node.js 12.16.

You must also have [Yarn](https://yarnpkg.com/) installed.

First clone this project using:
```
git clone git@github.com:samuelreichert/github-search.git
```

Then install the dependencies using Yarn.
```
yarn install
```

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Tech stack
The project has the following tech stack:

* React
* Redux
* Axios
* React-Intl
* Emotion and Rebass

## Decisions

**UI and UX**
I decided to use emotion so this way the components are completely modular, and rebass helps me with primitive UI components so I dont need to create everything from the ground.

**Requests**
I decided to use Axios to handle the requests asynchronously, and decided to centralize all the information about the APIs requests inside the /api path, this way I abstracted how the API works, and only call them in the components.

