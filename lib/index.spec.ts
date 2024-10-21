import { helloWorld } from './index';

describe('Hello World', () => {
  it('should print hello world', () => {
    expect(helloWorld()).toBe('Hello World');
  });
});
