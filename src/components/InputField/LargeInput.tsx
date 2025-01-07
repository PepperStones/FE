import React from 'react'
import styled from 'styled-components'

/* Props 정보
interface LargeInputProps {
    icon: string;           // 기본 아이콘 URL
    activeIcon: string;     // 활성화된 상태의 아이콘 URL
    placeholder: string;     // 입력 필드의 플레이스홀더
    type?: string;          // 입력 필드의 타입 (기본값은 text)
    value: string;          // 입력 필드의 값
    onChangeFunc: (event: React.ChangeEvent<HTMLInputElement>) => void; // onChange 핸들러
}
*/

const LargeInput = ({ icon, activeIcon, placeholder, type = "text", value, onChangeFunc }) => {
    return (
        <InputContainer>
            <InputWrapper>
                <Icon src={value ? activeIcon : icon} /> {/* 아이디 아이콘 */}
                <InputField
                    className='text-md-100'
                    type={type}
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

width: 22.125rem;
height: 3.375rem;

border: none; 
border-radius: 15px;
padding: 16px 20px;
background-color: var(--sub-20); 
`;

const InputField = styled.input`
    border: none;
    outline: none;
    
    width: 100%;
    padding: 16px 0;
    background: transparent;

    color: var(--gray-80);

    &::placeholder {
        color: var(--gray-40); 
    }
`;

const Icon = styled.img`
width: 1.375rem;
height: 1.375rem; 

margin-right: 15px;
`;