
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import LargeBtn from '../components/button/LargeBtn.tsx';
import LargeInput from '../components/inputField/LargeInput.tsx';

import ID from '../assets/images/gray_person.png'
import ActID from '../assets/images/lightgray_person.png'
import Lock from '../assets/images/gray_lock.png'
import ActLock from '../assets/images/lightgray_lock.png'

function Login() {
    const navigate = useNavigate();

    const [userID, setUserID] = useState('');
    const [userPWD, setUserPWD] = useState('');
    const [isLoginAvailable, setIsLoginAvailable] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, setInput: React.Dispatch<React.SetStateAction<string>>) => {
        setInput(event.target.value);
    };

    const handleLogin = () => {
        // 로그인 성공 시 /home으로 네비게이트
        if (isLoginAvailable) {
            // 여기서 로그인 로직을 추가할 수 있습니다.
            // 예를 들어, API 호출 후 성공 여부에 따라 네비게이트
            navigate('/home');
        }
    };

    useEffect(() => {
        setIsLoginAvailable(userID !== '' && userPWD !== '');
    }, [userID, userPWD]);

    return (

        <LoginScreenContainer>
            <Header className='title-lg-300'>
                로그인
            </Header>

            <InputContainer>
                <LargeInput
                    icon={ID}
                    activeIcon={ActID}
                    placeholder="아이디를 입력해주세요."
                    value={userID}
                    onChangeFunc={(e) => handleInputChange(e, setUserID)}
                />

                <LargeInput
                    icon={Lock}
                    activeIcon={ActLock}
                    placeholder="비밀번호를 입력해주세요."
                    type="password"
                    value={userPWD}
                    onChangeFunc={(e) => handleInputChange(e, setUserPWD)}
                />
            </InputContainer>

            <LargeBtn
                content="로그인"
                onClick={handleLogin}
                isAvailable={isLoginAvailable}
            />

        </LoginScreenContainer>

    );
}

export default Login;

const LoginScreenContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;

padding: 0 15px;
overflow: hidden;
`;

const Header = styled.div`

margin: 111px 0;

color: var(--gray-100);
`;

const InputContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

width: 100%;

gap: 15px;

margin-bottom: 40px;
`;