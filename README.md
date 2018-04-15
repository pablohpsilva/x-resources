# x-resources

The plugin for [axios](https://github.com/axios/axios) provides services for making web requests via **resources** and handle responses.

## Browser Support

![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
--- | --- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | 8+ ✔ |

<!-- [![Browser Matrix](https://saucelabs.com/open_sauce/build_matrix/axios.svg)](https://saucelabs.com/u/axios) -->

## Installation
You can install it via [yarn](https://yarnpkg.com/) or [NPM](http://npmjs.org/).
```
$ yarn add x-resources
$ npm install x-resources
```

## x-resources goal

In short, we want **clean** your code from a mess like this:
```javascript
axios.get(`/userURL/${between}/?filter=${filter}`)
  .then(response => {
    this.someData = response.body;
  });
  .catch(responseError => {
    // handle error
  })
```

To something way more **readable** and **easy to maintain** like this:

```javascript
userResource.fetch({ between, filter })
  .then(response => {
    this.someData = response.body;
  });
  .catch(responseError => {
    // handle error
  })
```

## What do you gain by using x-resources?

* easy to maintain resources;
* creating resources through actions;
* more code expressivity;
* write less code;
* let your resource take care of HTTP methods;
* let your resource take care of url data injections and query params;
* Your development team won't have any headaches anymore replacing URLs in the system because the backend dude/chick decided to change it;
* Your development team won't have the issue with sending the wrong URL to production;
* Your development team won't have to type `axios[http_methos_goes_here]` every single time you want to call an API;
* Your development team now you have resources! All you care about any HTTP request you made is in a file (read "How can I use it?"), meaning is so easy to maintain you might forget how your life was before using `x-resources`;

## OK! How can I use it?

Let us show you everything `x-resources` can do.

Start by creating a resources file. For our example, we created a folder called `resources` and created a `user.js` file in it. In the `resources/user.js` we create our resource like:

```javascript
import { resources } from 'x-resources'

const baseURL = 'https://api.github.com'

const actions = {
  find: { method: 'GET', url: '/users' },
  findOne: { method: 'GET', url: '/users/:id' },
  filter: { method: 'GET', url: '/users/filterBy=:filters' },
  create: { method: 'POST', url: '/users' },
  append: { method: 'POST', url: '/users/:id' },
  update: { method: 'PUT', url: '/users/:id' },
  remove: { method: 'DELETE', url: '/users/:id' }
}

export default resources(baseURL, actions)
```

OK! How can you use the `resources/user.js` we've just created? Simple:

```javascript
import userResources from 'resources/user'

// HTTP method: GET
// url: https://api.github.com/users
userResources.find()

// HTTP method: GET
// url: https://api.github.com/users/1
userResources.findOne({ id: 1 })

// HTTP method: GET
// url: https://api.github.com/users/filterBy=name
userResources.filter({ filter: 'name' })

// HTTP method: POST
// url: https://api.github.com/users
// payload: { name: 'john', age: 20 }
userResources.create({
  name: 'john',
  age: 20
})

// HTTP method: POST
// url: https://api.github.com/users/1
// payload: { name: 'john', age: 20 }
userResources.append(
  {
    id: 1
    name: 'john',
    age: 20
  })

// HTTP method: PUT
// url: https://api.github.com/users/filterBy=name
userResources.update(
  {
    id: 1
    name: 'john',
    age: 25
  })

// HTTP method: DELETE
// url: https://api.github.com/users/1
userResources.remove({ id: 1 })


// HTTP method: DELETE
// HTTP header: Content-Type:application/pdf
// url: https://api.github.com/users/1
userResources.remove(
  { id: 1 },
  { headers: { 'Content-Type': 'application/pdf' }} // you can send extra params too
)
```

You're done! Any of those resources will always return a **Promise** from the [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) API.

## Recomendations

* We strongly recommend that you use `x-resources` on current or future projects :D;
* We recommend that you always have a `baseURL` in your resource file (like the one we created `resources/user.js`), because you could change this URL based on your production, homolog, test or development environment. Doing so you could easily have a function returning a `baseURL` for you with the exact URL you need to run your resources;

## Milestones

* create a `baseURL` to handle any url based on your develop/test/homolog/production environments;
* make `x-resources` agnostic from any HTTP client but supporting any `axios` client user;
