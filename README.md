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
import { CanIt, EqualActionOperator, EqualRiOperator } from '@can-it/core';

// Create a CanIt instance by providing:
// - Policy State
// - Action Operator
// - Ri Operator
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
  new EqualActionOperator(),
  new EqualRiOperator()
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

- **ActionOperator** is an interface that has an `isMatch` method used to check whether the request action matches a specific permission action defined in the PolicyState object. The package currently supports two types of operators:
- `EqualActionOperator`: This operator is used for comparing two actions for equality. It performs a simple string comparison to check if two RIs are exactly the same.

- `RelationActionOperator` is another operator provided by the `@can-it/core` package. Let's take a look at the code example to understand how it works:

    ```typescript
    const operator = new RelationActionOperator(
      ['create', 'edit', 'delete', 'get', '*'],
      {
        edit: ['get'], // The "edit" action allows performing the "get" action.
        create: ['edit', 'get'], // The "create" action allows performing the "edit" and "get" actions.
        ['*']: ['create', 'edit', 'delete', 'get'] // The "*" action allows performing all other actions.
      }
    );

    operator.isMatch('create', '*'); // true
    operator.isMatch('get', 'edit'); // true 
    operator.isMatch('get', 'get'); // true 
    operator.isMatch('delete', 'delete'); // true 
    operator.isMatch('get', 'create'); // false 
    operator.isMatch('get', 'delete'); // false 
    ```

- **RiOperator** is an interface that has an `isMatch` method used to check whether the request RI matches a specific permission resouce RI in the PolicyState object. The package currently supports two types of operators:
  - `EqualRiOperator`: This operator is used for comparing two resource identifiers (RI) for equality. It performs a simple string comparison to check if two RIs are exactly the same.
  - `NestedRiOperator`: This operator is used for handling nested resource identifiers. It provides a way to define and work with hierarchical relationships between resources. Here are a few use cases to help you understand the functionality of the NestedRiOperator:

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
