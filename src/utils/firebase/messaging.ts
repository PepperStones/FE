import { getMessaging, getToken, onMessage } from "firebase/messaging";
import firebaseApp from "./firebase.js";

const messaging = getMessaging(firebaseApp);

const vapidKey = process.env.REACT_APP_FIREBASE_VAPID_KEY;

// Service Worker 등록 함수
const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      // 기존 서비스 워커 등록 확인
      const existingRegistration = await navigator.serviceWorker.getRegistration();
      
      if (existingRegistration) {
        console.log("기존 Service Worker가 존재합니다:", existingRegistration);
        return existingRegistration;
      }

      const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js", {
        scope: "/"
      });
      
      // 서비스 워커가 실제로 활성화될 때까지 대기
      await navigator.serviceWorker.ready;
      console.log("Service Worker 등록 성공:", registration);
      return registration;
    } catch (error) {
      console.error("Service Worker 등록 실패:", error);
      throw error;
    }
  } else {
    throw new Error("Service Worker가 지원되지 않는 브라우저입니다.");
  }
};

const requestNotificationPermission = async (): Promise<boolean> => {
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
    // Service Worker 등록
    const registration = await registerServiceWorker();

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
        serviceWorkerRegistration: registration, // Service Worker 등록 전달
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

/*
export const onForegroundMessage = (): void => {
  onMessage(messaging, (payload) => {
    console.log("포그라운드 메시지 수신:", payload);

    // 알림 데이터
    const { title, body, icon } = payload.data || {};
    const timestamp = payload.data?.timestamp || Date.now().toString();

    // 브라우저 알림 표시
    if (Notification.permission === "granted") {
      try {
        const lastNotificationTime  = localStorage.getItem('lastNotificationTime');

        if (lastNotificationTime  && 
          (parseInt(timestamp) - parseInt(lastNotificationTime) < 1000)) {
          console.log("중복 알림 감지됨, 무시합니다.");
          return;
        }

        localStorage.setItem('lastNotificationTime', timestamp);

        const notificationOptions: NotificationOptions = {
          body: body || "Default Body",
          icon: icon || "/favicon.ico",
          tag: timestamp  // tag만 사용하여 동일 시간대의 알림 대체
        };

        new Notification(title || "Default Title", notificationOptions);
        
        console.log("푸시 알림 표시 성공");
      } catch (error) {
        console.log("푸시 알림 표시 실패");
      }
    } else {
      console.error(
        "알림 권한이 없습니다. 브라우저 설정에서 알림을 허용해주세요."
      );
    }
  });
};
*/

// export const onForegroundMessage = (): void => {
//   onMessage(messaging, (payload) => {
//     console.log("포그라운드 메시지 수신:", payload);
//     alert("포그라운드 메시지 수신");

//     // 알림 데이터
//     alert(payload.data);
//     const { title, body, icon } = payload.data || {};
//     const timestamp = payload.data?.timestamp || Date.now().toString();
//     alert(title);
//     alert(body);

//     // 브라우저 알림 표시
//     if (Notification.permission === "granted") {
//       // try {
//       //   console.log("알림 권한이 허용되었습니다.");
//       //   alert("알림 권한이 허용되었습니다.");
//       //   new Notification(title || "Default Title", {
//       //     body: body || "Default Body",
//       //     icon: icon || "/favicon.ico",
//       //     tag: timestamp,
//       //   });

//       //   console.log("푸시 알림 표시 성공");
//       //   alert("푸시 알림 표시 성공");
//       // } catch (error) {
//       //   console.log("푸시 알림 표시 실패");
//       //   alert("푸시 알림 표시 실패");
//       // } 
//       if (navigator.serviceWorker && navigator.serviceWorker.controller) {
//         navigator.serviceWorker.controller.postMessage(payload);
//         console.log("Service Worker로 메시지 전달");
//         alert("Service Worker로 메시지 전달");
//       } else {
//         console.error("Service Worker가 등록되어 있지 않습니다.");
//         alert("Service Worker가 등록되어 있지 않습니다.");
//       }
//     } else {
//       console.error(
//         "알림 권한이 없습니다. 브라우저 설정에서 알림을 허용해주세요."
//       );
//       alert(
//         "알림 권한이 없습니다. 브라우저 설정에서 알림을 허용해주세요."
//       );
//     }
//   });
// };


export const initializeFirebaseMessaging = async () => {
  try {
    // 서비스 워커 등록
    const registration = await registerServiceWorker();
    
    // 알림 권한 요청
    const hasPermission = await requestNotificationPermission();
    if (!hasPermission) {
      throw new Error("알림 권한이 거부되었습니다.");
    }

    // FCM 토큰 발급
    const currentToken = await getToken(messaging, {
      vapidKey,
      serviceWorkerRegistration: registration,
    });

    if (!currentToken) {
      throw new Error("FCM 토큰을 받을 수 없습니다.");
    }

    localStorage.setItem('fcmToken', currentToken);
    return currentToken;
  } catch (error) {
    console.error("Firebase 메시징 초기화 실패:", error);
    throw error;
  }
};

export const onForegroundMessage = () => {
  onMessage(messaging, (payload) => {
    console.log("포그라운드 메시지 수신:", payload);

    if (!navigator.serviceWorker?.controller) {
      console.error("Service Worker가 활성화되지 않았습니다.");
      return;
    }

    // Service Worker로 메시지 전달
    navigator.serviceWorker.controller.postMessage({
      type: 'SHOW_NOTIFICATION',
      payload: payload.data || payload.notification
    });
  });
};