# Financial Control Web API

### Pre requisites:

- [Installing AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)
- [Installing Terraform CLI](https://www.terraform.io/downloads.html)

### Infrastructure Setup

Stateful resources are defined with **Terraform**, so in order to create/change the resources follow the steps below.

---

- Create env file and update it based on your needs:

```bash
$ cd infrastructure && \
cp terraform.tfvars.dist terraform.tfvars
``` 

---

- Create resources:

**Obs.:** In case of env file not being created the environment variables will use default values, which are set in
`infrastructure/variables.tf` file

```bash
$ terraform apply
``` 

### Application Setup

- Installing dependencies:

```bash
$ npm i
```

---

- Copy environment variables and edit them based on your needs:

```bash
$  cp .env.dist .env
```

---

- Setup manually environment variables on **AWS Code Deploy**:

Despite generating the `.env` file there are two variables that must be
manually added to **AWS Code Deploy** as  `PARAMETER_STORE`: `ACCESS_KEY_ID`, `SECRET_ACCESS_KEY`

---

- Running seeders:

**Obs.:** The stateful resources **must** be created **BEFORE** running this seed command

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

---

- Fix style:

```bash
$ npm run fixStyle
```

### Tests

- Run tests:

```bash
$ npm test
```

---

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

---

- Run a function locally:

```bash
$ FUNCTION_NAME=get-categories npm run invokeFunction
```

### Extra Utilities

Tip: Install `jq`

<details>
    <summary>Checking AWS Code Pipeline "financial_control_api"</summary>

```bash
aws codepipeline get-pipeline --name financial_control_api | jq
```

The output must be similar to:

```json
{
  "pipeline": {
    "name": "financial_control_api",
    "roleArn": "arn:aws:iam::ACCOUNT_ID:role/service-role/AWSCodePipelineServiceRole-REGION-financial_control_api",
    "artifactStore": {
      "type": "S3",
      "location": "codepipeline-REGION-LOCATION_ID"
    },
    "stages": [
      {
        "name": "Source",
        "actions": [
          {
            "name": "Source",
            "actionTypeId": {
              "category": "Source",
              "owner": "ThirdParty",
              "provider": "GitHub",
              "version": "1"
            },
            "runOrder": 1,
            "configuration": {
              "Branch": "repository_branch",
              "OAuthToken": "****",
              "Owner": "repository_account",
              "PollForSourceChanges": "false",
              "Repo": "repository_name"
            },
            "outputArtifacts": [
              {
                "name": "SourceArtifact"
              }
            ],
            "inputArtifacts": [],
            "region": "us-east-1",
            "namespace": "SourceVariables"
          }
        ]
      },
      {
        "name": "Build",
        "actions": [
          {
            "name": "Build",
            "actionTypeId": {
              "category": "Build",
              "owner": "AWS",
              "provider": "CodeBuild",
              "version": "1"
            },
            "runOrder": 1,
            "configuration": {
              "ProjectName": "financial_control_api"
            },
            "outputArtifacts": [
              {
                "name": "BuildArtifact"
              }
            ],
            "inputArtifacts": [
              {
                "name": "SourceArtifact"
              }
            ],
            "region": "REGION",
            "namespace": "BuildVariables"
          }
        ]
      }
    ],
    "version": 1
  },
  "metadata": {
    "pipelineArn": "arn:aws:codepipeline:REGION:ACCOUNT_ID:financial_control_api",
    "created": 1582311337.988,
    "updated": 1582311337.988
  }
}
```

</details>

<details>
    <summary>Checking AWS Code Builds "financial_control_api"</summary>

```bash
aws codebuild list-builds | jq
```

The output must be similar to:

```json
{
  "ids": [
    "financial_control_api:RANDOM_ID",
    "financial_control_api:RANDOM_ID",
  ]
}
```

</details>
