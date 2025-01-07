import React from 'react'
import styled from 'styled-components'

/* Props 정보
interface LargeInputProps {
    icon: string;           // 기본 아이콘 URL
    activeIcon: string;     // 활성화된 상태의 아이콘 URL
    placeholder: string;     // 입력 필드의 플레이스홀더
    value: string;          // 입력 필드의 값
    onChangeFunc: (event: React.ChangeEvent<HTMLInputElement>) => void; // onChange 핸들러
}
*/

const LargeInput = ({ icon, activeIcon, placeholder, value, onChangeFunc }) => {
    return (
        <InputContainer>
            <InputWrapper>
                <Icon src={value ? activeIcon : icon} /> {/* 아이디 아이콘 */}
                <InputField 
                className='text-md-100'
                type="text" 
                placeholder={placeholder} 
                onChange={onChangeFunc}
                value={value}
                onFocus={(e) => e.preventDefault()}
                 />
            </InputWrapper>
        </InputContainer>
    )
}

export default LargeInput

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const InputWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;

    width: 353px;
    height: 54px;

    border: none; /* 테두리 색상 */
    border-radius: 15px;
    padding: 16px 20px;
    background-color: var(--sub-20); /* 배경 색상 */
`;

const InputField = styled.input`
    border: none;
    outline: none;
    
    padding: 16px 0;
    background: transparent; /* 배경 투명 */

    width: 100%;

    color: var(--gray-80);

    &::placeholder {
        color: var(--gray-40); /* 플레이스홀더 색상 */
    }
`;

const Icon = styled.img`
    width: 22px;
    height: 22px;

    margin-right: 15px;
`;