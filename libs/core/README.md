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
  new ExactComparator(), // You can leave it as undefined; it will use the ExactComparator as the default.
  new ExactComparator() // You can leave it as undefined; it will use the ExactComparator as the default.
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

- **Comparator** is an interface that has an `isAllowed` method used to check whether the request action/ri matches a specific permission action/ri defined in the PolicyState object. The package currently supports the `EqualComparator`, which is used for comparing two values for equality. It performs a simple string comparison to check if two values are exactly the same.

## License

This project is licensed under the [MIT License](LICENSE).
