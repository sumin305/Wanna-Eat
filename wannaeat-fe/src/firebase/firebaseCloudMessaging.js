import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { app as firebaseApp } from './firebase';

const messaging = getMessaging(firebaseApp);

// Request notification permission & FCM token
export function requestPermission() {
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      getToken(messaging, {
        vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
      }).then((currentToken) => {
        if (currentToken) {
          console.log('fcm토큰발급', currentToken);
          document.cookie = `fcmToken=${currentToken}; path=/; SameSite=Lax`;
        }
      });
    }
  });
}

//FCM foreground
export function onForegroundMessage() {
  onMessage(messaging, (payload) => {
    console.log('Message received in foreground: ', payload);
    // 필요한 경우 사용자에게 알림 표시 또는 UI 업데이트
    alert(`New notification: ${payload.notification.title}`);
  });
}

// Get FCM token
export function getFcmToken() {
  getToken(getMessaging(firebaseApp), {
    vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
  }).then((currentToken) => {
    if (currentToken) {
      document.cookie = `fcmToken=${currentToken}; path=/; SameSite=Lax`;

      return currentToken;
    }
  });
}
