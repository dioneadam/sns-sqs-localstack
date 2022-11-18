const AWS = require('aws-sdk')
const { Consumer } = require('sqs-consumer');

const QUEUE_URL = "http://localhost:4566/000000000000/chat-queue"
const BATCH_SIZE = 1

AWS.config.update({
  'region': 'us-east-1'
});

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
    case 'ORDER_CREATED': console.log('Chat with Store enabled'); break;
    case 'ORDER_READY': console.log('Chat with Store disabled'); break;
    case 'DRIVER_PICKUP': console.log('Chat with Driver enabled'); break;
    default: break;
  }
    
};

const consumer = createConsumer();

consumer.start()
