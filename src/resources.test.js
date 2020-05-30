import "core-js/stable";
import "regenerator-runtime/runtime";
import {
  applyQueryStringsOnURL,
  getHttpClientLibraryMethod,
  prepareBaseURL,
  createResources,
  resources,
} from "./";

const simpleActions = {
  fetchUsers: { method: "GET", url: "/users" },
  fetchSpecificUser: { method: "GET", url: "/users/:username" },
  fetchSpecificUserQueryParam: {
    method: "DELETE",
    url: "/users/:username?id=:id",
  },
};

const baseURL = "https://api.github.com";

const simpleResource = resources(baseURL, simpleActions);

const username = "pablohpsilva";

const id = 2090635;

test("create resource using axios", async () => {
  expect(Object.keys(simpleResource).length).toBe(9);
  const resourceCreated = Object.values(simpleResource);

  expect(resourceCreated.every((el) => el instanceof Function)).toBe(true);
});

test("fetchUsers from resource", async () => {
  const response = await simpleResource.fetchUsers().catch((error) => {
    throw error;
  });

  const { data } = response;

  expect(data instanceof Array).toBe(true);
  expect(!!data.length).toBe(true);

  if (data.length && data[0]) {
    const user = data[0];
    expect(Object.prototype.hasOwnProperty.call(user, "login")).toBe(true);
  }

  expect(response.config.url).toBe(`${baseURL}/users`);
});

test("fetchSpecificUser from resource", async () => {
  const response = await simpleResource
    .fetchSpecificUser({ username, id })
    .catch((error) => {
      throw error;
    });

  const { data } = response;

  expect(data instanceof Object).toBe(true);
  expect(data.login).toBe(username);

  expect(response.config.url).toBe(`${baseURL}/users/${username}`);
});

test("applyQueryStringsOnURL should replace correctly the URL", () => {
  const url = `${baseURL}/:username`;
  const params = { username: 1 };

  expect(applyQueryStringsOnURL(url, params)).toBe(`${baseURL}/1`);
});

test("getHttpClientLibraryMethod should return the correct funcion", () => {
  const axios = {
    get() {
      return 1;
    },
  };
  const method = "get";

  expect(getHttpClientLibraryMethod(axios, method)()).toBe(1);
});

test("prepareBaseURL should return the correct funcion", () => {
  const url = "/user/:username";
  const params = { username: 1 };

  expect(prepareBaseURL(baseURL, url, params)).toBe(`${baseURL}/user/1`);
});

test("createResources should return the resource", () => {
  const axios = {
    get() {
      return 1;
    },
  };
  const method = "get";
  const name = "fetch";

  const action = { method: "GET", url: "/user/:username" };

  // HttpClientLibrary, name, action, baseURL

  expect(createResources(axios, name, action, baseURL).fetch()).toBe(1);
});
