import { LoadPolicyMiddleware } from './load-policy.middleware';

describe('LoadPolicyMiddleware', () => {
  it('should be defined', () => {
    expect(new LoadPolicyMiddleware()).toBeDefined();
  });
});
