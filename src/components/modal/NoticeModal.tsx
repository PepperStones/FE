import React from 'react';
import styled from 'styled-components';

import MediumBtn from '../button/MediumBtn.tsx';

interface NoticeModalProps {
  showDefaultModal: boolean;
  title: string;
  description: string;
  onAcceptFunc: () => void;
}

const NoticeModal: React.FC<NoticeModalProps> = ({ showDefaultModal, title, description, onAcceptFunc }) => {
  if (!showDefaultModal) return null;

  return (
    <Overlay>
      <Content>
        <Title className='title-sm-300'>{title}</Title>
        <Description className='caption-md-300'>{description}</Description>
        <ButtonContainer>
          <MediumBtn
            content="확인"
            onClick={onAcceptFunc}
            isAvailable={true}
          />
        </ButtonContainer>
      </Content>
    </Overlay>
  );
};

export default NoticeModal;

// Styled Components

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

const Content = styled.div`
  width: 20.1875rem;
  background-color: var(--sub-20);
  border-radius: 10px;

  padding: 25px;

  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 10px;

  color: var(--gray-80);
`;

const Description = styled.span`
  color: var(--gray-80);

  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
`;
