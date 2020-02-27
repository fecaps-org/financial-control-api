provider "aws" {
  profile = "default"
  region  = var.region
}

resource "aws_dynamodb_table" "basic-dynamodb-table" {
  name           = var.tableName
  billing_mode   = "PROVISIONED"
  read_capacity  = 1
  write_capacity = 1
  hash_key       = "name"

  attribute {
    name = "name"
    type = "S"
  }

  stream_enabled = false

  server_side_encryption {
    enabled = false
  }

  tags = {
    STAGE = var.stage
  }
}
