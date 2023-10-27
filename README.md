# @can-it/core

## Description

`@can-it/core` is an npm library that provides functionality for handling access control and permission checks based on actions and resource identification.

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
  - `EqualActionOperator`
  - `RelationActionOperator`

- **RiOperator** is an interface that has an `isMatch` method used to check whether the request RI matches a specific permission resouce RI in the PolicyState object. The package currently supports two types of operators:
  - `EqualRiOperator`
  - `NestedRiOperator`

## License

This project is licensed under the [MIT License](LICENSE).
