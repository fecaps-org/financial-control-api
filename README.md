# Financial Control Web API

### Pre requisites:

- [Installing AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)

### Setup

- Installing dependencies:

```bash
$ npm i
```

- Copy environment variables and edit them based on your AWS Account data:

```bash
$  cp .env.dist .env
```

** Despite generating the `.env` file there are two variables that must be
manually added to **AWS Code Deploy** as  `PARAMETER_STORE`: `ACCESS_KEY_ID`, `SECRET_ACCESS_KEY`

- Running seeders:

```bash
$ npm run seed
```

### Debug

#### Intellij IDEs

- Download `workspace.xml` file in the `ide-configs` directory

- Copy and paste it to `{{PROJECT_ROOT}}/.idea` (or update your `.idea/workspace.xml` file)

- Restart IDE

- Check debugger configurations

### Code Style

- Check style:

```bash
$ npm run checkStyle
```

- Fix style:

```bash
$ npm run fixStyle
```

### Tests

- Run tests:

```bash
$ npm test
```

- Run tests with **Debugger** (port 9300):

```bash
$ npm run testDebugger
```

### Usage

- Deploying:

```bash
$ chmod +x ./build.sh && \
./build.sh deploy dev
```

- Run a function locally:

```bash
$ FUNCTION_NAME=get-categories npm run invokeFunction
```
