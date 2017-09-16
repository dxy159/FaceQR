import cognitive_face as CF
from firebase import firebase
import urllib.request


KEY = '1caec07977834dcbbf6ea8cf79eda922'  # Replace with a valid subscription key (keeping the quotes in place).
CF.BaseUrl.set('https://westcentralus.api.cognitive.microsoft.com/face/v1.0/')
CF.Key.set(KEY)

firebase = firebase.FirebaseApplication('https://faceqr-80d9c.firebaseio.com', None)
existingImages = firebase.get('/Something', None)
print(existingImages)
result = CF.face.detect(existingImages['richard'])

#urllib.request.urlretrieve(existingImages['richard'], "local-filename2.jpg")
print(result)
