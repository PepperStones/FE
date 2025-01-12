import React from 'react';
import styled from 'styled-components';

import SmallBtn from '../button/SmallBtn.tsx';

interface DeleteModalProps {
    showDefaultModal: boolean;
    title: string;
    description: string;
    onAcceptFunc: () => void;
    onUnacceptFunc: () => void;
}

const DefaultModal: React.FC<DeleteModalProps> = ({ showDefaultModal, title, description, onAcceptFunc, onUnacceptFunc }) => {
    if (!showDefaultModal) return null;

    return (
        <Overlay>
            <Content>
                <Title className='title-sm-300'>{title}</Title>
                <Description className='caption-md-300'>{description}</Description>
                <ButtonContainer>
                    <SmallBtn
                        content="취소"
                        onClick={onUnacceptFunc}
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

  padding: 15px;

  text-align: center;
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
