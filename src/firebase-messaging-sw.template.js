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

    console.log('페이로드 notification:', payload.notification); 
    console.log('페이로드 data:', payload.data);

    const timestamp = payload.data?.timestamp || Date.now().toString();
    const notificationTitle = payload.data?.title || 'Default Title';
    const notificationOptions = {
      body: payload.data?.body || 'Default Body',
      icon: payload.data?.icon || '/default-icon.png',
      tag: timestamp,
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
    console.log("푸시 알림 표시 성공");
  });