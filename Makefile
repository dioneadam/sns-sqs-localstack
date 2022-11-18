# LOCALSTACK -----------------------
localstack:
	docker-compose up

# SNS -----------------------
create-topics:
	aws sns create-topic --name order-updates    --endpoint-url=http://localhost:4566 --region us-east-1 --output table | cat
	aws sns create-topic --name logistic-updates --endpoint-url=http://localhost:4566 --region us-east-1 --output table | cat

list-topics:
	aws sns list-topics --endpoint-url=http://localhost:4566 --profile test-profile --output table | cat

# SQS -----------------------
create-queues:
	aws sqs create-queue --queue-name chat-queue     --endpoint-url=http://localhost:4566 --region us-east-1 --output table | cat
	aws sqs create-queue --queue-name logistic-queue --endpoint-url=http://localhost:4566 --region us-east-1 --output table | cat

list-queues:
	aws sqs list-queues --endpoint-url=http://localhost:4566 --output table | cat

subscribe-queues:
	aws --endpoint-url=http://localhost:4566 sns subscribe --topic-arn arn:aws:sns:us-east-1:000000000000:order-updates    --protocol sqs --notification-endpoint http://localstack:4566/000000000000/logistic-queue --output table | cat
	aws --endpoint-url=http://localhost:4566 sns subscribe --topic-arn arn:aws:sns:us-east-1:000000000000:order-updates    --protocol sqs --notification-endpoint http://localstack:4566/000000000000/chat-queue     --output table | cat
	aws --endpoint-url=http://localhost:4566 sns subscribe --topic-arn arn:aws:sns:us-east-1:000000000000:logistic-updates --protocol sqs --notification-endpoint http://localstack:4566/000000000000/chat-queue     --output table | cat

list-subscriptions:
	aws --endpoint-url=http://localhost:4566 sns list-subscriptions
