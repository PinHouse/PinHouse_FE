// __mocks__/axios.ts

import type { AxiosInstance } from "axios";

interface MockAxiosType extends AxiosInstance {
  get: jest.Mock;
  post: jest.Mock;
  put: jest.Mock;
  delete: jest.Mock;
  patch: jest.Mock;
  create: jest.Mock;
  interceptors: {
    request: { use: jest.Mock; eject: jest.Mock; clear: jest.Mock };
    response: { use: jest.Mock; eject: jest.Mock; clear: jest.Mock };
  };
}

const mockAxios = {
  get: jest.fn(),
  post: jest.fn((url, data, config) => {
    return Promise.resolve({ data: undefined });
  }),
  put: jest.fn(),
  delete: jest.fn(),
  patch: jest.fn(),

  __calls: [],

  create: jest.fn(),

  interceptors: {
    request: { use: jest.fn(), eject: jest.fn(), clear: jest.fn() },
    response: { use: jest.fn(), eject: jest.fn(), clear: jest.fn() },
  },
} as unknown as MockAxiosType;

mockAxios.create.mockReturnValue(mockAxios);

export default mockAxios;
export { mockAxios };
