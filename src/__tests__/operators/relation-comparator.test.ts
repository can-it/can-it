import { RelationComparator } from '../../operators/relation-comparator';

describe('NestedActionOperator: action is not mentioned in the "relationship" object', () => {
  const operator = new RelationComparator(
    ['create', 'edit', 'delete', 'get', '*'],
    {
      edit: ['get'], // the "edit" action will allow to perform "get" action
    }
  );
  test('should allow the GET action', () => {
    expect(operator.isAllowed('get', 'get')).toBe(true);
  });
  
  test('should allow the DELETE action', () => {
    expect(operator.isAllowed('delete', 'delete')).toBe(true);
  });

  test('should not allow other actions', () => {
    expect(operator.isAllowed('edit', 'get')).toBe(false);
    expect(operator.isAllowed('delete', 'get')).toBe(false);
  });
});

// eslint-disable-next-line max-lines-per-function
describe('NestedActionOperator: mention with some other actions in the "relationship" object', () => {
  const operator = new RelationComparator(
    ['create', 'edit', 'delete', 'get', '*'],
    {
      edit: ['get'], // the "edit" action will allow to perform "get" action
      create: ['edit', 'get'], // the "create" action will also allow to perform "edit", "get" action,
      ['*']: ['create', 'edit', 'delete', 'get']
    }
  );

  describe('mention some actions', () => {
    test('should allow the GET action', () => {
      expect(operator.isAllowed('get', 'edit')).toBe(true);
    });

    test('should allow the EDIT action', () => {
      expect(operator.isAllowed('edit', 'edit')).toBe(true);
    });

    test('should not allow the CREATE action', () => {
      expect(operator.isAllowed('create', 'edit')).toBe(false);
    });

    test('should only support 1 level of relationship between actions', () => {
      expect(operator.isAllowed('create', 'get')).toBe(false);
    });
  });
  
  describe('mention all actions', () => {
    test('should allow the GET action', () => {
      expect(operator.isAllowed('get', '*')).toBe(true);
    });

    test('should allow the EDIT action', () => {
      expect(operator.isAllowed('edit', '*')).toBe(true);
    });

    test('should not allow the CREATE action', () => {
      expect(operator.isAllowed('create', '*')).toBe(true);
    });

    test('should not allow the CREATE action', () => {
      expect(operator.isAllowed('delete', '*')).toBe(true);
    });
  });
});

describe('NestedActionOperator: do not support inheritance in "relationship" action', () => {
  const operator = new RelationComparator(
    ['create', 'edit', 'get'],
    {
      edit: ['get'], // the "edit" action will allow to perform "get" action
      create: ['edit'], // the "create" action will also allow to perform "edit", but "get"
    }
  );

  test('"create can edit" and "edit can get", but "create can not get"', () => {
    expect(operator.isAllowed('get', 'edit')).toBe(true);
    expect(operator.isAllowed('edit', 'create')).toBe(true);

    expect(operator.isAllowed('get', 'create')).toBe(false);
  });
});

describe('NestedActionOperator with incorrect action relationship', () => {
  const operator = new RelationComparator(
    ['edit', 'get'],
    {
      edit: ['unknown-action', 'get'],
      ['unknow-action']: ['edit', 'view']
    }
  );

  test('should allow the provided action', () => {
    expect(operator.isAllowed('get', 'edit')).toBe(true);
  });

  test('should always not allow the action that not provided in "actions" list', () => {
    expect(operator.isAllowed('unknown-action', 'unknow-action')).toBe(false);
    expect(operator.isAllowed('edit', 'unknow-action')).toBe(false);
    expect(operator.isAllowed('unknown-action', 'edit')).toBe(false);
  });
});
