
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';

import TopNav from '../components/nav/TopNav.tsx';
import FooterNav from '../components/nav/FooterNav.tsx'
import LargeInput from '../components/inputField/LargeInput.tsx';
import SmallBtn from '../components/button/SmallBtn.tsx'

import Lock from '../assets/images/gray_lock.png'
import ActLock from '../assets/images/lightgray_lock.png'

// 진동 애니메이션 정의
const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
`;

function UpdatePwdPage() {
    const Center = {
        text: "비밀번호 변경",
    };

    const navigate = useNavigate();

    const [currentPWD, setCurrentPWD] = useState('');
    const [updatePWD, setUpdatePWD] = useState('');
    const [confirmPWD, setConfirmPWD] = useState('');

    const [currentPWDShake, setCurrentPWDShake] = useState(false);
    const [updatePWDShake, setUpdatePWDShake] = useState(false);
    const [confirmPWDShake, setConfirmPWDShake] = useState(false);

    const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
    const [currentPasswordError, setCurrentPasswordError] = useState(false);
    const [updatePasswordError, setUpdatePasswordError] = useState(false);
    const [confirmError, setConfirmError] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, setInput: React.Dispatch<React.SetStateAction<string>>) => {
        setInput(event.target.value);
    };

    const handleCancelClick = () => {
        navigate('/mypage');
    };

    useEffect(() => {
        setIsUpdateAvailable(currentPWD !== '' && updatePWD !== '' && confirmPWD !== '');
    }, [currentPWD, updatePWD, confirmPWD]);

    const handleUpdateClick = () => {
        // 현재 비밀번호가 맞는 지 검사

        // 비밀번호 유효성 검사 (8~30자의 영문, 숫자, 특수문자 포함)
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{8,30}$/;
        const isPasswordValid = passwordRegex.test(updatePWD);

        // 새 비밀번호와 확인 비밀번호가 일치하는지 확인
        const isPasswordMatch = updatePWD === confirmPWD;

        // 에러 상태 업데이트
        setCurrentPasswordError(true);
        setUpdatePasswordError(!isPasswordValid);
        setConfirmError(!isPasswordMatch);

        // 각각의 입력 필드에 대해 진동 애니메이션 트리거
        if (currentPWD === '1') {
            setCurrentPWDShake(true);
            setTimeout(() => setCurrentPWDShake(false), 500); // 500ms 후 해제
        }
        if (!isPasswordValid) {
            setUpdatePWDShake(true);
            setTimeout(() => setUpdatePWDShake(false), 500); // 500ms 후 해제
        }
        if (!isPasswordMatch) {
            setConfirmPWDShake(true);
            setTimeout(() => setConfirmPWDShake(false), 500); // 500ms 후 해제
        }

        // 모든 조건이 충족되면 처리 로직 실행
        if (isPasswordValid && isPasswordMatch) {
            alert('비밀번호가 성공적으로 변경되었습니다!');
            navigate('/mypage'); // 성공 시 마이페이지로 이동
        }
    };

    return (

        <UpdatePasswordPageContainer>
            <TopNav lefter={null} center={Center} righter={null} />

            <UpdatePasswordContainer>
                <ShakingInputContainer isShake={currentPWDShake}>
                    <InputContainer>
                        <LargeInput
                            icon={Lock}
                            activeIcon={ActLock}
                            placeholder="현재 비밀번호 입력"
                            type="password"
                            value={currentPWD}
                            onChangeFunc={(e) => handleInputChange(e, setCurrentPWD)}
                        />

                        <InputDescription className={`caption-md-100 ${currentPasswordError ? 'error' : ''}`}>
                            현재 사용 중인 비밀번호를 입력해주세요.</InputDescription>
                    </InputContainer>
                </ShakingInputContainer>


                <ShakingInputContainer isShake={updatePWDShake}>
                    <InputContainer>
                        <LargeInput
                            icon={Lock}
                            activeIcon={ActLock}
                            placeholder="새 비밀번호 입력"
                            type="password"
                            value={updatePWD}
                            onChangeFunc={(e) => handleInputChange(e, setUpdatePWD)}
                        />
                        <InputDescription className={`caption-md-100 ${updatePasswordError ? 'error' : ''}`}>
                            8~30자의 영문, 숫자, 특수조합을 모두 포함해야 합니다.</InputDescription>
                    </InputContainer>
                </ShakingInputContainer>

                <ShakingInputContainer isShake={confirmPWDShake}>
                    <InputContainer>
                        <LargeInput
                            icon={Lock}
                            activeIcon={ActLock}
                            placeholder="새 비밀번호 확인"
                            type="password"
                            value={confirmPWD}
                            onChangeFunc={(e) => handleInputChange(e, setConfirmPWD)}
                        />
                        <InputDescription className={`caption-md-100 ${confirmError ? 'error' : ''}`}>
                            새 비밀번호를 한번 더 입력해주세요.</InputDescription>
                    </InputContainer>
                </ShakingInputContainer>

                <ButtonContainer>
                    <SmallBtn
                        content="취소"
                        onClick={handleCancelClick}
                        isAvailable={true}
                        isDarkblue={true}
                    />
                    <SmallBtn
                        content="변경"
                        onClick={handleUpdateClick}
                        isAvailable={isUpdateAvailable}
                        isDarkblue={false}
                    />
                </ButtonContainer>

            </UpdatePasswordContainer>



            <FooterNav />
        </UpdatePasswordPageContainer>
    );
}

export default UpdatePwdPage;

const UpdatePasswordPageContainer = styled.div`
display: flex;
flex-direction: column;
`;

const UpdatePasswordContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

gap: 20px;
padding: 20px;
`;

const InputContainer = styled.div`
display: flex;
flex-direction: column;

gap: 5px;
`;

const InputDescription = styled.span`
margin-left: 10px;

color: var(--gray-40);

  &.error {
    color: var(--etc-error); /* 빨간색으로 표시 (CSS 변수 사용) */
  }
`;

const ButtonContainer = styled.div`
display: flex;
flex-direction: row;

gap: 9px;
margin-top: 100px;
`;

const ShakingInputContainer = styled.div<{ isShake: boolean }>`
    ${({ isShake }) => isShake && css`animation: ${shake} 0.5s ease;`}
`;