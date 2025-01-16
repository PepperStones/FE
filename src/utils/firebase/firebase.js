import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const vapidKey = process.env.REACT_APP_FIREBASE_VAPID_KEY;

// firebase FCM 기능 사용
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);


// const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);

// export default firebaseApp;

// 서비스 워커 등록 함수
const registerServiceWorker = async () => {
  try {
    if (!('serviceWorker' in navigator)) {
      console.warn('서비스 워커를 지원하지 않는 브라우저입니다.');
      return null;
    }

    const existingRegistration = await navigator.serviceWorker.getRegistration();
    if (existingRegistration) {
      console.log('이미 등록된 서비스 워커:', existingRegistration);
      return existingRegistration;
    }

    const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
    console.log('새 서비스 워커가 등록되었습니다:', registration);
    return registration;
  } catch (error) {
    console.error('서비스 워커 등록 실패:', error);
    return null;
  }
};

const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("알림 권한이 허용되었습니다.");
      alert("알림 권한이 허용되었습니다.");
      return true;
    } else if (permission === "denied") {
      console.warn("알림 권한이 거부되었습니다.");
      alert("알림 권한이 거부되었습니다.");
    } else {
      console.info("사용자가 알림 권한을 결정하지 않았습니다.");
      alert("사용자가 알림 권한을 결정하지 않았습니다.");
    }
    return false;
  } catch (error) {
    console.error("알림 권한 요청 중 오류 발생:", error);
    alert("알림 권한 요청 중 오류 발생");
    return false;
  }
};

export const requestPermissionAndGetToken = async () => {
  try {
    // 서비스 워커 등록
    await registerServiceWorker();

    const hasPermission = await requestNotificationPermission();
    if (hasPermission) {
       // 이미 토큰이 있는지 확인
       const existingToken = localStorage.getItem('fcmToken');
       if (existingToken) {
         return existingToken;
       }

      console.log("Notification permission granted.");
      alert("Notification permission granted.");
      const token = await getToken(messaging, {
        vapidKey,
      });
      if (token) {
        // console.log("FCM Token:", token);
        localStorage.setItem('fcmToken', token);
        return token;
        // 서버로 토큰 전송 가능
      } else {
        console.log("No registration token available.");
        alert("No registration token available.");
      }
    } else {
      console.error("Notification permission denied.");
      alert("Notification permission denied.");
    }
  } catch (error) {
    console.error("Error getting token:", error);
    alert("Error getting token");
  }
};

/**
 * onMessageListener - 앱 사용 중 메시지 수신 (포그라운드)
 */
export const onMessageListener = () => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  console.log('isMobile:', isMobile);

  // foreground 메시지 수신 로직 
  onMessage(messaging, async (payload) => {

    console.log('[firebase-messaging-sw.js] 포그라운드 메시지 수신:', payload);
    alert('[firebase-messaging-sw.js] 포그라운드 메시지 수신:', payload);

    const notificationTitle = payload.data.title;
    const notificationOptions = {
        body: payload.data.body,
        icon: payload.data.icon || "/favicon.ico",
    };
    console.log('notificationTitle:', payload.data.title);
    console.log('notificationOptions:', notificationOptions.body);
    alert('notificationTitle:', payload.data.title);
    alert('notificationOptions:', notificationOptions.body);
    new Notification(notificationTitle, notificationOptions);

    // 서비스 워크가 종료되는 문제
    // try {
    //       // 서비스 워커가 준비될 때까지 대기
    //       const registration = await navigator.serviceWorker.ready;
    //       if (!registration.active) {
    //         throw new Error('활성화된 서비스 워커가 없습니다.');
    //       }
    //       // 웹일 때 
    //       if (!isMobile) {
    //         new Notification(
    //             notificationTitle,
    //             notificationOptions,
    //         );
    //       // 모바일 중에서도 (모바일웹 또는 PWA)일 때    
    //       } else {
    //           // 서비스 워커 로직으로 구현
    //           navigator.serviceWorker.ready.then(function (registration) {
    //               registration.showNotification(
    //                   notificationTitle,
    //                   notificationOptions,
    //               );
    //           });
    //       }
    //       console.log('알림 표시 완료');
    //       alert('알림 표시 완료');
    //   } catch (error ) {
    //     console.error('알림 표시 중 오류 발생:', error);
    //     alert('알림 표시 중 오류 발생');
    //     // 폴백: 기본 Notification API 사용 시도
    //     new Notification(notificationTitle, notificationOptions);
    //   }
  });
};


export default { requestPermissionAndGetToken, onMessageListener };