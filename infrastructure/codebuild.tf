resource "aws_s3_bucket" "codebuild_bucket" {
  bucket = "codebuild-s3-bucket-tf"
  acl    = "private"
}

resource "aws_iam_role" "codebuild_role" {
  name = "codebuild-iam-role-tf"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "codebuild.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "codebuild_policy" {
  role = aws_iam_role.codebuild_role.name

  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "logs:*",
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": "ec2:*",
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": "s3:*",
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": "ssm:*",
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": "cloudformation:*",
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": "apigateway:*",
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": "iam:*",
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": "lambda:*",
      "Resource": "*"
    }
  ]
}
POLICY
}

resource "aws_codebuild_project" "codebuild_project" {
  name           = var.codeBuildProjectName
  description    = "financial_control_api_codebuild_project"
  build_timeout  = "30"
  queued_timeout = "480"
  service_role   = aws_iam_role.codebuild_role.arn

  artifacts {
    type = "CODEPIPELINE"
  }

  source {
    type = "CODEPIPELINE"
  }

  environment {
    compute_type                = "BUILD_GENERAL1_SMALL"
    image                       = "aws/codebuild/standard:3.0"
    type                        = "LINUX_CONTAINER"
    image_pull_credentials_type = "CODEBUILD"

    environment_variable {
      name  = "ACCESS_KEY_ID"
      value = var.accessKey
      type  = "PLAINTEXT"
    }

    environment_variable {
      name  = "SECRET_ACCESS_KEY"
      value = var.secretKey
      type  = "PLAINTEXT"
    }
  }

  logs_config {
    cloudwatch_logs {
      group_name  = "log-group"
      stream_name = "log-stream"
    }
  }
}
