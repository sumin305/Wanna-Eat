import {
  getMessaging,
  getToken,
  deleteToken,
  onMessage,
} from 'firebase/messaging';
import { app as firebaseApp } from './firebase';

const messaging = getMessaging(firebaseApp);

// Request notification permission & FCM token
export function requestPermission() {
  console.log('요청 확인 할게요');
  Notification.requestPermission().then((permission) => {
    console.log('권한 요청 완료');
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
export async function getFcmToken() {
  try {
    const currentToken = await getToken(messaging, {
      vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
    });

    if (currentToken) {
      onForegroundMessage(); // 토큰 사용
      console.log('토큰발급완료');
      return currentToken;
    }
  } catch (error) {
    console.error('FCM 토큰 갱신 실패:', error);
  }
}
