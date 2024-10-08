import { getMessaging, getToken } from 'firebase/messaging';
import { initializeApp } from 'firebase/app';

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

// FCM 토큰 발급 함수
export async function getFcmToken() {
  try {
    const currentToken = await getToken(messaging, {
      vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
    });

    if (currentToken) {
      console.log('FCM 토큰 발급 완료:', currentToken);
      return currentToken;
    }
  } catch (error) {
    console.error('FCM 토큰 발급 실패:', error);
  }
}
