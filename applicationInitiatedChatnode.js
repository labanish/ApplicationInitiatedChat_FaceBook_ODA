var request = require('request');
const CryptoJS = require("crypto-js");
const SECRETKEY=""; //Application Initiated channel Secret
// Link to the AIC Channel
const URL ="";
const userId = ''; //your facebook scope id -> to get this use a custom component and do (conversation.userId)
var channelName ='AnglianFB'   //your facebook channel name
var payloadType ='msgReminder' //payload from your digital assistant

//Create the Body Payload
var jsonBody= { 
			userId: userId,
			messagePayload: 
			 { 
				 type: 'application',
			   payloadType: payloadType,
			   channelName: channelName,
			   variables:
			    {
					//variables from your bot: 
					patientName: 'Russian Doe', 
					appointmentTime: '5:00 pm' 
				} 
			} 
		}
//hash the body
var hmac = (CryptoJS.HmacSHA256(JSON.stringify(jsonBody), SECRETKEY)).toString(); 
console.log('HMAC: ' + hmac);

request({
    url: URL,
	method: "POST",
	headers: 
   { 
     'X-Hub-Signature': 'sha256='+hmac,
	 'Content-Type': 'application/json'
	 },
	 body: JSON.stringify(jsonBody)

					}, 
					function (error, response, body){
						if (error)  console.log('Error: ' + error);
        var responseStatusText = 'Status: ' + response.statusCode + ', ' + response.statusMessage;
		console.log('index', {responseStatus: responseStatusText});
		//console.log(body);

			});