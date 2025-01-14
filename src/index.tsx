import React from "react";
import ReactDOM from "react-dom/client";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration.ts";
import reportWebVitals from "./reportWebVitals.ts";

import App from "./App.tsx";

import "./styles/index.css";
import "./styles/text.css";
import "./styles/color.css";
import './styles/font.css';
import "./styles/utilities.css";

import {
  requestPermissionAndGetToken,
  onForegroundMessage,
} from "./utils/firebase/messaging.ts";
// FCM 토큰 요청 및 권한 확인
requestPermissionAndGetToken();

// 포그라운드 메시지 처리
onForegroundMessage();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js") // 서비스 워커 등록
    .then((registration) => {
      console.log("[Service Worker] 서비스 워커 등록 완료:", registration);
    })
    .catch((error) => {
      console.error("[Service Worker] 서비스 워커 등록 실패:", error);
    });
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
