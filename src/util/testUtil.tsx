import { ReadApiState } from 'src/state/ReadApiState';

/**
 * skip one event loop to wait for promises to get resolved
 */
export async function skipTick(): Promise<void> {
  return new Promise(setImmediate);
}

export interface ReadApiStateMock<P extends any[]> {
  /**
   * The promise function of the state is a jest.fn() in the tests
   */
  promiseFn: jest.Mock;

  /**
   * A call function to call the mocked ReadApiState directly from the returned mock object.
   */
  call(...args: P): Promise<void>;
}

/**
 * Get the provided state casted to a mock which provides access to the internal function
 * Provides possibility to pass a promise that will be returned from the mocked internal function
 * @param state The state to mock
 * @param promiseFn The promiseFn to use for the internal state function
 * @param callInstantParams Provide parameters if the ReadApiState should be called immediately
 */
export function mockReadApiState<T, E, P extends any[]>(
  state: ReadApiState<T, E, P>,
  promiseFn: () => Promise<T>
): ReadApiStateMock<P> {
  const mock = state as any as ReadApiStateMock<any>;
  mock.promiseFn.mockImplementation(promiseFn);

  return mock;
}
