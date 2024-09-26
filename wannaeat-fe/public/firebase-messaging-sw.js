// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js'
);

// firebase 초기화
firebase.initializeApp({
  apiKey: 'AIzaSyDXXbqBArTcG67qQFfMi6XGZ98-D3BlGmE',
  authDomain: 'wannaeat-8c80c.firebaseapp.com',
  projectId: 'wannaeat-8c80c',
  storageBucket: 'wannaeat-8c80c.appspot.com',
  messagingSenderId: '614344127626',
  appId: '1:614344127626:web:9dc552bffff207105ea973',
  measurementId: 'G-XYG91BKTNV',
});

const messaging = firebase.messaging();

// 백그라운드 메시지 처리
messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// messaging.onBackgroundMessage();
