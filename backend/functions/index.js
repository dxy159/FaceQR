const functions = require('firebase-functions');
const cognitiveServices = require('cognitive-services');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
const key = '1caec07977834dcbbf6ea8cf79eda922';


const face = cognitiveServices.face({
    API_KEY: key
})


// Create and Deploy Your First Cloud Functions
 // https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((req, res) => {
    const parameters = {
        returnFaceId: "true",
        returnFaceLandmarks: "false"
    };
    const body = {
        "url": 'www.google.ca/search?q=stock+face+photos&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiBosqwtKrWAhWFzIMKHay8D08Q_AUICigB&biw=1440&bih=782#imgrc=Mlp4eEfTCJAEYM:'}
    face.detect({
      parameters,
      body
    })
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        console.log('Error', err)
      })


  return admin.database().ref('/Something').once('value', (snapshot) => {

      snapshot.forEach(function(image) {
        var imageURL = image.val();
        // Run face.detect using this url
        // Use face.verify with the previous image ID and this ID
        // If you get true sed a messag back

      })
  })

});


/* exports.testFunc = functions.database.ref('/Something').onCreate(event => {

  //var place = admin.database().ref('/Something');
  console.log('wot');
  response.send("True");
  return event.data;
}); */

//This is the function to be used for verification
//exports.addFace = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
  //var name = req.query.text;

//});
