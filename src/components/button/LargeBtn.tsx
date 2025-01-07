import React from 'react'
import styled from 'styled-components'

/* Props 정보
interface LargeBtnProps {
    content: string;        // 버튼 안 내용
    onClick: () => void;        // 온 클릭 함수
    isAvailable: boolean;       // 버튼 동작 여부
}
*/

const LargeBtn = ({ content, onClick, isAvailable }) => {
    return (

        <LargeBtnContainer
            className='text-lg-300'
            onClick={onClick}
            disabled={!isAvailable}
            isAvailable={isAvailable}
        >{content}</LargeBtnContainer>

    )
}

export default LargeBtn

const LargeBtnContainer = styled.button<{ isAvailable: boolean }>`
width: 22.125rem;
height: 3.375rem;

padding: 14px 126px;
border-radius: 15px;
border: 1px solid ${({ isAvailable }) => (isAvailable ? 'var(--primary-70)' : 'var(--primary-80)')};
background: ${({ isAvailable }) => (isAvailable ? 'var(--primary-70)' : 'var(--primary-80)')};

gap: 6px;

color: var(--gray-0);
text-align: center;
`;