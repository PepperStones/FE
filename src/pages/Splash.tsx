import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import SplashImg from '../assets/images/splash.png'

// 페이드 인 애니메이션
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.85);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

// 반짝이는 빛나는 효과
const sparkle = keyframes`
  0% {
    filter: brightness(1) drop-shadow(0px 0px 0px rgba(255,255,255,0));
  }
  50% {
    filter: brightness(1.5) drop-shadow(0px 0px 20px rgba(200,200,200,1));
  }
  100% {
    filter: brightness(1) drop-shadow(0px 0px 0px rgba(255,255,255,0));
  }
`;

function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleNavigation = () => {
      const accessToken = localStorage.getItem('accessToken'); // 토큰 확인
      const userRole = localStorage.getItem('userRole'); // 사용자 역할 확인

      if (accessToken) {
        // 사용자 역할에 따라 경로 설정
        if (userRole === 'USER') {
          navigate('/home');
        } else if (userRole === 'ADMIN') {
          navigate('/member');
        } else {
          const timer = setTimeout(() => {
            navigate('/login');
          }, 4500);

          return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
        }
      } else {
        // 토큰이 없으면 스플래시 화면 후 로그인 페이지로 이동
        const timer = setTimeout(() => {
          navigate('/login');
        }, 4500);

        return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
      }
    };

    handleNavigation(); // 네비게이션 실행
  }, [navigate]); // navigate를 의존성으로 추가

  return (
    <SplashContainer>

      <SplashContentContainer>
        <SplashContent src={SplashImg} />
      </SplashContentContainer>

    </SplashContainer>
  );
}

export default Splash;

const SplashContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

`;

const SplashContentContainer = styled.div`
display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100vh;
`;

const SplashContent = styled.img`
width: 209px;
height: 31px;

margin-bottom: 30px;

animation: ${fadeIn} 2s ease-in-out, ${sparkle} 4s ease-in-out infinite alternate;
`;