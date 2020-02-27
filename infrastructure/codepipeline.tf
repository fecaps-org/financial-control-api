provider "github" {
  token        = var.repositoryAccessToken
  organization = var.repositoryOrganization
}

resource "aws_s3_bucket" "codepipeline_bucket" {
  bucket = "codepipeline-s3-bucket-tf"
  acl    = "private"
}

resource "aws_iam_role" "codepipeline_role" {
  name = "codepipeline-iam-role-tf"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "codepipeline.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "codepipeline_policy" {
  name = "codepipeline_policy_tf"
  role = aws_iam_role.codepipeline_role.id

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect":"Allow",
      "Action": "s3:*",
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": "codebuild:*",
      "Resource": "*"
    }
  ]
}
EOF
}

resource "aws_codepipeline" "codepipeline" {
  name     = "financial-control-api-codepipeline-tf"
  role_arn = aws_iam_role.codepipeline_role.arn

  artifact_store {
    location = aws_s3_bucket.codepipeline_bucket.bucket
    type     = "S3"
  }

  stage {
    name = "Source"

    action {
      name             = "Source"
      category         = "Source"
      owner            = "ThirdParty"
      provider         = var.repositoryProvider
      version          = "1"
      output_artifacts = ["SourceArtifact"]
      configuration = {
        Owner      = var.repositoryOrganization
        Repo       = var.repositoryName
        Branch     = var.repositoryBranch
        OAuthToken = var.repositoryAccessToken
      }
    }
  }

  stage {
    name = "Build"

    action {
      name             = "Build"
      category         = "Build"
      owner            = "AWS"
      provider         = "CodeBuild"
      input_artifacts  = ["SourceArtifact"]
      output_artifacts = ["BuildArtifact"]
      version          = "1"

      configuration = {
        ProjectName = var.codeBuildProjectName
      }
    }
  }
}

locals {
  webhook_secret = var.repositoryAccessToken
}

resource "aws_codepipeline_webhook" "whook" {
  name            = "codepipeline_github_webhook_bar_tf"
  authentication  = "GITHUB_HMAC"
  target_action   = "Source"
  target_pipeline = aws_codepipeline.codepipeline.name

  authentication_configuration {
    secret_token = local.webhook_secret
  }

  filter {
    json_path    = "$.ref"
    match_equals = "refs/heads/{Branch}"
  }
}

resource "github_repository_webhook" "repo" {
  repository = aws_codepipeline.codepipeline.stage[0].action[0].configuration.Repo

  configuration {
    url          = aws_codepipeline_webhook.whook.url
    content_type = "json"
    insecure_ssl = true
    secret       = local.webhook_secret
  }

  events = ["push"]
}
