## Release Notes (Version 1.0)
This implementation of the HuMANAty React website includes the following software features:<br />
  * Account Creation/Log In <br />
  * Unique Profile Page for all Users <br />
  * Toggling Between Host/Guest Modes <br />
  * Creating Events (Host Mode) <br />
  * Selecting a Participating Farm from Which Food Is Sourced (Host Mode)
  * Searching for Events (Using Google API) <br />
  * Registering for Events <br />
  * Reviewing a Host <br />
  * Reviewing a Guest <br />
  * Payment as a Part of Event Registration (Using Stripe API) <br />
  
Recent bug fixes include:
  * "Create" Button on the NavBar only appears in Host Mode
  * Proper width of the Search Bar

We were not able to implement the following features with this release:<br />
  * Saving a Card to an Account (Using Stripe API)
  * Receiving Payments for Events (Using Stripe API - Host-Specific)
  * Third-Party Validation of Host
  * Displaying Participating Farms on a Map During Event Creation
  * Photo Gallery
  * More Advanced Profile Customization

Known bugs in the current release: <br />
  * Rating stars appear improperly sized on certain non-Chrome browsers like Firefox.
  * Viewing events with no farm data will crash the web app (this is unlikely to happen unless the user intentionally <br />
  created such an event)
  * In Chrome, sometimes the search bar autofill function does not work properly unless the user waits 2-3 seconds before searching.

## Available Scripts
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

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

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
