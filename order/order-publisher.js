const AWS = require('aws-sdk'); 

AWS.config.update({
  'region': 'us-east-1'
});

const sns = new AWS.SNS({'endpoint': 'http://localhost:4566'});

function publish(message) {
  const publishParams = { 
    TopicArn : "arn:aws:sns:us-east-1:000000000000:order-updates",
    Message: message
  };

  sns.publish(publishParams, function() {
    console.log(`Event published: ${message}`);
  });
}

const message = process.env.MESSAGE_ENV
if (message) {
  publish(message);
}
