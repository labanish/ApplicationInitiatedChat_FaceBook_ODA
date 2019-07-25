const request = require('request')
const token = ''; //facebook token from the facebook dev app

sendTextMessage(2188643234580982,"You were asking about me, i am here now, tell me!");//10161951781300277,"helloworld");

function sendTextMessage(sender, text)
{
   console.log(sender);
   console.log(text);

   var messageData = { text:text }
   request({
       url: 'https://graph.facebook.com/v3.1/me/messages',
       qs: {access_token:token},
       method: 'POST',
       json: {
           recipient: {id:sender},
           message: messageData,
       }
   }, function(error, response, body) {
       if (error) {
           console.log('Error sending messages: ', error)
       } else if (response.body.error) {
           console.log('Error: ', response.body.error)
       }
   })
}