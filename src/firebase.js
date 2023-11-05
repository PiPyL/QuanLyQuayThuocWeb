// src/firebase.js
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
    apiKey: 'AIzaSyDQWy74pyJFlvimJr9j9B2FCKvoclO8KEY',
    authDomain: 'quanlyquaythuoc-b74c8.firebaseapp.com',
    databaseURL: 'https://quanlyquaythuoc-b74c8-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'quanlyquaythuoc-b74c8',
    storageBucket: 'quanlyquaythuoc-b74c8.appspot.com',
    messagingSenderId: '7545487693',
    appId: '1:7545487693:web:14801a56dba7a90acdb704',
    measurementId: 'G-RT2L00QQGB'
}

// const firebaseConfig = {
//     apiKey: 'AIzaSyBt8qsZwLD4a80zY5GVuNDzYQGb0vEEhE8',
//     authDomain: 'quanlyquaythuoctest.firebaseapp.com',
//     databaseURL: 'https://quanlyquaythuoctest-default-rtdb.asia-southeast1.firebasedatabase.app',
//     projectId: 'quanlyquaythuoctest',
//     storageBucket: 'quanlyquaythuoctest.appspot.com',
//     messagingSenderId: '996406638516',
//     appId: '1:996406638516:web:8f0c480c5bd04dc1af24e1'
// }

const app = initializeApp(firebaseConfig)

const database = getDatabase(app)

export { database }
