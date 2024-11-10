# Time Bomb Decorator

**Time Bomb Decorator** is a JavaScript decorator that reminds about code changes you planned to do.  
Designed to help developers manage technical debt or set reminders within code, it alerts when certain parts of the code are due for a change.  
Two weeks before the due date the decorator will log a warning message, and on the due date,  
it will log an error and throw an exception if the bomb severity is defined as `ERROR`.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Why Use Time Bomb Decorator?](#why-use-time-bomb-decorator)
- [Contributing](#contributing)
- [License](#license)

## Installation

Install the package via npm:

```bash
npm install time-bomb-decorator
```

## Usage

The time-bomb-decorator package provides a decorator that you can apply to any function.  
It allows you to set an expiration date after which the function will log a warning message or trigger custom actions.

In order to plant the bomb add the decorator above the function you wish to work on later , provide to the decorator date and owner.

**Environment Dependent Behavior**  
The behavior of the decorator is dependent on the environment of the project:

- In **production** environment, the decorator is off and no logs nor exceptions will be thrown.
- In **development** environment, the decorator will log a warning message two weeks before the due date and log console errors if a bomb is due, but no exceptions will be thrown.
- In **test** environment, the decorator will throw exception if a bomb with severity `ERROR` is due.
  > The reason for throwing an error only on test mode is to have the ability to break the build , by adding a unit test that checks that the application started without any errors.

### Basic Example

```javascript
import { TimeBomb } from 'time-bomb-decorator';

class ExampleClass {
  @TimeBomb('2024-12-31', 'Jane Doe') //remove this function once getDailyReportV2 is fully deployed and tested
  getDailyReportV1() {
    console.log('some legacy code');
  }
}
```

## API

`TimeBomb(dueDate:string, owner: string, severity?: 'WARNING' | 'ERROR' = 'WARNING')`

- `dueDate` - string representing the due date of the fix in format - `YYYY-MM-DD`
- `owner` - string representing the owner of the bomb
- `severity` - string representing the severity of the bomb, can be `WARNING` or `ERROR`, default is `WARNING`, `ERROR` throws an exception once the given due date has passed

### Example Usage

Here’s a typical usage:

```javascript
import { TimeBomb } from 'time-bomb-decorator';

class ExampleClass {
  @TimeBomb('2024-12-31', 'Jane Doe', 'ERROR') // this function calls an API of a provider that will be deprecated on 2024-12-31
  getDataFromTempProviderV1() {
    console.log('some legacy code');
  }
}
```

In this example, the decorator will throw an exception once the due date has passed , and a test that checks that the application started without any errors will fail.

## Why Use Time Bomb Decorator?

- **Manage Small Technical Debts**: Helps you remember to update parts of your code that needs evolve later on.
- **Simple Integration**: Works with JavaScript and TypeScript projects and can be quickly added to any function.

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check out the issues page if you want to contribute.

## License

Distributed under the MIT License. See LICENSE for more information.
