# @can-it/operators-relation

This package provides a simple way to demonstrate the relationship between two or more codes/values. It is used in conjunction with [@can-it/core](https://www.npmjs.com/package/@can-it/core) or other [packages that utilize the can-it package](https://www.npmjs.com/search?q=keywords%3Acan-it-utilization).

## Usage

The `RelationComparator` is an operator provided by the `@can-it/core` package. Take a look at the example code below to understand how it works:

```typescript
import { RelationComparator } from '@can-it/operators-relation';

const actionComparator = new RelationComparator(
  ['create', 'edit', 'delete', 'get', '*'],
  {
    edit: ['get'], // The "edit" action allows performing the "get" action.
    create: ['edit', 'get'], // The "create" action allows performing the "edit" and "get" actions.
    ['*']: [], // The "*" action uses an empty array ([]), allowing for performing all other actions.
  }
);

actionComparator.isAllowed('create', '*'); // true
actionComparator.isAllowed('get', 'edit'); // true
actionComparator.isAllowed('get', 'get'); // true
actionComparator.isAllowed('delete', 'delete'); // true
actionComparator.isAllowed('get', 'create'); // false
actionComparator.isAllowed('get', 'delete'); // false

actionComparator.isDenied('get', 'edit'); // false - denying the "edit" action does not necessarily mean denying the "view" action.
actionComparator.isDenied('edit', 'edit'); // true
```
