import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBIOIH_8SL8gNpymLatONTq1MsWkj5Z6Q0",
    authDomain: "waffle-a70b6.firebaseapp.com",
    databaseURL: "https://waffle-a70b6.firebaseio.com",
    projectId: "waffle-a70b6",
    storageBucket: "waffle-a70b6.appspot.com",
    messagingSenderId: "218178451032"
};
const fire = firebase.initializeApp(config);

export default fire;