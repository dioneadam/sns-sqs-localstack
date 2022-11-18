const AWS = require('aws-sdk')
const { Consumer } = require('sqs-consumer');

const QUEUE_URL = "http://localhost:4566/000000000000/logistic-queue"
const BATCH_SIZE = 1

AWS.config.update({
  'region': 'us-east-1'
});

const sns = new AWS.SNS({'endpoint': 'http://localhost:4566'});

const createConsumer = function () {
  return Consumer.create({
    queueUrl: QUEUE_URL,
    batchSize: BATCH_SIZE,
    handleMessageBatch: handleMessage,
    sqs: new AWS.SQS()
  })
}

function handleMessage(message) {
  const body = JSON.parse(message[0].Body)

  switch (body.Message) {
    case 'ORDER_READY': 
      console.log('Searching for a driver to pickup the Order');
      sendPickupEvent()
      break;
    //case 'ORDER_CREATED': console.log("do something with order created"); break;
    default: break;
  }
    
};

function sendPickupEvent() {
  const message = "DRIVER_PICKUP"

  const publishParams = { 
    TopicArn : "arn:aws:sns:us-east-1:000000000000:logistic-updates",
    Message: message
  };

  sns.publish(publishParams, function() {
    console.log(`published event: ${message}`);
  });
};

const consumer = createConsumer();

consumer.start()
