import { stringify } from "query-string";
import { fetchUtils, DataProvider } from "ra-core";
import sessionManager from "./sessionManager";
import { filterTransform } from "./utils";
import JwtDecode from "jwt-decode";
/**
 * Maps react-admin queries to a REST API
 *
 * This REST dialect is similar to the one of FakeRest
 *
 * @see https://github.com/marmelab/FakeRest
 *
 * @example
 *
 * getList     => GET http://my.api.url/posts?sort=['title','ASC']&range=[0, 24]
 * getOne      => GET http://my.api.url/posts/123
 * getMany     => GET http://my.api.url/posts?filter={id:[123,456,789]}
 * update      => PUT http://my.api.url/posts/123
 * create      => POST http://my.api.url/posts
 * delete      => DELETE http://my.api.url/posts/123
 *
 * @example
 *
 * import * as React from "react";
 * import { Admin, Resource } from 'react-admin';
 * import {dataProvider} from 'ra-nest-rest';
 *
 * import { PostList } from './posts';
 *
 * const App = () => (
 *     <Admin dataProvider={simpleRestProvider('http://path.to.my.api/')}>
 *         <Resource name="posts" list={PostList} />
 *     </Admin>
 * );
 *
 * export default App;
 */
export default (
  apiUrl: string,
  refreshTokenUrl: string,
  isSkipCheckAccessToken: boolean = false,
  countHeader: string = "Content-Range"
): DataProvider => {
  // React-admin optimize rendering so sometimes `Data Provider` is called before check authen
  // That why we need check refresh token in here
  const httpClient = async (url, options) => {
    // Web no need check access token. Only cms need
    if (isSkipCheckAccessToken) return fetchUtils.fetchJson(url, options);

    const accessToken = sessionManager.getAccessToken();
    const refreshToken = sessionManager.getRefreshToken();

    if (!accessToken || !refreshToken) {
      return Promise.reject();
    }

    try {
      const tokenDecoded = JwtDecode(accessToken);
      if (!tokenDecoded || !tokenDecoded["exp"]) return Promise.reject();

      const currentTimeInSecond = Date.now() / 1000;
      // If token expired time > 10 second, continues request otherwise get refresh token
      if (tokenDecoded["exp"] > currentTimeInSecond + 10) {
        options.headers.set("Authorization", `Bearer ${accessToken}`);
        return fetchUtils.fetchJson(url, options);
      }

      // Get new refresh token
      const data = await fetchUtils.fetchJson(refreshTokenUrl, {
        method: "POST",
        headers: new Headers({ Authorization: `Bearer ${refreshToken}` }),
      });

      if (!data) return Promise.reject();

      console.log("GET NEW REFRESH TOKEN SUCCESS AT DATA PROVIDER", data);
      const newAccessToken = data.json.access_token;
      sessionManager.saveSession(
        newAccessToken,
        data.json.refresh_token,
        data.json.username,
        data.json.fullName
      );

      options.headers.set("Authorization", `Bearer ${newAccessToken}`);

      return fetchUtils.fetchJson(url, options);
    } catch (error) {
      console.log("DataProviderJwtDecode:::", error);
      sessionManager.clearSession();
      return Promise.reject();
    }
  };

  return {
    getList: (resource, params) => {
      const { page, perPage } = params.pagination;
      let { field, order } = params.sort;
      field = field == "id" ? "_id" : field;
      const rangeStart = (page - 1) * perPage;
      const rangeEnd = page * perPage - 1;

      const query = {
        sort: JSON.stringify([field, order]),
        range: JSON.stringify([rangeStart, rangeEnd]),
        filter: JSON.stringify(filterTransform(params.filter)),
      };
      const url = `${apiUrl}/${resource}?${stringify(query)}`;
      const options =
        countHeader === "Content-Range"
          ? {
              // Chrome doesn't return `Content-Range` header if no `Range` is provided in the request.
              headers: new Headers({
                Range: `${resource}=${rangeStart}-${rangeEnd}`,
              }),
            }
          : {};

      return httpClient(url, options).then(({ headers, json }) => {
        if (!headers.has(countHeader)) {
          throw new Error(
            `The ${countHeader} header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare ${countHeader} in the Access-Control-Expose-Headers header?`
          );
        }
        return {
          data: json.map((resource) => ({ ...resource, id: resource._id })),
          total:
            countHeader === "Content-Range"
              ? parseInt(headers.get("content-range").split("/").pop(), 10)
              : parseInt(headers.get(countHeader.toLowerCase())),
        };
      });
    },

    getOne: (resource, params) => {
      const options = {
        headers: new Headers({}),
      };
      return httpClient(`${apiUrl}/${resource}/${params.id}`, options).then(
        ({ json }) => ({
          data: { ...json, id: json._id },
        })
      );
    },

    getMany: (resource, params) => {
      const query = {
        filter: JSON.stringify({ _id: params.ids }),
      };
      const options = {
        headers: new Headers({}),
      };
      const url = `${apiUrl}/${resource}?${stringify(query)}`;
      return httpClient(url, options).then(({ json }) => ({
        data: json.map((resource) => ({ ...resource, id: resource._id })),
      }));
    },

    getManyReference: (resource, params) => {
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;

      const rangeStart = (page - 1) * perPage;
      const rangeEnd = page * perPage - 1;

      const query = {
        sort: JSON.stringify([field, order]),
        range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        filter: JSON.stringify({
          ...params.filter,
          [params.target]: params.id,
        }),
      };
      const url = `${apiUrl}/${resource}?${stringify(query)}`;
      const options =
        countHeader === "Content-Range"
          ? {
              // Chrome doesn't return `Content-Range` header if no `Range` is provided in the request.
              headers: new Headers({
                Range: `${resource}=${rangeStart}-${rangeEnd}`,
              }),
            }
          : {
              headers: new Headers({}),
            };

      return httpClient(url, options).then(({ headers, json }) => {
        if (!headers.has(countHeader)) {
          throw new Error(
            `The ${countHeader} header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare ${countHeader} in the Access-Control-Expose-Headers header?`
          );
        }
        return {
          data: json.map((resource) => ({ ...resource, id: resource._id })),
          total:
            countHeader === "Content-Range"
              ? parseInt(headers.get("content-range").split("/").pop(), 10)
              : parseInt(headers.get(countHeader.toLowerCase())),
        };
      });
    },

    update: (resource, params) => {
      const options = {
        headers: new Headers({}),
      };
      return httpClient(`${apiUrl}/${resource}/${params.id}`, {
        method: "PUT",
        body: JSON.stringify(params.data),
        ...options,
      }).then(({ json }) => ({ data: { ...json, id: json._id } }));
    },

    // simple-rest doesn't handle provide an updateMany route, so we fallback to calling update n times instead
    updateMany: (resource, params) => {
      const options = {
        headers: new Headers({}),
      };
      return Promise.all(
        params.ids.map((id) =>
          httpClient(`${apiUrl}/${resource}/${id}`, {
            method: "PUT",
            body: JSON.stringify(params.data),
            ...options,
          })
        )
      ).then((responses) => ({ data: responses.map(({ json }) => json.id) }));
    },

    create: (resource, params) => {
      const options = {
        headers: new Headers({}),
      };
      return httpClient(`${apiUrl}/${resource}`, {
        method: "POST",
        body: JSON.stringify(params.data),
        ...options,
      }).then(({ json }) => ({ data: { ...params.data, id: json._id } }));
    },

    delete: (resource, params) => {
      return httpClient(`${apiUrl}/${resource}/${params.id}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "text/plain",
        }),
      }).then(({ json }) => ({ data: { ...json, id: json._id } }));
    },

    // simple-rest doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
    deleteMany: (resource, params) => {
      return Promise.all(
        params.ids.map((id) =>
          httpClient(`${apiUrl}/${resource}/${id}`, {
            method: "DELETE",
            headers: new Headers({
              "Content-Type": "text/plain",
            }),
          })
        )
      ).then((responses) => ({
        data: responses.map(({ json }) => json.id),
      }));
    },
  };
};
