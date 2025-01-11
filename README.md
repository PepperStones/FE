# FE

PepperStones FE

## 🛠 **설치 및 실행 방법**

### 1️⃣ 의존성 설치

```bash
npm install
```

### 2️⃣ .env 파일 생성

공유한 .env 파일을 프로젝트 루트에 추가합니다.

### 3️⃣ Firebase Service Worker 생성

```bash
npm run build
```

- 이 과정에서 scripts/build-sw.js가 실행되며, .env 파일의 값을 참조하여 Service Worker 파일이 생성됩니다.
- 빌드가 완료되면 public/ 디렉토리에 firebase-messaging-sw.js 파일이 생성됩니다.

### 4️⃣ 개발 서버 실행

```bash
npm start
```

<br>

## 🛠 Firebase 푸시 알림 테스트 방법
### 1️⃣ Firebase 콘솔 접속
- 로그인 후 프로젝트 선택

### 2️⃣ Cloud Messaging 이동
- 왼쪽 메뉴에서 Build > Cloud Messaging을 선택

### 3️⃣ 테스트 메시지 보내기
- 첫번째 캠페인 만들기 >firebaase 알림 메시지 작성 > 제목 및 텍스트 입력 > 테스트 메시지 전송

### 4️⃣  FCM 등록 토큰 추가
- 개발 서버 실행 시 개발자 도구(브라우저 콘솔)에 보이는 토큰으로 추가 후 테스트 

### 5️⃣ 브라우저 또는 디바이스에 푸시 알림 수신 확인

<br>

## 📜 주의 사항

### 1. firebase-messaging-sw.js 생성 필수

- 이 파일은 빌드 후에 생성되므로, 프로젝트 클론 후 반드시 npm run build를 실행하여 생성해야 합니다.
- Firebase 설정 값을 변경한 경우, 다시 빌드 명령어를 실행하여 firebase-messaging-sw.js 파일을 재생성하세요:

```bash
npm run build
```
