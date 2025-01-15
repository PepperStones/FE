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
  });
  
//   // 포그라운드 메시지 수신 및 알림 표시
// self.addEventListener("message", (event) => {
//   console.log("Service Worker로 포그라운드 메시지 수신:", event.data);
//   alert(event.data);

//   const { title, body, icon } = event.data.notification || {};
//   alert(title);
//   alert(body);

//   const notificationTitle = title || "Default Title";
//   const notificationOptions = {
//     body: body || "Default Body",
//     icon: icon || "/favicon.ico",
//   };
//   alert("성공!");

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

// 포그라운드 메시지 처리
self.addEventListener("message", (event) => {
  console.log("Service Worker에서 메시지 수신:", event.data);
  
  if (event.data.type === 'SHOW_NOTIFICATION') {
    const { title, body, icon } = event.data.payload;
    
    return self.registration.showNotification(title || "Default Title", {
      body: body || "Default Body",
      icon: icon || "/favicon.ico",
      tag: Date.now().toString(), // 각 알림을 구분하기 위한 고유 태그
      data: event.data.payload // 추가 데이터 저장
    });
  }
});