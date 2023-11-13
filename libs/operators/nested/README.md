# @can-it/operators-nested

This package provides a simple way to define and work with hierarchical relationships between values, typically resources. It is used in conjunction with [@can-it/core](https://www.npmjs.com/package/@can-it/core) or other [can-it utilization packages](https://www.npmjs.com/search?q=keywords%3Acan-it-utilization).

## Concepts
The Nested operator is designed to handle nested values. Here are some use cases that illustrate how this concept works:

RI definition:
- User X belongs to org Y, represented by the RI: `orgs::Y::users::X`
- Product Z belongs to user X: `orgs::Y::users::X::products::Z`
- Org Y has a payment section: `orgs::Y::payments::payment-id-94kd03`
- Org Y has a settings section: `orgs::Y::settings::setting-id-j8e84`

Use cases and corresponding permissions:
- Access settings at any organization, including all settings' children resources: `orgs::*::settings`
- Access users at any organization, including all user's children resources: `orgs::*::users`
- Access users and their resources on a specific org ID: `orgs::Y::users`
- Access user X on organization Y: `orgs::Y::users::X`
- Access users, excluding user's children resources at any organization: `orgs::*::users::*`
- Access users, excluding user's children resources at organization Y: `orgs::Y::users::*`
- Access products of users at any organization: `orgs::*::users::*::products`
- Access products of user X at organization Y: `orgs::*::users::X::products`
- Access product Z of user X at organization Y: `orgs::Y::users::X::products::Z`

## Usage
- `NestedGenerator` is an operator used to generate code based on the initialized NestedPattern, which has the following options:

```typescript
NestedPattern {
  separator: string; // default is `'::'`
  wildcard: string; // default is `'*'`
  resourceRegex: string; // default is `'[\\w-]*'`
}
```

```typescript

import { NestedGenerator } from '@can-it/operators-nested';

const generator = new NestedGenerator();
// The input will be passed with the `requestCode` and `permissionCode` in order.
generator.transform('orgs'); // `'orgs'`
generator.transform('orgs', '', 'users'); // `'orgs::*::users'` (an empty string will be processed as a wildcard signal).
generator.transform('orgs', 'any-org-id-9585'); // `'orgs::any-org-id-9585'`
generator.transform('orgs', 'any-org-id-9585', 'users', 'user-id-73jg4k'); // `'orgs::any-org-id-9585::users::user-id-73jg4k'`
```

- `NestedComparator` is an operator used to check whether a request can match the given permission.

```typescript
import { NestedComparator } from '@can-it/operators-nested';

const comparator = new NestedComparator();
// The input will be passed with the `requestCode` and `permissionCode` in order.
comparator.isAllowed('orgs', 'orgs'); // true
comparator.isAllowed('orgs::any-org-id-9585', 'orgs'); // true
comparator.isAllowed('orgs::any-org-id-9585::users::user-id-73jg4k', 'orgs'); // true
comparator.isAllowed('orgs', 'orgs::*'); // true
comparator.isAllowed('orgs::any-org-id-93485', 'orgs::*'); // true
comparator.isAllowed('orgs::any-org-id-93485::users', 'orgs::*'); // false
comparator.isAllowed('orgs::any-org-id-93485::users:any-user-id-js934n', 'orgs::*'); // false
comparator.isAllowed('orgs::any-org-id::users', 'orgs::*::users'); // true
comparator.isAllowed('orgs::any-org-id::users::any-user-id-39485', 'orgs::*::users'); // true
comparator.isAllowed('orgs::any-org-id::products::any-product-id-39485', 'orgs::*::users'); // false
comparator.isAllowed('orgs::any-org-id::users::any-user-id-39485:products', 'orgs::*::users'); // true
```
