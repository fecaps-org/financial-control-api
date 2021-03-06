# Financial Control Web API

## Pre requisites:

- [Installing AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)
- [Installing Terraform CLI](https://www.terraform.io/downloads.html)

## Infrastructure Setup

Stateful resources are defined with **Terraform**, so in order to create/change the resources follow the steps below.

**REQUIREMENTS:**

- In order to fully create the infrastructure in AWS it's required to setup
this project within an Organization in GitHub, as Terraform has a limitation to setup
a WebHook in a personal project, see more [here](https://www.terraform.io/docs/providers/github/r/repository_webhook.html) 

- It's required to create a Personal Access Token in GitHub in order to use the environment variable
`repositoryAccessToken` in Terraform configurations. See more [here](https://github.com/settings/tokens)
---

- Create `terraform.tfvars` file and update it based on your needs:

```bash
$ cd infrastructure && \
cp terraform.tfvars.dist terraform.tfvars
``` 

---

- Create resources:

```bash
$ terraform validate && \
terraform init && \
terraform apply
``` 

---

- Stateful resources created:

    - AWS Code Pipeline (with a GitHub WebHook)
    - AWS Code Build
    - AWS Dynamo DB
    - AWS Kinesis Data Stream
    - AWS SNS

## Continuous Delivery

After running the Terraform command above, the CI/CD will be ready.

With the CI/CD in place, all pushes to `master` will be
automatically deployed.

![CI/CD](architecture/ci_cd_diagram.png)

## Application Setup

- Installing dependencies:

```bash
$ npm i
```

---

- Copy `.env.dist` file and edit them based on your needs:

```bash
$  cp .env.dist .env
```

---

- Running seeders:

**Obs.:** The stateful resources **must** be created **BEFORE** running this seed command

**Obs.1:** This command must be executed only once

```bash
$ npm run seed
```

## Architecture

![Project Architecture](architecture/application_diagram.png)

## Debug

### Intellij IDEs

- Download `workspace.xml` file in the `ide-configs` directory

- Copy and paste it to `{{PROJECT_ROOT}}/.idea` (or update your `.idea/workspace.xml` file)

- Restart IDE

- Check debugger configurations

## Code Style

- Check style:

```bash
$ npm run checkStyle
```

---

- Fix style:

```bash
$ npm run fixStyle
```

## Tests

- Run tests:

```bash
$ npm test
```

---

- Run tests with **Debugger** (port 9300):

```bash
$ npm run testDebugger
```

## Usage

- Deploying:

** Unnecessary, unless willing to deploy without pushing the code to `master`

```bash
$ chmod +x ./build.sh && \
./build.sh deploy dev
```

---

- Run a function locally:

```bash
$ FUNCTION_NAME=get-categories npm run invokeFunction
```

## Next Steps

- After having a Web APP for the application, setup AWS Cognito
- Change Cloudwatch logs to ELK
- Add X-Ray
- Check functions permissions
