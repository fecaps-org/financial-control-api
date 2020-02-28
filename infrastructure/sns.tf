resource "aws_sns_topic" "user_notifications" {
  name         = var.snsName
  display_name = var.snsName
}

resource "aws_sns_topic_subscription" "user_notifications_sms_target" {
  topic_arn = aws_sns_topic.user_notifications.arn
  protocol  = "sms"
  endpoint  = var.phoneNumber
}
