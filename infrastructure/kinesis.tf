resource "aws_kinesis_stream" "kinesis_data_stream" {
  name             = var.kinesisDataStream
  shard_count      = 1
  retention_period = 24

  tags = {
    STAGE = var.stage
  }
}
