import {
  getMessaging,
  getToken,
  deleteToken,
  onMessage,
} from 'firebase/messaging';
import { app as firebaseApp } from './firebase';
import LogoIcon from 'assets/icons/header/logo.svg';

const messaging = getMessaging(firebaseApp);

// Request notification permission & FCM token
export function requestPermission() {
  console.log('요청 확인 할게요');
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('알림 권한이 부여되었습니다.');
    } else {
      console.log('알림 권한이 거부되었습니다.');
    }
  });
}

//FCM foreground
export function onForegroundMessage() {
  onMessage(messaging, (payload) => {
    console.log('Message received in foreground: ', payload);

    // 알림 제목과 내용 설정
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: LogoIcon, // 아이콘 경로 지정
    };

    // Notification API를 사용해 포그라운드에서도 푸시 알림을 보여줌
    if (Notification.permission === 'granted') {
      new Notification(notificationTitle, notificationOptions);
    } else {
      console.log('알림 권한이 없습니다.');
    }
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
