variable "region" {
  default = "us-west-1"
}

variable "tableName" {
  default = "expenses_categories"
}

variable "stage" {
  default = "dev"
}

variable "codeBuildProjectName" {
  default = "codebuild-financial-control-api-project"
}

variable "repositoryProvider" {
  default = "GitHub"
}

variable repositoryAccessToken {
  default = "access-token-here"
}

variable repositoryOrganization {
  default = "fecaps-org"
}

variable repositoryName {
  default = "financial-control-api"
}

variable repositoryBranch {
  default = "master"
}

variable accessKey {
  default = "access-key"
}

variable secretKey {
  default = "secret-key"
}

variable kinesisDataStream {
  default = "expense_events"
}
