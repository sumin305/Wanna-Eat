// firebaseCloudMessaging.js (애플리케이션 코드 파일)

import { getMessaging, getToken, onMessage, deleteToken  } from 'firebase/messaging';
import { initializeApp } from 'firebase/app';
import LogoIcon from 'assets/icons/header/logo.svg';

// Firebase 설정 및 초기화
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// 알림 권한 요청
export function requestPermission() {
  console.log('알림 권한 요청 중...');
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('알림 권한 허용됨');
      getFcmToken();
    } else {
      console.log('알림 권한이 거부되었습니다.');
    }
  });
}

// 포그라운드 알림 수신
export function onForegroundMessage() {
  onMessage(messaging, (payload) => {
    console.log('포그라운드 메시지 수신:', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: LogoIcon,
    };

    if (Notification.permission === 'granted') {
      new Notification(notificationTitle, notificationOptions);
    } else {
      console.log('알림 권한이 없습니다.');
    }
  });
}

// FCM 토큰 삭제 및 재발급
export async function getFcmToken() {
  try {
    // 현재 토큰이 존재하는지 확인
    const currentToken = await getToken(messaging, {
      vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
    });

    if (currentToken) {
      // 기존 토큰 삭제
      await deleteToken(messaging);
      console.log('기존 FCM 토큰 삭제 완료');
    }

    // 새로운 FCM 토큰 발급
    const newToken = await getToken(messaging, {
      vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
    });

    if (newToken) {
      console.log('새로운 FCM 토큰 발급 완료:', newToken);
      return newToken;
    }
  } catch (error) {
    console.error('FCM 토큰 발급 실패:', error);
  }
}
