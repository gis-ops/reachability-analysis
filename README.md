# [Reachability Analysis Web(M)app powered by HERE Maps](https://gis-ops.github.io/reachability-analysis/)

![HERE Isoline Routing in Istanbul](https://user-images.githubusercontent.com/10322094/51332346-df3b0f00-1a7b-11e9-82e6-abd7eb397545.png "HERE Isoline Routing in Istanbul")

*An isochrone map (or chart/diagram) in geography and urban planning is a map showing areas related to isochrones between different points. An isochrone is defined as "a line drawn on a map connecting points at which something occurs or arrives at the same time". Such a map is sometimes termed simply an isochrone (iso = equal, chrone = time) [Wikipedia](https://en.wikipedia.org/wiki/Isochrone_map).*

This application consumes the useful HERE Maps Isoline Routing API to determine areas of reachability from a given point. As a user you have the possibilty to select a magnitude of travelling options, starting from the mode of travel to the specified range and intervals [HERE Maps Isoline Routing Options](https://developer.here.com/documentation/routing/topics/resources.html). 

**Note:** In order to use this application, please [register a freemium HERE Maps account](https://developer.here.com/?create=Freemium-Basic&keepState=true&step=account) and input your credentials in the app settings.

# Technical Details

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and is built upon [ReactJS](https://reactjs.org/), [Redux](https://redux.js.org/) and [LeafletJS](https://leafletjs.com/]Leaflet).

## Available Scripts

In the project directory, you can run:

### `npm install`

Install all dependencies of the project.

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
