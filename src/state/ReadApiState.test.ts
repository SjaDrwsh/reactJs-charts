import { skipTick } from '../util/testUtil';
import { ReadApiState } from './ReadApiState';

describe('Tests for ReadApiState', () => {
  it('should have isLoading false, data and error undefined by default', () => {
    const readApiState = new ReadApiState(async () => Promise.resolve());
    expect(readApiState.isLoading).toEqual(false);
    expect(readApiState.data).toBeUndefined();
    expect(readApiState.error).toBeUndefined();
  });

  it('should set isLoading true when called', () => {
    const readApiState = new ReadApiState(async () => Promise.resolve());
    readApiState.call();
    expect(readApiState.isLoading).toEqual(true);
    expect(readApiState.data).toBeUndefined();
    expect(readApiState.error).toBeUndefined();
  });

  it('should set data to return value and isLoading to false', async () => {
    const testData = { foo: 'bar' };
    const readApiState = new ReadApiState(async () =>
      Promise.resolve(testData)
    );

    readApiState.call();
    await skipTick();

    expect(readApiState.isLoading).toEqual(false);
    expect(readApiState.data).toEqual(testData);
    expect(readApiState.error).toBeUndefined();
  });

  it('should set data to undefined, isLoading to false and error to thrown error', async () => {
    const testError = {
      name: '',
      config: {},
      message: '',
      response: {
        config: {},
        headers: {},
        status: 404,
        statusText: 'NotFound',
        data: {
          errors: [
            {
              message: 'some error',
              details: 'error details',
              code: 'AnyErrorCode',
              errorId: '12345',
              constraintViolations: undefined,
              context: {
                referredItem: 'refItem',
              },
            },
          ],
        },
      },
      isAxiosError: false,
      toJSON: () => {
        return {};
      },
    };
    const readApiState = new ReadApiState(async () =>
      Promise.reject(testError)
    );

    readApiState.call();
    await skipTick();

    expect(readApiState.isLoading).toEqual(false);
    expect(readApiState.error).toEqual(testError);
    expect(readApiState.data).toBeUndefined();
  });
});
