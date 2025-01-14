import React, { useState, useEffect } from "react";
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
    filter: brightness(2) drop-shadow(0px 0px 20px rgba(255,255,255,1));
  }
  100% {
    filter: brightness(1) drop-shadow(0px 0px 0px rgba(255,255,255,0));
  }
`;

function Splash() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/login"); 
        }, 4500); 

        return () => clearTimeout(timer);
    }, [navigate]);

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

animation: ${fadeIn} 2s ease-in-out, ${sparkle} 4s ease-in-out infinite alternate;
`;