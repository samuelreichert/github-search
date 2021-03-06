<div align="center">
  <h1>GitHub Search</h1>
</div>

<div align="center">
  Search GitHub repositories app with a responsive layout, built with React, Redux and Bootstrap
</div>

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

You need to create a `.env.local` file, all you need to do is:
```
cp .env.local.example .env.local
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

## Cypress

To start cypress, run `yarn run cypress open`. (To be able to run the tests successfully you must to have your app running, with: `yarn start`)<br />
Now you will see a screen where you can find the integration tests.<br />
You can run each of them specifically by clicking on them.<br />
Or you can run all the integration tests by clicking on 'Run all specs' button on top-right of the screen.

## Tech stack
The project has the following tech stack:

* Axios
* React, Redux, Redux-Thunk
* React-Router-Dom, React-Intl
* React-Js-Pagination, React-Markdown
* Bootstrap, FontAwesome
* Jest, Enzyme for unit tests
* Cypress for end-to-end tests

## Decisions

**Requests**
I decided to use Axios to handle the requests asynchronously, and decided to centralize all the information about the APIs requests inside the /api path, this way I abstracted how the API works, and only call them in the components.

**Languages**
I used react-intl to manage multiple languages (english, portuguese and dutch) and used `navigator.language` to get browser's set language and use as the app language. The default language is english, if no translation is provided.

**UI and UX**
I decided to use bootstrap so this way I could quickly implement all the components with a consistent UI, and bootstrap gives me all needed UI components so I dont need to create everything from the ground.
