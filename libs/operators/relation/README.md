# @can-it/operators-relation

This package provides a simple way to demonstrate the relationship between two or more codes/values. It is used in conjunction with [@can-it/core](https://www.npmjs.com/package/@can-it/core) or other packages that utilize the can-it framework (https://www.npmjs.com/search?q=keywords%3Acan-it-utilization).

## Usage

The `RelationComparator` is an operator provided by the `@can-it/core` package. Take a look at the example code below to understand how it works:

```typescript
import { RelationComparator } from '@can-it/operators-relation';

const comparator = new RelationComparator(['create', 'edit', 'delete', 'get', '*'], {
  edit: ['get'], // The "edit" action allows performing the "get" action.
  create: ['edit', 'get'], // The "create" action allows performing the "edit" and "get" actions.
  ['*']: ['create', 'edit', 'delete', 'get'], // The "*" action allows performing all other actions.
});

comparator.isAllowed('create', '*'); // true
comparator.isAllowed('get', 'edit'); // true
comparator.isAllowed('get', 'get'); // true
comparator.isAllowed('delete', 'delete'); // true
comparator.isAllowed('get', 'create'); // false
comparator.isAllowed('get', 'delete'); // false

comparator.isDenied('get', 'edit'); // false - denying the "edit" action does not necessarily mean denying the "view" action.
comparator.isDenied('edit', 'edit'); // true
```
