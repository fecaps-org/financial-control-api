variable "region" {
  type        = string
  description = "AWS region"
}

variable "tableName" {
  type        = string
  description = "AWS DynamoDB table name"
}

variable "stage" {
  type        = string
  description = "Stage"
}

variable "codeBuildProjectName" {
  type        = string
  description = "AWS Code Build project name"
}

variable "repositoryProvider" {
  type        = string
  description = "Repository Provider"
}

variable "repositoryAccessToken" {
  type        = string
  description = "Repository Access Token"
}

variable "repositoryOrganization" {
  type        = string
  description = "Repository Organization"
}

variable "repositoryName" {
  type        = string
  description = "Repository Name"
}

variable "repositoryBranch" {
  type        = string
  description = "Repository Branch"
}

variable "accessKey" {
  type        = string
  description = "AWS Access Key"
}

variable "secretKey" {
  type        = string
  description = "AWS Secret Key"
}

variable "kinesisDataStream" {
  type        = string
  description = "AWS Kinesis Data Stream name"
}

variable "snsName" {
  type        = string
  description = "AWS SNS topic name"
}

variable "phoneNumber" {
  type        = string
  description = "Phone Number"
}
