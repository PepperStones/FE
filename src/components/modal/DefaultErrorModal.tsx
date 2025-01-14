import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components';

import errorIcon from '../../assets/images/triangle_caution.png'
import successIcon from '../../assets/images/admin/success.png'

interface DefaultErrorModalProps {
    showDefaultErrorModal: boolean;
    errorMessage: string;
    onAcceptFunc: () => void;
    isSuccess?: boolean;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const DefaultErrorModal: React.FC<DefaultErrorModalProps> = ({ showDefaultErrorModal, errorMessage, onAcceptFunc, isSuccess = false }) => {
    const [isClosing, setIsClosing] = useState(false);

    if (!showDefaultErrorModal && !isClosing) return null;

    const handleOverlayClick = () => {
        setIsClosing(true); // 페이드아웃 애니메이션 시작
        setTimeout(() => {
            setIsClosing(false); // 상태 초기화
            onAcceptFunc(); // 애니메이션 종료 후 닫기 함수 호출
        }, 150); // 애니메이션 시간과 동일하게 설정
    };

    return (
        <Overlay onClick={handleOverlayClick}>
            <div style={{ height: '400px' }}></div>
            <Content isClosing={isClosing} isSuccess={isSuccess}>
                {isSuccess ? <ContentIcon src={successIcon}/> : <ContentIcon src={errorIcon}/>}
                <ContentText className='text-sm-300'>{errorMessage}</ContentText>
            </Content>
        </Overlay>
    );
};

export default DefaultErrorModal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  z-index: 10000;
`;

const Content = styled.div <{ isClosing: boolean, isSuccess: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  width: 20.4375rem;
  border-radius: 10px;
  background: ${({ isSuccess }) => isSuccess ? "var(--orange-70)" : "var(--gray-20)"};
  box-shadow: 0px 0px 30px 0px rgba(255, 255, 255, 0.30);

  gap: 5px;
  padding: 8px 0;

  text-align: center;
  color: var(--gray-100);

  animation: ${({ isClosing }) => (isClosing ? fadeOut : fadeIn)} 0.2s ease-in-out;
`;

const ContentIcon = styled.img`
width: 14px;
weight: 14px;
`;

const ContentText = styled.div`

`;