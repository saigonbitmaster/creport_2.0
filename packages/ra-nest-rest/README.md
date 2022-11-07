# NestJs REST Data Provider For cReport frontend Apps

## Installation

```sh
yarn add ra-nest-rest
```

## REST Dialect

This Data Provider fits REST APIs using simple GET parameters for filters and sorting

| Method             | API calls                                                                               |
| ------------------ | --------------------------------------------------------------------------------------- |
| `getList`          | `GET http://my.api.url/posts?sort=["title","ASC"]&range=[0, 24]&filter={"title":"bar"}` |
| `getOne`           | `GET http://my.api.url/posts/123`                                                       |
| `getMany`          | `GET http://my.api.url/posts?filter={"id":[123,456,789]}`                               |
| `getManyReference` | `GET http://my.api.url/posts?filter={"author_id":345}`                                  |
| `create`           | `POST http://my.api.url/posts`                                                          |
| `update`           | `PUT http://my.api.url/posts/123`                                                       |
| `updateMany`       | Multiple calls to `PUT http://my.api.url/posts/123`                                     |
| `delete`           | `DELETE http://my.api.url/posts/123`                                                    |
| `deleteMany`       | Multiple calls to `DELETE http://my.api.url/posts/123`                                  |

The API response when called by `getList` should look like this:

```json
[
  { "id": 0, "author_id": 0, "title": "Anna Karenina" },
  { "id": 1, "author_id": 0, "title": "War and Peace" },
  { "id": 2, "author_id": 1, "title": "Pride and Prejudice" },
  { "id": 2, "author_id": 1, "title": "Pride and Prejudice" },
  { "id": 3, "author_id": 1, "title": "Sense and Sensibility" }
]
```

An `id` field is required.

**Note**: `Content-Range` header in the response to `getList` calls is required. it is total number of resources in the collection to build the pagination controls.

```txt
Content-Range: posts 0-24/319
```

If your API is on another domain as the JS code, you'll need to whitelist this header with an `Access-Control-Expose-Headers` [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) header.

```txt
Access-Control-Expose-Headers: Content-Range
```

## Usage

```jsx
// in src/App.js
import { authProvider } from "ra-nest-rest";
import dataProvider from "ra-nest-rest";

const loginUrl = process.env.REACT_APP_LOGIN_URL;
const apiUrl = process.env.REACT_APP_API_URL;

const token = localStorage.getItem("access_token");
const restProvider = dataProvider(apiUrl, token);
const i18nProvider = polyglotI18nProvider((locale) => {
  if (locale === "fr") {
    return import("./i18n/fr").then((messages) => messages.default);
  }
  // Always fallback on english
  return englishMessages;
}, "en");

const _authProvider = authProvider(loginUrl);
const App = () => {
  return (
    <Admin
      title="bworks"
      dataProvider={restProvider}
      authProvider={_authProvider}
      ...
    >

    </Admin>
  );
};

export default App;

```

### Adding Custom Headers

if you need to add custom headers to your requests, you just need to _wrap_ the `fetchJson()` call inside your own function:

```jsx
const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  // add your own headers here
  options.headers.set("X-Custom-Header", "foobar");
  return fetchUtils.fetchJson(url, options);
};
```

Now all the requests to the REST API will contain the `X-Custom-Header: foobar` header.

**Tip**: The most common usage of custom headers is for authentication. `fetchJson` has built-on support for the `Authorization` token header:

```js
const httpClient = (url, options = {}) => {
  options.user = {
    authenticated: true,
    token: "SRTRDFVESGNJYTUKTYTHRG",
  };
  return fetchUtils.fetchJson(url, options);
};
```

Now all the requests to the REST API will contain the `Authorization: SRTRDFVESGNJYTUKTYTHRG` header.

## Note about Content-Range

The solution for API which delete `Content-Range` header is to use another http header to return the number of collection's items. The other header commonly used for this is `X-Total-Count`. So if you use `X-Total-Count`, you will have to :

- Whitelist this header with an `Access-Control-Expose-Headers` [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) header.

```
Access-Control-Expose-Headers: X-Total-Count
```

```

## License

This data provider is licensed under the MIT License
```
