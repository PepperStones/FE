import React from 'react'
import styled from 'styled-components'

/* Props 정보
interface SmallBtnProps {
    content: string;        // 버튼 안 내용
    onClick: () => void;        // 온 클릭 함수
    isAvailable: boolean;       // 버튼 동작 여부
    isDarkblue: boolean;        // 남색 버튼 여부
}
*/

const SmallBtn = ({ content, onClick, isAvailable, isDarkblue }) => {
    return (
        <StyledButton
            className='text-lg-300'
            onClick={onClick}
            isAvailable={isAvailable}
            isDarkblue={isDarkblue}
            disabled={!isAvailable}
        >{content}</StyledButton>
    )
}

export default SmallBtn

const StyledButton = styled.button<{ isAvailable: boolean, isDarkblue:boolean }>`
display: flex;
justify-content: center;
align-items: center;

width: 9.375rem; 
height: 2.875rem; 

padding: 11px 48px;
border-radius: 10px;
background: ${({ isAvailable, isDarkblue }) =>
    isDarkblue ? 'var(--sub-30)' : (isAvailable ? 'var(--primary-70)' : 'var(--primary-80)')};

gap: 10px;
flex-shrink: 0;

color: ${({ isDarkblue }) => isDarkblue ? 'var(--gray-80)' : 'var(--gray-0'};
text-align: center;

user-select: none; /* 텍스트 선택 방지 */
-webkit-user-select: none; /* Safari에서 드래그 방지 */
-moz-user-select: none; /* Firefox에서 드래그 방지 */
-ms-user-select: none;
`;