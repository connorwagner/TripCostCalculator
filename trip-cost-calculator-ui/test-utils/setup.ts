// Required by tsyringe
import "reflect-metadata";

import createFetchMock from "vitest-fetch-mock";
createFetchMock(vi).enableMocks();
afterEach(() => {
  fetchMock.resetMocks();
});
