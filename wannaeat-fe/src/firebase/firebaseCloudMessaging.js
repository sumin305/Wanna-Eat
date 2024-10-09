// firebaseCloudMessaging.js
import { getMessaging, getToken, deleteToken } from 'firebase/messaging';
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
    // 기존 토큰 삭제 (기존 토큰이 있다면)
    await deleteToken(messaging).catch((err) => {
      console.warn('기존 토큰 삭제 실패:', err);
    });

    // 새로운 토큰 발급
    const newToken = await getToken(messaging, {
      vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
    });

    if (newToken) {
      console.log('새로운 FCM 토큰 발급 완료:', newToken);
      return newToken;
    } else {
      console.warn('새 토큰을 발급할 수 없습니다.');
    }
  } catch (error) {
    console.error('FCM 토큰 발급 실패:', error);
  }
}
