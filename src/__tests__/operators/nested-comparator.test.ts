import { NestedComparator } from '../../operators/nested-comparator';

// eslint-disable-next-line max-lines-per-function
describe('NestedRiOperator with default ri pattern', () => {
  const operator = new NestedComparator();

  describe('There no wildcard in permission: "orgs"', () => {
    test('should authorize to all organizations and its children resources', () => {
      expect(operator.isAllowed('orgs', 'orgs')).toBe(true);
    });
  
    test('should authorize to any organization object ("orgs:any-org-id")', () => {
      expect(operator.isAllowed('orgs::any-org-id-9585', 'orgs')).toBe(true);
    });
  
    test('should authorize to any organization children resources ("orgs:any-org-id:users")', () => {
      expect(operator.isAllowed('orgs::any-org-id-9585::users::user-id-73jg4k', 'orgs')).toBe(true);
    });
  });

  describe('The wildcard appears at the end: "orgs::*"', () => {
    test('should authorize to "orgs" ri', () => {
      expect(operator.isAllowed('orgs', 'orgs::*')).toBe(true);
    });
  
    test('should authorize to any organization (orgs::any-org-id)', () => {
      expect(operator.isAllowed('orgs::any-org-id-93485', 'orgs::*')).toBe(true);
    });
  
    test('should not authorize to any specific organization children resources (orgs::any-org-id::child-resource)', () => {
      expect(operator.isAllowed('orgs::any-org-id-93485::users', 'orgs::*')).toBe(false);
    });
  
    test('should not authorize to organization resources (orgs::any-org-id::child-resources::child-id-ks843)', () => {
      expect(operator.isAllowed('orgs::any-org-id-93485::users:any-user-id-js934n', 'orgs::*')).toBe(false);
    });
  });

  describe('Wildcard at the middle: "orgs::*::users"', () => {
    test('should authorize to any organization user (orgs::any-org-id::users)', () => {
      expect(operator.isAllowed('orgs::any-org-id::users', 'orgs::*::users')).toBe(true);
    });
    
    test('should only authorize to user\'s resources (orgs::any-org-id::users)', () => {
      expect(operator.isAllowed('orgs::any-org-id::users::any-user-id-39485', 'orgs::*::users')).toBe(true);
      expect(operator.isAllowed('orgs::any-org-id::products::any-product-id-39485', 'orgs::*::users')).toBe(false);
    });
    
    test('should authorize to user\'s resources (orgs::any-org-id::users::any-user-id::child-resource)', () => {
      expect(operator.isAllowed('orgs::any-org-id::users::any-user-id-39485:products', 'orgs::*::users')).toBe(true);
    });
  });
});
