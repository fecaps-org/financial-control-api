# Financial Control App

### Pre requisites:

- [Installing AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)
- [Installing Serverless](https://serverless.com/framework/docs/getting-started/)

### Setup

- Install full project dependencies:

```bash
$ npm i
```

- Installing Web API dependencies:

** <i>There's no need to run this command if the full project dependencies command was executed</i>

```bash
$ npm run installApiDependencies
```

- Copy Web API environment variables and edit them based on your AWS Account data:

```bash
$ npm run generateApiEnvFile
```

- Running Web API seeders:

```bash
$ npm run runApiSeeders
```

### Usage

- Deploying Web API:

```bash
$ npm run buildApi
```

- Fix Web API style:

```bash
$ npm run fixApiStyle
```

- Run Web API unit/integration tests without **Debugger**:

```bash
$ npm run runApiTests
```

- Run Web API unit/integration tests with **Debugger** :

On port 9300

```bash
$ npm run runApiTestsDebugger
```

- Run a function locally:

```bash
$ FUNCTION_NAME=get-categories npm run invokeFunction
```
