import { getMessaging, getToken, onMessage } from "firebase/messaging";
import firebaseApp from "./firebase.js";

const messaging = getMessaging(firebaseApp);

const vapidKey = process.env.REACT_APP_FIREBASE_VAPID_KEY;

const requestNotificationPermission = async (): Promise<boolean> => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("알림 권한이 허용되었습니다.");
      return true;
    } else if (permission === "denied") {
      console.warn("알림 권한이 거부되었습니다.");
    } else {
      console.info("사용자가 알림 권한을 결정하지 않았습니다.");
    }
    return false;
  } catch (error) {
    console.error("알림 권한 요청 중 오류 발생:", error);
    return false;
  }
};

export const requestPermissionAndGetToken = async () => {
  try {
    const hasPermission = await requestNotificationPermission();
    if (hasPermission) {
      // 이미 토큰이 있는지 확인
      const existingToken = localStorage.getItem('fcmToken');
      if (existingToken) {
        return existingToken;
      }

      console.log("Notification permission granted.");
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
      }
    } else {
      console.error("Notification permission denied.");
    }
  } catch (error) {
    console.error("Error getting token:", error);
  }
};

export const onForegroundMessage = (callback: (payload: any) => void): void => {
  onMessage(messaging, (payload) => {
    // 알림 데이터 추출
    const { title, body, icon } = payload.data || {};
    const timestamp = payload.data?.timestamp || Date.now().toString();

    // 콜백 함수 호출 및 데이터 전달
    if (callback) {
      callback({
        title: title || "Default Title",
        body: body || "Default Body",
        icon: icon || "/favicon.ico",
        timestamp,
      });
    }
    else {
      if (Notification.permission === "granted") {
        try {
          new Notification(title || "Default Title", {
            body: body || "Default Body",
            icon: icon || "/favicon.ico",
            tag: timestamp,
          });
          console.log("푸시 알림 표시 성공");
        } catch (error) {
          console.error("푸시 알림 표시 실패:", error);
        }
      } else {
        console.error("알림 권한이 없습니다. 브라우저 설정에서 알림을 허용해주세요.");
      }
    }

    /*
    // 브라우저 알림 표시
    if (Notification.permission === "granted") {
      try {
        new Notification(title || "Default Title", {
          body: body || "Default Body",
          icon: icon || "/favicon.ico",
          tag: timestamp,
        });
        console.log("푸시 알림 표시 성공");
        alert("onForegroundMessage 5555");
      } catch (error) {
        console.error("푸시 알림 표시 실패:", error);
        alert("onForegroundMessage 6666");
      }
    } else {
      console.error("알림 권한이 없습니다. 브라우저 설정에서 알림을 허용해주세요.");
      alert("onForegroundMessage 7777");
    }
    */

  });
};

