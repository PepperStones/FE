//src/firebase-messaging-sw.template.js
importScripts(
    'https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js'
  );
  importScripts(
    'https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js'
  );
  
  firebase.initializeApp({
    apiKey: '%%REACT_APP_FIREBASE_API_KEY%%',
    authDomain: '%%REACT_APP_FIREBASE_AUTH_DOMAIN%%',
    projectId: '%%REACT_APP_FIREBASE_PROJECT_ID%%',
    storageBucket: '%%REACT_APP_FIREBASE_STORAGE_BUCKET%%',
    messagingSenderId: '%%REACT_APP_FIREBASE_MESSAGING_SENDER_ID%%',
    appId: '%%REACT_APP_FIREBASE_APP_ID%%',
    measurementId: '%%REACT_APP_FIREBASE_MEASUREMENT_ID%%',
  });
  
  const messaging = firebase.messaging();
  
  messaging.onBackgroundMessage((payload) => {

    console.log('[firebase-messaging-sw.js] 백그라운드 메시지 수신:', payload);

    const timestamp = payload.data?.timestamp || Date.now().toString();

    // 마지막 알림 시간 체크 로직 추가
    const lastNotificationTime = self.localStorage?.getItem('lastNotificationTime');
    if (lastNotificationTime && (parseInt(timestamp) - parseInt(lastNotificationTime) < 1000)) {
        console.log('중복 알림 감지, 무시합니다.');
        return;
    }
    self.localStorage?.setItem('lastNotificationTime', timestamp);

    const notificationTitle = payload.notification?.title || 'Default Title';
    const notificationOptions = {
      body: payload.notification?.body || 'Default Body',
      icon: payload.notification?.icon || '/default-icon.png',
      tag: timestamp,
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });
  