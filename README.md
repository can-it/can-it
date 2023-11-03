# @can-it/core

## Description

`@can-it/core` is an npm library that provides functionality for handling access control and permission checks based on actions and resource identification.

## ⛔ Project Status
The project is still under development, which means there will be frequent breaking changes in versions 0.x.x. Please wait until version 1.0.0 for a more stable release.

## Installation

You can install the library using npm. Run the following command in your project directory:

```shell
npm install @can-it/core
```

## Usage

Using this package is easy. Follow the example below to get started:

```typescript
// Import classes from the library
import { CanIt, ExactComparator } from '@can-it/core';

// Create a CanIt instance by providing:
// - Policy State
// - Action Comparator
// - Ri Comparator
const canIt = new CanIt(
  {
    allow: [
      ['create', 'posts'],
      ['delete', 'posts']
    ],
    deny: [
      ['delete', 'users']
    ]
  },
  new ExactComparator(),
  new ExactComparator()
);

// Check whether a request is allowed or not
console.log(
  canIt.allowTo('create', 'posts')
);
// Output: true

console.log(
  canIt.allowTo('delete', 'users')
);
// Output: false
```

## Concepts

- **Resource Identity** (also known as `RI`) represents your system resources. Examples of RIs are:
  - `organizations`
  - `organizations::f47ac10b-58cc::users::00c04fd430c8`
  - `organizations::f47ac10b-58cc::products::7740a5e3c5e1`
  - `organizations::f47ac10b-58cc::products`
  - `organizations::*::users`

- **Action** represents the actions used in the authorization process of your system.

- **Permission** is an array with two strings that contain the action and RI in order. For example: `['create', 'posts']`.

- **Policy State** is a list of permissions defined for a principal, typically representing the currently authenticated user.

- **Comparator** is an interface that has an `isAllowed` method used to check whether the request action/ri matches a specific permission action/ri defined in the PolicyState object. The package currently supports 3 types of comparators:
- `EqualComparator`: This operator is used for comparing two values for equality. It performs a simple string comparison to check if two values are exactly the same.

- `RelationComparator` is another operator provided by the `@can-it/core` package. Let's take a look at the code example to understand how it works:

    ```typescript
    const comparator = new RelationComparator(
      ['create', 'edit', 'delete', 'get', '*'],
      {
        edit: ['get'], // The "edit" action allows performing the "get" action.
        create: ['edit', 'get'], // The "create" action allows performing the "edit" and "get" actions.
        ['*']: ['create', 'edit', 'delete', 'get'] // The "*" action allows performing all other actions.
      }
    );

    comparator.isAllowed('create', '*'); // true
    comparator.isAllowed('get', 'edit'); // true 
    comparator.isAllowed('get', 'get'); // true 
    comparator.isAllowed('delete', 'delete'); // true 
    comparator.isAllowed('get', 'create'); // false 
    comparator.isAllowed('get', 'delete'); // false 
    ```
  - `NestedComparator`: This operator is used for handling nested values. It provides a way to define and work with hierarchical relationships between values (usually resources). Here are a few use cases to help you understand the functionality of the NestedOperator:

      Ri definition:
      - User X belongs to org Y, the ri would be: `orgs::Y::users::X`
      - Product Z belongs to user X: `orgs::Y::users::X::products::Z`
      - Org Y has payment section: `orgs::Y::payments::payment-id-94kd03`
      - Org Y has settings section: `orgs::Y::settings::setting-id-j8e84`

      Use cases and corresponding permissions:
      - Access settings at any organization, including all settings' children resources: `orgs::*::settings`
      - Access users at any organization, including all user's children resources: `orgs::*::users`
      - Access users and their resources on specific org ID: `orgs::Y::users`
      - Access user X on organization Y: `orgs::Y::users::X`
      - Access users, excluding user's children resources at any organization: `orgs::*::users::*`
      - Access users, excluding user's children resources at organization Y: `orgs::Y::users::*`
      - Access products of users at any organization: `orgs::*::users::*::products`
      - Access products of user X at organization Y: `orgs::*::users::X::products`
      - Access product Z of user X at organization Y: `orgs::Y::users::X::products::Z`

## License

This project is licensed under the [MIT License](LICENSE).
