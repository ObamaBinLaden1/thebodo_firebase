let firebase = require('firebase')
let config = {
  apiKey: 'AIzaSyBBnf_H2QWkGSVcvt9Xv8LJoxcpIA7YNLo',
  authDomain: 'thebodo-2b322.firebaseapp.com',
  databaseURL: 'https://thebodo-2b322.firebaseio.com',
  projectId: 'thebodo-2b322',
  storageBucket: 'thebodo-2b322.appspot.com',
  messagingSenderId: '388856637350'
}
let app = firebase.initializeApp(config)
let auth = firebase.auth()
let db = app.database()

export { firebase, app, auth, db }
