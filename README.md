# Perform test app

## The task

Build a UI to search the Movie DB: The user should be able to enter some text into a
search field, see and browse the results from the Movie DB.

Anything else it does it up to you!

You can use any language, library or tool you feel comfortable with.

## Start-up
  * Rename `src/js/config.example.js` to `src/js/config.js` and update the API_KEY
  * `npm install` - to install dependencies
  * `npm start` - starts local dev server
  * `npm run build` - builds production ready version
  * `npm test` - run tests

## Comments
  * Components that didn't have any logic are not tested
  * The architecture is very similar to Redux. Many namings are taken from there. The core difference
    is that only the necessary functionality was implemented to cover the requirement. No middlewares, actions and action-creators go together, store is bare-bone. 
  * The UI is as simple as possible. It doesn't cover some use-cases such as not showing _Load More_ when there are no more results. No work on accessibility was done. 
  * Inversion-of-control is used for modules (where it made sense). React components require child components directly, but the state and actions are passed from top-to-bottom - making most components _dumb_.
  * Initially tests were run in Phantom.js, but it had some problems with Promises, and the whole testing build was simply crashing then trying to polyfill them. It may be worth investigating, but it was out of the scope for this project, so a Chrome browser is used for testing. 
  * Linting wasn't added, but for a real-life project (especially where more developers work on the same code-base) it is a necessary tool. 
  * Build system is very bare-bone and straight to the point. It can be optimized and modularized, but that was out of the scope of this task. 
