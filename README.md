# Simple app using SNS & SQS 

How to use:

## Start localstack
````
make localstack
````

## Create Topic and Queue

````
make create-topics
make create-queues
make subscribe-queues
````

## Check if is all good

````
make list-topics
make list-queues
make list-subscriptions
````

## Start the services

````
npm run chat-worker
npm run logistic-service
````

## Publish some events and watch the services consuming

````
npm run publish-order-created
npm run publish-order-ready
````
