import RelationActionOperator from '../../operators/relation-action-operator';

// eslint-disable-next-line max-lines-per-function
describe('NestedActionOperator with correct actions and its relationship provided', () => {
  const operator = new RelationActionOperator(
    ['create', 'edit', 'delete', 'get', '*'],
    {
      edit: ['get'], // the "edit" action will allow to perform "get" action
      create: ['edit', 'get'], // the "create" action will also allow to perform "edit", "get" action,
      ['*']: ['create', 'edit', 'delete', 'get']
    }
  );

  describe('action is not mentioned in the "relationship" object', () => {
    test('should allow the GET action', () => {
      expect(operator.isMatch('get', 'get')).toBe(true);
    });
    
    test('should allow the DELETE action', () => {
      expect(operator.isMatch('delete', 'delete')).toBe(true);
    });

    test('should not allow other actions', () => {
      expect(operator.isMatch('edit', 'get')).toBe(false);
      expect(operator.isMatch('delete', 'get')).toBe(false);
    });
  });

  describe('mention with some other actions in the "relationship" object', () => {
    describe('mention some actions', () => {
      test('should allow the GET action', () => {
        expect(operator.isMatch('get', 'edit')).toBe(true);
      });
  
      test('should allow the EDIT action', () => {
        expect(operator.isMatch('edit', 'edit')).toBe(true);
      });
  
      test('should not allow the CREATE action', () => {
        expect(operator.isMatch('create', 'edit')).toBe(false);
      });
    });
    
    describe('mention all actions', () => {
      test('should allow the GET action', () => {
        expect(operator.isMatch('get', '*')).toBe(true);
      });
  
      test('should allow the EDIT action', () => {
        expect(operator.isMatch('edit', '*')).toBe(true);
      });
  
      test('should not allow the CREATE action', () => {
        expect(operator.isMatch('create', '*')).toBe(true);
      });

      test('should not allow the CREATE action', () => {
        expect(operator.isMatch('delete', '*')).toBe(true);
      });
    });
  });
});

describe('NestedActionOperator with incorrect action relationship', () => {
  const operator = new RelationActionOperator(
    ['edit', 'get'],
    {
      edit: ['unknown-action', 'get'],
      ['unknow-action']: ['edit', 'view']
    }
  );

  test('should allow the provided action', () => {
    expect(operator.isMatch('get', 'edit')).toBe(true);
  });

  test('should always not allow the action that not provided in "actions" list', () => {
    expect(operator.isMatch('unknown-action', 'unknow-action')).toBe(false);
    expect(operator.isMatch('edit', 'unknow-action')).toBe(false);
    expect(operator.isMatch('unknown-action', 'edit')).toBe(false);
  });
});
