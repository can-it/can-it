# can-it

[Package Documentations](https://can-it.github.io/packages/core)
## Setup Environment
To set up the environment, follow these steps:

1. Clone this repository:

    ```bash
    git clone git@github.com:can-it/can-it.git
    ```

2. Navigate to the project directory:
    ```bash
    cd can-it
    ```

3. Install the required dependency packages:

    ```bash
    pnpm i
    ```

## Project Structure
```
📂 apps
   └── examples  <!-- Used for testing the libraries -->
📂 libs
   ├── core
   └── operators
       ├── exact
       ├── nested
       ├── relation
       └── ...
```
## Core
You can find the code for the core functionality in the `libs/core` folder.

### Build
To build the core, run the following command:
```bash
npx nx build core
```

### Run Tests
To run tests for the core, use the following command:
```bash
npx nx test core
```

## Operators
The operators allow you to perform specific tasks. Follow the steps below to create and work with operators.

### Create a New Operator
To create a new operator, run the following command:
```bash
npx nx g @nx/js:lib operators-[name] --directory=libs/operators/[name] --publishable=true --import-path=@can-it/operators-[name]
```
Replace `[name]` with the desired name for your operator.

### Build the Operator
To build the operator, use the following command:
```bash
npx nx build operators-[name]
```
Replace `[name]` with the name of your operator.

### Run Tests
To run tests for the operator, use the following command:
```bash
npx nx test operators-[name]
```
Replace `[name]` with the name of your operator.
