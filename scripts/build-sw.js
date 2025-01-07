// scripts/build-sw.js
const fs = require("fs");
const path = require("path");
require("dotenv").config(); // dotenv를 사용하여 환경 변수 로드

// 템플릿 파일 경로와 출력 파일 경로 설정
const templatePath = path.resolve(
  __dirname,
  "../src/firebase-messaging-sw.template.js"
);
const outputPath = path.resolve(
  __dirname,
  "../public/firebase-messaging-sw.js"
);

// 템플릿 파일 읽기
let swContent = fs.readFileSync(templatePath, "utf-8");

// 환경 변수로 플레이스홀더 치환
swContent = swContent
  .replace(
    /%%REACT_APP_FIREBASE_API_KEY%%/g,
    process.env.REACT_APP_FIREBASE_API_KEY
  )
  .replace(
    /%%REACT_APP_FIREBASE_AUTH_DOMAIN%%/g,
    process.env.REACT_APP_FIREBASE_AUTH_DOMAIN
  )
  .replace(
    /%%REACT_APP_FIREBASE_PROJECT_ID%%/g,
    process.env.REACT_APP_FIREBASE_PROJECT_ID
  )
  .replace(
    /%%REACT_APP_FIREBASE_STORAGE_BUCKET%%/g,
    process.env.REACT_APP_FIREBASE_STORAGE_BUCKET
  )
  .replace(
    /%%REACT_APP_FIREBASE_MESSAGING_SENDER_ID%%/g,
    process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
  )
  .replace(
    /%%REACT_APP_FIREBASE_APP_ID%%/g,
    process.env.REACT_APP_FIREBASE_APP_ID
  )
  .replace(
    /%%REACT_APP_FIREBASE_MEASUREMENT_ID%%/g,
    process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
  );

// 결과를 public 폴더에 저장
fs.writeFileSync(outputPath, swContent, "utf-8");
console.log("Service Worker 파일 생성 완료:", outputPath);
