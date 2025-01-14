import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

import SmallBtn from '../button/SmallBtn.tsx';

interface DefaultModalProps {
  showDefaultModal: boolean;
  title: string;
  description: string;
  onAcceptFunc: () => void;
  onUnacceptFunc: () => void;
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

const DefaultModal: React.FC<DefaultModalProps> = ({ showDefaultModal, title, description, onAcceptFunc, onUnacceptFunc }) => {
  const [isClosing, setIsClosing] = useState(false);

  if (!showDefaultModal) return null;

  const handleUnacceptClick = () => {
    setIsClosing(true); // 페이드아웃 애니메이션 시작
    setTimeout(() => {
      setIsClosing(false); // 상태 초기화
      onUnacceptFunc(); // 애니메이션 종료 후 닫기 함수 호출
    }, 150); // 애니메이션 시간과 동일하게 설정
  };

  const handleAcceptClick = () => {
    setIsClosing(true); // 페이드아웃 애니메이션 시작
    setTimeout(() => {
      setIsClosing(false); // 상태 초기화
      onAcceptFunc(); // 애니메이션 종료 후 닫기 함수 호출
    }, 150); // 애니메이션 시간과 동일하게 설정
  };

  return (
    <Overlay>
      <Content isClosing={isClosing}>
        <Title className='title-sm-300'>{title}</Title>
        <Description className='caption-md-300'>{description}</Description>
        <ButtonContainer>
          <SmallBtn
            content="취소"
            onClick={handleUnacceptClick}
            isAvailable={true}
            isDarkblue={true}
          />
          <SmallBtn
            content="확인"
            onClick={onAcceptFunc}
            isAvailable={true}
            isDarkblue={false}
          />
        </ButtonContainer>
      </Content>
    </Overlay>
  );
};

export default DefaultModal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
`;

const Content = styled.div<{ isClosing: boolean }>`
  width: 20.1875rem;
  background: var(--gray-0);
  border-radius: 10px;

  padding: 15px;

  text-align: center;

  animation: ${({ isClosing }) => (isClosing ? fadeOut : fadeIn)} 0.2s ease-in-out;
`;

const Title = styled.h2`
  margin-bottom: 10px;

  color: var(--gray-80);
`;

const Description = styled.span`
  color: var(--gray-80);
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  
  gap: 8px;
`;
