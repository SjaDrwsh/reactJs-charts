# reactJs-charts

A collection of react components to render common data visualization charts, such as line/area/bar charts

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

# Best practices I like to follow

    * using functional component, take a props argument and return a reactChild
    * using hooks ->
      * useState<Type>,
      * UseReducer(for more complex states with sub values)
      * useEffect and only return function or null
    * Use default import to import React, so only what needed and not all
    * types, interface declaration before runtime implementation
    * don't create false type predicates ex.: using number for indexable type key
    * annotate function/component return type by reactChild (explicit types) instead of JSX.Element(global type) or better ReactNode(accepts almost all)
    * use interfaces only for APIs or only if I know i will need to extend it, otherwise I use types for react components
    * use literals instead of enums
    *
