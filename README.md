# Financial Control App

### Pre requisites:

- [Installing AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)
- [Installing Serverless](https://serverless.com/framework/docs/getting-started/)

### Setup

- Install full project dependencies:

```bash
$ npm i
```

- Copy Web API environment variables and edit them based on your AWS Account data:

```bash
$ npm run generateApiEnvFile
```

- Installing Web API dependencies:

```bash
$ npm run installApiDependencies
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

### Resources

- AWS DynamoDB
