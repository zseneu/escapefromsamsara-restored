// expose our config directly to our application using module.exports
module.exports = {

  'facebookAuth' : {
    'clientID'     : '718610081539708', // your App ID
    'clientSecret'   : '4046fede1db7b281f68a105d2a05dbbe', // your App Secret
    'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
  },

  'twitterAuth' : {
    'consumerKey'     : 'your-consumer-key-here',
    'consumerSecret'   : 'your-client-secret-here',
    'callbackURL'     : 'http://localhost:8080/auth/twitter/callback'
  },

  'googleAuth' : {
    'clientID'     : 'your-secret-clientID-here',
    'clientSecret'   : 'your-client-secret-here',
    'callbackURL'   : 'http://localhost:8080/auth/google/callback'
  }

};